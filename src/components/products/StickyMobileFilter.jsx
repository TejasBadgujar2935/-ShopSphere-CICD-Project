import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFilter, FiSliders, FiX, FiCheck } from 'react-icons/fi'
import FilterPanel from './FilterPanel'

const StickyMobileFilter = ({ filters, onFilterChange, onReset, activeCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Sticky Bottom Trigger Bar on Mobile */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="glass-modal rounded-2xl p-2 flex items-center justify-between gap-2 shadow-2xl border border-gray-200/80 dark:border-gray-800">
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold shadow-lg"
          >
            <FiFilter className="w-4 h-4" />
            Filters {activeCount > 0 && <span className="bg-white text-brand-blue text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{activeCount}</span>}
          </button>
        </div>
      </div>

      {/* Slide-up Filter Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white dark:bg-gray-900 rounded-t-3xl overflow-y-auto p-6 shadow-2xl border-t border-gray-200 dark:border-gray-800"
            >
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <FiSliders className="w-5 h-5 text-brand-blue" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Filter Products</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <FilterPanel
                filters={filters}
                onFilterChange={onFilterChange}
                onReset={onReset}
              />

              <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800 flex gap-3 sticky bottom-0 bg-white dark:bg-gray-900 pb-2">
                <button
                  onClick={() => {
                    onReset()
                    setIsOpen(false)
                  }}
                  className="btn-secondary flex-1 py-3 text-center text-sm"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-primary flex-1 py-3 text-center text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default StickyMobileFilter
