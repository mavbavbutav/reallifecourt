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

Set `VITE_CASE_FORM_ENDPOINT` in `.env` to POST submissions as JSON:

```bash
VITE_CASE_FORM_ENDPOINT=https://your-form-endpoint.example
```

If the endpoint is empty, the form runs in demo mode: it validates fields, logs the payload to the browser console, clears the form, and shows the success message. The submit handler in `src/components/SubmitCaseForm.jsx` is where you can connect Google Forms, Formspree, Netlify Forms, or a custom backend.

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
