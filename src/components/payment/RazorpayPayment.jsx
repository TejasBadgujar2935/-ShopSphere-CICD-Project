import { useEffect, useRef } from 'react'

const RazorpayPayment = ({ amount, onSuccess, onFailure, orderId, customerInfo }) => {
  const razorpayRef = useRef(null)

  useEffect(() => {
    // Load Razorpay SDK
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert('Razorpay SDK not loaded')
      return
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_demo_key',
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      name: 'ShopSphere',
      description: 'Payment for order',
      order_id: orderId,
      handler: function (response) {
        onSuccess(response)
      },
      prefill: {
        name: customerInfo?.name || '',
        email: customerInfo?.email || '',
        contact: customerInfo?.phone || '',
      },
      theme: {
        color: '#0ea5e9',
      },
      modal: {
        ondismiss: function () {
          onFailure({ reason: 'Payment modal dismissed' })
        },
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return (
    <button onClick={handlePayment} className="btn-primary w-full">
      Pay with Razorpay
    </button>
  )
}

export default RazorpayPayment
