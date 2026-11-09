# becbreath-landing

Website and booking setup for **Bec's** 1:1 rebirthing breathwork practice (Becoming Breath, Thailand).
Live at **https://becbreath.com**, served by GitHub Pages from `main` of `Yanivro/becbreath-landing`
(a public repo). `index.html` is the whole site.

**Everything committed here is publicly served** unless it's listed in `_config.yml` → `exclude`
or starts with `_`/`.`. Never commit keys, client data, or private calendar/email details.

## Hosting and domain
- DNS lives at GoDaddy (use the `godaddy-dns` skill). Apex A records point to GitHub Pages
  (185.199.108–111.153), `www` is a CNAME to `yanivro.github.io`, and the repo's `CNAME` file holds `becbreath.com`.
- Pushing to `main` deploys in about a minute. Check with `gh api repos/Yanivro/becbreath-landing/pages`.

## Booking (Cal.com, username `becbreath`, timezone Asia/Bangkok)
| Session | Event type id | Length | Cal.com link | Short link |
|---|---|---|---|---|
| Discovery Call | 7829731 | 30 min | cal.com/becbreath/discovery-call | becbreath.com/discovery |
| Rebirthing | 7829729 | 90 min | cal.com/becbreath/rebirthing | becbreath.com/rebirthing |
| Resourcing Session | 7829730 | 60 min | cal.com/becbreath/resourcing-session | becbreath.com/resourcing |

Rules Bec asked for (all three types unless noted):
- **Hours:** Mon 12:00–16:00, Tue–Thu 10:00–16:00, Fri 10:00–13:00, no weekends. Schedule id 2616743.
- **Notice:** 15.5 h minimum. Her real rule is "next day only, book by 7pm the night before", which
  Cal.com can't express exactly. 930 min means no same-day bookings, and 10am slots close at 6:30pm the night before.
- **Booking window:** only up to 14 calendar days ahead.
- **Buffers:** 60 min before and after every session. She needs an hour around calendar commitments, discovery calls included.
- **Rebirthing:** max 1 per day (`bookingLimitsCount: {day: 1}`).
- **Location:** Zoom, with no price or payment in Cal.com. Payment is cash or Wise, as the site says.
- **Booking questions:** name and email (required), Phone / WhatsApp number (required), best way to reach you
  (required radio), how did you hear about me (required select), additional notes (optional).
- **Reminders (Workflows):** client email 24 h and 1 h before, and Bec gets an email 24 h before. Her plan only
  allows Cal.com's standard reminder text (`template: "custom"` returns a misleading 403). Warmer drafts
  for when she upgrades are in `docs/reminder-drafts.md`.
- **Website:** only the Discovery Call goes on the website. Bec sends the other links herself. WhatsApp stays as the secondary contact.

## Working with it
- API helper: `scripts/cal.sh GET /event-types` (it picks the right `cal-api-version` per endpoint).
  The key is in `~/.calcom-bec.env`. Use curl, because Cloudflare blocks Python urllib with error 1010.
- Probe POSTs to `/workflows` create real workflows, so delete them afterwards.
- **If a Cal.com username or slug changes**, update `CAL_USER` / `data-cal` in `index.html` **and** the redirect
  pages in `discovery/`, `rebirthing/`, `resourcing/`, then push. Old Cal.com links 404 immediately.
- Screenshots and other checks: Playwright is not in this repo. Install it in a scratch dir and point it at a
  local server on a free port. 8765 is often taken by another project.
