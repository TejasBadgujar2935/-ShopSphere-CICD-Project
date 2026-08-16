import { Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

// Pages
import Home from '../pages/Home'
import Products from '../pages/Products'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import Dashboard from '../pages/user/Dashboard'
import Wishlist from '../pages/Wishlist'
import Contact from '../pages/Contact'
import About from '../pages/About'
import Compare from '../pages/Compare'
import OrderTracking from '../pages/OrderTracking'
import NotFound from '../pages/NotFound'

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminAnalytics from '../pages/admin/AdminAnalytics'
import AdminProducts from '../pages/admin/AdminProducts'
import AdminOrders from '../pages/admin/AdminOrders'
import AdminCustomers from '../pages/admin/AdminCustomers'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  // In real app, check for admin role
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

const pageVariants = {
  initial: { opacity: 0, x: 0 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3,
}

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Home />
              </motion.div>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/track/:orderId?" element={<OrderTracking />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <AdminRoute>
                <AdminAnalytics />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <AdminRoute>
                <AdminCustomers />
              </AdminRoute>
            }
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default AppRouter
