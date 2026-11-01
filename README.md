# WILDCORE — Built for the Wild

Bilingual (English / Slovenian) static website for the WILDCORE outdoor brand.

## Structure

- `index.html` — homepage
- `shop.html` — collection overview
- `fishing.html`, `survival.html`, `camping.html`, `hunting.html`, `accessories.html` — category pages
- `journal.html` — editorial / field notes landing page
- `about.html`, `contact.html`, `privacy.html` — brand and information pages
- `assets/css/style.css` — shared responsive styling
- `assets/js/main.js` — language toggle and mobile navigation
- `assets/favicon.svg` — brand favicon
- `manifest.webmanifest`, `robots.txt`, `sitemap.xml` — site metadata
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow

## Language behavior

The language switch saves the visitor's preference in local storage. A `?lang=en` or `?lang=sl` query parameter can set the language on first load.

## Local preview

Open `index.html` in a browser. The site uses relative paths and no build step.

## Deployment

GitHub Pages can deploy the repository root using the workflow in `.github/workflows/pages.yml`. In repository Settings → Pages, select **GitHub Actions** as the build and deployment source if this has not already been configured.

## Current status

This is a brand and content foundation. Product inventory, pricing, checkout, contact endpoints, social links, analytics and the final hero photography are intentionally not fabricated and can be connected when confirmed.
