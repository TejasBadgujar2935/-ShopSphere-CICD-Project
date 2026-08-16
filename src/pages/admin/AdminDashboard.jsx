import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingBag, FiUsers, FiDollarSign, FiBox, FiTrendingUp, FiArrowRight } from 'react-icons/fi'

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Sales', value: '$45,231', change: '+12.5%', icon: FiDollarSign, color: 'green' },
    { label: 'Total Orders', value: '1,234', change: '+8.2%', icon: FiShoppingBag, color: 'blue' },
    { label: 'Total Customers', value: '892', change: '+15.3%', icon: FiUsers, color: 'purple' },
    { label: 'Products', value: '156', change: '+5.1%', icon: FiBox, color: 'orange' },
  ]

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: '$299.99', status: 'Delivered', date: '2024-01-25' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: '$449.99', status: 'Shipped', date: '2024-01-24' },
    { id: 'ORD-003', customer: 'Mike Johnson', amount: '$129.99', status: 'Processing', date: '2024-01-24' },
    { id: 'ORD-004', customer: 'Sarah Wilson', amount: '$599.99', status: 'Pending', date: '2024-01-23' },
  ]

  const topProducts = [
    { name: 'Premium Wireless Headphones', sales: 234, revenue: '$70,066' },
    { name: 'Smart Watch Pro', sales: 189, revenue: '$85,041' },
    { name: 'Professional DSLR Camera', sales: 87, revenue: '$113,099' },
    { name: 'Designer Leather Jacket', sales: 156, revenue: '$93,598' },
  ]

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <Link to="/admin/orders" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                View All <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.amount}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-700'
                          : order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
              <Link to="/admin/products" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                View All <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                  <p className="font-semibold text-gray-900">{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/products" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <FiBox className="w-8 h-8 text-primary-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Manage Products</h3>
            <p className="text-gray-600 text-sm">Add, edit, or remove products from your store</p>
          </Link>
          <Link to="/admin/orders" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <FiShoppingBag className="w-8 h-8 text-primary-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Manage Orders</h3>
            <p className="text-gray-600 text-sm">View and process customer orders</p>
          </Link>
          <Link to="/admin/customers" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <FiUsers className="w-8 h-8 text-primary-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Manage Customers</h3>
            <p className="text-gray-600 text-sm">View and manage customer accounts</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
