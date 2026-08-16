import { createContext, useContext, useState, useEffect } from 'react'

const ComparisonContext = createContext()

const MAX_COMPARISON_ITEMS = 4

export const ComparisonProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState(() => {
    const saved = localStorage.getItem('compareItems')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('compareItems', JSON.stringify(compareItems))
  }, [compareItems])

  const addToCompare = (product) => {
    if (compareItems.length >= MAX_COMPARISON_ITEMS) {
      alert(`You can only compare up to ${MAX_COMPARISON_ITEMS} products`)
      return
    }
    if (compareItems.some((item) => item.id === product.id)) {
      return
    }
    setCompareItems([...compareItems, product])
  }

  const removeFromCompare = (productId) => {
    setCompareItems(compareItems.filter((item) => item.id !== productId))
  }

  const clearCompare = () => {
    setCompareItems([])
  }

  const isInCompare = (productId) => {
    return compareItems.some((item) => item.id === productId)
  }

  const value = {
    compareItems,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
  }

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  )
}

export const useComparison = () => {
  const context = useContext(ComparisonContext)
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider')
  }
  return context
}
