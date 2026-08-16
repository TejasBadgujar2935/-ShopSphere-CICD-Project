import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSparkles } from 'react-icons/fi'
import ProductCard from '../products/ProductCard'
import { recommendationEngine } from '../../utils/recommendations'

const RecommendationSection = ({ title = 'Recommended For You', limit = 4 }) => {
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    const personalized = recommendationEngine.getPersonalizedRecommendations(limit)
    if (personalized.length > 0) {
      setRecommendations(personalized)
    } else {
      // Fallback to trending products
      setRecommendations(recommendationEngine.getTrendingProducts(limit))
    }
  }, [limit])

  if (recommendations.length === 0) return null

  return (
    <section className="py-12 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <FiSparkles className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecommendationSection
