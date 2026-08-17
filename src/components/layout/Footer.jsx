import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiZap, FiSend, FiInstagram, FiTwitter, FiFacebook, FiGithub, FiCheckCircle } from 'react-icons/fi'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800/80 relative overflow-hidden pt-16 pb-12">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter Card */}
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 mb-16 bg-gradient-to-r from-gray-900 via-gray-900/90 to-brand-darkBg flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan bg-brand-cyan/15 px-3.5 py-1 rounded-full mb-3 inline-block">
              STAY INSPIRED
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Get the latest from ShopSphere.
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              Subscribe to receive private 3D drops, exclusive VIP deals, and product updates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-6 py-3.5 rounded-2xl text-sm font-semibold">
                <FiCheckCircle className="w-5 h-5" /> Subscribed successfully!
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="px-5 py-3.5 bg-gray-800/80 text-white rounded-2xl border border-gray-700 focus:outline-none focus:border-brand-blue text-sm w-full sm:w-80"
                />
                <button
                  type="submit"
                  className="btn-primary py-3.5 px-6 text-sm font-bold flex items-center justify-center gap-2 rounded-2xl shadow-lg"
                >
                  <span>Subscribe</span>
                  <FiSend className="w-4 h-4" />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-gray-800/80">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-violet flex items-center justify-center text-white shadow-md">
                <FiZap className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight">
                Shop<span className="gradient-text">Sphere</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              The premier 3D interactive e-commerce platform presenting fashion-forward apparel, flagship electronics, and luxury accessories.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 rounded-xl bg-gray-900 hover:bg-brand-blue text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <FiTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-gray-900 hover:bg-brand-blue text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <FiInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-gray-900 hover:bg-brand-blue text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <FiFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-gray-900 hover:bg-brand-blue text-gray-400 hover:text-white transition-colors" aria-label="Github">
                <FiGithub className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">Shop</h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><Link to="/products?category=Electronics" className="hover:text-brand-cyan transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=Fashion" className="hover:text-brand-cyan transition-colors">Fashion</Link></li>
              <li><Link to="/products?category=Footwear" className="hover:text-brand-cyan transition-colors">Footwear</Link></li>
              <li><Link to="/products?category=Smart%20Home" className="hover:text-brand-cyan transition-colors">Smart Home</Link></li>
              <li><Link to="/products?category=Luxury%20Watches" className="hover:text-brand-cyan transition-colors">Luxury Watches</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><Link to="/about" className="hover:text-brand-cyan transition-colors">About Us</Link></li>
              <li><Link to="/about" className="hover:text-brand-cyan transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-brand-cyan transition-colors">Contact Support</Link></li>
              <li><Link to="/products" className="hover:text-brand-cyan transition-colors">Collections</Link></li>
            </ul>
          </div>

          {/* Support & Legal Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">Support</h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><Link to="/track" className="hover:text-brand-cyan transition-colors">Order Tracking</Link></li>
              <li><Link to="/contact" className="hover:text-brand-cyan transition-colors">Help Center</Link></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} ShopSphere Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
