import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiShoppingBag, FiHeart, FiMapPin, FiSettings, FiLogOut, FiEdit } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState('profile')

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'orders', label: 'Orders', icon: FiShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
    { id: 'addresses', label: 'Addresses', icon: FiMapPin },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ]

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 299.99,
      items: 2,
    },
    {
      id: 'ORD-002',
      date: '2024-01-20',
      status: 'Shipped',
      total: 449.99,
      items: 1,
    },
    {
      id: 'ORD-003',
      date: '2024-01-25',
      status: 'Processing',
      total: 129.99,
      items: 3,
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <button className="btn-outline ml-auto flex items-center gap-2">
                <FiEdit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Full Name</label>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Account Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-3xl font-bold text-primary-600">12</p>
                    <p className="text-sm text-gray-600">Orders</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-3xl font-bold text-secondary-600">$2,450</p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'orders':
        return (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-white border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">{order.items} items</p>
                  <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                </div>
                <button className="mt-4 text-primary-600 hover:text-primary-700 font-medium">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )

      case 'wishlist':
        return (
          <div className="text-center py-12">
            <FiHeart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Save items you love to your wishlist</p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        )

      case 'addresses':
        return (
          <div className="space-y-4">
            <div className="bg-white border-2 border-primary-500 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded">
                  Default
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <FiEdit className="w-5 h-5" />
                </button>
              </div>
              <h4 className="font-semibold text-gray-900">Home</h4>
              <p className="text-gray-600 mt-2">
                John Doe<br />
                123 Commerce Street<br />
                New York, NY 10001<br />
                United States
              </p>
              <p className="text-gray-600 mt-2">+1 (555) 123-4567</p>
            </div>

            <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors">
              + Add New Address
            </button>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Email Notifications</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">SMS Notifications</span>
                  <input type="checkbox" className="w-5 h-5 text-primary-600" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Order Updates</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Promotional Emails</span>
                  <input type="checkbox" className="w-5 h-5 text-primary-600" />
                </label>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="font-semibold text-red-900 mb-4">Danger Zone</h3>
              <button className="text-red-600 hover:text-red-700 font-medium">
                Delete Account
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FiLogOut className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
