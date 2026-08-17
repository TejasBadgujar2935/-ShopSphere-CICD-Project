import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTrash2, FiShoppingBag, FiArrowRight, FiCheckCircle, FiTag, FiTruck, FiShield } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)
  const [appliedCode, setAppliedCode] = useState('')
  const navigate = useNavigate()

  const freeShippingThreshold = 100
  const freeShippingProgress = Math.min(100, (totalPrice / freeShippingThreshold) * 100)
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - totalPrice)

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (promoCode.trim().toUpperCase() === 'SPHERE45') {
      const disc = totalPrice * 0.45
      setDiscountAmount(disc)
      setAppliedCode('SPHERE45 (45% OFF)')
      setPromoCode('')
    } else if (promoCode.trim().toUpperCase() === 'FASHION30') {
      const disc = totalPrice * 0.3
      setDiscountAmount(disc)
      setAppliedCode('FASHION30 (30% OFF)')
      setPromoCode('')
    } else {
      alert('Invalid promo code. Try "SPHERE45" or "FASHION30"')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <FiShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Explore flagship 3D products, apparel, and wearables to add to your order.
        </p>
        <Link to="/products" className="btn-primary px-8 py-3.5 rounded-2xl text-sm font-bold inline-flex items-center gap-2">
          Start Shopping <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  const shippingCost = amountToFreeShipping === 0 ? 0 : 9.99
  const finalTotal = Math.max(0, totalPrice - discountAmount + shippingCost)

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3.5 py-1 rounded-full mb-2 inline-block">
              CHECKOUT PREPARATION
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              You have <strong className="text-brand-blue">{totalItems}</strong> items in your cart.
            </p>
          </div>

          <button
            onClick={clearCart}
            className="btn-secondary text-xs font-bold py-2.5 px-4 rounded-xl text-red-500 hover:bg-red-50"
          >
            Empty Cart
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="glass-card rounded-2xl p-4 mb-8 border border-gray-200/80 dark:border-gray-800">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            {amountToFreeShipping > 0 ? (
              <span>Add <strong className="text-brand-blue">{formatPrice(amountToFreeShipping)}</strong> more to unlock <strong>Free Express Shipping</strong></span>
            ) : (
              <span className="text-emerald-500 font-bold flex items-center gap-1">
                <FiCheckCircle className="w-4 h-4" /> Free Express Shipping Unlocked!
              </span>
            )}
            <span>{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-blue to-indigo-500 h-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Item List (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="glass-card p-4 sm:p-6 rounded-2xl border border-gray-200/60 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-gray-200 dark:border-gray-700 flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{item.category}</span>
                    <h3 className="font-bold text-base text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
                    <p className="text-sm font-black text-brand-blue mt-1">{formatPrice(item.price)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 text-xs"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 font-semibold text-xs">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 text-xs"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-black text-sm text-gray-900 dark:text-white">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="glass-card p-6 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-xl space-y-6 sticky top-28">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">
                Order Summary
              </h3>

              {/* Promo Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code (SPHERE45)"
                  className="input-field text-xs uppercase"
                />
                <button type="submit" className="btn-secondary text-xs font-bold px-4 py-2">
                  Apply
                </button>
              </form>

              {appliedCode && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 text-xs font-bold flex justify-between">
                  <span>Code Applied: {appliedCode}</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              {/* Cost Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(totalPrice)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-gray-900 dark:text-white pt-4 border-t border-gray-200 dark:border-gray-800">
                  <span>Total</span>
                  <span className="text-brand-blue text-xl">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary py-4 text-sm font-bold flex items-center justify-center gap-2 rounded-2xl shadow-2xl"
              >
                Proceed to Checkout <FiArrowRight className="w-4 h-4" />
              </button>

              <div className="flex justify-center gap-4 text-xs text-gray-400 pt-2">
                <span className="flex items-center gap-1"><FiShield className="w-3.5 h-3.5 text-emerald-500" /> Stripe Secure</span>
                <span className="flex items-center gap-1"><FiTruck className="w-3.5 h-3.5 text-brand-blue" /> Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
