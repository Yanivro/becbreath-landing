# Becoming Breath — Landing Page

One-page site and printable handout for **Bec's** 1:1 rebirthing breathwork practice in Thailand.

## What's here

| File | Purpose |
|---|---|
| `index.html` | Live single-page site. Photo-forward responsive layout. Photos full-bleed in split sections; torn-paper accents on the colored bands. |
| `becbreath-print.html` | Source for the wide-format PDF handout. |
| `becbreath-print-a4.html` | Source for the A4 portrait print handout. |
| `becbreath-framed.html` | Earlier "boxed/framed" design direction, kept as a reference variant. |
| `Becoming Breath — Landing Page.pdf` | Final wide-format PDF (single page, 1280px wide). |
| `Becoming Breath — Landing Page (A4).pdf` | Final A4 print PDF, properly paginated. |
| `_make-pdf-print.mjs` | Generator for the wide-format PDF. Run with `node _make-pdf-print.mjs`. |
| `_make-pdf-a4.mjs` | Generator for the A4 PDF. Run with `node _make-pdf-a4.mjs`. |
| `images/` | Photography library. |
| `open-design-package/` | Source brief, design system spec, reference carousel slides, and the original PDF Bec shared. |

## Brand notes

- **Palette:** plaster `#E7E0D1` background, terracotta `#A24A3B`, cocoa `#473A2A`, taupe `#9C8268`, cream `#F1E6CB`, deep bronze for the script wordmark.
- **Type:** Parisienne (script wordmark), Jost 300–600 (body + uppercase tracked headings).
- **Devices:** torn-paper edges on colored bands, full-bleed photo splits, offset cocoa/taupe blocks on framed photos in the alternate version.

## Regenerating the PDFs

```bash
npm install playwright
node _make-pdf-print.mjs   # → Becoming Breath — Landing Page.pdf
node _make-pdf-a4.mjs      # → Becoming Breath — Landing Page (A4).pdf
```

The A4 script also downscales photos via `sips` to keep the file under ~7 MB.

## WhatsApp

The print PDFs include Bec's number (`+61 421 664 027`) on both CTAs. The live `index.html` still uses `WA_NUMBER = "PLACEHOLDER"` — swap that in `index.html` when ready to ship the site.
