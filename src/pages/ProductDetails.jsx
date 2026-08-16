import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiHeart, FiShoppingCart, FiTruck, FiShield, FiRotateCcw, FiMinus, FiPlus, FiShare2 } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentProduct } from '../redux/slices/productsSlice'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useRecentlyViewed } from '../context/RecentlyViewedContext'
import { recommendationEngine } from '../utils/recommendations'
import { products, reviews } from '../data/products'
import { formatPrice, calculateDiscount } from '../utils/helpers'
import ProductCard from '../components/products/ProductCard'
import ReviewCard from '../components/home/ReviewCard'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToRecentlyViewed } = useRecentlyViewed()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedTab, setSelectedTab] = useState('description')

  const product = products.find((p) => p.id === parseInt(id))
  const inWishlist = isInWishlist(product?.id)

  useEffect(() => {
    if (product) {
      dispatch(setCurrentProduct(product))
      addToRecentlyViewed(product)
      recommendationEngine.trackInteraction(product.id, 'view')
      window.scrollTo(0, 0)
    }
  }, [product, dispatch, addToRecentlyViewed])

  if (!product) {
    return (
      <div className="pt-24 pb-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Link to="/products" className="text-primary-600 hover:text-primary-700">
          Back to Products
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    recommendationEngine.trackInteraction(product.id, 'cart')
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
      recommendationEngine.trackInteraction(product.id, 'wishlist')
    }
  }

  const relatedProducts = recommendationEngine.getContentBasedRecommendations(product.id, 4)

  const productReviews = reviews.filter((r) => r.productId === product.id)

  const discount = calculateDiscount(product.originalPrice, product.price)

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/products" className="text-gray-500 hover:text-gray-700">
            Products
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-primary-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="text-sm text-primary-600 font-medium mb-2 block">
              {product.brand}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">{product.rating}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{product.reviews} Reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium text-gray-900">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  <FiMinus className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>
              <span className="text-gray-500 text-sm">
                {product.stock} items available
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <FiShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  inWishlist
                    ? 'border-red-500 text-red-500'
                    : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <FiHeart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-500 transition-colors">
                <FiShare2 className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <FiTruck className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <FiShield className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <p className="text-sm text-gray-600">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <FiRotateCcw className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <p className="text-sm text-gray-600">30 Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex gap-8 border-b mb-6">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-4 font-medium transition-colors ${
                  selectedTab === tab
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {selectedTab === 'description' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose max-w-none"
            >
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Experience premium quality with this carefully crafted product. Designed with
                attention to detail and made from the finest materials, it offers exceptional
                durability and style. Perfect for everyday use or special occasions.
              </p>
            </motion.div>
          )}

          {selectedTab === 'specifications' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-3 border-b border-gray-200"
                  >
                    <span className="text-gray-600 font-medium">{key}</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {productReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {productReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No reviews yet</p>
              )}
            </motion.div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="section-title mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
