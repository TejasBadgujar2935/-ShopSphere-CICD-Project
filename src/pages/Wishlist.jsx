import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowRight } from 'react-icons/fi'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleMoveToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  if (wishlist.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
        >
          <FiHeart className="w-12 h-12" />
        </motion.div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          Save your favorite flagship items, footwear, and audio gear to return to later.
        </p>
        <Link to="/products" className="btn-primary px-8 py-3.5 rounded-2xl text-sm font-bold inline-flex items-center gap-2">
          Explore Collection <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3.5 py-1 rounded-full mb-2 inline-block">
              SAVED ITEMS
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
              My Wishlist
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              You have <strong className="text-brand-blue">{wishlist.length}</strong> items saved.
            </p>
          </div>

          <button
            onClick={clearWishlist}
            className="btn-secondary text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 text-red-500 border-red-200 dark:border-red-900/40 hover:bg-red-50"
          >
            <FiTrash2 className="w-4 h-4" /> Clear Wishlist
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card rounded-2xl overflow-hidden p-4 flex flex-col justify-between relative group border border-gray-200/60 dark:border-gray-800"
            >
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-500 hover:text-red-500 flex items-center justify-center shadow-md transition-colors"
                aria-label="Remove item"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>

              <Link to={`/product/${item.id}`} className="block">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-[10px] font-bold uppercase text-brand-blue">{item.category}</p>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1 mb-1">
                  {item.name}
                </h3>
                <p className="text-lg font-black text-brand-blue mb-4">
                  {formatPrice(item.price)}
                </p>
              </Link>

              <button
                onClick={() => handleMoveToCart(item)}
                className="w-full btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-2 rounded-xl"
              >
                <FiShoppingCart className="w-4 h-4" /> Move to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
