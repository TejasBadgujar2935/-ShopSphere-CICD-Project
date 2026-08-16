import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiArrowLeft } from 'react-icons/fi'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Oops! The page you're looking for doesn't exist or has been moved to a different location.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <FiHome className="w-5 h-5" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            <FiArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <img
            src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600"
            alt="404"
            className="w-64 h-64 object-cover rounded-2xl mx-auto opacity-50"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
