import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { formatPrice, calculateDiscount } from '../../utils/helpers'
import QuickViewModal from './QuickViewModal'

const ProductCard = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  if (!product) return null

  const inWishlist = isInWishlist(product.id)
  const discount = calculateDiscount(product.originalPrice, product.price)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsQuickViewOpen(true)
  }

  // 3D Mouse Tilt math
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setTilt({
      x: (y / (rect.height / 2)) * -5,
      y: (x / (rect.width / 2)) * 5,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ perspective: 1000 }}
        className="group relative"
      >
        <Link to={`/product/${product.id}`} className="block">
          <div className="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-brand-blue/40 flex flex-col justify-between h-[420px]">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800/80">
              <img
                src={product.images ? product.images[0] : product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Floating Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.featured && (
                  <span className="bg-brand-blue/90 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-md">
                    Featured
                  </span>
                )}
                {product.bestSeller && (
                  <span className="bg-secondary-500/90 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-md">
                    Best Seller
                  </span>
                )}
                {product.newArrival && (
                  <span className="bg-emerald-500/90 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-md">
                    New
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-red-500 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    -{discount}%
                  </span>
                )}
              </div>

              {/* Quick Actions (Wishlist & Quick View) */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handleWishlistToggle}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md backdrop-blur-md ${
                    inWishlist
                      ? 'bg-red-500 text-white scale-105'
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <FiHeart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleQuickView}
                  className="w-9 h-9 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-brand-blue hover:text-white transition-all shadow-md backdrop-blur-md flex items-center justify-center"
                  aria-label="Quick View"
                >
                  <FiEye className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Floating Bar */}
              <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl shadow-xl"
                >
                  <FiShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  {product.category}
                </p>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-brand-blue transition-colors">
                  {product.name}
                </h3>
              </div>

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating || 4.5) ? 'fill-current' : 'opacity-30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    {product.rating || 4.5}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black text-brand-blue">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  )
}

export default ProductCard
