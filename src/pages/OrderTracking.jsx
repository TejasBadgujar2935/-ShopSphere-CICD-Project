import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiMapPin } from 'react-icons/fi'

const OrderTracking = () => {
  const { orderId } = useParams()
  const [trackingData, setTrackingData] = useState(null)

  // Mock tracking data - in real app, fetch from API
  const mockTrackingData = {
    orderId: orderId || 'ORD-001',
    status: 'shipped',
    estimatedDelivery: '2024-02-01',
    currentLocation: 'Distribution Center, New York',
    trackingHistory: [
      {
        date: '2024-01-28 14:30',
        status: 'shipped',
        location: 'Distribution Center, New York',
        description: 'Package has been shipped',
      },
      {
        date: '2024-01-27 10:15',
        status: 'processing',
        location: 'Warehouse, New Jersey',
        description: 'Package is being processed',
      },
      {
        date: '2024-01-26 16:45',
        status: 'confirmed',
        location: 'Order System',
        description: 'Order confirmed',
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Commerce Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
    },
  }

  useState(() => {
    setTrackingData(mockTrackingData)
  }, [])

  if (!trackingData) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h1>
            <form className="max-w-md mx-auto mt-8">
              <input
                type="text"
                placeholder="Enter Order ID"
                className="input-field mb-4"
              />
              <button className="btn-primary w-full">Track Order</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const statusSteps = [
    { key: 'confirmed', icon: FiCheckCircle, label: 'Order Confirmed' },
    { key: 'processing', icon: FiPackage, label: 'Processing' },
    { key: 'shipped', icon: FiTruck, label: 'Shipped' },
    { key: 'delivered', icon: FiCheckCircle, label: 'Delivered' },
  ]

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === trackingData.status)
  }

  const currentStepIndex = getCurrentStepIndex()

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Tracking</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="text-xl font-bold text-gray-900">{trackingData.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="text-xl font-bold text-primary-600">{trackingData.estimatedDelivery}</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="relative mb-8">
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStepIndex + 1) / statusSteps.length) * 100}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-primary-600"
              />
            </div>
            <div className="relative flex justify-between">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex
                const isCurrent = index === currentStepIndex
                const Icon = step.icon

                return (
                  <div key={step.key} className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-primary-600 text-white'
                          : isCurrent
                          ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        isCompleted ? 'text-primary-600' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <FiClock className="w-6 h-6 text-primary-600" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Current Status</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {trackingData.currentLocation}
                </p>
              </div>
            </div>
          </div>

          {/* Tracking History */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Tracking History</h3>
            <div className="space-y-4">
              {trackingData.trackingHistory.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                    {index < trackingData.trackingHistory.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium text-gray-900">{event.description}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                    <p className="text-xs text-gray-400 mt-1">{event.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiMapPin className="w-5 h-5" />
            Shipping Address
          </h3>
          <div className="text-gray-600">
            <p className="font-medium text-gray-900">{trackingData.shippingAddress.name}</p>
            <p>{trackingData.shippingAddress.address}</p>
            <p>
              {trackingData.shippingAddress.city}, {trackingData.shippingAddress.state}{' '}
              {trackingData.shippingAddress.zip}
            </p>
            <p>{trackingData.shippingAddress.country}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking
