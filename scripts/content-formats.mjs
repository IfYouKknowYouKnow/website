import { parse } from 'parse5'
import { SITE_URL, pageContentPaths } from '../src/pageMetadata.js'

export function escapeHtml(value = '') {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')
}

export function findAll(node, predicate) {
  return [ ...(predicate(node) ? [node] : []), ...(node.childNodes || []).flatMap((child) => findAll(child, predicate)) ]
}
export function attr(node, name) {
  return node.attrs?.find((item) => item.name === name)?.value
}
export function textContent(node) {
  return node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textContent).join('')
}

const excluded = new Set(['script', 'style', 'noscript', 'svg', 'nav', 'footer', 'form', 'input', 'textarea', 'select', 'iframe', 'video'])
const blocks = new Set(['p', 'div', 'section', 'article', 'main', 'header', 'aside', 'details', 'ul', 'ol', 'figure', 'table', 'tr'])
const escapeMarkdown = (value) => value.replace(/([\\`*_\[\]])/g, '\\$1')

export function htmlToMarkdown(html, canonical) {
  const tree = parse(html)
  const root = findAll(tree, (node) => attr(node, 'id') === 'root')[0]
    || findAll(tree, (node) => node.tagName === 'body')[0]
  function visit(node) {
    if (node.nodeName === '#text') return escapeMarkdown(node.value.replace(/\s+/g, ' '))
    if (excluded.has(node.tagName) || (node.tagName === 'button' && !/^h[1-6]$/.test(node.parentNode?.tagName))
      || (attr(node, 'hidden') !== undefined && !attr(node, 'id')?.startsWith('feature-panel-'))
      || attr(node, 'aria-hidden') === 'true' || /display\s*:\s*none/i.test(attr(node, 'style') || '')) return ''
    if (node.tagName === 'img') return attr(node, 'alt') ? ` ${escapeMarkdown(attr(node, 'alt'))} ` : ''
    if (node.tagName === 'br') return '\n'
    const content = (node.childNodes || []).map(visit).join('')
    const compact = content.trim()
    if (/^h[1-6]$/.test(node.tagName)) return `\n\n${'#'.repeat(Number(node.tagName[1]))} ${compact}\n\n`
    if (node.tagName === 'summary') return `\n\n### ${compact}\n\n`
    if (node.tagName === 'li') return `\n- ${compact}\n`
    if (node.tagName === 'a') {
      const href = attr(node, 'href')
      if (!href || !compact) return content
      const url = new URL(href, canonical)
      const label = compact.replace(/\s+/g, ' ').replace(/(^| )#{1,6} /g, ' ')
      const link = ['https:', 'http:', 'mailto:'].includes(url.protocol)
        ? `[${label}](${url.href.replaceAll('(', '%28').replaceAll(')', '%29')})` : label
      return /\n/.test(compact) ? `\n\n${link}\n\n` : `${link} `
    }
    if (['span', 'strong', 'b'].includes(node.tagName)) return `${content} `
    return blocks.has(node.tagName) ? `\n\n${compact}\n\n` : content
  }
  return visit(root).replace(/ +/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim() + '\n'
}

export function machinePaths(route) {
  return pageContentPaths(route)
}

export function formatLinks(route) {
  const paths = machinePaths(route)
  return `<link rel="describedby" href="${SITE_URL}/llms.txt" />\n<link rel="alternate" type="text/markdown" href="${SITE_URL}${paths.markdown}" title="Markdown" />\n<link rel="alternate" type="application/json" href="${SITE_URL}${paths.json}" title="Public page content" />`
}
