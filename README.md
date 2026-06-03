# NamoVsMMS

A simple static website built with Next.js 16, TypeScript, and Tailwind CSS.

The site compares the Narendra Modi government and Manmohan Singh government using measurable completed work and outcomes. It does not compare government spending or political claims.

## Development

```bash
npm install
npm run dev
npm run build
```

The production build uses Next.js static export and generates output in the `out/` folder.

## Static Deployment

This project is configured for GitHub Pages:

- `output: "export"` in `next.config.js`
- unoptimized images for static hosting
- trailing slashes for Pages-friendly routes
- GitHub Actions workflow deploys the `out/` folder

## Data

Comparison rows are stored in `src/data/comparison-data.ts`.

All current values are placeholders and should remain marked as `pending` until verified from official sources such as government reports, ministry websites, annual reports, or public datasets.
