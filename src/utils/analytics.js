/**
 * Production Analytics Abstraction Layer
 * Safe telemetry tracking for user interactions, product discovery, and funnel events.
 */

export const trackEvent = (eventName, payload = {}) => {
  try {
    const eventData = {
      event: eventName,
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      ...payload,
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[ShopSphere Analytics]`, eventData)
    }

    // Window dataLayer integration if present (e.g. Google Tag Manager / Segment)
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(eventData)
    }
  } catch (err) {
    // Silent fail to ensure analytics never interrupt user experience
  }
}

export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  PRODUCT_VIEW: 'product_view',
  PRODUCT_SEARCH: 'product_search',
  FILTER_USED: 'filter_used',
  SORT_USED: 'sort_used',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  WISHLIST_ADD: 'wishlist_add',
  COMPARE_ADD: 'compare_add',
  QUICK_VIEW_OPEN: 'quick_view_open',
  CHECKOUT_START: 'checkout_start',
}
