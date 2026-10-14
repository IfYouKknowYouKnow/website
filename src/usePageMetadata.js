import { useEffect } from 'react'
import { metadataTags, pageContentPaths, pageMetadata, pageStructuredData, SITE_URL } from './pageMetadata'

export function useDocumentMetadata(page, schema) {
  const serializedSchema = JSON.stringify(schema)
  useEffect(() => {
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
    const paths = pageContentPaths(new URL(page.canonical).pathname)
    for (const [type, href] of [['text/markdown', paths.markdown], ['application/json', paths.json]]) {
      let link = document.head.querySelector(`link[rel="alternate"][type="${type}"]`)
      if (!link) {
        link = document.createElement('link')
        link.rel = 'alternate'
        link.type = type
        document.head.appendChild(link)
      }
      link.href = `${SITE_URL}${href}`
    }
    document.getElementById('page-structured-data')?.remove()
    const element = document.createElement('script')
    element.id = 'page-structured-data'
    element.type = 'application/ld+json'
    element.textContent = serializedSchema
    document.head.appendChild(element)
    return () => element.remove()
  }, [page.title, page.description, page.canonical, page.image, page.card, serializedSchema])
}

export function usePageMetadata(key, options) {
  useDocumentMetadata(pageMetadata[key], pageStructuredData(key, options))
}
