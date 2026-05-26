# agrilife-catalogue

This workspace contains a runnable Vite + React demo of the Agrilife product catalogue.

Quick start

1. Install dependencies:

```bash
cd /workspaces/agrilife-catalogue
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

Publishing

- Deploy to Vercel or Netlify by connecting this repository — both detect Vite automatically.
- Or push the repo and use GitHub's deploy workflows / GitHub Pages (you can use a small action or `gh-pages` package).

If you'd like, I can (a) convert this to TypeScript, (b) add unit tests, or (c) set up a simple GitHub Action to auto-deploy to Vercel. Which would you like next?

What's included now

- Project converted to TypeScript (`src/App.tsx`, `src/main.tsx`).
- Vite config updated to `vite.config.ts`.
- GitHub Actions workflow `.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on pushes to `main`.

Notes

- The TypeScript `App.tsx` in this commit contains a trimmed PRODUCTS array for brevity; the full dataset is preserved in the repository history. If you want the full typed dataset inline or moved to `src/data/products.ts`, tell me and I'll move it.
- After pushing this branch to GitHub, the action will run on `main` pushes and publish to GitHub Pages (uses the built-in `GITHUB_TOKEN`).

Vercel preview deployments (optional)

- A GitHub Actions workflow `.github/workflows/vercel-preview.yml` is included to create Vercel preview deployments on pull requests.
- To enable: add the following repository secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
- Vercel will then create a unique preview URL for each PR. Alternatively you can connect the repo in the Vercel dashboard to auto-deploy previews without actions.