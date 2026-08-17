import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFilter, FiX, FiGrid, FiList, FiCheckCircle, FiRotateCcw } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import ProductCardSkeleton from '../components/products/ProductCardSkeleton'
import FilterPanel from '../components/products/FilterPanel'
import StickyMobileFilter from '../components/products/StickyMobileFilter'
import { productService } from '../services/productService'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [productsList, setProductsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [nextCursor, setNextCursor] = useState(null)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [viewMode, setViewMode] = useState('grid')

  // Filter States
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    brand: 'all',
    priceRange: [0, 5000],
    rating: 0,
    searchQuery: searchParams.get('search') || '',
    featuredOnly: searchParams.get('featured') === 'true',
    trendingOnly: searchParams.get('trending') === 'true',
    bestSellerOnly: searchParams.get('bestseller') === 'true',
    newArrivalOnly: searchParams.get('new') === 'true',
    editorsPickOnly: searchParams.get('editorsPick') === 'true',
    dealOnly: searchParams.get('deal') === 'true',
  })

  const [sortBy, setSortBy] = useState('default')
  const observerRef = useRef(null)

  // Sync URL parameters
  useEffect(() => {
    const cat = searchParams.get('category')
    const search = searchParams.get('search')
    const feat = searchParams.get('featured')
    const trend = searchParams.get('trending')
    const best = searchParams.get('bestseller')
    const dl = searchParams.get('deal')

    setFilters((prev) => ({
      ...prev,
      category: cat || 'all',
      searchQuery: search || '',
      featuredOnly: feat === 'true',
      trendingOnly: trend === 'true',
      bestSellerOnly: best === 'true',
      dealOnly: dl === 'true',
    }))
  }, [searchParams])

  // Initial Fetch on Filter/Sort Change
  const fetchInitialProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await productService.getProductsPaginated({
        limit: 12,
        category: filters.category,
        brand: filters.brand,
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        minRating: filters.rating,
        searchQuery: filters.searchQuery,
        sortBy,
        featuredOnly: filters.featuredOnly,
        trendingOnly: filters.trendingOnly,
        bestSellerOnly: filters.bestSellerOnly,
        newArrivalOnly: filters.newArrivalOnly,
        editorsPickOnly: filters.editorsPickOnly,
        dealOnly: filters.dealOnly,
      })

      setProductsList(res.items)
      setNextCursor(res.nextCursor)
      setHasNextPage(res.hasNextPage)
      setTotalCount(res.totalCount)
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [filters, sortBy])

  useEffect(() => {
    fetchInitialProducts()
  }, [fetchInitialProducts])

  // Infinite Scroll Fetch More
  const loadMoreProducts = async () => {
    if (loadingMore || !hasNextPage || !nextCursor) return
    setLoadingMore(true)

    try {
      const res = await productService.getProductsPaginated({
        limit: 8,
        cursor: nextCursor,
        category: filters.category,
        brand: filters.brand,
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        minRating: filters.rating,
        searchQuery: filters.searchQuery,
        sortBy,
        featuredOnly: filters.featuredOnly,
        trendingOnly: filters.trendingOnly,
        bestSellerOnly: filters.bestSellerOnly,
        newArrivalOnly: filters.newArrivalOnly,
        editorsPickOnly: filters.editorsPickOnly,
        dealOnly: filters.dealOnly,
      })

      setProductsList((prev) => [...prev, ...res.items])
      setNextCursor(res.nextCursor)
      setHasNextPage(res.hasNextPage)
    } catch (err) {
      console.error('Infinite scroll error:', err)
    } finally {
      setLoadingMore(false)
    }
  }

  // IntersectionObserver Trigger for Infinite Scroll
  const lastElementRef = useCallback(
    (node) => {
      if (loading || loadingMore) return
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          loadMoreProducts()
        }
      })

      if (node) observerRef.current.observe(node)
    },
    [loading, loadingMore, hasNextPage, nextCursor]
  )

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      brand: 'all',
      priceRange: [0, 5000],
      rating: 0,
      searchQuery: '',
      featuredOnly: false,
      trendingOnly: false,
      bestSellerOnly: false,
      newArrivalOnly: false,
      editorsPickOnly: false,
      dealOnly: false,
    })
    setSortBy('default')
    setSearchParams({})
  }

  const sortOptions = [
    { value: 'default', label: 'Recommended' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popularity', label: 'Most Popular' },
  ]

  const activeFilterCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.searchQuery ? 1 : 0) +
    (filters.featuredOnly ? 1 : 0) +
    (filters.dealOnly ? 1 : 0)

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3.5 py-1 rounded-full mb-2 inline-block">
              EXPLORE CATALOG
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              All Products
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Showing <strong className="text-brand-blue">{productsList.length}</strong> of{' '}
              <strong>{totalCount}</strong> items with live infinite scroll append.
            </p>
          </div>

          {/* Sort & Grid Controls */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-brand-blue shadow-sm"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 glass-card p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-brand-blue text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-label="Grid view"
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-brand-blue text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-label="List view"
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Active Filter Pills Bar */}
          <div className="flex-1">
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-brand-blue/5 rounded-2xl border border-brand-blue/15">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 mr-1">Active:</span>
                {filters.category !== 'all' && (
                  <span className="bg-white dark:bg-gray-800 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-gray-200 dark:border-gray-700">
                    Category: {filters.category}
                    <button onClick={() => handleFilterChange('category', 'all')} className="hover:text-red-500">
                      <FiX className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {filters.rating > 0 && (
                  <span className="bg-white dark:bg-gray-800 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-gray-200 dark:border-gray-700">
                    {filters.rating}+ Stars
                    <button onClick={() => handleFilterChange('rating', 0)} className="hover:text-red-500">
                      <FiX className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {filters.searchQuery && (
                  <span className="bg-white dark:bg-gray-800 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-gray-200 dark:border-gray-700">
                    "{filters.searchQuery}"
                    <button onClick={() => handleFilterChange('searchQuery', '')} className="hover:text-red-500">
                      <FiX className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-brand-blue font-bold hover:underline flex items-center gap-1 ml-auto"
                >
                  <FiRotateCcw className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>
            )}

            {/* Initial Loading Skeletons */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : productsList.length > 0 ? (
              <>
                {/* Product Grid / List */}
                <div
                  className={`grid gap-6 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  }`}
                >
                  {productsList.map((product, idx) => {
                    const isLast = idx === productsList.length - 1
                    return (
                      <div key={product.id} ref={isLast ? lastElementRef : null}>
                        <ProductCard product={product} />
                      </div>
                    )
                  })}
                </div>

                {/* Loading More Append Shimmer */}
                {loadingMore && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                    {[...Array(3)].map((_, i) => (
                      <ProductCardSkeleton key={i} />
                    ))}
                  </div>
                )}

                {/* End of Catalog Experience */}
                {!hasNextPage && productsList.length > 0 && (
                  <div className="py-16 text-center border-t border-gray-200 dark:border-gray-800 mt-12">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiCheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      You've reached the end of the collection
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
                      All {productsList.length} matching items loaded seamlessly. Check back soon for new drops!
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* Empty Catalog State */
              <div className="text-center py-24 glass-card rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <FiFilter className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No products matched your filters
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your price range, clearing active search terms, or selecting a different category.
                </p>
                <button onClick={handleResetFilters} className="btn-primary text-sm px-6 py-3 rounded-xl">
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Mobile Filter Bar & Drawer */}
      <StickyMobileFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        activeCount={activeFilterCount}
      />
    </div>
  )
}

export default Products
