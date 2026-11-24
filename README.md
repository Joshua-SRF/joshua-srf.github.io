# SITE A — Mechanical Engineering portfolio  (repo: joshua-srf.github.io)

## WHAT TO EDIT, AND WHERE  (everything is plain text between quotes)
| I want to change...                          | File                         | Look for                                   |
|----------------------------------------------|------------------------------|--------------------------------------------|
| Bio, intro line, button labels               | assets/js/content.js         | SECTION 1: HERO                            |
| Numbers strip (98%, 2:1...)                  | assets/js/content.js         | SECTION 2: NUMBERS STRIP                   |
| Project text / add a project / reports shown | assets/js/content.js         | SECTION 3: PROJECTS                        |
| Certificates list + text                     | assets/js/content.js         | SECTION 4: CERTIFICATIONS                  |
| **Mech-eng email shown on the email icon**   | assets/js/content.js         | SECTION 0: SITE -> EMAIL                   |
| LinkedIn link                                | assets/js/content.js         | SECTION 0: SITE -> LINKEDIN                |
| Tiny link to the ventures site (or remove)   | assets/js/content.js         | SECTION 0: SITE -> OTHER_SITE              |
| **Mech-eng email inside NØLL "Contact" chip**| assets/js/noll-widget.js     | NOLL_CONFIG -> CONTACT -> "mech-eng"       |
| **Email that receives requests/receipts**    | Code.gs (Apps Script)        | OWNER_EMAIL (top of file)                  |
| Banner picture                               | assets/img/banner.jpg        | replace the file, keep the name            |
| CV / ATS CV / Cover Letter                   | assets/docs/                 | keep the 3 file names                      |

## FOLDER STRUCTURE
```
index.html            home            <slug>/index.html   one page per project (gearbox, green-hydrogen, robotic-chess, golf-robot,
Code.gs               backend (paste into script.google.com, DO NOT upload to GitHub)   tensile-tester, threaded-bung, cnc-digital-twin, moses-proposal, ebike-kit)
assets/docs/                         CV, ATS CV, Cover Letter (public download buttons)
assets/docs/projects/                the reports/slides shown at the top of each project page
assets/certs/                        certificate previews (see below)
assets/img/                          banner.jpg + project thumbnails
```

## CERTIFICATE IMAGES — upload your proper redacted versions with these EXACT names into assets/certs/
`degree.jpg`  `transcript.jpg`  `alevels.jpg`  `ielts.jpg`  `olevels.jpg`  `reference.jpg`  `character.jpg`
(.png or .webp also work, same name.) The files there now are only blurry placeholders: overwrite them. Never upload unredacted originals.
To add one more: add a line in content.js -> CERTS, add the same id in noll-widget.js -> CERTS, upload `<id>.jpg`.

## ADD OR CHANGE A PROJECT REPORT
1. Put the PDF in `assets/docs/projects/` (PowerPoint/Word: export to PDF first).
2. In content.js, in that project, set  `docs: [["Label", "assets/docs/projects/yourfile.pdf"]]`  (several = tabs). `docs: []` hides the viewer.
3. New project: copy a project folder, rename it to the new slug, change `data-slug` inside its index.html, add the entry in content.js.
Note: on iPhone/iPad the embedded PDF shows only page 1; visitors use "Open in new tab" there.

## NØLL SETUP (AI chat + email)
1. Key: https://aistudio.google.com/apikey -> Create API key -> paste into `GEMINI_KEY` in Code.gs.
2. Upload CV, ATS CV, Cover Letter to a PRIVATE Drive folder -> right-click -> Share -> Copy link -> the ID is between `/d/` and `/view` -> paste into `DOCS.mech_eng` in Code.gs.
3. script.google.com -> New project -> paste Code.gs -> set OWNER_EMAIL. Deploy -> New deployment -> Web app -> Execute as **Me**, Access **Anyone** -> approve.
4. Paste the Web App URL (ends /exec) into `WEB_APP_URL` in assets/js/noll-widget.js. After every Code.gs edit: Deploy -> Manage deployments -> pencil -> **New version**.
5. **If NØLL emails but does not chat:** in Apps Script choose function `testGemini` -> Run -> View -> Logs. It prints OK or the exact error.
   Fix the key (step 1) or wait if it says quota. Then re-deploy a NEW VERSION and approve the new permission ("connect to an external service").
   While `SHOW_AI_ERRORS = true` the chat itself shows a short [debug: ...] reason; set it to false when working.
6. Optional live-chat alerts: NTFY_TOPIC (ntfy.sh app) or TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID in Code.gs.
