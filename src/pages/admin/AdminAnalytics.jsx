import { useState } from 'react'
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiUsers, FiShoppingBag, FiPackage, FiBarChart2, FiPieChart } from 'react-icons/fi'

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d')

  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+12.5%', icon: FiDollarSign, color: 'green', trend: 'up' },
    { label: 'Total Orders', value: '1,234', change: '+8.2%', icon: FiShoppingBag, color: 'blue', trend: 'up' },
    { label: 'Total Customers', value: '892', change: '+15.3%', icon: FiUsers, color: 'purple', trend: 'up' },
    { label: 'Products', value: '156', change: '+5.1%', icon: FiPackage, color: 'orange', trend: 'up' },
    { label: 'Conversion Rate', value: '3.2%', change: '-0.5%', icon: FiBarChart2, color: 'red', trend: 'down' },
    { label: 'Avg. Order Value', value: '$36.67', change: '+2.1%', icon: FiDollarSign, color: 'green', trend: 'up' },
  ]

  const salesData = [
    { date: 'Jan 22', sales: 4200, orders: 120 },
    { date: 'Jan 23', sales: 3800, orders: 105 },
    { date: 'Jan 24', sales: 5100, orders: 145 },
    { date: 'Jan 25', sales: 4600, orders: 130 },
    { date: 'Jan 26', sales: 5400, orders: 155 },
    { date: 'Jan 27', sales: 4900, orders: 140 },
    { date: 'Jan 28', sales: 6200, orders: 175 },
  ]

  const categoryData = [
    { category: 'Electronics', sales: 35, color: 'bg-blue-500' },
    { category: 'Fashion', sales: 28, color: 'bg-purple-500' },
    { category: 'Sports', sales: 18, color: 'bg-green-500' },
    { category: 'Beauty', sales: 12, color: 'bg-pink-500' },
    { category: 'Home', sales: 7, color: 'bg-orange-500' },
  ]

  const topProducts = [
    { name: 'Premium Wireless Headphones', sales: 234, revenue: '$70,066', growth: '+12%' },
    { name: 'Smart Watch Pro', sales: 189, revenue: '$85,041', growth: '+8%' },
    { name: 'Professional DSLR Camera', sales: 87, revenue: '$113,099', growth: '+15%' },
    { name: 'Designer Leather Jacket', sales: 156, revenue: '$93,598', growth: '+5%' },
    { name: 'Minimalist Running Shoes', sales: 312, revenue: '$40,558', growth: '+20%' },
  ]

  const recentActivity = [
    { type: 'order', message: 'New order #ORD-1234 placed', time: '2 min ago' },
    { type: 'customer', message: 'New customer registered', time: '5 min ago' },
    { type: 'product', message: 'Product "Smart Watch" updated', time: '15 min ago' },
    { type: 'review', message: 'New 5-star review received', time: '30 min ago' },
    { type: 'order', message: 'Order #ORD-1233 shipped', time: '45 min ago' },
  ]

  const maxSales = Math.max(...salesData.map(d => d.sales))

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? (
                    <FiTrendingUp className="w-4 h-4" />
                  ) : (
                    <FiTrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiBarChart2 className="w-5 h-5 text-primary-600" />
              Sales Overview
            </h2>
            <div className="h-64 flex items-end gap-4">
              {salesData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-primary-500 rounded-t-lg transition-all hover:bg-primary-600"
                    style={{ height: `${(data.sales / maxSales) * 100}%` }}
                  />
                  <p className="text-xs text-gray-600 mt-2">{data.date}</p>
                  <p className="text-sm font-semibold text-gray-900">${data.sales.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiPieChart className="w-5 h-5 text-primary-600" />
              Sales by Category
            </h2>
            <div className="space-y-4">
              {categoryData.map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{item.category}</span>
                    <span className="font-semibold text-gray-900">{item.sales}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all`}
                      style={{ width: `${item.sales}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Products</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{product.revenue}</p>
                    <span className="text-green-600 text-sm">{product.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'order'
                        ? 'bg-blue-500'
                        : activity.type === 'customer'
                        ? 'bg-green-500'
                        : activity.type === 'product'
                        ? 'bg-purple-500'
                        : 'bg-orange-500'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics
