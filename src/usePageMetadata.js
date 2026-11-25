import { useEffect } from 'react'
import { getPageMetadata, metadataTags, pageContentPaths, pageStructuredData, SITE_URL } from './pageMetadata'
import { useI18n } from './i18n'

function upsert(selector, create, apply) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = create()
    document.head.appendChild(element)
  }
  apply(element)
}

// Keeps the document head in step with the page after in-app navigation.
// The exported HTML already contains the same tags for the first load.
export function useDocumentMetadata(page, schema) {
  const serializedSchema = JSON.stringify(schema)
  useEffect(() => {
    document.title = page.title
    document.documentElement.lang = page.locale || 'en'
    for (const [tag, key, name, attribute, value] of metadataTags(page)) {
      upsert(`${tag}[${key}="${name}"]`, () => {
        const element = document.createElement(tag)
        element.setAttribute(key, name)
        return element
      }, (element) => element.setAttribute(attribute, value))
    }
    const paths = pageContentPaths(new URL(page.canonical).pathname)
    for (const [type, href] of [['text/markdown', paths.markdown], ['application/json', paths.json]]) {
      upsert(`link[rel="alternate"][type="${type}"]`, () => {
        const link = document.createElement('link')
        link.rel = 'alternate'
        link.type = type
        return link
      }, (link) => { link.href = `${SITE_URL}${href}` })
    }
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove())
    for (const { hreflang, href } of page.alternates || []) {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = hreflang
      link.href = href
      document.head.appendChild(link)
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
  const i18n = useI18n()
  useDocumentMetadata(getPageMetadata(key, i18n), pageStructuredData(key, i18n, options))
}
