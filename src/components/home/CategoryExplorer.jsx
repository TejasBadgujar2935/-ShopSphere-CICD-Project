import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { categories } from '../../data/mockProductsData'

const CategoryExplorer = () => {
  const categoryImages = {
    Electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    Fashion: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
    Footwear: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    'Smart Home': 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&auto=format&fit=crop&q=80',
    'Audio & Studio': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    'Luxury Watches': 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&auto=format&fit=crop&q=80',
    'Beauty & Care': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    'Sports & Outdoors': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full mb-3 inline-block">
              CURATED COLLECTIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Explore by Category
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-xl">
              Intelligently presented product lines tailored for modern living.
            </p>
          </div>

          <Link
            to="/products"
            className="btn-secondary text-xs font-bold uppercase tracking-wider flex items-center gap-2 py-3 px-5 rounded-2xl"
          >
            Explore All Collections <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const bgImage = categoryImages[cat.name] || categoryImages['Electronics']
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group relative h-80 rounded-3xl overflow-hidden block glass-card border border-gray-200/50 dark:border-gray-800 shadow-xl"
                >
                  {/* Background Image */}
                  <img
                    src={bgImage}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Card Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <span className="text-3xl p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                        {cat.icon}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan bg-brand-cyan/20 backdrop-blur-md px-3 py-1 rounded-full border border-brand-cyan/30">
                        {cat.count || 24}+ ITEMS
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-gray-300 line-clamp-2 mb-4 font-normal">
                        {cat.description || 'Premium curated selection'}
                      </p>

                      <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:translate-x-2 transition-transform">
                        <span>Explore Collection</span>
                        <FiArrowRight className="w-4 h-4 text-brand-cyan" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoryExplorer
