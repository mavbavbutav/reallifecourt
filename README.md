# Real Life Court

Mobile-first link-in-bio site for the TikTok brand **Real Life Court** by LivHealthy. It is built as a fast static Vite + React app with a demo-mode case submission form and seeded nostalgia court examples.

## Growth Principle

The site is submission-first. The main job is to turn viewers into the writing room through **Submit a Case**. Merch, TikTok Shop links, sponsors, and other monetization can be added later, but they should not compete with the case submission flow in this MVP.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

For the temporary J&J subpath deployment:

```bash
npm run build:reallifecourt
```

## Form Endpoint

The production default posts to the existing Cloudflare Worker:

```text
https://jje-founding-five-form.johnmartinferguson.workers.dev
```

Set `VITE_CASE_FORM_ENDPOINT` in `.env` only if you need to override that endpoint:

```bash
VITE_CASE_FORM_ENDPOINT=https://your-form-endpoint.example
```

The submit handler in `src/components/SubmitCaseForm.jsx` validates fields, sends the normalized JSON payload, clears the form, and shows the success message. If you intentionally remove the endpoint in `config/siteConfig.js`, the same handler can still run in demo mode by logging the payload to the browser console.

## Update Links

Edit `config/siteConfig.js` to replace the TikTok, Lemon8, YouTube Shorts, Instagram, and email placeholders.

## Add Case Examples

Edit `src/data/cases.json`:

- `whichWasWorse` powers the sample battle cards.
- `docket` powers the Current Docket cards.
- `seededIdeas` stores extra examples for future expansion.

## Deploy

This app can deploy as a static site on Netlify, Vercel, or GitHub Pages. Build with `npm run build` and publish the generated `dist` folder.

For GitHub Pages, set the Vite `base` option in `vite.config.js` if the site is hosted from a subpath.
