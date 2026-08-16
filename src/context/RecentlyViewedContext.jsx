import { createContext, useContext, useState, useEffect } from 'react'

const RecentlyViewedContext = createContext()

const MAX_RECENTLY_VIEWED = 10

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('recentlyViewed')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((p) => p.id !== product.id)
      // Add to beginning
      const updated = [product, ...filtered]
      // Keep only MAX_RECENTLY_VIEWED items
      return updated.slice(0, MAX_RECENTLY_VIEWED)
    })
  }

  const clearRecentlyViewed = () => {
    setRecentlyViewed([])
  }

  const value = {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  }

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext)
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider')
  }
  return context
}
