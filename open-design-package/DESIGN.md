# Becoming Breath — Design System

A design system for **Becoming Breath** (@BecBreath), the trauma-aware breathwork
practice of Bec, based in Thailand. Extracted from her existing Instagram carousel
so any new surface reads as the same brand.

**Feeling in three words:** grounded · embodied · safe.
Earthy and somatic — never pastel-soft, never clinical, never "wellness-startup."

---

## Color

Warm, earthen, sun-faded. A plaster wall in a tropical room.

| Token            | Hex       | Use                                                        |
|------------------|-----------|------------------------------------------------------------|
| `--plaster`      | `#E8E2D6` | Primary background. Pair with a subtle stucco/paper texture |
| `--plaster-deep` | `#D8CFBE` | Secondary background bands, cards on plaster                |
| `--terracotta`   | `#9E4738` | Brick-red panels holding light text; primary accent        |
| `--cocoa`        | `#4A3826` | Deep brown panels, side strips, footer; darkest surface     |
| `--clay`         | `#8A6F52` | Mid mocha panels, muted text on light, dividers             |
| `--cream`        | `#F3E6C8` | The script wordmark; highlights on dark panels              |
| `--ink`          | `#2E2218` | Body text on light backgrounds                              |
| `--ink-soft`     | `#5C4C3A` | Secondary body text on light                                |
| `--on-dark`      | `#F2EBDD` | Body text on terracotta / cocoa / clay panels               |

**Rules**
- 60 / 30 / 10: plaster background dominates, brown/terracotta panels secondary,
  cream + pure terracotta as the 10% accent.
- Never pure black or pure white. Never a cool gray. Never a blue or purple.
- One accent at a time — terracotta. Do not introduce a second bright color.

## Texture

Texture is part of the brand, not decoration.
- Backgrounds carry a faint **stucco / plaster wall** grain (low-contrast noise,
  opacity ≤ 0.5, blended `multiply`).
- The signature device is a **torn-paper edge**: a ragged white deckle strip used
  to separate or frame a block of text — as if a note were torn and laid down.
  Use it sparingly, on 1–2 key moments per page, never on every section.

## Typography

Three voices, clear hierarchy.

- **Wordmark / display script** — a flowing handwritten signature for the
  "Becoming Breath" mark only. Web stand-ins: *Dancing Script*, *Sacramento*,
  or *Pinyon Script*. Cream colored. Never use it for body or headings.
- **Headings** — a confident sans, set **UPPERCASE with wide tracking**
  (`letter-spacing: 0.08–0.14em`), heavy weight. Web stand-ins: *Poppins*,
  *Montserrat*, or *Archivo* SemiBold/Bold. e.g. "WHAT TO EXPECT".
- **Body** — a calm, readable sans or humanist serif. Web stand-ins: *Inter*,
  or for a warmer editorial feel *Source Serif 4*. Line-height 1.6, generous.

Scale (desktop): display script ~64px · H1 ~44px · H2 ~26px · body ~18px ·
caption ~14px. All headings tracked out; body at normal tracking.

## Layout

- **Asymmetric color-blocking.** Sections alternate: plaster, then a terracotta
  or cocoa panel, then plaster again. Vertical brown side-strips bleed off one
  edge (a recurring carousel motif).
- Hard-edged **rectangular photo crops** — no soft circles, no heavy rounding.
  Corner radius 0–6px max.
- Generous margins; let the plaster breathe. Content column ~720–960px on a
  full-bleed colored band.
- Single long-scroll page. Spacing scale: 8 / 16 / 24 / 40 / 64 / 96px.

## Components

- **Color-block section** — full-bleed terracotta/cocoa band, light text,
  often with a photo crop bleeding to one side.
- **Torn-paper callout** — short, emotional copy on a torn white strip over a
  colored panel. For pull-quotes and the "this is for you if…" moment.
- **Pricing table** — plain, honest, on plaster. Thin clay rules, no shadows,
  no gradient fills. Three rows.
- **CTA button** — solid terracotta, cream text, uppercase tracked, near-square
  corners. Hover: deepens to a darker brick. This is a WhatsApp link.
- **Photo card** — rectangular crop with a thin cocoa frame or a small offset
  color block behind it (asymmetric, à la the carousel).

## Motion

Quiet and slow. Nothing bouncy.
- Gentle fade-and-rise on scroll (16–24px travel, 600ms, ease-out).
- Hover states are subtle color deepening, no scaling pops.
- No parallax circus, no auto-playing carousels.

## Voice

Warm, direct, unhurried. Second person. The PDF copy is the tone reference:
- "Welcome beautiful soul." · "No pushing, no performing, no pressure."
- "Safety isn't something I add to the work. It is the work."
- Signs off "With love, Bec x".
Trauma-informed: never promise outcomes, never use urgency or scarcity tactics,
never hype. Invite, don't sell.

## Anti-patterns (do not do)

- Purple/blue gradients, glassmorphism, neon, dark "tech" UI.
- Emoji as icons. Stock "woman meditating on a cliff" photography.
- Pure white cards with a colored left border.
- Soft circular avatars, heavy drop shadows, rounded everything.
- Countdown timers, "limited spots," any pressure mechanic.
