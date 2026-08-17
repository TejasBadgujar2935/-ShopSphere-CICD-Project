import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState('idle') // idle, submitting, success

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setStatus('submitting')
      setTimeout(() => {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 1200)
    }
  }

  return (
    <div className="pt-28 pb-24">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-4 py-1.5 rounded-full inline-block mb-4"
        >
          24/7 SUPPORT & INQUIRIES
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-4"
        >
          Let's talk.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto"
        >
          Have a question about a 3D product, order tracking, or corporate partnership? We are here to help.
        </motion.p>
      </section>

      {/* Main Form & Location Info Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 rounded-3xl border border-gray-200/80 dark:border-gray-800 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">
                Direct Channels
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
                  <FiMail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">Email Support</h4>
                  <p className="text-xs text-gray-500">support@shopsphere.com</p>
                  <p className="text-xs text-gray-500">vip@shopsphere.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
                  <FiPhone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">Customer Hotline</h4>
                  <p className="text-xs text-gray-500">+1 (800) 555-SPHERE</p>
                  <p className="text-xs text-gray-400 mt-0.5">Toll-free 24/7 International</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">Global Headquarters</h4>
                  <p className="text-xs text-gray-500">ShopSphere Tower, 700 Tech Plaza</p>
                  <p className="text-xs text-gray-500">San Francisco, CA 94107</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-2">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
                  <FiClock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">Operating Hours</h4>
                  <p className="text-xs text-gray-500">Mon - Fri: 8:00 AM - 10:00 PM EST</p>
                  <p className="text-xs text-gray-500">Sat - Sun: 9:00 AM - 6:00 PM EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 md:p-10 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-8">
                Our client relations team responds to all inquiries within 2 hours.
              </p>

              {status === 'success' ? (
                <div className="py-12 text-center bg-emerald-500/10 rounded-2xl border border-emerald-500/20 p-8">
                  <FiCheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-emerald-500 mb-1">Message Sent Successfully!</h4>
                  <p className="text-xs text-gray-400 mb-6">Thank you for reaching out. A client specialist has received your message.</p>
                  <button onClick={() => setStatus('idle')} className="btn-primary text-xs px-6 py-2.5 rounded-xl">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="input-field text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="input-field text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Product inquiry / Order support"
                      className="input-field text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us how we can assist you..."
                      className="input-field text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2 rounded-2xl shadow-xl"
                  >
                    {status === 'submitting' ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FiSend className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
