# brick-alerts

The legal documents for the **Brick Alerts** RCS messaging program — a
**Terms of Service** and a **Privacy Policy** — published as a small static site
and served under this app's path on the shared GitHub Pages site, so the URLs can
be submitted to Twilio when registering its RCS sender.

> **Brick Alerts is an independent, unofficial service.** It is **not affiliated
> with the LEGO Group**. "LEGO" appears only as the *subject* of alerts (used
> nominatively in message content), never as the brand, sender name, or logo.

## Hosted URLs

Each app in this monorepo is published under its own subpath of the Pages site
(see the root [`README.md`](../../README.md)):

| Document         | URL                                                                        |
| ---------------- | -------------------------------------------------------------------------- |
| Landing page     | `https://ianlundberg.github.io/automated-rcs-alerts/brick-alerts/`         |
| Terms of Service | `https://ianlundberg.github.io/automated-rcs-alerts/brick-alerts/terms/`   |
| Privacy Policy   | `https://ianlundberg.github.io/automated-rcs-alerts/brick-alerts/privacy/` |

> **These URLs are unlisted.** Every page sends a `noindex` directive and no page
> links to the legal documents, so they won't be indexed or found by browsing —
> share the links directly with Twilio. (`noindex` doesn't block direct access,
> so Twilio/Google can still load them for review.) Because the repo is public,
> the URLs are visible in the source; to make them truly unguessable, make the
> repo private (GitHub Pro) and move the docs to a random path.

## Structure

```
apps/brick-alerts/
├── public/                 # Source of the static site (published under /brick-alerts/)
│   ├── index.html          # Landing page (no links/buttons to the legal docs)
│   ├── terms/index.html    # Terms of Service
│   ├── privacy/index.html  # Privacy Policy
│   ├── styles.css          # Shared styling
│   ├── robots.txt
│   └── .nojekyll
├── scripts/
│   ├── build.mjs           # Copies public/ -> dist/ (zero dependencies)
│   └── serve.mjs           # Tiny local preview server (zero dependencies)
└── package.json
```

## Previewing locally

- **No tooling required:** open `public/index.html` directly in your browser.
- **With Node installed:** run `npm run dev` from this folder, then open
  <http://localhost:4321>.

## Building

`npm run build` copies `public/` to `dist/`. The root deploy workflow builds
every app and assembles them into the combined Pages site, each under its own
path.

## ✅ Review before submitting to Twilio

1. **Sender name & logo** — use **"Brick Alerts"** and your **own** logo. Never
   use the LEGO name or logo as the sender identity — that fails Google's brand
   verification and is a trademark risk.
2. **Operator / legal name** — currently "Ian Lundberg" (sole proprietor).
3. **Contact email** — `lettersfromian@gmail.com`.
4. **Governing law** — State of Texas, United States ✅.
5. **Optional mailing address** — the `[optional mailing address]` placeholder
   (highlighted yellow); fill it or remove the line.
6. **Effective date** — June 27, 2026.

> These documents are a strong starting template, not legal advice. Have them
> reviewed by a qualified attorney before relying on them.
