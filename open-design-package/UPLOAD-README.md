# How to use this package in Open Design

Everything in this folder is ready to hand to Open Design.

## 0. Start the daemon first
Open Design's agent can't run until the local daemon is up:
- Desktop app: just open it, or
- CLI: `pnpm tools-dev` in the open-design repo (needs Node ~24, pnpm 10.33.x)

Once it's running, my Open Design MCP connection will see your projects too.

## 1. Create the project
New project → skill: **web prototype / landing page**.

## 2. Install the design system
`DESIGN.md` is the **Becoming Breath** brand, extracted from Bec's carousel.
Drop it into the open-design `design-systems/` folder (one folder per system),
restart the daemon, then pick "Becoming Breath" from the design-system dropdown.
This is what keeps every render in-brand instead of generic.

## 3. Upload these files into the project workspace
- `content-source.md` — all page copy, verbatim from the PDF
- `breathing-with-bec-source.pdf` — the original, as backup
- `reference-carousel/` — the 6 Instagram slides (style reference only)
- Bec's photos — drop them in the project's `images/` folder

## 4. Paste the brief
Copy the contents of `BRIEF.md` into the brief box and send. Fill the discovery
form to match: surface = landing page, audience = general, tone = warm/grounded,
brand = "use the uploaded Becoming Breath design system."

## 5. What's still needed from Bec
- **WhatsApp number** — the page uses a `wa.me/PLACEHOLDER` link until you give it.
- **Photos** — see `../images/DROP_PHOTOS_HERE.md` for the five planned slots.

## Files in this package
| File                          | Purpose                                  |
|-------------------------------|------------------------------------------|
| `DESIGN.md`                   | Becoming Breath design system            |
| `BRIEF.md`                    | The design brief to paste in             |
| `content-source.md`           | Verbatim page copy from the PDF          |
| `breathing-with-bec-source.pdf` | Original source document               |
| `reference-carousel/`         | 6 Instagram slides — visual style ref    |
