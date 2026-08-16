import { FiMail, FiPhone, FiMapPin, FiEye } from 'react-icons/fi'

const AdminCustomers = () => {
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 555-0101', orders: 12, spent: '$2,450.00', joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 555-0102', orders: 8, spent: '$1,890.00', joined: '2024-01-10' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 555-0103', orders: 15, spent: '$3,200.00', joined: '2024-01-05' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1 555-0104', orders: 5, spent: '$890.00', joined: '2024-01-20' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', phone: '+1 555-0105', orders: 20, spent: '$4,500.00', joined: '2024-01-01' },
  ]

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Customers</h1>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Orders</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Spent</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiMail className="w-4 h-4" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiPhone className="w-4 h-4" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{customer.orders}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{customer.spent}</td>
                  <td className="px-6 py-4 text-gray-600">{customer.joined}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors" title="View Details">
                      <FiEye className="w-5 h-5" />
                    </button>
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

export default AdminCustomers
