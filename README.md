# SITE A — Engineering Portfolio  (repo: joshua-srf.github.io)

## HOW TO APPLY THIS UPDATE (do this once)
1. In GitHub, open your repo -> **Add file -> Upload files** and drag in EVERYTHING from this folder EXCEPT:
   - `Code.gs` and the README files (these are not website files),
   - your own `assets/certs/` pictures and `assets/img/projects/` pictures (only overwrite them if you want the defaults back).
2. Open `assets/js/noll-settings.js` and re-enter your **WEB_APP_URL** (this file is new and replaces the setting that used to live in noll-widget.js). From now on, never overwrite this file.
3. Update the backend: script.google.com -> your engineering project -> open `Code.gs` -> replace it with the new `Code.gs` from this folder, then re-enter `GEMINI_KEY`, the 3 Drive file IDs, `OWNER_EMAIL`. Deploy -> Manage deployments -> pencil -> **New version**.
   (If you prefer not to replace it, the only required edits are: the model lines you already fixed, and the `NOLL` -> `NØLL` wording in the system prompt.)
4. Hard-refresh the site (Ctrl+Shift+R). GitHub Pages can take 1-2 minutes.

## WHERE TO EDIT EVERYTHING
| Change this                                              | File                       | Section / setting |
|----------------------------------------------------------|----------------------------|-------------------|
| Top-left name, LinkedIn, **email icon address**, banner  | assets/js/content.js       | SECTION 0: SITE (BRAND, EMAIL, LINKEDIN, BANNER_IMAGE) |
| Bio line, **IMechE / UWE links**, button labels          | assets/js/content.js       | SECTION 1: HERO (kicker list has the two links) |
| Numbers strip                                            | assets/js/content.js       | SECTION 2: STATS |
| **Project order**, text, slideshow, reports, pictures    | assets/js/content.js       | SECTION 3: PROJECTS (order = order in the list) |
| Certificate text under "Certifications"                  | assets/js/content.js       | SECTION 4: CERTS_SECTION |
| Word next to the footer Ø icon / where it goes           | assets/js/content.js       | PORTAL (bottom of file) and SITE.OTHER_SITE |
| NØLL header words, greeting, chips, certificate list     | assets/js/noll-settings.js | HEADER_TITLE, GREETING, CHIPS, CERTS |
| **Email shown by NØLL's Contact chip**                   | assets/js/noll-settings.js | CONTACT -> email |
| **Email that receives requests + receipts**              | Code.gs                    | OWNER_EMAIL |
| AI model names                                           | Code.gs                    | GEMINI_MODEL, GEMINI_FALLBACK_MODELS |

## PROJECT PICTURES: just drop them in
Put a picture in `assets/img/projects/` named exactly after the project, `.jpg` / `.png` / `.webp`:
`green-hydrogen`  `robotic-chess`  `gearbox`  `golf-robot`  `tensile-tester`  `threaded-bung`  `cnc-digital-twin`  `moses-proposal`  `ebike-kit`
It replaces the default cover automatically (delete it to go back). Best size 1200 x 700. **Put your DIY e-bike picture in as `ebike-kit.jpg`.**
Defaults (report/presentation cover pages) live in `assets/img/covers/`.

## SLIDESHOW BANNERS (hydrogen + chess) and REPORTS
- Slides are images in `assets/slides/<project>/01.jpg, 02.jpg ...`. To change a presentation: export it to PDF, then run  `pdftoppm -jpeg -scale-to-x 1280 -scale-to-y -1 yourdeck.pdf s`  and rename to `01.jpg`.. (or ask me and I will regenerate), set `count` in content.js, replace the PDF in `assets/docs/projects/`.
- The report under it is the `docs: [...]` entry. Pictures/gyroid gallery = `figures: [...]` (files in `assets/img/figures/`).
- Auto-flip speed: `interval: 4500` (milliseconds) inside a project's `deck: {...}`.

## CERTIFICATES
Upload your proper redacted images to `assets/certs/` with EXACT names: `degree.jpg  transcript.jpg  alevels.jpg  ielts.jpg  olevels.jpg  reference.jpg  character.jpg` (.png/.webp also fine).
Clicking one opens the viewer; "Request Unredacted Copy" opens the centred pop-up (tick certificates, email, message). The request is e-mailed to YOU only; the visitor sees "Request sent. Joshua will be in touch with you."
Add another certificate: add a line in content.js -> CERTS, the same id in noll-settings.js -> CERTS, upload `<id>.jpg`.

## THE Ø "VENTURES" PORTAL
Footer Ø icon + tiny "ventures": click -> screen goes black, Ø in the middle with a loader -> founder site opens -> the Ø drops into its blue footer icon. (The founder site does the same in blue when going back.)

## NØLL SETUP RECAP
Gemini key: https://aistudio.google.com/apikey -> `GEMINI_KEY` in Code.gs. Drive IDs: right-click file -> Share -> Copy link -> ID is between `/d/` and `/view` -> `DOCS.mech_eng` in Code.gs.
Deploy: Web app, Execute as **Me**, Access **Anyone**. Paste the /exec URL into `noll-settings.js -> WEB_APP_URL`.
Chat not answering? Apps Script -> run `testGemini` -> View -> Logs. It prints OK or the exact error.
