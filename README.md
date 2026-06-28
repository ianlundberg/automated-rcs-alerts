# automated-rcs-alerts

A monorepo for automated **RCS (Rich Communication Services) alerting** projects,
managed with [Turborepo](https://turborepo.com) on top of npm workspaces.

## What's here

```
automated-rcs-alerts/
├── apps/
│   └── claude-lego-alerts/      # Legal docs (ToS + Privacy Policy) → GitHub Pages
├── packages/                    # Shared libraries (added as the repo grows)
├── .github/workflows/
│   └── deploy-pages.yml         # Builds & publishes the legal docs to Pages
├── package.json                 # Workspaces + Turborepo task runner
├── turbo.json                   # Turborepo task pipeline
└── LICENSE
```

The first app, [`claude-lego-alerts`](apps/claude-lego-alerts), hosts the
**Terms of Service** and **Privacy Policy** for the Claude Lego Alerts RCS
messaging program so the URLs can be submitted to Twilio when setting up an RCS
account.

## Prerequisites

- **Node.js ≥ 18** (Node 20 recommended — see [`.nvmrc`](.nvmrc)).
  > Node is **not currently installed** on this machine. Install it from
  > <https://nodejs.org> to run the build or dev server locally. You do **not**
  > need Node to preview the legal docs — just open the HTML files in a browser —
  > and GitHub's runners provide Node for the Pages deployment.

## Common commands

Run from the repo root:

```bash
npm install          # install dependencies (Turborepo, etc.)
npm run build        # build all apps (Turborepo) -> each app's dist/
npm run dev          # run all apps' dev servers (Turborepo)
```

Target a single workspace:

```bash
npm run build -- --filter=claude-lego-alerts
npm run dev   -- --filter=claude-lego-alerts
```

## Hosting the legal docs on GitHub Pages

Publishing is automated by
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml), which
builds `apps/claude-lego-alerts` and deploys its `dist/` folder to Pages on every
push to `main` that touches the app.

**One-time setup:**

1. Push this repository to GitHub (`main` branch).
2. In the repo on GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Trigger the workflow — push a commit to `main`, or run it manually from the
   **Actions** tab (**Deploy legal docs to GitHub Pages → Run workflow**).

When the workflow finishes, the documents are live at:

- Landing: <https://ianlundberg.github.io/automated-rcs-alerts/>
- Terms of Service: <https://ianlundberg.github.io/automated-rcs-alerts/terms/>
- Privacy Policy: <https://ianlundberg.github.io/automated-rcs-alerts/privacy/>

> **Before submitting to Twilio,** review the content checklist in
> [`apps/claude-lego-alerts/README.md`](apps/claude-lego-alerts/README.md#-review-before-submitting-to-twilio)
> (governing law, contact details, operator name, etc.).

## Adding another package later

This is set up to grow. To add a new app or library:

1. Create a folder under `apps/` (a deployable service or site) or `packages/`
   (a shared library).
2. Give it a `package.json` with a unique `name` and the scripts you need
   (e.g. `build`, `dev`, `lint`).
3. Turborepo and npm workspaces pick it up automatically — no root config changes
   needed.

For example, the actual RCS alerting service (the code that watches for restocks
and sends messages via Twilio) would live at `apps/<service-name>/`, and any
shared code (Twilio client, types) at `packages/<lib-name>/`.

## License

[MIT](LICENSE) © Ian Lundberg
