import { createContext, useContext, useReducer, useEffect } from 'react'

const WishlistContext = createContext()

const initialState = {
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
}

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const exists = state.wishlist.find((item) => item.id === action.payload.id)
      if (exists) return state
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      }

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      }

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        wishlist: [],
      }

    case 'MOVE_TO_CART':
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      }

    default:
      return state
  }
}

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
  }, [state.wishlist])

  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product })
  }

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId })
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
  }

  const moveToCart = (productId, addToCart) => {
    const product = state.wishlist.find((item) => item.id === productId)
    if (product) {
      addToCart(product)
      dispatch({ type: 'MOVE_TO_CART', payload: productId })
    }
  }

  const isInWishlist = (productId) => {
    return state.wishlist.some((item) => item.id === productId)
  }

  const value = {
    ...state,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    moveToCart,
    isInWishlist,
  }

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
