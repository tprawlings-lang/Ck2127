# Deployment — Render + ck2717.com

## Service setup

Two options:

**Blueprint (recommended):** point Render at this repo; `render.yaml` defines
the web service (Node 22, `npm ci && npm run build`, `npm run start`, health
check `/`).

**Manual:** New → Web Service → this repo → Runtime Node →
Build `npm ci && npm run build` → Start `npm run start`.

## Environment variables

Copy the keys from `.env.example` into the Render dashboard. Secrets
(`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) must only be set in the dashboard —
never committed. Flip the `NEXT_PUBLIC_*` launch gates only when the
underlying item is truly confirmed (see assets-needed.md).

## Custom domain + DNS

1. Render service → Settings → Custom Domains → add `ck2717.com` and
   `www.ck2717.com`.
2. At the registrar: apex `ck2717.com` → A/ALIAS record per Render's
   instructions; `www` → CNAME to the service's `onrender.com` hostname.
3. Render provisions SSL automatically; verify https on both hosts and that
   one redirects to the canonical host.

## Form delivery test (before every launch/provider change)

1. Set `EMAIL_PROVIDER=resend`, `EMAIL_FROM` (verified sender),
   `LEAD_NOTIFY_EMAIL`.
2. Submit the contact form with a real inbox; confirm (a) Connor's
   notification arrives with the selected plan summary, (b) the prospect
   confirmation arrives, (c) the browser lands on /thank-you.
3. Submit garbage (bad email, missing consent) and confirm server-side errors.
4. Fill the hidden "company" field via devtools and confirm silent drop.

## Release checklist

- [ ] `npm run lint && npm run typecheck && npm test && npm run build` all green
- [ ] Manual route audit: all 18 routes + article pages render
- [ ] Calculators: spot-check totals in pricing.md tables
- [ ] Launch gates match reality (credentials, phone, email, founding count)
- [ ] Form delivery test passed
- [ ] robots.txt + sitemap.xml load; Search Console verified

## Rollback

Render keeps previous deploys: Service → Deploys → pick the last good deploy →
"Rollback to this deploy". Env-var changes require a new deploy; revert the
variable then "Manual Deploy → Deploy latest commit".
