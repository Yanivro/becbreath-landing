import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// usage: node _make-pdf-a4.mjs [source-a4.html] [output.pdf]
const SRC_HTML = process.argv[2] || 'becbreath-print-a4.html';
const OUT_PDF = process.argv[3] || 'Becoming Breath — Landing Page (A4).pdf';
const BUILD = '_a4build';
const MAX_EDGE = 2000; // plenty for 300dpi on an A4-width photo, keeps the file light

// 1. fresh build dir with downscaled image copies (originals untouched)
fs.rmSync(BUILD, { recursive: true, force: true });
fs.mkdirSync(path.join(BUILD, 'images'), { recursive: true });

const html = fs.readFileSync(SRC_HTML, 'utf8');
const imgPaths = [...html.matchAll(/src="([^"]+\.jpe?g)"/gi)].map(m => m[1]);
for (const rel of [...new Set(imgPaths)]) {
  const src = path.resolve(rel);
  const dest = path.join(BUILD, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(src)) { console.warn(`! missing image: ${rel}`); continue; }
  execFileSync('sips', ['-Z', String(MAX_EDGE), src, '--out', dest], { stdio: 'ignore' });
}
fs.writeFileSync(path.join(BUILD, SRC_HTML), html);

// 2. render the build copy to A4
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(path.resolve(BUILD, SRC_HTML)).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(async () => {
  const imgs = [...document.querySelectorAll('img')];
  imgs.forEach(img => { img.removeAttribute('loading'); const s = img.src; img.src = ''; img.src = s; });
  await Promise.all(imgs.map(img =>
    img.complete && img.naturalWidth > 0
      ? Promise.resolve()
      : new Promise(res => { img.onload = img.onerror = res; })
  ));
});
await page.waitForTimeout(300);
await page.pdf({ path: OUT_PDF, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();

// 3. clean up
fs.rmSync(BUILD, { recursive: true, force: true });
const mb = (fs.statSync(OUT_PDF).size / 1048576).toFixed(1);
console.log(`A4 PDF written: ${OUT_PDF} (${mb} MB)`);
