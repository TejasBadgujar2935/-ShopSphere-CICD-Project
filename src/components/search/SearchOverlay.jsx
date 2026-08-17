import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiX, FiArrowRight, FiTrendingUp, FiTag } from 'react-icons/fi'
import { productService } from '../../services/productService'
import { formatPrice } from '../../utils/helpers'

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ products: [], categories: [] })
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const popularSearches = ['Headphones', 'Smartwatch', 'Sneakers', 'Leather Jacket', 'Camera', 'Yoga Mat']

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          // Open triggered from outside handler if needed
        }
      }
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], categories: [] })
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await productService.getSearchSuggestions(query)
        setResults(res)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 150)

    return () => clearTimeout(timer)
  }, [query])

  const handleSelectProduct = (id) => {
    onClose()
    setQuery('')
    navigate(`/product/${id}`)
  }

  const handleSelectCategory = (catName) => {
    onClose()
    setQuery('')
    navigate(`/products?category=${encodeURIComponent(catName)}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onClose()
      navigate(`/products?search=${encodeURIComponent(query)}`)
      setQuery('')
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl glass-modal rounded-3xl overflow-hidden z-10 shadow-2xl"
        >
          {/* Input Header */}
          <form onSubmit={handleSubmit} className="relative border-b border-gray-200 dark:border-gray-800 p-4">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-brand-blue" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands, or categories... (Press ESC to exit)"
              className="w-full pl-14 pr-12 py-3 bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            ) : (
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-400 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-md">
                ESC
              </span>
            )}
          </form>

          {/* Body Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
            {loading && (
              <div className="py-8 text-center text-sm text-gray-400">Searching catalog...</div>
            )}

            {!loading && query && results.products.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500 font-semibold mb-1">No products matching "{query}"</p>
                <p className="text-xs text-gray-400">Try searching for "headphones", "shoes", or "watch"</p>
              </div>
            )}

            {/* Results */}
            {!loading && results.products.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Matching Products ({results.products.length})
                </h4>
                <div className="space-y-2">
                  {results.products.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p.id)}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-brand-blue/10 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200 dark:border-gray-800"
                        />
                        <div>
                          <h5 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-brand-blue transition-colors">
                            {p.name}
                          </h5>
                          <span className="text-xs text-gray-400">{p.category} • {p.brand}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-brand-blue">{formatPrice(p.price)}</span>
                        <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Default Popular Tags */}
            {!query && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                    <FiTrendingUp className="w-4 h-4 text-brand-blue" /> Popular Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-blue rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                    <FiTag className="w-4 h-4 text-brand-blue" /> Explore Collections
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['Electronics', 'Fashion', 'Footwear', 'Smart Home'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleSelectCategory(cat)}
                        className="p-3 bg-gray-50 dark:bg-gray-800/50 hover:border-brand-blue border border-gray-200 dark:border-gray-800 rounded-xl text-left text-xs font-semibold flex justify-between items-center transition-colors"
                      >
                        <span>{cat}</span>
                        <FiArrowRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default SearchOverlay
