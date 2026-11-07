# WILDCORE — Built for the Wild

Bilingual English / Slovenian static outdoor website and field-tool workspace.

## Main areas

- `index.html` — homepage
- `outdoor.html`, `destinations.html`, `outdoor-map.html` — outdoor discovery and map
- `academy.html` — free Outdoor Foundations learning path, module progress and knowledge checks
- `field-hub.html` — dashboard and starting point for field tools
- `field-station.html` — route preview, weather, GPX import/export, private trip notes and readiness checklist
- `field-kit.html` — equipment builder and saved expedition plans
- `camping-checklist.html` — trip-specific checklists and reusable saved lists
- `tools.html` — quick trip brief and basic supply-planning estimates
- `fishing-log.html` — private freshwater / saltwater catch journal, map, statistics and JSON backup
- `assets/css/style.css` — shared responsive styling
- `assets/js/main.js` — language selector, navigation, shared checklist behavior and Academy progress
- `assets/js/field-hub.js` — local dashboard summaries
- `assets/js/academy-enhancements.js` — Academy knowledge quiz and local result history

## Language

The site supports English and Slovenian. The language selector stores the preference in browser local storage. A `?lang=en` or `?lang=sl` query parameter can set the language.

## Local data and privacy

The site is static and currently has no visitor accounts or server-side user sync. Academy progress, gear lists, expedition plans and reusable checklists are stored in the visitor's browser. Fishing Log entries and optional photos are stored in IndexedDB on the current device. They are not synced between browsers or devices. Users should export backups from the relevant tools before clearing browser data or changing devices.

Field Station and map pages call external services for map tiles, geocoding, routing, weather and map data. Review `privacy.html` for the current description and verify access, safety and local rules before relying on outdoor information.

## Local preview

Open `index.html` in a modern browser. The site uses relative paths and no build step. Some map, weather, geolocation and route features require an internet connection and browser permissions.

## Deployment

GitHub Pages can deploy the repository root using `.github/workflows/pages.yml`. In repository Settings → Pages, select **GitHub Actions** as the build and deployment source if this has not already been configured.

## Product catalogue

- `data/products.json` is the structured product catalogue and currently contains no products.
- `docs/PRODUCT-CATALOGUE.md` explains how to add direct-store and affiliate items when suppliers are approved.
- Do not enable checkout until seller details, payment processing, shipping, returns, tax and customer support are configured.
