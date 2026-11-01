// Code-native share-card artwork; rasterized to 1200×630 JPEGs in public/images/social-cards.
// Uses the same local font, app icon and unedited screenshots as the website.
export function socialCardHtml({ title, accent, subtitle, screen = '/images/youknow-map-20261015.webp', label = 'YOUR PEOPLE KNOW A PLACE.' }) {
  const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{font-family:Space;src:url('/fonts/space-grotesk-latin.woff2');font-weight:400 700}
  *{box-sizing:border-box;margin:0}body{width:1200px;height:630px;overflow:hidden;background:#3157ff;color:#fff;font-family:Space,sans-serif}
  .brand{display:flex;align-items:center;gap:17px;position:absolute;top:45px;left:55px;font-size:26px;font-weight:700;letter-spacing:-1px}.brand img{width:64px;height:64px;border-radius:15px;box-shadow:4px 4px 0 #142590}
  .label{position:absolute;top:155px;left:55px;font-size:12px;letter-spacing:2px;color:#e5eaff}
  h1{position:absolute;left:55px;top:197px;width:760px;font-size:82px;line-height:1.01;letter-spacing:-5px;font-weight:700}h1 span{color:#dfff4f}
  .sub{position:absolute;top:402px;left:58px;max-width:640px;font-size:23px;line-height:1.5;color:#e5eaff}
  .url{position:absolute;left:58px;bottom:42px;font-size:18px;letter-spacing:.2px}
  .phone{position:absolute;right:68px;top:33px;width:248px;padding:5px;border:2px solid #12121c;border-radius:36px;background:#12121c;box-shadow:12px 15px 0 #172a9050;rotate:7deg}.phone img{display:block;width:100%;height:auto;border-radius:28px}
  .spark{position:absolute;right:14px;top:20px;font-size:110px;line-height:1;color:#ff88c5;rotate:15deg}
  .tag{position:absolute;right:25px;bottom:45px;rotate:-7deg;background:#ff88c5;color:#12121c;border:2px solid #12121c;border-radius:30px;padding:15px 22px;font-size:17px;font-weight:700;box-shadow:4px 4px 0 #12121c}
  </style></head><body><div class="brand"><img src="/icons/youknow-icon-192.png" alt="">YouKnow Map</div>
  <p class="label">${escape(label)}</p><h1>${escape(title)}<br><span>${escape(accent)}</span></h1><p class="sub">${escape(subtitle)}</p><span class="url">ifykyk.app</span>
  <div class="phone"><img src="${escape(screen)}" alt=""></div><span class="spark">✳</span><span class="tag">GOOD TASTE TRAVELS. ↗</span></body></html>`
}
