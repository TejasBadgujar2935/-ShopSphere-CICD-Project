import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products?category=${category.name}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer text-center group"
      >
        <div className="text-4xl mb-3">{category.icon}</div>
        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{category.count} Products</p>
      </motion.div>
    </Link>
  )
}

export default CategoryCard
