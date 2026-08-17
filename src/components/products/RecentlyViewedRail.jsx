import React from 'react'
import { useRecentlyViewed } from '../../context/RecentlyViewedContext'
import ProductRail from './ProductRail'

const RecentlyViewedRail = () => {
  const { recentlyViewed } = useRecentlyViewed()

  if (!recentlyViewed || recentlyViewed.length === 0) return null

  return (
    <ProductRail
      eyebrow="YOUR SESSION"
      title="Recently Viewed Products"
      subtitle="Quickly return to items you previously inspected during this session."
      products={recentlyViewed}
    />
  )
}

export default RecentlyViewedRail
