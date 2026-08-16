import { products } from '../data/products'

// AI-based recommendation engine
export class RecommendationEngine {
  constructor() {
    this.userHistory = JSON.parse(localStorage.getItem('userHistory')) || []
    this.userPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {}
  }

  // Track user interactions
  trackInteraction(productId, action) {
    const timestamp = Date.now()
    this.userHistory.push({ productId, action, timestamp })
    
    // Keep only last 100 interactions
    if (this.userHistory.length > 100) {
      this.userHistory = this.userHistory.slice(-100)
    }
    
    localStorage.setItem('userHistory', JSON.stringify(this.userHistory))
    this.updatePreferences(productId, action)
  }

  // Update user preferences based on interactions
  updatePreferences(productId, action) {
    const product = products.find(p => p.id === productId)
    if (!product) return

    const weight = action === 'purchase' ? 3 : action === 'wishlist' ? 2 : 1
    
    if (!this.userPreferences[product.category]) {
      this.userPreferences[product.category] = 0
    }
    this.userPreferences[product.category] += weight

    if (!this.userPreferences.brands) {
      this.userPreferences.brands = {}
    }
    if (!this.userPreferences.brands[product.brand]) {
      this.userPreferences.brands[product.brand] = 0
    }
    this.userPreferences.brands[product.brand] += weight

    localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences))
  }

  // Get personalized recommendations
  getPersonalizedRecommendations(limit = 8) {
    const scoredProducts = products.map(product => {
      let score = 0

      // Category preference
      if (this.userPreferences[product.category]) {
        score += this.userPreferences[product.category] * 0.4
      }

      // Brand preference
      if (this.userPreferences.brands?.[product.brand]) {
        score += this.userPreferences.brands[product.brand] * 0.3
      }

      // Popularity score
      score += product.rating * 0.2

      // Recency bias (newer products get slight boost)
      const daysSinceCreation = (Date.now() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24)
      score += Math.max(0, (30 - daysSinceCreation) / 30) * 0.1

      return { ...product, score }
    })

    // Sort by score and return top recommendations
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ score, ...product }) => product)
  }

  // Get collaborative filtering recommendations
  getCollaborativeRecommendations(limit = 8) {
    // In a real app, this would use actual user data
    // For demo, we'll use similar products based on category and rating
    const topCategories = Object.entries(this.userPreferences)
      .filter(([key]) => key !== 'brands')
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category]) => category)

    if (topCategories.length === 0) {
      return this.getPopularProducts(limit)
    }

    const recommendations = products.filter(product =>
      topCategories.includes(product.category)
    )

    return recommendations
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  // Get content-based recommendations for a specific product
  getContentBasedRecommendations(productId, limit = 4) {
    const currentProduct = products.find(p => p.id === productId)
    if (!currentProduct) return []

    const scoredProducts = products
      .filter(p => p.id !== productId)
      .map(product => {
        let score = 0

        // Same category
        if (product.category === currentProduct.category) {
          score += 0.4
        }

        // Same brand
        if (product.brand === currentProduct.brand) {
          score += 0.3
        }

        // Similar price range (within 20%)
        const priceDiff = Math.abs(product.price - currentProduct.price) / currentProduct.price
        if (priceDiff < 0.2) {
          score += 0.2
        }

        // Similar rating
        const ratingDiff = Math.abs(product.rating - currentProduct.rating)
        score += (1 - ratingDiff / 5) * 0.1

        return { ...product, score }
      })

    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ score, ...product }) => product)
  }

  // Get popular products (fallback)
  getPopularProducts(limit = 8) {
    return products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  // Get trending products
  getTrendingProducts(limit = 8) {
    return products
      .filter(p => p.trending)
      .slice(0, limit)
  }

  // Get best sellers
  getBestSellers(limit = 8) {
    return products
      .filter(p => p.bestSeller)
      .slice(0, limit)
  }

  // Clear user history
  clearHistory() {
    this.userHistory = []
    this.userPreferences = {}
    localStorage.removeItem('userHistory')
    localStorage.removeItem('userPreferences')
  }
}

// Singleton instance
export const recommendationEngine = new RecommendationEngine()
