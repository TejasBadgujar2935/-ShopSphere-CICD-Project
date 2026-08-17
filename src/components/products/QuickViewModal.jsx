import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiShoppingCart, FiHeart, FiStar, FiCheck, FiShield, FiTruck } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { formatPrice, calculateDiscount } from '../../utils/helpers'

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    if (product) {
      setSelectedImage(0)
      setQuantity(1)
    }
  }, [product])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!product || !isOpen) return null

  const inWishlist = isInWishlist(product.id)
  const discount = calculateDiscount(product.originalPrice, product.price)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    onClose()
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl glass-modal rounded-3xl overflow-hidden z-10 p-6 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform z-20"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <img
                    src={product.images[selectedImage] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  {discount > 0 && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg">
                      -{discount}% OFF
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                          selectedImage === idx
                            ? 'border-brand-blue scale-105 shadow-md'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue bg-blue-500/10 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    {product.brand && (
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        • {product.brand}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
                    {product.name}
                  </h2>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500">({product.reviewsCount || product.reviews || 0} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-black text-brand-blue">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Key Specifications preview */}
                  {product.specifications && (
                    <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-xl mb-6 space-y-2 text-xs">
                      {Object.entries(product.specifications).slice(0, 3).map(([key, val]) => (
                        <div key={key} className="flex justify-between border-b border-gray-200/50 dark:border-gray-700/50 pb-1">
                          <span className="text-gray-500 dark:text-gray-400">{key}:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quantity & Actions */}
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold">Quantity:</span>
                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 font-semibold text-sm">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 btn-primary py-3.5 flex items-center justify-center gap-2 rounded-xl text-base"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={handleWishlistToggle}
                      className={`p-3.5 rounded-xl border transition-colors ${
                        inWishlist
                          ? 'bg-red-500 text-white border-red-500'
                          : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white hover:border-red-500'
                      }`}
                    >
                      <FiHeart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default QuickViewModal
