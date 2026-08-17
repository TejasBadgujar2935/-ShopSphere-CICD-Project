import React from 'react'
import { FiAlertTriangle, FiRotateCcw, FiHome } from 'react-icons/fi'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ShopSphere ErrorBoundary caught error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-950 text-white">
          <div className="max-w-md w-full glass-modal p-8 rounded-3xl text-center space-y-6 border border-gray-800 shadow-2xl">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto">
              <FiAlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-2">Something went wrong</h2>
              <p className="text-xs text-gray-400">
                A temporary rendering error occurred. Please refresh or return to home.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 btn-primary py-3 text-xs font-bold flex items-center justify-center gap-2 rounded-xl"
              >
                <FiRotateCcw className="w-4 h-4" /> Reload Page
              </button>
              <a
                href="/"
                className="btn-secondary py-3 px-4 text-xs font-bold flex items-center justify-center rounded-xl"
              >
                <FiHome className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
