# brick-alerts — Notifly • Bricks

The **Bricks** feed of [Notifly](../../README.md): its landing page plus the
**Terms of Service** and **Privacy Policy** for the feed's RCS sender. Published
under `/brick-alerts/` on the shared GitHub Pages site, so the URLs can be
submitted to Twilio when registering the **Notifly • Bricks** sender.

> **Independent & unofficial.** Not affiliated with the LEGO Group. "LEGO"
> appears only as the *subject* of alerts (nominative, in message content),
> never as the sender name, brand, or logo.

## Theme

This feed uses the shared Notifly design system, with a warm **brick red & amber**
theme appended to the bottom of its `styles.css` — so the feed matches its vertical
while staying consistent with Notifly. Every feed can carry its own theme this way.

## Hosted URLs

| Page | URL |
| ---- | --- |
| Feed landing | `https://ianlundberg.github.io/automated-rcs-alerts/brick-alerts/` |
| Terms of Service | `https://ianlundberg.github.io/automated-rcs-alerts/brick-alerts/terms/` |
| Privacy Policy | `https://ianlundberg.github.io/automated-rcs-alerts/brick-alerts/privacy/` |

> **The legal pages are unlisted:** every page is `noindex` and nothing links to
> the Terms/Privacy — share those URLs directly with Twilio. (`noindex` doesn't
> block direct access, so reviewers can still load them.)

## Structure

```
apps/brick-alerts/
├── public/
│   ├── index.html          # Feed landing (brick theme; no links to legal docs)
│   ├── terms/index.html    # Terms of Service
│   ├── privacy/index.html  # Privacy Policy
│   ├── styles.css          # Notifly base design + brick-feed theme
│   ├── robots.txt
│   └── .nojekyll
├── scripts/                # build.mjs (public -> dist) + serve.mjs (local preview)
└── package.json
```

## ✅ Review before submitting to Twilio

1. **Sender display name & logo** — use **"Notifly • Bricks"** (neutral "Bricks",
   not "LEGO") and your **own** logo. Keep trademarks out of the sender identity;
   reference LEGO® only in message content. Using the LEGO name/logo as the sender
   fails Google's brand verification and is a trademark risk.
2. **Operator / legal name** — "Ian Lundberg" (sole proprietor).
3. **Contact email** — `lettersfromian@gmail.com`.
4. **Governing law** — State of Texas, United States ✅.
5. **Optional mailing address** — the `[optional mailing address]` placeholder
   (highlighted yellow); fill it or remove the line.
6. **Effective date** — June 27, 2026.

> These documents are a strong starting template, not legal advice. Have them
> reviewed by a qualified attorney before relying on them.
