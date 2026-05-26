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

Vercel deployment (optional)

### Production & preview deployments with Vercel

1. **Create a Vercel project**:
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub.
   - Click "New Project" and import this repository.
   - Vercel will auto-detect Vite and use `vercel.json` settings.
   - Deploy will run automatically on every push to `main`.

2. **Enable preview deployments on pull requests**:
   - Get your Vercel credentials:
     - `VERCEL_TOKEN`: from [Vercel Settings → Tokens](https://vercel.com/account/tokens)
     - `VERCEL_ORG_ID`: from your Vercel org/account settings
     - `VERCEL_PROJECT_ID`: displayed in Vercel project settings
   - Add these as GitHub repository secrets (Settings → Secrets and variables → Actions):
     - `VERCEL_TOKEN`
     - `VERCEL_ORG_ID`
     - `VERCEL_PROJECT_ID`
   - The workflow `.github/workflows/vercel-preview.yml` will now create a preview URL on each PR.

3. **Alternative: Connect in Vercel dashboard** (no secrets needed):
   - In Vercel project settings, ensure GitHub integration is enabled.
   - Vercel will auto-create previews for all PRs without needing the Actions workflow.

### GitHub Pages deployment

- Automatic: `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on pushes to `main`.
- Site URL: `https://keshav171295.github.io/agrilife-catalogue/`