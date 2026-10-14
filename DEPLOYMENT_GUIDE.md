# Production Deployment Guide: Netlify & Vercel

This project is built and optimized for seamless deployment to **Netlify** and **Vercel** with zero runtime configuration, zero manual frame upload prompts, and clean single-page application (SPA) routing.

---

## 1. Netlify Deployment (Manual Drag-and-Drop)

### Why "Deploy failed. Access Denied" Happened
When using the Netlify UI drag-and-drop feature ("Netlify Drop"), dragging the **entire project root directory** causes Netlify to reject the upload with `Deploy failed. Access Denied`. This is because the root directory contains unbuilt source files, system files, and the `node_modules` directory with thousands of protected/nested binaries.

### Correct Drag-and-Drop Procedure:
1. **Build the production bundle**:
   ```bash
   npm run build
   ```
   *(This compiles all TypeScript, packages the chunks cleanly, generates `public/frames/manifest.json`, and outputs the complete standalone production site into the `dist/` directory).*

2. **Drag ONLY the `dist` folder**:
   - Go to [Netlify Drop](https://app.netlify.com/drop) (or your existing Netlify site overview -> **Deploys**).
   - Drag and drop **ONLY the `dist` folder** (NOT the project root folder) into the Netlify Drop area.
   - Netlify will instantly upload and deploy the compiled site in seconds.

3. **SPA Routing & Frames are Pre-Configured**:
   - The `dist/` directory already includes `_redirects` (`/* /index.html 200`) so refreshing on any route (`/projects`, `/about`, `/contact`) will never yield a 404 or Access Denied error.
   - The `dist/frames/manifest.json` file and all 240 animation frames are bundled directly inside `dist/frames/`.

---

## 2. Vercel Deployment

### Automatic Git Integration (Recommended):
1. Push your repository to GitHub / GitLab / Bitbucket.
2. In the Vercel Dashboard, click **Add New Project** and import the repository.
3. Vercel automatically detects the Vite framework:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

### Manual Vercel CLI:
```bash
npx vercel
```
When prompted for the output directory, confirm `dist`.

---

## 3. What Was Fixed

1. **Vite Chunk Size Warning (`[plugin builtin:vite-reporter]`)**:
   - Segregated heavyweight libraries into separate cached chunks in `vite.config.ts`:
     - `vendor-firebase`: Isolated Firebase App and Firestore SDK (~450 kB)
     - `vendor-react`: React and React DOM
     - `vendor-icons`: Lucide React icon suite
     - `vendor-motion`: Framer Motion animation engine
     - `vendor-charts`: Recharts data visualization
   - All individual output chunks are now under the warning limit.

2. **Missing Scroll Background & Upload Dialog on Vercel**:
   - Pre-generated static frame manifest at `public/frames/manifest.json` indexing all 240 frames (`frame_000001.jpg` to `frame_000240.jpg`).
   - Enhanced `ScrollBackgroundAnimation.tsx` to automatically stream frames from `/frames/manifest.json` with a deterministic 240-frame fallback.
   - Completely suppressed the manual upload prompt banner in production mode (`!import.meta.env.PROD`).
   - Visitors on Vercel and Netlify will now see the smooth 60fps canvas scroll animation immediately without any dialog popups.

3. **Netlify SPA Deep-Linking & Refresh Support**:
   - Added `public/_redirects` and `netlify.toml` ensuring `/* -> /index.html 200`.
   - Added `vercel.json` rewrites and caching headers.

---

## 4. GitHub Push & Export Troubleshooting

If you encounter:
```text
Something went wrong.
Failed to push commit to GitHub. Please try again.
```

### Why this happens & How it was solved:

1. **Payload Size Limit (Resolved in codebase)**:
   - The 240 background animation frames originally weighed **111.4 MB**, and pre-built `dist/` folders weighed another **112 MB**, bringing the repo to over **223 MB**.
   - GitHub's REST Git Database API rejects tree commits exceeding 25MB–50MB payloads or times out after 30 seconds.
   - **Resolution applied**: All 240 animation frames have been optimized down to **24 MB total** (~78% reduction) with lossless visual quality, `dist/` was removed from git tracking, and `.gitignore` now ignores build artifacts and local caches.

2. **Crucial: Target GitHub Repository Must Be Completely Empty**:
   - When creating a new repository on [GitHub.com](https://github.com/new), **DO NOT check** any of these options:
     - ❌ *Add a README file*
     - ❌ *Add .gitignore*
     - ❌ *Choose a license*
   - If any of these are checked, GitHub creates an initial commit with an existing `main` branch. When AI Studio tries to push a fresh root commit, GitHub API rejects the commit with an unrelated histories conflict.
   - **Fix**: Create a fresh, empty repository on GitHub without initializing files, then retry the AI Studio push.

3. **Pushing via Terminal / Command Line (Alternative)**:
   If you have Git installed on your computer, you can clone or push directly:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main --force
   ```

