import React from 'react'
import { motion } from 'framer-motion'
import { FiZap, FiAward, FiUsers, FiGlobe, FiShield, FiHeart } from 'react-icons/fi'

const About = () => {
  const stats = [
    { label: 'Products Catalog', value: '10,000+', icon: FiZap },
    { label: 'Global Customers', value: '50,000+', icon: FiUsers },
    { label: 'Satisfaction Rate', value: '99.4%', icon: FiAward },
    { label: 'Live Support', value: '24/7', icon: FiGlobe },
  ]

  const values = [
    {
      title: '3D Spatial Innovation',
      desc: 'We bring products to life through immersive real-time 3D rendering so you can inspect every titanium bevel and stitch before ordering.',
      icon: FiZap,
    },
    {
      title: 'Uncompromised Quality',
      desc: 'Every item in the ShopSphere catalog passes rigorous multi-stage quality assurance tests before entering our global fulfillment network.',
      icon: FiShield,
    },
    {
      title: 'Customer-Centric Focus',
      desc: 'From 30-day hassle-free returns to instant priority chat support, our promise is complete peace of mind with every order.',
      icon: FiHeart,
    },
  ]

  return (
    <div className="pt-28 pb-24">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-4 py-1.5 rounded-full inline-block mb-4"
        >
          OUR STORY & MISSION
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-4"
        >
          More than a store.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto"
        >
          ShopSphere was founded on a singular vision: to revolutionize online commerce into a spatial, interactive, high-fidelity experience.
        </motion.p>
      </section>

      {/* Animated Stats Banner */}
      <section className="bg-brand-blue/5 border-y border-gray-200/80 dark:border-gray-800 py-12 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-brand-blue/15 text-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">{stat.value}</h3>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & Image Composition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">PHILOSOPHY</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
              Crafting the Next Generation of Commerce.
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              We believe shopping online should feel tangible, inspiring, and seamless. By combining Three.js 3D viewport technology with curated luxury suppliers, ShopSphere delivers products designed for performance and style.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Whether you are discovering active noise cancelling audio gear, titanium smartwatches, or Italian lambskin leather, every item is backed by our full authenticity pledge.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
              alt="Story 1"
              className="rounded-3xl shadow-xl object-cover h-64 w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
              alt="Story 2"
              className="rounded-3xl shadow-xl object-cover h-64 w-full mt-6"
            />
          </div>
        </div>
      </section>

      {/* Core Values Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">Our Core Pillars</h2>
          <p className="text-gray-500 text-xs mt-1">Built on transparency, engineering, and trust.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="glass-card p-8 rounded-3xl border border-gray-200/80 dark:border-gray-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <val.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{val.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
