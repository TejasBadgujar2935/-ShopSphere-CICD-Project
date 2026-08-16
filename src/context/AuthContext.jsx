import { createContext, useContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess, logout as logoutAction } from '../redux/slices/authSlice'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    
    if (token && user) {
      dispatch(loginSuccess({ token, user }))
    }
    setIsLoading(false)
  }, [dispatch])

  const login = async (email, password) => {
    try {
      // Mock login - replace with actual API call
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: email,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      }
      const mockToken = 'mock-jwt-token-' + Date.now()
      
      dispatch(loginSuccess({ token: mockToken, user: mockUser }))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (name, email, password) => {
    try {
      // Mock register - replace with actual API call
      const mockUser = {
        id: Date.now(),
        name: name,
        email: email,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + name,
      }
      const mockToken = 'mock-jwt-token-' + Date.now()
      
      dispatch(loginSuccess({ token: mockToken, user: mockUser }))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    dispatch(logoutAction())
  }

  const value = {
    login,
    register,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
