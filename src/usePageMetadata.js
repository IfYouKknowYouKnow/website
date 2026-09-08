import { useEffect } from 'react'
import { homeMetadata, metadataTags, pageMetadata, pageStructuredData } from './pageMetadata'

function applyMetadata(page) {
  document.title = page.title
  for (const [tag, key, name, attribute, value] of metadataTags(page)) {
    let element = document.head.querySelector(`${tag}[${key}="${name}"]`)
    if (!element) {
      element = document.createElement(tag)
      element.setAttribute(key, name)
      document.head.appendChild(element)
    }
    element.setAttribute(attribute, value)
  }
}

export function usePageMetadata(key) {
  useEffect(() => {
    applyMetadata(pageMetadata[key])
    document.getElementById('content-page-structured-data')?.remove()
    const structuredData = document.createElement('script')
    structuredData.id = 'content-page-structured-data'
    structuredData.type = 'application/ld+json'
    structuredData.textContent = JSON.stringify(pageStructuredData(key))
    document.head.appendChild(structuredData)
    return () => {
      structuredData.remove()
      applyMetadata(homeMetadata)
    }
  }, [key])
}
