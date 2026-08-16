import { FiStar } from 'react-icons/fi'

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={review.avatar}
          alt={review.user}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">{review.user}</h4>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <h5 className="font-semibold mb-2">{review.title}</h5>
      <p className="text-white/80 text-sm line-clamp-3">{review.comment}</p>
    </div>
  )
}

export default ReviewCard
