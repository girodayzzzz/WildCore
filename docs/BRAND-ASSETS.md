# WILDCORE brand assets

These are the current approved WILDCORE brand assets. Use them consistently across every page and new feature.

## Current files

- Main horizontal logo: `assets/images/wildcore-logo.svg`
- 16 × 16 browser favicon: `assets/images/favicon-16.png`
- 32 × 32 browser favicon: `assets/images/favicon-32.png`
- 512 × 512 app / touch icon: `assets/images/wildcore-favicon-512.png`

## Website implementation

Use the horizontal SVG logo in both the site header and footer:

```html
<a class="logo" href="index.html" aria-label="WILDCORE home">
  <img src="assets/images/wildcore-logo.svg" alt="WILDCORE — Explore, Learn, Equip, Survive">
</a>
```

Use the PNG favicon set in every HTML page:

```html
<link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon-16.png">
<link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon-32.png">
<link rel="apple-touch-icon" sizes="512x512" href="assets/images/wildcore-favicon-512.png">
```

Do not reintroduce the retired text-only `WILD<span>CORE</span>` wordmark or the deleted `assets/favicon.svg` path. Keep the current filenames and paths consistent throughout the website.
