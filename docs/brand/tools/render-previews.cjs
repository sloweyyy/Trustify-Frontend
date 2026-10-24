// Documentation-only renderer. Use an available Playwright install; adds no app dependency.
// PLAYWRIGHT_MODULE=/absolute/path/to/playwright node docs/brand/tools/render-previews.cjs
const fs = require('fs');
const path = require('path');
const http = require('http');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '..');
(async () => {
  const server = http.createServer((req, res) => {
    const filename = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
    if (filename !== root && !filename.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    const target = filename === root ? path.join(root, 'index.html') : filename;
    try {
      const types = { '.svg': 'image/svg+xml', '.html': 'text/html; charset=utf-8', '.ttf': 'font/ttf' };
      res.setHeader('Content-Type', types[path.extname(target)] || 'application/octet-stream');
      res.end(fs.readFileSync(target));
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}/`;
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(root, 'previews/brand-board.png'), fullPage: true });
    for (const name of ['sign-in', 'profile-card', 'certificate-card', 'email-header', 'social-share', 'type-specimen']) {
      await page.goto(base + 'applications/' + name + '.svg');
      await page.evaluate(() => document.fonts.ready);
      await page.locator('svg').screenshot({ path: path.join(root, 'previews/' + name + '.png') });
      const overflow = await page.locator('text').evaluateAll(nodes => nodes.filter(node => {
        const bb = node.getBBox(); const vb = node.ownerSVGElement.viewBox.baseVal;
        return bb.x < 0 || bb.y < 0 || bb.x + bb.width > vb.width || bb.y + bb.height > vb.height;
      }).map(node => node.textContent));
      if (overflow.length) throw new Error(name + ': text overflow: ' + overflow.join(', '));
    }
    for (const c of 'abc') {
      await page.goto(base);
      await page.locator('.card').nth('abc'.indexOf(c)).screenshot({ path: path.join(root, `previews/logo-${c}.png`) });
    }
    for (const file of fs.readdirSync(path.join(root, 'logos')).filter(file => file.endsWith('.svg'))) {
      await page.goto(base + 'logos/' + file);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('svg').screenshot({ path: path.join(root, 'previews/' + file.replace('.svg', '.png')) });
    }
    const checks = [];
    for (const c of 'abc') for (const v of ['color', 'mono', 'inverse']) {
      checks.push(`<div><p>${c.toUpperCase()} · ${v}</p><img width="16" height="16" src="${base}logos/${c}-favicon-${v}.svg"> <img width="32" height="32" src="${base}logos/${c}-favicon-${v}.svg"></div>`);
    }
    await page.goto(base);
    await page.setContent('<html lang="vi"><style>body{font:16px Arial;background:#FAF8F5;padding:24px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px}img{margin-right:24px}p{color:#24262B}</style>' + checks.join(''));
    await page.screenshot({ path: path.join(root, 'previews/favicon-size-checks.png') });
    await page.goto(base);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(root, 'previews/brand-board-mobile.png'), fullPage: true });
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    if (width > 390) throw new Error('Review board overflows at mobile width: ' + width);
    console.log('All vectors rendered; no SVG text clipping; board fits 390px.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
