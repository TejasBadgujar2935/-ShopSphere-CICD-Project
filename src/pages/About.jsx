import { motion } from 'framer-motion'
import { FiTarget, FiUsers, FiAward, FiHeart } from 'react-icons/fi'

const About = () => {
  const values = [
    {
      icon: FiTarget,
      title: 'Our Mission',
      description: 'To provide premium quality products at competitive prices while delivering exceptional customer service.',
    },
    {
      icon: FiUsers,
      title: 'Our Team',
      description: 'A passionate group of individuals dedicated to making online shopping a delightful experience.',
    },
    {
      icon: FiAward,
      title: 'Quality First',
      description: 'We carefully curate our products to ensure only the best reaches our customers.',
    },
    {
      icon: FiHeart,
      title: 'Customer Love',
      description: 'Our customers are at the heart of everything we do. Your satisfaction is our success.',
    },
  ]

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Products' },
    { number: '100+', label: 'Brands' },
    { number: '25+', label: 'Countries' },
  ]

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            About ShopSphere
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We're more than just an online store. We're a community of shoppers who believe in quality, value, and exceptional service.
          </motion.p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
              alt="Our Team"
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, ShopSphere started with a simple idea: make online shopping easier, more enjoyable, and more trustworthy. What began as a small startup has grown into a platform trusted by thousands of customers worldwide.
            </p>
            <p className="text-gray-600 mb-4">
              We believe that shopping should be an experience, not just a transaction. That's why we've built a platform that combines cutting-edge technology with a human touch.
            </p>
            <p className="text-gray-600">
              Today, we continue to innovate and expand, always keeping our customers' needs at the center of everything we do.
            </p>
          </motion.div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-gray-50 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Journey</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of our growing community. Sign up for our newsletter and be the first to know about new products, exclusive deals, and exciting updates.
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="btn-primary">Subscribe</button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default About
