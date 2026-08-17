import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'

const ProductRail = ({
  eyebrow = 'CURATED COLLECTION',
  title = 'Featured Products',
  subtitle = 'Discover handpicked items designed for performance and style.',
  products = [],
  loading = false,
  viewAllLink = '/products',
}) => {
  const scrollRef = useRef(null)

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            {eyebrow && (
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full mb-3 inline-block">
                {eyebrow}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <Link
              to={viewAllLink}
              className="text-xs font-bold uppercase tracking-wider text-brand-blue hover:text-brand-hover flex items-center gap-1 mr-2"
            >
              View All <FiArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => handleScroll('left')}
              className="p-3 rounded-2xl glass-card text-gray-700 dark:text-gray-200 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-blue transition-colors shadow-md"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 rounded-2xl glass-card text-gray-700 dark:text-gray-200 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-blue transition-colors shadow-md"
              aria-label="Scroll right"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Rail Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2 snap-x snap-mandatory"
        >
          {loading
            ? [...Array(4)].map((_, idx) => (
                <div key={idx} className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start">
                  <ProductCardSkeleton />
                </div>
              ))
            : products.map((product) => (
                <div key={product.id} className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default ProductRail
