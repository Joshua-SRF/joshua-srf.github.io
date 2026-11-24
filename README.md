# Site A — joshua-srf.github.io  (Mechanical Engineering portfolio) + NØLL

## 1. Folder structure (repository name MUST be `joshua-srf.github.io`)
```
/index.html                 home (hero, projects, certifications, contact)
/Code.gs                    Google Apps Script backend -> DO NOT UPLOAD TO GITHUB (paste into script.google.com)
/gearbox/ /green-hydrogen/ /robotic-chess/ /threaded-bung/ /tensile-tester/   -> clean URLs: joshua-srf.github.io/gearbox
/assets/css/site.css, noll-widget.css
/assets/js/content.js       ALL editable text, links, projects, certificate list
/assets/js/noll-widget.js   NØLL widget (config block at top)
/assets/js/site.js          renderer (no edits needed)
/assets/docs/               PUBLIC download PDFs (CV, ATS CV, Cover Letter) used by the hero buttons
/assets/certs/<id>.jpg      VIEW-ONLY pixelated certificate images (ids: degree, transcript, alevels, ielts, olevels, reference, character)
/assets/img/banner.jpg      YOUR BANNER (not in the zip you sent: add it; the blueprint fallback shows until then)
/assets/img/<slug>.jpg      project thumbnails
```
Never put unredacted certificates in this repo. Keep originals only in private Google Drive.
The files in `assets/certs/` are auto-pixelated previews made from your PDFs: open each one and confirm nothing is readable; replace with your own redacted images (same file name) if you prefer.

## 2. Gemini API key (free)
1. Go to https://aistudio.google.com/apikey and sign in -> **Create API key**.
2. Paste it into `GEMINI_KEY` at the top of `Code.gs` (inside Apps Script only, never in the website files).

## 3. Drive PDFs, File IDs, deploy the backend
1. Upload your CV, ATS CV and Cover Letter to a **private** Drive folder.
2. Right-click a file -> Share -> Copy link. The ID is the text between `/d/` and `/view`. Paste into `DOCS.mech_eng.*.id` in `Code.gs`.
3. Go to https://script.google.com -> New project -> paste all of `Code.gs`. Set `OWNER_EMAIL`, optional Telegram/ntfy values.
4. **Deploy -> New deployment -> Web app**: Execute as **Me**, Who has access **Anyone** -> Deploy -> approve permissions (Gmail + Drive).
5. Copy the Web App URL (ends in `/exec`) into `WEB_APP_URL` at the top of `assets/js/noll-widget.js`.
6. After any later `Code.gs` edit: Deploy -> Manage deployments -> edit -> **New version**.
7. Live chat alerts: ntfy = install the ntfy app, subscribe to a secret topic, put it in `NTFY_TOPIC`. Telegram = create a bot with @BotFather, put the token and your chat id in the config.

## 4. Publish
Create repo `joshua-srf.github.io`, upload everything except `Code.gs` and this README (optional), Settings -> Pages -> deploy from `main` / root.

## 5. Add a project
Add an entry to `PROJECTS` in `content.js`, then copy any project folder (e.g. `gearbox/`), rename it to the new slug, and set `data-slug` in its `index.html`.

## 6. Custom domain for Site B (joshua-fernando.io) — for when Site B is built
Add a `CNAME` file containing `joshua-fernando.io` to that repo. At your registrar create four **A** records for `@` -> 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153, and a **CNAME** `www` -> `<your-username>.github.io`. Then Settings -> Pages -> Custom domain -> Enforce HTTPS.
