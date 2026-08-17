import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden p-4 relative animate-pulse flex flex-col justify-between h-[420px]">
      <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl relative overflow-hidden mb-4">
        <div className="skeleton-shimmer absolute inset-0"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3 skeleton-shimmer"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-5/6 skeleton-shimmer"></div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4 skeleton-shimmer"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-2/5 skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton
