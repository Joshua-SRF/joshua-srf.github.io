# Joshua Fernando — Portfolio Website

A professional engineering portfolio built for GitHub Pages.

---

## File Structure

```
/
├── index.html              ← Main portfolio page
├── style.css               ← All styles
├── script.js               ← Smooth scroll, nav, animations
├── assets/
│   └── cv.pdf              ← ⭐ Place your CV here
├── projects/
│   ├── dissertation.pdf            ← Green Hydrogen paper
│   ├── dissertation-slides.pdf     ← Green Hydrogen viva slides
│   ├── golf-robot-report.pdf       ← Golf Robot report
│   ├── golf-robot-slides.pdf       ← Golf Robot slides
│   ├── ev-bike-report.pdf          ← EV Bike report
│   └── ev-bike-slides.pdf          ← EV Bike slides
└── images/                 ← (optional) project preview images
```

---

## Setup Instructions

### 1. Add your files

- Copy your CV as `assets/cv.pdf`
- Copy your project PDFs into `projects/` using the exact filenames above
- The dissertation paper PDF is in `projects/dissertation.pdf` (the uploaded file)
- The viva slides PPTX is in `projects/dissertation-slides.pdf` (convert to PDF or link to PPTX)

### 2. Deploy to GitHub Pages

1. Create a new GitHub repository (e.g., `joshua-portfolio`)
2. Push all files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/joshua-portfolio.git
   git push -u origin main
   ```
3. Go to **Settings → Pages** in your repository
4. Under **Source**, select `main` branch and `/ (root)` folder
5. Click **Save** — your site will be live at:
   `https://YOUR_USERNAME.github.io/joshua-portfolio/`

---

## Customisation

- **Colors**: Edit CSS variables at the top of `style.css`
- **Content**: All text is in `index.html` — edit directly
- **Add projects**: Copy the `<article class="project-card">` block and update content
- **Contact links**: Update `href` attributes in the Contact section

---

## Fonts Used

- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — Display / headings
- [Libre Franklin](https://fonts.google.com/specimen/Libre+Franklin) — Body text
- [DM Mono](https://fonts.google.com/specimen/DM+Mono) — Labels, tags, code

All loaded from Google Fonts (requires internet connection).
