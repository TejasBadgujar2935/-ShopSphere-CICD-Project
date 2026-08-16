import { useEffect, useRef, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_demo_key')

const StripePayment = ({ amount, onSuccess, onFailure }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePayment = async () => {
    setLoading(true)
    setError(null)

    try {
      const stripe = await stripePromise

      // Create payment intent on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })

      const { clientSecret } = await response.json()

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            // Card details would come from a card element
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2024,
            cvc: '123',
          },
        },
      })

      if (error) {
        onFailure(error)
        setError(error.message)
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent)
      }
    } catch (err) {
      onFailure(err)
      setError('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Pay with Stripe'}
      </button>
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}
    </div>
  )
}

export default StripePayment
