import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'

const Cart = () => {
  const {
    cart,
    totalItems,
    totalAmount,
    finalAmount,
    discount,
    coupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart()

  const [couponCode, setCouponCode] = useState('')
  const [couponMessage, setCouponMessage] = useState('')

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    // Mock coupon codes
    const coupons = {
      SAVE10: 10,
      SAVE20: 20,
      WELCOME: 15,
    }

    if (coupons[couponCode.toUpperCase()]) {
      applyCoupon(couponCode.toUpperCase(), coupons[couponCode.toUpperCase()])
      setCouponMessage('Coupon applied successfully!')
    } else {
      setCouponMessage('Invalid coupon code')
    }
    setCouponCode('')
  }

  const taxRate = 0.08 // 8% tax
  const tax = totalAmount * taxRate
  const shipping = totalAmount > 100 ? 0 : 9.99
  const grandTotal = finalAmount + tax + shipping

  if (cart.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <FiShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              Continue Shopping
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm flex gap-6"
              >
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 font-medium flex items-center gap-2 mt-4"
              >
                <FiTrash2 className="w-5 h-5" />
                Clear Cart
              </button>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Coupon */}
              <form onSubmit={handleApplyCoupon} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p
                    className={`text-sm mt-2 ${
                      couponMessage.includes('success') ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {couponMessage}
                  </p>
                )}
                {coupon && (
                  <div className="mt-2 flex items-center justify-between bg-green-50 px-3 py-2 rounded">
                    <span className="text-sm text-green-700">
                      {coupon} ({discount}% off)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-green-600 hover:text-green-700"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </form>

              {/* Summary */}
              <div className="space-y-3 border-t pt-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({coupon})</span>
                    <span>-{formatPrice(totalAmount * (discount / 100))}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <FiArrowRight className="w-5 h-5" />
              </Link>

              {/* Continue Shopping */}
              <Link
                to="/products"
                className="block text-center text-gray-600 hover:text-primary-600 mt-4 font-medium"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    🔒 Secure Checkout
                  </span>
                  <span className="flex items-center gap-1">
                    🚚 Free Shipping
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
