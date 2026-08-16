import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const OfferBanner = ({ offer }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative rounded-xl overflow-hidden h-64 group cursor-pointer"
    >
      <img
        src={offer.image}
        alt={offer.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="bg-primary-500 text-white text-sm px-3 py-1 rounded-full mb-2 inline-block">
          {offer.discount}
        </span>
        <h3 className="text-xl font-bold text-white mb-1">{offer.title}</h3>
        <p className="text-gray-200 text-sm mb-3">{offer.description}</p>
        <Link
          to="/products"
          className="text-white font-medium hover:underline"
        >
          Shop Now
        </Link>
      </div>
    </motion.div>
  )
}

export default OfferBanner
