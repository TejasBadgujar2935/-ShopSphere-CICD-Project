import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/products/ProductCard'

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist()
  const { addToCart } = useCart()

  const handleMoveToCart = (productId) => {
    moveToCart(productId, addToCart)
  }

  if (wishlist.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <FiHeart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
            <p className="text-gray-600 mb-8">
              Save items you love to your wishlist and they'll appear here.
            </p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Wishlist ({wishlist.length} items)
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card group"
            >
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-t-xl"
                  />
                </Link>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <p className="text-xl font-bold text-primary-600 mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleMoveToCart(product.id)}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
