# Seattle OS — Priyanshu Sharma's interactive portfolio

Seattle OS is a desktop-inspired personal portfolio. Visitors can explore a desktop workspace, open application windows, browse a virtual project directory, use the terminal, review experience and education, and contact the developer.

## Run locally

The site is dependency-free: no Node packages or build step are required. A service worker caches the desktop shell and CV after the first successful load for basic offline revisits.

```bash
python3 -m http.server 4173
```

Open **http://localhost:4173**.

## Included applications

- **About** — profile, areas of interest and social links.
- **Projects** — seven detailed project views with cover artwork, technology stacks, engineering highlights, available metrics, repository links and live demos.
- **File Manager** — browsable virtual home directory and project folders, plus the downloadable CV.
- **Terminal** — `help`, `whoami`, `pwd`, `ls`, `tree`, `open`, `github`, `linkedin`, `email`, `resume`, `date` and `clear`.
- **Resume** — a professional profile header with portrait and quick stats, an experience timeline, education, a chipped skills inventory, clickable selected work and a downloadable PDF.
- **Contact** — email, GitHub and LinkedIn.
- **Settings** — Aubergine, Midnight and Sandstone themes, saved in local storage.

Desktop windows support focus, drag, resize, minimize, maximize and close. On smaller screens, applications become full-screen panels and the desktop layout adapts for touch.

## Content and assets

- `portfolio.js` contains the profile, internship, education, skills and project records. Each project has a `cover` image, shown on its card and at the top of its project window.
- `assets/projects/` holds the project cover artwork (SVG).
- `assets/Priyanshu_Sharma_CV.pdf` is the downloadable résumé supplied for this portfolio.
- `assets/` contains local static assets.
- `sw.js` provides the offline cache for same-origin assets. Bump `CACHE_NAME` whenever you change `styles.css`, `app.js`, `portfolio.js` or `assets/projects/`, otherwise returning visitors keep the old files.
- The profile avatar is loaded from the public GitHub avatar endpoint.

All project metrics are attributed to the user's supplied CV or the linked public repository documentation. Project statuses are descriptive and should be updated as deployments or research evolve.

## Deploy

This is a static website. Upload the complete `seattle-os` folder to any static host; no server-side runtime is needed.

### GitHub Pages

1. Create a public repository, for example `seattle-os`.
2. Commit the contents of this directory to the repository root.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
5. Wait for the Pages deployment to finish and open the URL shown in the Pages settings.

### Netlify

1. Import the repository or drag the `seattle-os` folder into Netlify Drop.
2. Set the publish directory to `.` and leave the build command empty.
3. Deploy.

### Cloudflare Pages

1. Connect the repository to Pages.
2. Choose **None** as the framework preset.
3. Leave the build command blank and set the build output directory to `/`.
4. Deploy.

No custom domain or production URL is assumed by this project. Add it to the metadata after choosing the domain.

## Before public launch

- Confirm all CV facts, public contact details and project availability remain current.
- Test every hosted demo from a fresh browser session. The three Render endpoints were returning HTTP 503 during the 11 November 2026 external availability check; re-check their service state before sharing the portfolio widely.
- Add a canonical URL and sitemap after the final domain is selected.
- Check the mobile layout on a physical phone and test links in the target browsers.

## File structure

```text
seattle-os/
├── index.html
├── styles.css
├── app.js
├── portfolio.js
├── assets/
│   └── Priyanshu_Sharma_CV.pdf
├── favicon.svg
├── site.webmanifest
├── sw.js
├── _headers
├── robots.txt
└── README.md
```
