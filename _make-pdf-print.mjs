// Regular wide-format PDF.
// Renders becbreath-print.html at 1280px wide, PAGINATED into multiple
// pages of a fixed (A4-proportional) height. All scroll-reveal elements
// are forced into their final state, the floating CTA is hidden, and tall
// viewport-sized sections (hero, quote, fill photos) are pinned to fixed
// pixel heights. Whole sections + the WhatsApp button carry break-inside:
// avoid, so Chromium pushes a band to the next page rather than slicing it
// — pages break on section boundaries, never mid-button or mid-text.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const htmlPath = path.resolve('becbreath-print.html');
const outPath = path.resolve('Becoming Breath — Landing Page.pdf');
const WIDTH = 1280;
const PAGE_HEIGHT = 1811; // 1280 × √2 — A4 proportion at this width

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: WIDTH, height: 900 }, deviceScaleFactor: 2 });

// render with SCREEN css (not print) so background-clip:text gradients and
// the dark scrim overlays render exactly as they do in the browser — print
// media strips gradient-on-text and weakens overlays
await page.emulateMedia({ media: 'screen', reducedMotion: 'reduce' });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
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

await page.addStyleTag({ content: `
  *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
  .float-cta { display: none !important; }
  /* viewport units resolve against the giant PDF document — pin tall
     sections to sensible pixel heights so they don't bloat */
  .hero { min-height: 820px !important; }
  .quote { min-height: 640px !important; }
  .split-media--fill.media-tall { min-height: 660px !important; }
  .split-media--fill.media-short { min-height: 440px !important; }
  /* keep each full-width band whole — Chromium pushes it to the next page
     rather than slicing it across a page boundary. .quote + .hero are their
     own top-level sections (not .section), so they MUST be listed explicitly
     or the quote photo gets cut straight through Bec's face. */
  .section, .split, .quote, .hero { break-inside: avoid !important; page-break-inside: avoid !important; }
` });
await page.evaluate(() => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
});
await page.waitForTimeout(400);

const height = await page.evaluate(() =>
  Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
);
const pages = Math.ceil(height / PAGE_HEIGHT);

// Render straight to the output. The photos are pre-downscaled web-resolution
// copies in print-assets/ (~2000px, ~300KB each), so the file is small WITHOUT
// any post-flatten — Ghostscript /ebook was dropping the hero image and
// rasterizing soft text-shadows into hard boxes, so it's gone.
// Fixed page height paginates the canvas into multiple pages; section-level
// break-inside:avoid keeps bands and the WhatsApp button whole.
await page.pdf({
  path: outPath,
  width: `${WIDTH}px`,
  height: `${PAGE_HEIGHT}px`,
  printBackground: true,
});

await browser.close();

const mb = (fs.statSync(outPath).size / 1048576).toFixed(1);
console.log(`PDF written: ${outPath} (${WIDTH}×${PAGE_HEIGHT}px/page, ~${pages} pages, content ${height}px, ${mb} MB)`);
