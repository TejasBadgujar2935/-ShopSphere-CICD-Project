import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

const EditorialSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-2xl bg-gradient-to-r from-gray-950 via-gray-900 to-brand-darkBg text-white p-8 md:p-16 relative">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan bg-brand-cyan/15 px-4 py-1.5 rounded-full inline-block">
                EDITORIAL COMMERCE
              </span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                Built for the <br />
                <span className="gradient-text">Everyday.</span>
              </h2>
              <p className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed">
                Experience the harmony of precision acoustic engineering, Italian leather craftsmanship, and titanium wearables. Every ShopSphere item is built to elevate your daily routine.
              </p>

              <div className="space-y-3 pt-2 text-sm text-gray-300 font-semibold">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-blue/20 text-brand-cyan flex items-center justify-center">
                    <FiCheck className="w-4 h-4" />
                  </div>
                  <span>Verified Grade-5 Titanium & Nappa Leather Materials</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-blue/20 text-brand-cyan flex items-center justify-center">
                    <FiCheck className="w-4 h-4" />
                  </div>
                  <span>30-Day Money Back Guarantee & 2-Year Global Warranty</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/products"
                  className="btn-primary py-4 px-8 text-sm font-bold inline-flex items-center gap-2 rounded-2xl shadow-2xl"
                >
                  Explore Editorial Drop <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                  alt="Editorial Highlight"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-bold uppercase text-brand-cyan">FLAGSHIP HIGHLIGHT</span>
                  <h4 className="text-lg font-bold text-white">SpherePulse ANC Headphones</h4>
                  <p className="text-xs text-gray-300">$299.99 • Titanium Acoustic Drivers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EditorialSection
