# WILDCORE brand assets

The current WILDCORE logo and favicon are already in the correct locations in this repository.

## Files and exact paths

- Main horizontal logo: `assets/images/wildcore-logo.svg`
- Browser favicon: `assets/favicon.svg`

The website header loads the logo from `assets/images/wildcore-logo.svg`. Pages should load the favicon with:

```html
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
```

## If you want to replace either asset later

1. Open the GitHub repository: https://github.com/girodayzzzz/WildCore
2. Open the `assets` folder.
3. For the logo, open `assets/images`; upload the replacement using the exact filename `wildcore-logo.svg` and replace the existing file.
4. For the favicon, open `assets`; upload the replacement using the exact filename `favicon.svg` and replace the existing file.
5. Keep the same filenames and folder paths. This avoids having to change the website code.

## Recommended formats

- Logo: SVG with a transparent background; a wide horizontal layout works best.
- Favicon: SVG, square viewBox (1:1), simple high-contrast symbol that remains legible at small sizes.

Do not upload the logo into the repository root. Keep it in `assets/images/`; keep the favicon directly inside `assets/`.
