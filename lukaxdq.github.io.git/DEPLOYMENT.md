# GitHub Pages Deployment Guide

This React app is configured to deploy automatically to GitHub Pages.

## Automatic Deployment (Recommended)

The app uses GitHub Actions to automatically deploy when you push to the `main` or `master` branch.

### Setup Steps:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
   - Save the settings

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Setup React app for GitHub Pages"
   git push origin main
   ```

3. **Wait for deployment:**
   - Go to the **Actions** tab in your repository
   - You should see the "Deploy to GitHub Pages" workflow running
   - Once it completes, your site will be live at:
     - `https://lukaxdq.github.io` (if repo is `lukaxdq.github.io`)
     - `https://lukaxdq.github.io/REPO_NAME` (if it's a project page)

## Manual Deployment

If you prefer to deploy manually:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

   This will:
   - Build your React app
   - Deploy the `build` folder to the `gh-pages` branch
   - Make it available on GitHub Pages

## Important Notes

- The `homepage` field in `package.json` is set to `https://lukaxdq.github.io`
- If your repository name is different (e.g., `portfolio`), update the homepage to:
  ```json
  "homepage": "https://lukaxdq.github.io/portfolio"
  ```
- The `404.html` file handles client-side routing for React Router
- Make sure your showcase folder is in the `public` directory (it should be copied automatically)

## Troubleshooting

- **404 errors on routes:** Make sure `404.html` is in the `public` folder and gets copied to `build`
- **Assets not loading:** Check that the `homepage` in `package.json` matches your GitHub Pages URL
- **Build fails:** Check the Actions tab for error messages

