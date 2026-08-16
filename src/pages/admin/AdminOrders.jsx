import { FiEye, FiTruck, FiCheck } from 'react-icons/fi'

const AdminOrders = () => {
  const orders = [
    { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', amount: '$299.99', status: 'Delivered', date: '2024-01-25', items: 2 },
    { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', amount: '$449.99', status: 'Shipped', date: '2024-01-24', items: 1 },
    { id: 'ORD-003', customer: 'Mike Johnson', email: 'mike@example.com', amount: '$129.99', status: 'Processing', date: '2024-01-24', items: 3 },
    { id: 'ORD-004', customer: 'Sarah Wilson', email: 'sarah@example.com', amount: '$599.99', status: 'Pending', date: '2024-01-23', items: 1 },
    { id: 'ORD-005', customer: 'Tom Brown', email: 'tom@example.com', amount: '$199.99', status: 'Delivered', date: '2024-01-22', items: 4 },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700'
      case 'Shipped':
        return 'bg-blue-100 text-blue-700'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700'
      case 'Pending':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Orders</h1>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors" title="View Details">
                        <FiEye className="w-5 h-5" />
                      </button>
                      {order.status === 'Processing' && (
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Mark as Shipped">
                          <FiTruck className="w-5 h-5" />
                        </button>
                      )}
                      {order.status === 'Shipped' && (
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Mark as Delivered">
                          <FiCheck className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
