import { FiX } from 'react-icons/fi'
import { categories } from '../../data/products'

const FilterPanel = ({ filters, onFilterChange, onReset }) => {
  const priceRanges = [
    { label: 'All Prices', min: 0, max: 10000 },
    { label: 'Under $100', min: 0, max: 100 },
    { label: '$100 - $500', min: 100, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: '$1000 - $2000', min: 1000, max: 2000 },
    { label: 'Over $2000', min: 2000, max: 10000 },
  ]

  const ratings = [4, 3, 2, 1]

  return (
    <div className="space-y-6">
      {/* Reset Button */}
      <button
        onClick={onReset}
        className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
      >
        <FiX className="w-4 h-4" />
        Reset all filters
      </button>

      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={filters.category === 'all'}
              onChange={() => onFilterChange('category', 'all')}
              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-gray-700">All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === category.name}
                onChange={() => onFilterChange('category', category.name)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700">
                {category.icon} {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={
                  filters.priceRange[0] === range.min && filters.priceRange[1] === range.max
                }
                onChange={() => onFilterChange('priceRange', [range.min, range.max])}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Rating</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === 0}
              onChange={() => onFilterChange('rating', 0)}
              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-gray-700">All Ratings</span>
          </label>
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => onFilterChange('rating', rating)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700 flex items-center gap-1">
                {rating}+ {'★'.repeat(rating)}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
