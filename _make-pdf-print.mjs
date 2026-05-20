// Regular wide-format PDF.
// Renders becbreath-print.html at 1280px wide as a SINGLE tall page.
// All scroll-reveal elements are forced into their final state, the
// floating CTA is hidden, and tall viewport-sized sections (hero, quote,
// fill photos) are pinned to fixed pixel heights so they don't bloat
// against the giant PDF document height.
// The WhatsApp button can't be "cut by a page break" in this format
// because the entire document is one page — there are no breaks.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const htmlPath = path.resolve('becbreath-print.html');
const outPath = path.resolve('Becoming Breath — Landing Page.pdf');
const WIDTH = 1280;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: WIDTH, height: 900 }, deviceScaleFactor: 2 });

await page.emulateMedia({ reducedMotion: 'reduce' });
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
  .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
  .float-cta { display: none !important; }
  /* viewport units resolve against the giant PDF document — pin tall
     sections to sensible pixel heights so they don't bloat */
  .hero { min-height: 820px !important; }
  .quote { min-height: 640px !important; }
  .split-media--fill.media-tall { min-height: 660px !important; }
  .split-media--fill.media-short { min-height: 440px !important; }
` });
await page.evaluate(() => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
});
await page.waitForTimeout(400);

const height = await page.evaluate(() =>
  Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
);

await page.pdf({
  path: outPath,
  width: `${WIDTH}px`,
  height: `${height}px`,
  printBackground: true,
  pageRanges: '1',
});

await browser.close();
const mb = (fs.statSync(outPath).size / 1048576).toFixed(1);
console.log(`PDF written: ${outPath} (${WIDTH}×${height}px, single page, ${mb} MB)`);
