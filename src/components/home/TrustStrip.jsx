import React from 'react'
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi'

const TrustStrip = () => {
  const items = [
    {
      icon: FiTruck,
      title: 'Free Express Shipping',
      description: 'On all orders over $100 worldwide',
    },
    {
      icon: FiShield,
      title: '100% Secure Checkout',
      description: 'Encrypted Stripe & SSL protection',
    },
    {
      icon: FiRefreshCw,
      title: '30-Day Easy Returns',
      description: 'Hassle-free money back guarantee',
    },
    {
      icon: FiHeadphones,
      title: '24/7 Priority Support',
      description: 'Live assistance whenever you need',
    },
  ]

  return (
    <section className="py-8 border-y border-gray-200/60 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustStrip
