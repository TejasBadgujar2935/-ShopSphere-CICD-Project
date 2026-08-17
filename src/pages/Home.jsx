import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiStar } from 'react-icons/fi'
import Hero3D from '../components/home/Hero3D'
import TrustStrip from '../components/home/TrustStrip'
import CategoryExplorer from '../components/home/CategoryExplorer'
import Signature3DFeature from '../components/home/Signature3DFeature'
import EditorialSection from '../components/home/EditorialSection'
import ProductRail from '../components/products/ProductRail'
import RecentlyViewedRail from '../components/products/RecentlyViewedRail'
import ReviewCard from '../components/home/ReviewCard'
import SEO from '../components/common/SEO'
import { productService } from '../services/productService'
import { offers, reviews } from '../data/mockProductsData'
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics'

const Home = () => {
  const [featured, setFeatured] = useState([])
  const [trending, setTrending] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [editorsPicks, setEditorsPicks] = useState([])
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.PAGE_VIEW, { pageName: 'Home' })
    const fetchHomeData = async () => {
      setLoading(true)
      try {
        const [featRes, trendRes, bestRes, editRes, dealRes] = await Promise.all([
          productService.getFeaturedProducts(10),
          productService.getTrendingProducts(10),
          productService.getBestSellers(10),
          productService.getEditorsPicks(10),
          productService.getDeals(10),
        ])
        setFeatured(featRes)
        setTrending(trendRes)
        setBestSellers(bestRes)
        setEditorsPicks(editRes)
        setDeals(dealRes)
      } catch (err) {
        console.error('Failed to load home rails:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchHomeData()
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <SEO title="Home — 3D E-Commerce Platform" description="Discover flagship electronics, high-fashion apparel, and luxury lifestyle items in an interactive 3D commerce space." />

      {/* 1. Futuristic 3D Commerce Hero */}
      <Hero3D />

      {/* 2. Value & Trust Strip */}
      <TrustStrip />

      {/* 3. Category Explorer Grid */}
      <CategoryExplorer />

      {/* 4. Featured Products Horizontal Rail */}
      <ProductRail
        eyebrow="FLAGSHIP SELECTION"
        title="Featured Products"
        subtitle="Hand-selected flagship items showcasing peak engineering and design."
        products={featured}
        loading={loading}
        viewAllLink="/products?featured=true"
      />

      {/* 5. Signature 3D Feature Showcase */}
      <Signature3DFeature />

      {/* 6. Editorial Storytelling Section */}
      <EditorialSection />

      {/* 7. Flash Deals Rail */}
      {deals.length > 0 && (
        <ProductRail
          eyebrow="LIMITED TIME SAVINGS"
          title="Flash Deals & Offers"
          subtitle="Exclusive discounts on high-demand studio gear, smart wearables, and leather apparel."
          products={deals}
          loading={loading}
          viewAllLink="/products?deal=true"
        />
      )}

      {/* 8. Trending Now Rail */}
      <ProductRail
        eyebrow="HIGH DEMAND"
        title="Trending Now"
        subtitle="What shop enthusiasts and creators are collecting right now."
        products={trending}
        loading={loading}
        viewAllLink="/products?trending=true"
      />

      {/* 9. Editorial Special Banners */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                whileHover={{ y: -6 }}
                className="relative h-96 rounded-3xl overflow-hidden glass-card shadow-2xl group border border-gray-200/50 dark:border-gray-800"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent p-8 flex flex-col justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan bg-brand-cyan/20 backdrop-blur-md px-3.5 py-1 rounded-full w-fit">
                    {offer.discount}
                  </span>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">{offer.title}</h3>
                    <p className="text-xs text-gray-300 mb-4 line-clamp-2">{offer.description}</p>
                    <Link
                      to="/products"
                      className="btn-primary py-2.5 px-5 text-xs inline-flex items-center gap-2 rounded-xl"
                    >
                      Shop Promo <FiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Best Sellers Rail */}
      <ProductRail
        eyebrow="COMMUNITY FAVORITES"
        title="Best Sellers"
        subtitle="Our most acclaimed items based on verified customer ratings."
        products={bestSellers}
        loading={loading}
        viewAllLink="/products?bestseller=true"
      />

      {/* 11. Editor's Picks Rail */}
      {editorsPicks.length > 0 && (
        <ProductRail
          eyebrow="EXPERT SELECTION"
          title="Editor's Picks"
          subtitle="Curated by our senior creative directors and product architects."
          products={editorsPicks}
          loading={loading}
          viewAllLink="/products?editorsPick=true"
        />
      )}

      {/* 12. Recently Viewed Rail */}
      <RecentlyViewedRail />

      {/* 13. Customer Testimonials */}
      <section className="py-20 bg-gradient-to-br from-brand-blue via-brand-indigo to-brand-violet text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-white/80 bg-white/10 px-4 py-1.5 rounded-full inline-block mb-3 backdrop-blur-md">
              VERIFIED REVIEWS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
              What Collectors Say
            </h2>
            <div className="flex justify-center items-center gap-1 text-amber-300">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="ml-2 font-bold text-sm text-white">4.9/5 Overall Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
