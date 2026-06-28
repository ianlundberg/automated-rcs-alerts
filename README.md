# automated-rcs-alerts

A monorepo for automated **RCS (Rich Communication Services) alert feeds**,
managed with [Turborepo](https://turborepo.com) on top of npm workspaces.

Each alert feed is its own app under `apps/`, with its own legal documents
(Terms of Service + Privacy Policy). All apps are published to a single GitHub
Pages site — each under its own subpath — so every feed has stable URLs to submit
to Twilio when registering its RCS sender.

Feeds live under the **Notifly** umbrella brand and share a common design system;
each feed page also carries its own visual theme matching its vertical (e.g., the
Bricks feed is warm red & amber, while Notifly's umbrella is indigo/violet).

## What's here

```
automated-rcs-alerts/
├── apps/
│   └── brick-alerts/            # Notifly • Bricks feed (landing + ToS + Privacy)
├── packages/                    # Shared libraries (added as the repo grows)
├── site-root/                   # Notifly umbrella landing (served at the site root)
├── scripts/
│   └── assemble-site.mjs        # Combines every app's build into one Pages site
├── .github/workflows/
│   └── deploy-pages.yml         # Builds & publishes the combined site to Pages
├── package.json                 # Workspaces + Turborepo task runner
├── turbo.json
└── LICENSE
```

## Live URLs

The combined site is published at `https://ianlundberg.github.io/automated-rcs-alerts/`.
Each feed lives under its own path:

| Page | URL |
| --- | --- |
| Notifly — landing | `https://ianlundberg.github.io/automated-rcs-alerts/` |
| Notifly • Bricks — feed landing | `https://ianlundberg.github.io/automated-rcs-alerts/brick-alerts/` |
| Notifly • Bricks — Terms of Service | `https://ianlundberg.github.io/automated-rcs-alerts/brick-alerts/terms/` |
| Notifly • Bricks — Privacy Policy | `https://ianlundberg.github.io/automated-rcs-alerts/brick-alerts/privacy/` |

## Adding a new feed

1. Copy `apps/brick-alerts/` to `apps/<your-feed>/` (or scaffold a new app with a
   `package.json` and a `public/` folder).
2. Set its `package.json` `name`, and edit its `public/` documents.
3. Push. The deploy workflow builds every app and publishes it under
   `/<your-feed>/` automatically — no workflow changes needed.

> One legal entity (one EIN) can run many feeds as separate RCS senders — keep
> each feed a **distinct use case**. Only split a feed into its own brand/LLC if
> you want it to stand alone as an independent business.

## Prerequisites

- **Node.js ≥ 18** (Node 20 recommended — see [`.nvmrc`](.nvmrc)).
  > Node is **not currently installed** on this machine. You don't need it to
  > preview the docs (just open the HTML files), and GitHub's runners provide
  > Node for the Pages deployment.

## Common commands

```bash
npm install            # install dependencies (Turborepo, etc.)
npm run build          # build every app -> each app's dist/
npm run build:pages    # build every app + assemble the combined site/ folder
npm run dev            # run every app's dev server
```

Target one app:

```bash
npm run build -- --filter=brick-alerts
npm run dev   -- --filter=brick-alerts
```

## How publishing works

[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) runs on
every push to `main` that touches an app, `site-root/`, or the build setup. It:

1. builds all apps (`turbo run build` → each `apps/<name>/dist`),
2. runs [`scripts/assemble-site.mjs`](scripts/assemble-site.mjs) to copy
   `site-root/` to the site root and each `apps/<name>/dist` into `site/<name>/`,
3. deploys the combined `site/` folder to GitHub Pages.

**Pages is already enabled** for this repo (Settings → Pages → Source =
GitHub Actions), so pushes deploy automatically.

## License

[MIT](LICENSE) © Ian Lundberg
