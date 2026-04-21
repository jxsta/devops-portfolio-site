# Personal DevOps Portfolio Site

A clean, responsive personal portfolio built from scratch with HTML, CSS, and JavaScript — no frameworks, no dependencies, no build step. Designed to showcase a career transition from automotive service operations into DevOps and cloud engineering.

Live at: **`yoursite.com`** ← add your URL here after deploying

---

## Overview

This project serves two purposes: it's a working portfolio site, and it's itself a demonstration of the skills it describes. The site is version-controlled on GitHub, deployed via a CI/CD pipeline, and served over HTTPS with a custom domain — the same workflow used to ship production web applications.

The content focuses on honest, entry-level DevOps skills: Linux administration, cloud basics, Git, and CI/CD — paired with a decade of operations and customer-facing experience.

---

## Features

- Single-page layout with smooth-scroll navigation
- Fixed navbar with scroll-triggered background blur
- Mobile-responsive design with a hamburger menu
- Scroll-triggered fade-in animations using `IntersectionObserver`
- Active section highlighting in the navbar
- CSS-only dot-grid hero background and pipeline diagram
- No JavaScript libraries — vanilla JS only
- Semantic HTML with ARIA labels
- Easy to edit — all content lives in `index.html`, all colors in CSS variables

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox, keyframe animations) |
| Behavior | Vanilla JavaScript (ES6) |
| Fonts | Google Fonts — Archivo Black, IBM Plex Sans, IBM Plex Mono |
| Hosting | GitHub Pages (or AWS S3 + CloudFront) |
| CI/CD | GitHub Actions |
| Domain | Custom domain via DNS CNAME |

---

## File Structure

```
devops-portfolio-site/
├── index.html       # All page content and HTML structure
├── style.css        # Design system, layout, animations, responsive styles
├── script.js        # Nav scroll, mobile menu, scroll-reveal, smooth scroll
└── README.md        # This file
```

**index.html** is organized with comment blocks for each section, making it easy to find and edit any part:

```
nav → hero → about → skills → featured project → additional projects → experience → contact → footer
```

**style.css** is organized top-to-bottom:

```
1. Design tokens (:root variables)
2. Reset & base
3. Utilities (container, buttons, tags)
4. Navigation
5. Hero
6. Each content section
7. Footer
8. Scroll animations
9. Media queries
```

---

## How to Run Locally

No installs required. Open the file directly or use a simple local server:

```bash
# Simplest: open directly in a browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux

# Recommended: local dev server (avoids browser file:// quirks)
npx serve .

# Or with Python (built into most systems)
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## Planned Deployment Flow

The goal is to deploy this site using the same CI/CD pattern described in the featured project section.

```
git push → GitHub Actions → build/validate → deploy to S3 → CloudFront invalidation → live
```

**Steps to deploy to AWS:**

1. Create an S3 bucket with static website hosting enabled
2. Set bucket policy to allow public read
3. Create a CloudFront distribution pointing to the S3 origin
4. Add a custom domain via Route 53 (or any DNS provider)
5. Issue an SSL certificate through ACM
6. Add a `.github/workflows/deploy.yml` that runs on push to `main`:
   - Uses `aws s3 sync` to upload changed files
   - Runs a CloudFront invalidation to clear the CDN cache

**Alternative (simpler):** GitHub Pages with a `CNAME` file — free, no AWS account needed.

```bash
# Enable GitHub Pages
# Settings → Pages → Deploy from branch → main → / (root)
# Add CNAME file with your domain name
echo "yoursite.com" > CNAME
git add CNAME && git commit -m "add custom domain" && git push
```

---

## Screenshots

> Replace these placeholders with actual screenshots after deployment.

| Section | Preview |
|---------|---------|
| Hero | `screenshots/hero.png` |
| About + Skills | `screenshots/about-skills.png` |
| Featured Project | `screenshots/featured-project.png` |
| Mobile view | `screenshots/mobile.png` |

To add screenshots:
1. Take a screenshot of each section
2. Save them to a `screenshots/` folder in this repo
3. Update the table above with: `![Hero section](screenshots/hero.png)`

---

## Why This Project Matters for a DevOps Portfolio

Most job postings for entry-level DevOps roles ask for experience with Git, CI/CD, cloud hosting, and Linux. This project touches all of those — not in a tutorial, but in a real deployed artifact.

**What it demonstrates:**

- **Git workflow** — the repo has a meaningful commit history with descriptive messages
- **Static site hosting** — deploying over HTTPS to a CDN is a core infrastructure task
- **CI/CD thinking** — the deployment is automated; pushing code is the only manual step
- **Documentation** — this README is written for a technical audience, not just a portfolio viewer
- **Ownership** — the site was built and deployed by one person, start to finish

For a career changer with no professional tech experience, a project like this shows that you understand how modern deployment works — not just that you can write a webpage.

---

## Customization Guide

All content is in `index.html`. Search and replace these placeholders:

| Placeholder | Replace with |
|-------------|-------------|
| `Your Name` | Your full name |
| `YN` | Your initials (nav logo) |
| `[Your City, State]` | Your location |
| `[Start Year]` / `[End Year]` | Employment dates |
| `[Dealership or Company Name]` | Your employer |
| `youremail@example.com` | Your email |
| `yourusername` | Your GitHub username |
| `yourprofile` | Your LinkedIn slug |
| `yoursite.com` | Your deployed site URL |

To change colors, edit the CSS variables at the top of `style.css`:

```css
:root {
  --amber: #f5a623;   /* main accent color */
  --bg:    #0b0c11;   /* page background   */
}
```

---

## License

MIT — use it however you want.
