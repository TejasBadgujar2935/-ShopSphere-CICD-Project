import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import AppRouter from './router/AppRouter'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'
import { ThemeProvider } from './context/ThemeContext'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext'
import { ComparisonProvider } from './context/ComparisonContext'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                <ComparisonProvider>
                  <BrowserRouter>
                    <AppRouter />
                  </BrowserRouter>
                </ComparisonProvider>
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
