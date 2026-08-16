import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  totalItems: 0,
  totalAmount: 0,
  coupon: null,
  discount: 0,
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      )
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        coupon: null,
        discount: 0,
      }

    case 'APPLY_COUPON':
      return {
        ...state,
        coupon: action.payload.code,
        discount: action.payload.discount,
      }

    case 'REMOVE_COUPON':
      return {
        ...state,
        coupon: null,
        discount: 0,
      }

    case 'CALCULATE_TOTALS':
      const totalItems = state.cart.reduce((acc, item) => acc + item.quantity, 0)
      const totalAmount = state.cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
      const discountAmount = (totalAmount * state.discount) / 100
      return {
        ...state,
        totalItems,
        totalAmount,
        finalAmount: totalAmount - discountAmount,
      }

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
    dispatch({ type: 'CALCULATE_TOTALS' })
  }, [state.cart, state.discount])

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const applyCoupon = (code, discount) => {
    dispatch({ type: 'APPLY_COUPON', payload: { code, discount } })
  }

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' })
  }

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
