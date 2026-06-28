# automated-rcs-alerts

A small monorepo that powers **Ian Lundberg's personal site and projects**,
managed with [Turborepo](https://turborepo.com) on npm workspaces and published
to a single GitHub Pages site.

Every app under `apps/` declares where it is served via a `deployPath` in its
`package.json`, and a build step assembles them all into one site:

| App | deployPath | URL |
| --- | --- | --- |
| `apps/personal` | `/` | https://ianlundberg.github.io/automated-rcs-alerts/ |
| `apps/notifly` | `/notifly` | https://ianlundberg.github.io/automated-rcs-alerts/notifly/ |
| `apps/brick-alerts` | `/notifly/brick-alerts` | https://ianlundberg.github.io/automated-rcs-alerts/notifly/brick-alerts/ |

## What's here

```
automated-rcs-alerts/
├── apps/
│   ├── personal/                # Ian Lundberg's personal homepage      -> /
│   ├── notifly/                 # Notifly project landing               -> /notifly/
│   └── brick-alerts/            # Notifly • Bricks feed (+ ToS/Privacy)  -> /notifly/brick-alerts/
├── packages/                    # Shared libraries (added as the repo grows)
├── scripts/
│   └── assemble-site.mjs        # Combines each app's build into one site by deployPath
├── .github/workflows/
│   └── deploy-pages.yml         # Builds & publishes the combined site to Pages
├── package.json                 # Workspaces + Turborepo task runner
├── turbo.json
└── LICENSE
```

## Notifly • Bricks feed URLs (for Twilio)

The legal docs to submit when registering the **Notifly • Bricks** RCS sender:

- Terms: `https://ianlundberg.github.io/automated-rcs-alerts/notifly/brick-alerts/terms/`
- Privacy: `https://ianlundberg.github.io/automated-rcs-alerts/notifly/brick-alerts/privacy/`

## Design & theming

All apps share one dependency-free design system (light/dark). Each app can carry
its own accent by appending token overrides to the bottom of its `styles.css`:
the personal site is **emerald/teal**, Notifly's umbrella is **indigo/violet**, and
the Bricks feed is **warm red/amber**.

## Adding a new app (project or feed)

1. Create `apps/<name>/` with a `public/` folder and a `package.json` that sets a
   `deployPath` (e.g. `/notifly/cards`).
2. Copy `scripts/{build,serve}.mjs` from an existing app.
3. Push. The workflow builds every app and publishes it at its `deployPath` — no
   workflow changes needed.

## Prerequisites

- **Node.js ≥ 18** (Node 20 recommended — see [`.nvmrc`](.nvmrc)).
  > Node is **not currently installed** on this machine. You don't need it to
  > preview the HTML files, and GitHub's runners provide Node for deployment.

## Common commands

```bash
npm install            # install dependencies (Turborepo, etc.)
npm run build          # build every app -> each app's dist/
npm run build:pages    # build every app + assemble the combined site/ folder
npm run dev            # run every app's dev server
```

## How publishing works

[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) runs on
every push to `main` that touches an app or the build setup. It builds all apps,
runs [`scripts/assemble-site.mjs`](scripts/assemble-site.mjs) to place each app's
`dist/` at its `deployPath`, then deploys the combined `site/` to GitHub Pages.

**Pages is already enabled** (Settings → Pages → Source = GitHub Actions), so
pushes deploy automatically.

## License

[MIT](LICENSE) © Ian Lundberg
