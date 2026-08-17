import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SEO = ({ title, description, image, type = 'website' }) => {
  const location = useLocation()

  useEffect(() => {
    const defaultTitle = 'ShopSphere — Premium 3D E-Commerce Platform'
    const pageTitle = title ? `${title} | ShopSphere` : defaultTitle
    document.title = pageTitle

    const metaDescription = description || 'Discover flagship electronics, high-fashion apparel, and luxury lifestyle items in a 3D commerce space.'
    
    // Update Meta Tag helper
    const setMetaTag = (name, content, attributeName = 'name') => {
      let element = document.querySelector(`meta[${attributeName}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attributeName, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    setMetaTag('description', metaDescription)
    setMetaTag('og:title', pageTitle, 'property')
    setMetaTag('og:description', metaDescription, 'property')
    setMetaTag('og:type', type, 'property')
    setMetaTag('og:url', window.location.href, 'property')
    if (image) setMetaTag('og:image', image, 'property')
  }, [title, description, image, type, location.pathname])

  return null
}

export default SEO
