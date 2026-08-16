import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  filteredProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
  filters: {
    category: 'all',
    priceRange: [0, 10000],
    rating: 0,
    searchQuery: '',
  },
  sortBy: 'default',
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
      state.filteredProducts = action.payload
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    applyFilters: (state) => {
      let filtered = [...state.products]

      // Filter by category
      if (state.filters.category !== 'all') {
        filtered = filtered.filter(
          (product) => product.category === state.filters.category
        )
      }

      // Filter by price range
      filtered = filtered.filter(
        (product) =>
          product.price >= state.filters.priceRange[0] &&
          product.price <= state.filters.priceRange[1]
      )

      // Filter by rating
      if (state.filters.rating > 0) {
        filtered = filtered.filter(
          (product) => product.rating >= state.filters.rating
        )
      }

      // Filter by search query
      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase()
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        )
      }

      // Sort products
      switch (state.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        default:
          break
      }

      state.filteredProducts = filtered
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
      state.sortBy = 'default'
      state.filteredProducts = state.products
    },
  },
})

export const {
  setProducts,
  setCurrentProduct,
  setLoading,
  setError,
  setFilters,
  setSortBy,
  applyFilters,
  resetFilters,
} = productsSlice.actions

export default productsSlice.reducer
