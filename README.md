# refactored-octo-umbrella

VLE-3: End-to-End DevOps Automation Using CI/CD, ChatOps & Static Deployment.

Static frontend automated with GitHub Actions (CI), Slack incoming webhooks (ChatOps),
and Netlify (CD / static hosting).

## Pipeline

```
git push  ──►  GitHub Actions (.github/workflows/ci.yml)
                 ├─ checkout
                 ├─ npm run build   → dist/
                 ├─ npm test        → node:test
                 ├─ upload dist/ artifact
                 └─ notify-slack.sh success|failure  ──►  #ci-cd-alerts
               │
               └─►  Netlify auto-deploy on commit  ──►  production URL
```

## Local run

```bash
npm run build   # writes dist/
npm test        # asserts dist/ is complete
```

No dependencies — build and test use the Node 20 standard library only.

## Configuration

| Where | Key | Value |
|---|---|---|
| GitHub repo secret | `SLACK_WEBHOOK_URL` | Slack incoming webhook for `#ci-cd-alerts` |
| Netlify | build command | `npm run build` |
| Netlify | publish dir | `dist` |

## Reflection

- **CI** — every push builds and tests automatically, so a broken commit is caught in
  minutes instead of at release time.
- **CD** — Netlify rebuilds and publishes `dist/` on every commit to `main`; no manual
  upload step.
- **ChatOps** — the pipeline posts status into the team channel, so developers learn about
  a red build without watching the Actions tab.
- **Why a webhook and not a bot token** — an incoming webhook is single-channel and
  write-only, the least privilege needed to post build status.
