import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { formatPrice, calculateDiscount } from '../../utils/helpers'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const discount = calculateDiscount(product.originalPrice, product.price)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="card group">
          {/* Product Image */}
          <div className="relative overflow-hidden aspect-square">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.featured && (
                <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded">
                  Featured
                </span>
              )}
              {product.bestSeller && (
                <span className="bg-secondary-500 text-white text-xs px-2 py-1 rounded">
                  Best Seller
                </span>
              )}
              {discount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleWishlistToggle}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  inWishlist
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
                }`}
              >
                <FiHeart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Category */}
            <p className="text-sm text-gray-500 mb-1">{product.category}</p>
            
            {/* Name */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
