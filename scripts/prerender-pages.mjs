import fs from 'node:fs/promises'
import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { metadataTags, pageMetadata, pageStructuredData } from '../src/pageMetadata.js'

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')
}

const template = await fs.readFile('dist/index.html', 'utf8')
const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  for (const [key, component] of [['about', 'About'], ['tutorials', 'Tutorials']]) {
    const page = pageMetadata[key]
    const { default: Component } = await server.ssrLoadModule(`/src/pages/${component}.jsx`)
    const markup = renderToString(React.createElement(StaticRouter, {
      location: new URL(page.canonical).pathname,
    }, React.createElement(Component)))
    let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    for (const [tag, attribute, name, valueAttribute, value] of metadataTags(page)) {
      const pattern = new RegExp(`<${tag}\\s+${attribute}="${name}"[^>]*>`)
      if (!pattern.test(html)) throw new Error(`Missing ${name} in HTML template`)
      html = html.replace(pattern, `<${tag} ${attribute}="${name}" ${valueAttribute}="${escapeHtml(value)}" />`)
    }
    const json = JSON.stringify(pageStructuredData(key)).replaceAll('<', '\\u003c')
    html = html
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        `<script id="content-page-structured-data" type="application/ld+json">${json}</script>`)
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    // Flat HTML files preserve Netlify's existing extensionless /about and /tutorials URLs.
    await fs.writeFile(`dist/${key}.html`, html)
    console.log(`[prerender] /${key}: content and metadata`)
  }
} finally {
  await server.close()
}
