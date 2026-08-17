import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiHeart, FiStar, FiTruck, FiShield, FiRotateCcw, FiCheck, FiShare2, FiArrowLeft } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { productService } from '../services/productService'
import { formatPrice, calculateDiscount } from '../utils/helpers'
import ProductRail from '../components/products/ProductRail'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true)
      try {
        const item = await productService.getProductById(id)
        setProduct(item)
        setSelectedImage(0)

        // Fetch Related Products
        const related = await productService.getRelatedProducts(item.id, item.category)
        setRelatedProducts(related)
      } catch (err) {
        console.error('Error fetching details:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-8">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
            <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Link to="/products" className="btn-primary mt-4 inline-block">Back to Catalog</Link>
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)
  const discount = calculateDiscount(product.originalPrice, product.price)

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleWishlistToggle = () => {
    if (inWishlist) removeFromWishlist(product.id)
    else addToWishlist(product)
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-8">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-brand-blue">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-blue">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-bold line-clamp-1">{product.name}</span>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Left: Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden glass-card border border-gray-200/60 dark:border-gray-800 shadow-2xl">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />

              {discount > 0 && (
                <span className="absolute top-6 left-6 bg-red-500 text-white font-black text-xs uppercase px-4 py-1.5 rounded-full shadow-lg">
                  -{discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === idx
                        ? 'border-brand-blue scale-105 shadow-lg'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Purchase Controls (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3.5 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-1">
                  <FiCheck className="w-3.5 h-3.5" /> In Stock ({product.stock || 40} available)
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
                {product.name}
              </h1>

              {/* Rating & Brand */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 4.8) ? 'fill-current' : 'opacity-30'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-bold text-sm text-gray-800 dark:text-gray-200">
                    {product.rating || 4.8}
                  </span>
                </div>
                <span className="text-xs text-gray-400">({product.reviewsCount || 128} customer reviews)</span>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-4 mb-6 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-800">
                <span className="text-4xl font-black text-brand-blue">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Specs Highlight */}
              {product.specifications && (
                <div className="space-y-2 mb-8 bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl text-xs">
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-gray-200/50 dark:border-gray-700/50 pb-2">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">{k}</span>
                      <span className="font-bold text-gray-900 dark:text-white">{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Quantity</span>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  >
                    -
                  </button>
                  <span className="px-5 py-2 font-semibold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary py-4 text-base font-bold flex items-center justify-center gap-2 rounded-2xl shadow-2xl"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-4 rounded-2xl border transition-colors ${
                    inWishlist
                      ? 'bg-red-500 text-white border-red-500'
                      : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <FiHeart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-4 text-[11px] text-gray-500 font-semibold text-center">
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/40 flex flex-col items-center gap-1">
                  <FiTruck className="w-4 h-4 text-brand-blue" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/40 flex flex-col items-center gap-1">
                  <FiShield className="w-4 h-4 text-brand-blue" />
                  <span>Official Warranty</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/40 flex flex-col items-center gap-1">
                  <FiRotateCcw className="w-4 h-4 text-brand-blue" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Discovery Rail */}
        {relatedProducts.length > 0 && (
          <ProductRail
            eyebrow="YOU MAY ALSO LIKE"
            title="Related Product Discovery"
            subtitle="Explore complementary items in the same collection."
            products={relatedProducts}
          />
        )}
      </div>
    </div>
  )
}

export default ProductDetails
