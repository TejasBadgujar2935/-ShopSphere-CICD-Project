import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiStar, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { setProducts } from '../redux/slices/productsSlice'
import { products, categories, offers, reviews } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import HeroSlider from '../components/home/HeroSlider'
import CategoryCard from '../components/home/CategoryCard'
import OfferBanner from '../components/home/OfferBanner'
import ReviewCard from '../components/home/ReviewCard'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setProducts(products))
  }, [dispatch])

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4)
  const trendingProducts = products.filter((p) => p.trending).slice(0, 4)
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4)

  const features = [
    {
      icon: FiTruck,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: FiShield,
      title: 'Secure Payment',
      description: '100% secure checkout',
    },
    {
      icon: FiHeadphones,
      title: '24/7 Support',
      description: 'Dedicated support team',
    },
    {
      icon: FiStar,
      title: 'Best Quality',
      description: 'Premium products only',
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm text-center"
              >
                <feature.icon className="w-8 h-8 mx-auto mb-3 text-primary-600" />
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Shop by Category</h2>
            <Link
              to="/products"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              View All <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Featured Products</h2>
            <Link
              to="/products?featured=true"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              View All <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-8">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <OfferBanner key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Trending Now</h2>
            <Link
              to="/products?trending=true"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              View All <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Best Sellers</h2>
            <Link
              to="/products?bestseller=true"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              View All <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center text-white mb-8">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.slice(0, 4).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with ShopSphere
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and get 10% off your first order, plus exclusive
              deals and new product alerts.
            </p>
            <form className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
