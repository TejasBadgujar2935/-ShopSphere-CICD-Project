import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiFilter, FiX, FiGrid, FiList } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { setFilters, setSortBy, applyFilters, resetFilters } from '../redux/slices/productsSlice'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import FilterPanel from '../components/products/FilterPanel'

const Products = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { filteredProducts, filters, sortBy } = useSelector((state) => state.products)
  
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  useEffect(() => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const trending = searchParams.get('trending')
    const bestseller = searchParams.get('bestseller')

    const newFilters = {}
    if (category && category !== 'all') newFilters.category = category
    if (search) newFilters.searchQuery = search
    if (featured) newFilters.featured = true
    if (trending) newFilters.trending = true
    if (bestseller) newFilters.bestSeller = true

    dispatch(setFilters(newFilters))
    dispatch(applyFilters())
  }, [searchParams, dispatch])

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }))
    dispatch(applyFilters())
    setCurrentPage(1)
  }

  const handleSortChange = (value) => {
    dispatch(setSortBy(value))
    dispatch(applyFilters())
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
    setCurrentPage(1)
  }

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
  ]

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Panel - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary-600 text-white p-4 rounded-full shadow-lg"
          >
            <FiFilter className="w-6 h-6" />
          </button>

          {/* Mobile Filter Modal */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
              <div className="bg-white h-full overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.category !== 'all' || filters.rating > 0 || filters.searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.category !== 'all' && (
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {filters.category}
                    <button
                      onClick={() => handleFilterChange('category', 'all')}
                      className="hover:text-primary-900"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {filters.rating > 0 && (
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {filters.rating}+ Stars
                    <button
                      onClick={() => handleFilterChange('rating', 0)}
                      className="hover:text-primary-900"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {filters.searchQuery && (
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    "{filters.searchQuery}"
                    <button
                      onClick={() => handleFilterChange('searchQuery', '')}
                      className="hover:text-primary-900"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-sm text-gray-600 hover:text-primary-600 underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products */}
            {currentProducts.length > 0 ? (
              <motion.div
                layout
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === i + 1
                        ? 'bg-primary-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
