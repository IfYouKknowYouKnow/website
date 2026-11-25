// Lists every interface string the site can show (the first argument of tr() and msg())
// and reports, per language, which are missing from or no longer used by
// src/locales/ui.<lang>.js. Run with: npm run i18n:check
// Pass --write <file> to save the English strings grouped by source file.
import fs from 'node:fs'
import path from 'node:path'
import { parse } from '@babel/parser'
import traverseModule from '@babel/traverse'

const traverse = traverseModule.default || traverseModule
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
  entry.isDirectory() ? (entry.name === 'locales' ? [] : walk(path.join(dir, entry.name))) : [path.join(dir, entry.name)])

const byFile = {}
for (const file of walk('src').filter((name) => /\.jsx?$/.test(name)).sort()) {
  const ast = parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['jsx'] })
  traverse(ast, {
    CallExpression({ node }) {
      // tr('…'), msg('…') and i18n.tr('…')
      const name = node.callee.type === 'MemberExpression' ? node.callee.property.name : node.callee.name
      if (!['tr', 'msg'].includes(name)) return
      const [argument] = node.arguments
      const value = argument?.type === 'StringLiteral' ? argument.value
        : argument?.type === 'TemplateLiteral' && !argument.expressions.length ? argument.quasis[0].value.cooked : null
      if (value !== null) (byFile[file] ||= new Set()).add(value)
    },
  })
}
const keys = new Set(Object.values(byFile).flatMap((set) => [...set]))
const write = process.argv.indexOf('--write')
if (write > 0) fs.writeFileSync(process.argv[write + 1], JSON.stringify(Object.fromEntries(Object.entries(byFile).map(([file, set]) => [file, [...set]])), null, 2) + '\n')

let problems = 0
for (const locale of ['de', 'fr', 'it']) {
  const { default: ui } = await import(`../src/locales/ui.${locale}.js`)
  const missing = [...keys].filter((key) => !(key in ui))
  const unused = Object.keys(ui).filter((key) => !keys.has(key))
  // A translation must keep the same {placeholders} as its source string.
  const placeholders = (text) => [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort().join(',')
  const broken = [...keys].filter((key) => key in ui && placeholders(key) !== placeholders(ui[key]))
  console.log(`[i18n] ${locale}: ${keys.size - missing.length}/${keys.size} translated, ${unused.length} unused, ${broken.length} with wrong placeholders`)
  for (const key of missing) console.log(`   missing: ${key}`)
  for (const key of unused) console.log(`   unused:  ${key}`)
  for (const key of broken) console.log(`   placeholders differ: ${key}`)
  problems += missing.length + broken.length
}
process.exitCode = problems ? 1 : 0
