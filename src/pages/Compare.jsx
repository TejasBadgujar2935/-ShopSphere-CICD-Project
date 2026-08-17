import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiX, FiShoppingCart, FiCheck, FiSliders, FiAward, FiZap, FiTrash2, FiPlus } from 'react-icons/fi'
import { useComparison } from '../context/ComparisonContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'
import { products } from '../data/mockProductsData'

const Compare = () => {
  const { compareItems, removeFromCompare, clearCompare, addToCompare } = useComparison()
  const { addToCart } = useCart()

  // Pre-populate 3 items for demonstration if empty
  useEffect(() => {
    if (compareItems.length === 0) {
      addToCompare(products[0])
      addToCompare(products[1])
      addToCompare(products[2])
    }
  }, [])

  if (compareItems.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center max-w-xl mx-auto px-4">
        <div className="w-20 h-20 bg-brand-blue/10 text-brand-blue rounded-3xl flex items-center justify-center mx-auto mb-4">
          <FiSliders className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold mb-2">No Products to Compare</h2>
        <p className="text-gray-500 text-sm mb-6">Select up to 4 items from the catalog to compare technical specifications side-by-side.</p>
        <Link to="/products" className="btn-primary px-8 py-3 rounded-2xl text-sm font-bold inline-block">
          Browse Products
        </Link>
      </div>
    )
  }

  // Calculate best price and best rating IDs
  const lowestPriceItem = [...compareItems].sort((a, b) => a.price - b.price)[0]
  const highestRatingItem = [...compareItems].sort((a, b) => b.rating - a.rating)[0]

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3.5 py-1 rounded-full mb-2 inline-block">
              SPECIFICATION MATRIX
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
              Product Comparison
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Comparing <strong className="text-brand-blue">{compareItems.length}</strong> products side-by-side with smart value highlights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="btn-secondary text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 text-red-500 border-red-200 dark:border-red-900/40 hover:bg-red-50"
            >
              <FiTrash2 className="w-4 h-4" /> Clear Matrix
            </button>
            <Link to="/products" className="btn-primary text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2">
              <FiPlus className="w-4 h-4" /> Add Product
            </Link>
          </div>
        </div>

        {/* Desktop Side-by-Side Comparison Matrix */}
        <div className="overflow-x-auto no-scrollbar rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800 shadow-2xl p-6">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="p-4 text-xs uppercase font-bold text-gray-400 w-48">Feature</th>
                {compareItems.map((item) => (
                  <th key={item.id} className="p-4 w-64 align-top">
                    <div className="relative group p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
                      <button
                        onClick={() => removeFromCompare(item.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 hover:text-red-500"
                      >
                        <FiX className="w-4 h-4" />
                      </button>

                      <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-white">
                        <img src={item.images ? item.images[0] : item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase text-brand-blue">{item.category}</p>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2">{item.name}</h4>
                        <p className="text-lg font-black text-brand-blue pt-1">{formatPrice(item.price)}</p>
                      </div>

                      {/* Best Value Badges */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {lowestPriceItem?.id === item.id && (
                          <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <FiZap className="w-3 h-3" /> BEST PRICE
                          </span>
                        )}
                        {highestRatingItem?.id === item.id && (
                          <span className="bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <FiAward className="w-3 h-3" /> BEST RATED
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(item)}
                        className="mt-4 w-full btn-primary py-2 text-xs font-bold flex items-center justify-center gap-2 rounded-xl"
                      >
                        <FiShoppingCart className="w-4 h-4" /> Add to Cart
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200/60 dark:divide-gray-800 text-xs font-medium">
              {/* Category */}
              <tr>
                <td className="p-4 font-bold text-gray-400 uppercase">Category</td>
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 font-semibold text-gray-900 dark:text-white">{item.category}</td>
                ))}
              </tr>

              {/* Brand */}
              <tr>
                <td className="p-4 font-bold text-gray-400 uppercase">Brand</td>
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 font-semibold text-gray-900 dark:text-white">{item.brand || 'ShopSphere'}</td>
                ))}
              </tr>

              {/* Rating */}
              <tr>
                <td className="p-4 font-bold text-gray-400 uppercase">Rating</td>
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 font-bold text-amber-500">
                    ★ {item.rating || 4.8} / 5.0
                  </td>
                ))}
              </tr>

              {/* Stock */}
              <tr>
                <td className="p-4 font-bold text-gray-400 uppercase">Availability</td>
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 font-semibold text-emerald-500">In Stock ({item.stock || 30} units)</td>
                ))}
              </tr>

              {/* Specifications Rows */}
              <tr>
                <td className="p-4 font-bold text-gray-400 uppercase">Key Technology</td>
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-gray-600 dark:text-gray-300">
                    {item.specifications ? Object.values(item.specifications)[0] : 'Premium Tech Specs'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-400 uppercase">Warranty</td>
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-gray-600 dark:text-gray-300">
                    {item.specifications?.Warranty || '1 Year Official Warranty'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Compare
