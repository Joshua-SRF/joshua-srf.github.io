/* =====================================================================
   NØLL SETTINGS — SITE A (Engineering).  THIS IS THE ONLY NØLL FILE YOU NEED TO EDIT.
   Keep this file when you upload new versions of the site (it holds your Web App URL).
   ===================================================================== */
window.NOLL_SETTINGS = {
  SITE_MODE: "mech-eng",                                  // leave as is for this site
  WEB_APP_URL: "https://script.google.com/macros/s/AKfycbynBL8DcuOXJzBMe51GV2LOYsYXJxkWA80wwVBKhjf3HXrwD4aqMxlpOiOhTUys8mns/exec",           // <-- 1. paste your Apps Script Web App URL (ends in /exec)

  HEADER_TITLE: "Engineering Assistant",                  // <-- title in the chat window header (next to the Ø)
  GREETING: "Questions or need help? Ask NØLL",           // <-- bubble that pops up on every page
  WELCOME: "Hi, I'm NØLL. Ask me anything about Joshua's engineering work, or tick the documents you'd like emailed.",   // first chat message

  CONTACT: {                                              // <-- 2. shown by the "Contact Joshua" chip
    email: "joshua.f1915@gmail.com",                      //     MECH-ENG EMAIL
    linkedin: "https://www.linkedin.com/in/joshua-sr-f"
  },

  /* CHIPS = the buttons in the chat window.  label = what visitors read (EDIT FREELY).
     id must match a document key in Code.gs -> DOCS (std_cv, ats_cv, cover_letter) when instant:true. */
  CHIPS: [
    { id: "std_cv",       label: "Standard CV (Instant PDF)", instant: true },
    { id: "ats_cv",       label: "ATS CV (Instant PDF)", instant: true },
    { id: "cover_letter", label: "Cover Letter (Instant PDF)", instant: true },
    { id: "custom_cv",    label: "Custom CV / Cover Request" },
    { id: "cert_request", label: "Unredacted Certificate Request" },
    { id: "live",         label: "Talk to Joshua Live" },
    { id: "contact",      label: "Contact Joshua", info: true }
  ],

  /* CERTS = the certificate choices (id : label). id = image file name in assets/certs/ */
  CERTS: { degree: "BEng (Hons) Degree", transcript: "UWE Transcript", alevels: "Cambridge A-Levels", ielts: "UKVI IELTS",
           olevels: "G.C.E. O-Levels", reference: "Recommendation Letter", character: "Character Certificate" }
};
