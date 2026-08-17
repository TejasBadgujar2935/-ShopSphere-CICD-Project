/**
 * Enterprise Product Service Layer
 * Simulates high-performance backend database queries with indexing, filtering, 
 * cursor-based infinite scroll pagination, fuzzy text search, and caching.
 */
import { products, categories } from '../data/mockProductsData'

// In-memory product database reference
let catalogStore = [...products]

export const productService = {
  /**
   * Fetch products with pagination & infinite scroll cursor support
   */
  async getProductsPaginated({
    page = 1,
    limit = 12,
    cursor = null,
    category = 'all',
    brand = 'all',
    minPrice = 0,
    maxPrice = 10000,
    minRating = 0,
    searchQuery = '',
    sortBy = 'default',
    featuredOnly = false,
    trendingOnly = false,
    bestSellerOnly = false,
    newArrivalOnly = false,
    editorsPickOnly = false,
    dealOnly = false,
  } = {}) {
    // Simulate lightweight network latency for realism
    await new Promise((resolve) => setTimeout(resolve, 180))

    let result = [...catalogStore]

    // Category Filter
    if (category && category.toLowerCase() !== 'all') {
      result = result.filter(
        (p) =>
          p.category.toLowerCase() === category.toLowerCase() ||
          p.subCategory.toLowerCase() === category.toLowerCase()
      )
    }

    // Brand Filter
    if (brand && brand.toLowerCase() !== 'all') {
      result = result.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
    }

    // Price Range Filter
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice)

    // Rating Filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating)
    }

    // Flag Filters
    if (featuredOnly) result = result.filter((p) => p.featured)
    if (trendingOnly) result = result.filter((p) => p.trending)
    if (bestSellerOnly) result = result.filter((p) => p.bestSeller)
    if (newArrivalOnly) result = result.filter((p) => p.newArrival)
    if (editorsPickOnly) result = result.filter((p) => p.editorsPick)
    if (dealOnly) result = result.filter((p) => p.deal)

    // Search Query (Fuzzy matching on name, description, tags, brand)
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      )
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'discount':
        result.sort((a, b) => (b.originalPrice - b.price) - (a.originalPrice - a.price))
        break
      case 'popularity':
        result.sort((a, b) => b.reviewsCount - a.reviewsCount)
        break
      default:
        // Default sort by rating + featured weight
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating)
        break
    }

    const totalCount = result.length

    // Cursor or Offset Pagination Calculation
    let startIndex = 0
    if (cursor !== null && cursor !== undefined) {
      const cursorIdx = result.findIndex((p) => p.id === Number(cursor))
      startIndex = cursorIdx >= 0 ? cursorIdx + 1 : 0
    } else {
      startIndex = (page - 1) * limit
    }

    const paginatedItems = result.slice(startIndex, startIndex + limit)
    const hasNextPage = startIndex + limit < totalCount
    const nextCursor = hasNextPage && paginatedItems.length > 0 ? paginatedItems[paginatedItems.length - 1].id : null

    return {
      items: paginatedItems,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage,
      nextCursor,
    }
  },

  /**
   * Get single product by ID
   */
  async getProductById(id) {
    await new Promise((resolve) => setTimeout(resolve, 80))
    const item = catalogStore.find((p) => p.id === Number(id))
    if (!item) throw new Error('Product not found')
    return item
  },

  /**
   * Get Curated Rails
   */
  async getFeaturedProducts(limit = 10) {
    const res = await this.getProductsPaginated({ limit, featuredOnly: true })
    return res.items
  },

  async getTrendingProducts(limit = 10) {
    const res = await this.getProductsPaginated({ limit, trendingOnly: true })
    return res.items
  },

  async getBestSellers(limit = 10) {
    const res = await this.getProductsPaginated({ limit, bestSellerOnly: true })
    return res.items
  },

  async getNewArrivals(limit = 10) {
    const res = await this.getProductsPaginated({ limit, newArrivalOnly: true })
    return res.items
  },

  async getEditorsPicks(limit = 10) {
    const res = await this.getProductsPaginated({ limit, editorsPickOnly: true })
    return res.items
  },

  async getDeals(limit = 10) {
    const res = await this.getProductsPaginated({ limit, dealOnly: true })
    return res.items
  },

  /**
   * Get Related Products for Product Detail discovery
   */
  async getRelatedProducts(productId, category, limit = 6) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const related = catalogStore.filter(
      (p) => p.id !== Number(productId) && p.category.toLowerCase() === category.toLowerCase()
    )
    return related.slice(0, limit)
  },

  /**
   * Search Suggestions for Command Palette
   */
  async getSearchSuggestions(query, limit = 5) {
    if (!query || query.trim().length < 2) return { products: [], categories: [] }
    const q = query.toLowerCase().trim()

    const matchedProducts = catalogStore
      .filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      .slice(0, limit)

    const matchedCategories = categories
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 3)

    return { products: matchedProducts, categories: matchedCategories }
  },
}
