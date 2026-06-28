# claude-lego-alerts

The legal documents for the **Claude Lego Alerts** RCS messaging program —
a **Terms of Service** and a **Privacy Policy** — published as a small static
site and hosted on GitHub Pages so the URLs can be submitted to Twilio when
setting up an RCS account.

## Hosted URLs

Once GitHub Pages is enabled for the repository (see the root
[`README.md`](../../README.md)), the documents are served at:

| Document         | URL                                                              |
| ---------------- | ---------------------------------------------------------------- |
| Landing page     | `https://ianlundberg.github.io/automated-rcs-alerts/`            |
| Terms of Service | `https://ianlundberg.github.io/automated-rcs-alerts/terms/`      |
| Privacy Policy   | `https://ianlundberg.github.io/automated-rcs-alerts/privacy/`    |

> **These URLs are unlisted.** Every page sends a `noindex` directive and the
> landing page does not link to the legal documents, so they won't be indexed by
> search engines or found by browsing the site — share the links directly with
> Twilio. (`noindex` does not block direct access, so Twilio/Google can still
> load them for review.) Because this repository is public, the URLs are still
> visible in the repo source; to make them truly unguessable, make the repo
> private — which requires GitHub Pro — and move the docs to a random path.

## Structure

```
apps/claude-lego-alerts/
├── public/                 # Source of the static site (what gets published)
│   ├── index.html          # Landing page (no links/buttons to the legal docs)
│   ├── terms/index.html    # Terms of Service
│   ├── privacy/index.html  # Privacy Policy
│   ├── styles.css          # Shared styling
│   └── .nojekyll           # Tell GitHub Pages not to run Jekyll
├── scripts/
│   ├── build.mjs           # Copies public/ -> dist/ (zero dependencies)
│   └── serve.mjs           # Tiny local preview server (zero dependencies)
└── package.json
```

## Previewing locally

- **No tooling required:** open `public/index.html` directly in your browser.
  All links are relative, so navigation works from the file system.
- **With Node installed:** run `npm run dev` from this folder (or
  `npm run dev -- --filter=claude-lego-alerts` from the repo root) and open
  <http://localhost:4321>.

## Building

`npm run build` copies `public/` to `dist/`. The GitHub Actions workflow runs
this and publishes `dist/` to GitHub Pages.

## ✅ Review before submitting to Twilio

The documents are drafted with sensible defaults and assumptions. **Confirm or
edit these before you publish and hand the URLs to Twilio:**

1. **Service description** — currently: automated RCS alerts about LEGO® set
   restocks, new releases, retiring sets, and price drops. Adjust if your scope
   differs.
2. **Operator / legal name** — currently "Ian Lundberg." Replace with a company
   or LLC name if the program is run by a legal entity.
3. **Contact email** — set to `lettersfromian@gmail.com`. Update if you want a
   different address shown to subscribers and Twilio/Google reviewers.
4. **Governing law** — set to the **State of Texas, United States** ✅. Update if
   you operate elsewhere, or name a specific Texas county if you want a precise
   court venue.
5. **Mailing address** — the `[optional mailing address]` placeholder. Some
   reviewers prefer a physical or business address; remove the line if you do not
   want to include one.
6. **Effective date** — currently "June 27, 2026" on both documents.
7. **Message frequency / age requirement** — confirm the stated frequency
   ("varies") and the 18+ eligibility match your program.

Unfilled placeholders are highlighted in yellow on the rendered pages so they are
easy to spot.

> These documents are a strong starting template, not legal advice. Have them
> reviewed by a qualified attorney before relying on them.

## Trademark note

"Lego" is a trademark of the LEGO Group. The documents include a clear
non-affiliation disclaimer, but be aware that using "Lego" in a brand or RCS
agent name may affect Google's RCS brand verification. Consider whether a
non-trademarked brand name is safer for the public-facing agent.
