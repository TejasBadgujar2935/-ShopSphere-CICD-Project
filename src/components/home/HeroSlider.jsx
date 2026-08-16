import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = [
    {
      id: 1,
      title: 'Summer Collection 2024',
      subtitle: 'Discover the latest trends',
      description: 'Up to 50% off on selected items',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600',
      cta: 'Shop Now',
      link: '/products',
    },
    {
      id: 2,
      title: 'Premium Electronics',
      subtitle: 'Tech that empowers',
      description: 'Free shipping on orders over $100',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1600',
      cta: 'Explore',
      link: '/products?category=Electronics',
    },
    {
      id: 3,
      title: 'Fashion Forward',
      subtitle: 'Style that speaks',
      description: 'New arrivals every week',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600',
      cta: 'Discover',
      link: '/products?category=Fashion',
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-xl"
              >
                <span className="text-primary-400 font-semibold text-lg mb-2 block">
                  {slides[currentIndex].subtitle}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {slides[currentIndex].title}
                </h1>
                <p className="text-xl text-gray-200 mb-8">
                  {slides[currentIndex].description}
                </p>
                <Link
                  to={slides[currentIndex].link}
                  className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  {slides[currentIndex].cta}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <FiArrowLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <FiArrowRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary-500' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider
