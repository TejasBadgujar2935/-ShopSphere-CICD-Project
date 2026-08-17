import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { FiX, FiTrash2, FiShoppingBag, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/helpers'

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()
  const navigate = useNavigate()

  const freeShippingThreshold = 100
  const freeShippingProgress = Math.min(100, (totalPrice / freeShippingThreshold) * 100)
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - totalPrice)

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dimmed Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col justify-between border-l border-gray-200 dark:border-gray-800"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiShoppingBag className="w-6 h-6 text-brand-blue" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
                  <span className="bg-brand-blue/10 text-brand-blue text-xs font-bold px-2.5 py-1 rounded-full">
                    {totalItems} items
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Free Shipping Progress */}
              <div className="px-6 py-3 bg-brand-blue/5 border-b border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                  {amountToFreeShipping > 0 ? (
                    <span>Add <strong className="text-brand-blue">{formatPrice(amountToFreeShipping)}</strong> for <strong>FREE Express Shipping</strong></span>
                  ) : (
                    <span className="text-emerald-500 font-semibold flex items-center gap-1">
                      <FiCheckCircle className="w-4 h-4" /> You've unlocked FREE Express Shipping!
                    </span>
                  )}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-brand-blue to-indigo-500 h-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Item List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                      <FiShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg font-semibold mb-2">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mb-6">Discover products built for the way you live.</p>
                    <button
                      onClick={() => {
                        onClose()
                        navigate('/products')
                      }}
                      className="btn-primary text-sm px-6 py-2.5"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200/60 dark:border-gray-800"
                    >
                      <img
                        src={item.images ? item.images[0] : item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl border border-gray-200 dark:border-gray-700"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-sm line-clamp-1 text-gray-900 dark:text-white">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-brand-blue font-bold mt-1">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-0.5 text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              -
                            </button>
                            <span className="px-3 py-0.5 text-xs font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-0.5 text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-bold text-gray-900 dark:text-white">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Shipping</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {amountToFreeShipping === 0 ? 'FREE' : '$9.99'}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-800">
                      <span>Total</span>
                      <span className="text-brand-blue">{formatPrice(totalPrice + (amountToFreeShipping === 0 ? 0 : 9.99))}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => {
                        onClose()
                        navigate('/cart')
                      }}
                      className="btn-secondary text-sm py-3 text-center rounded-xl"
                    >
                      View Cart
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="btn-primary text-sm py-3 flex items-center justify-center gap-2 rounded-xl"
                    >
                      Checkout <FiArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
