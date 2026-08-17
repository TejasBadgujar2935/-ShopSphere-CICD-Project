import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiX, FiMoon, FiSun, FiZap } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useTheme } from '../../context/ThemeContext'
import VoiceSearch from '../search/VoiceSearch'
import SearchOverlay from '../search/SearchOverlay'
import CartDrawer from '../cart/CartDrawer'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { totalItems } = useCart()
  const { wishlist } = useWishlist()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleVoiceSearch = (transcript) => {
    navigate(`/products?search=${encodeURIComponent(transcript)}`)
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Compare', path: '/compare' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-navbar py-3 shadow-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ShopSphere Logo Mark */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.05 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-indigo to-brand-violet flex items-center justify-center shadow-lg shadow-brand-blue/30"
              >
                <FiZap className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-1">
                  Shop<span className="gradient-text">Sphere</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-blue -mt-1">
                  3D COMMERCE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-md p-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:text-brand-blue dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navTab"
                        className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-indigo rounded-full shadow-md -z-10"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </Link>
                )
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full glass-card hover:scale-110 transition-transform text-gray-700 dark:text-gray-200"
                aria-label="Toggle Theme"
              >
                {isDark ? <FiSun className="w-4 h-4 text-amber-400" /> : <FiMoon className="w-4 h-4" />}
              </button>

              {/* Command Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-card text-xs font-medium text-gray-500 dark:text-gray-400 hover:border-brand-blue transition-all"
              >
                <FiSearch className="w-4 h-4 text-brand-blue" />
                <span>Search...</span>
                <span className="font-mono text-[10px] bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">
                  ⌘K
                </span>
              </button>

              {/* Voice Search */}
              <VoiceSearch
                onSearch={handleVoiceSearch}
                isListening={isListening}
                setIsListening={setIsListening}
              />

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-2.5 rounded-full glass-card hover:scale-110 transition-transform text-gray-700 dark:text-gray-200 relative"
                aria-label="Wishlist"
              >
                <FiHeart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Launcher */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="p-2.5 rounded-full glass-card hover:scale-110 transition-transform text-gray-700 dark:text-gray-200 relative"
                aria-label="Cart"
              >
                <FiShoppingCart className="w-4 h-4 text-brand-blue" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-brand-blue text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Auth Button */}
              {isAuthenticated ? (
                <Link to="/dashboard" className="p-1 rounded-full border-2 border-brand-blue">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </Link>
              ) : (
                <Link to="/login" className="btn-primary text-xs px-5 py-2.5 rounded-full">
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="p-2.5 rounded-full glass-card relative"
              >
                <FiShoppingCart className="w-5 h-5 text-brand-blue" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-2xl glass-card text-gray-700 dark:text-gray-200"
              >
                {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800"
            >
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 text-base font-bold ${
                      location.pathname === link.path
                        ? 'text-brand-blue'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setIsSearchOpen(true)
                    }}
                    className="flex items-center gap-3 w-full py-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <FiSearch className="w-5 h-5 text-brand-blue" />
                    <span>Search Catalog</span>
                  </button>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <FiHeart className="w-5 h-5" />
                    <span>Wishlist ({wishlist.length})</span>
                  </Link>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-semibold">Switch Theme</span>
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-full glass-card text-gray-700 dark:text-gray-200"
                    >
                      {isDark ? <FiSun className="w-4 h-4 text-amber-400" /> : <FiMoon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Command Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
    </>
  )
}

export default Navbar
