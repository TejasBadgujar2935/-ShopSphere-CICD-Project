import { Link } from 'react-router-dom'
import { FiX, FiCheck } from 'react-icons/fi'
import { useComparison } from '../context/ComparisonContext'
import { formatPrice } from '../utils/helpers'

const Compare = () => {
  const { compareItems, removeFromCompare, clearCompare } = useComparison()

  if (compareItems.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No products to compare</h1>
            <p className="text-gray-600 mb-8">Add products to compare their features</p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const allSpecs = [...new Set(compareItems.flatMap((p) => Object.keys(p.specifications)))]

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Compare Products ({compareItems.length})
          </h1>
          <button
            onClick={clearCompare}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-4 text-left font-semibold text-gray-900 min-w-[200px]">Feature</th>
                {compareItems.map((product) => (
                  <th key={product.id} className="p-4 min-w-[250px]">
                    <div className="relative">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                      />
                      <Link
                        to={`/product/${product.id}`}
                        className="font-semibold text-gray-900 hover:text-primary-600"
                      >
                        {product.name}
                      </Link>
                      <p className="text-lg font-bold text-primary-600 mt-2">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4 font-semibold text-gray-900">Rating</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-bold">{product.rating}</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="p-4 font-semibold text-gray-900">Category</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    {product.category}
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 font-semibold text-gray-900">Brand</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    {product.brand}
                  </td>
                ))}
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="p-4 font-semibold text-gray-900">Stock</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    {product.stock > 0 ? (
                      <span className="text-green-600 flex items-center justify-center gap-1">
                        <FiCheck className="w-4 h-4" />
                        In Stock ({product.stock})
                      </span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </td>
                ))}
              </tr>
              {allSpecs.map((spec) => (
                <tr key={spec} className="border-t">
                  <td className="p-4 font-semibold text-gray-900">{spec}</td>
                  {compareItems.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      {product.specifications[spec] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          {compareItems.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="btn-primary"
            >
              View {product.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Compare
