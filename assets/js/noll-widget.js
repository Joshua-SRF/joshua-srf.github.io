/* ===================== === MASTER CONFIGURATION === =====================
   Only edit this block. Same file is reused on both sites. */
const NOLL_CONFIG = {
  SITE_MODE: "mech-eng",                      // "mech-eng" or "founder"
  WEB_APP_URL: "https://script.google.com/macros/s/AKfycbynBL8DcuOXJzBMe51GV2LOYsYXJxkWA80wwVBKhjf3HXrwD4aqMxlpOiOhTUys8mns/exec",// from Apps Script -> Deploy -> Web app
  GREETING_DELAY_MS: 2500,
  // ---- TEXT (EDIT ME): greeting bubble per site ----
  GREETING: { "mech-eng": "Here to help \u2014 ask NØLL", "founder": "Questions or a brief? Ask NØLL" },
  // ---- TEXT (EDIT ME): opening line in the chat window ----
  WELCOME:  { "mech-eng": "Hi, I'm NØLL. Ask about Joshua's engineering work, or tick the documents you'd like emailed.",
              "founder": "Hi, I'm NØLL. Ask about the ventures, or tick what you'd like sent." },
  // ---- Quick-select chips. instant:true = real PDF emailed from Drive (IDs live in Code.gs) ----
  CHIPS: {
    "mech-eng": [
      { id: "std_cv", label: "Standard CV (Instant PDF)", instant: true },
      { id: "ats_cv", label: "ATS CV (Instant PDF)", instant: true },
      { id: "cover_letter", label: "Cover Letter (Instant PDF)", instant: true },
      { id: "custom_cv", label: "Custom CV / Cover Request" },
      { id: "cert_request", label: "Unredacted Certificate Request" },
      { id: "live", label: "Talk to Joshua Live" } ],
    "founder": [
      { id: "project_deck", label: "Project Deck (Instant PDF)", instant: true },
      { id: "technical_paper", label: "Technical Paper (Instant PDF)", instant: true },
      { id: "custom_brief", label: "Custom Brief Request" },
      { id: "live", label: "Talk to Joshua Live" } ]
  },
  // ---- Certificates selectable for unredacted requests (ids match assets/certs/<id>.jpg) ----
  CERTS: { degree: "BEng (Hons) Degree", transcript: "UWE Transcript", alevels: "Cambridge A-Levels", ielts: "UKVI IELTS",
           olevels: "G.C.E. O-Levels", reference: "Recommendation Letter", character: "Character Certificate" }
};
/* ===================== === END CONFIGURATION === ===================== */

(function () {
  const C = NOLL_CONFIG, M = C.SITE_MODE, $ = (s, r) => (r || document).querySelector(s);
  const el = (h) => { const d = document.createElement("div"); d.innerHTML = h.trim(); return d.firstChild; };
  const sel = new Set(); let history = [], busy = false, cert = "";

  const root = el(`<div class="noll" data-mode="${M}">
    <div class="noll-bubble" hidden><span></span><button aria-label="Dismiss">&times;</button></div>
    <button class="noll-launch" aria-label="Open NØLL assistant"><i class="noll-ring"></i>Ø</button>
    <section class="noll-panel" hidden aria-live="polite">
      <header><b>Ø NØLL</b><small>${M === "founder" ? "Venture concierge" : "Engineering concierge"}</small><button class="noll-x" aria-label="Close">&times;</button></header>
      <div class="noll-log"></div>
      <div class="noll-think" hidden><i class="noll-spin">Ø</i><em></em></div>
      <div class="noll-chips"></div>
      <form class="noll-form" hidden>
        <select class="noll-cert" hidden><option value="">Which certificate?</option></select>
        <input name="emails" placeholder="Recipient email(s), comma-separated" autocomplete="email">
        <input name="companyUrl" placeholder="Company / Organization URL">
        <input name="jobUrl" placeholder="Job / Reference URL">
        <textarea name="message" rows="2" placeholder="Custom message (optional)"></textarea>
        <button type="submit" class="noll-send">Send request</button>
      </form>
      <form class="noll-chat"><input name="q" placeholder="Ask NØLL anything\u2026" autocomplete="off"><button aria-label="Send">&#10148;</button></form>
    </section></div>`);
  document.body.appendChild(root);
  const panel = $(".noll-panel", root), log = $(".noll-log", root), form = $(".noll-form", root), certSel = $(".noll-cert", root);

  // --- chips ---
  C.CHIPS[M].forEach(ch => {
    const b = el(`<button type="button" class="noll-chip" data-id="${ch.id}">${ch.label}</button>`);
    b.onclick = () => { toggle(ch.id); }; $(".noll-chips", root).appendChild(b);
  });
  Object.keys(C.CERTS).forEach(k => certSel.appendChild(new Option(C.CERTS[k], k)));
  function toggle(id, force) {
    const on = force !== undefined ? force : !sel.has(id); on ? sel.add(id) : sel.delete(id);
    $(`.noll-chip[data-id="${id}"]`, root).classList.toggle("on", on); refresh();
  }
  function refresh() {
    const needsForm = sel.size > 0;
    form.hidden = !needsForm; certSel.hidden = !sel.has("cert_request");
    if (sel.has("cert_request") && cert) certSel.value = cert;
  }

  // --- messages ---
  function say(t, who) { const m = el(`<p class="noll-msg ${who}"></p>`); m.textContent = t; log.appendChild(m); log.scrollTop = log.scrollHeight; }
  function think(on, t) { $(".noll-think", root).hidden = !on; if (t) $(".noll-think em", root).textContent = t; busy = on; log.scrollTop = log.scrollHeight; }
  async function api(body) {
    body.page = location.href;
    const r = await fetch(C.WEB_APP_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) });
    return r.json();
  }

  // --- free chat (Gemini + function calling runs server-side) ---
  $(".noll-chat", root).onsubmit = async (e) => {
    e.preventDefault(); const q = e.target.q.value.trim(); if (!q || busy) return; e.target.q.value = "";
    say(q, "me"); think(true, "Ø is thinking...");
    try { const r = await api({ action: "chat", message: q, history });
      history.push({ role: "user", text: q }, { role: "model", text: r.reply || "" });
      say(r.reply || r.error || "Something went wrong.", "bot");
    } catch (x) { say("I couldn't reach the server. Please email joshua.f1915@gmail.com.", "bot"); }
    think(false);
  };

  // --- structured request ---
  form.onsubmit = async (e) => {
    e.preventDefault(); if (busy) return; const f = e.target, items = [...sel];
    const instant = C.CHIPS[M].filter(c => c.instant && sel.has(c.id)).length;
    say("Requested: " + items.map(i => (C.CHIPS[M].find(c => c.id === i) || {}).label || i).join(", "), "me");
    think(true, instant ? "Ø is sending your PDFs..." : "Ø is thinking...");
    try { const r = await api({ action: "request", items, emails: f.emails.value, companyUrl: f.companyUrl.value, jobUrl: f.jobUrl.value,
        message: f.message.value, cert: certSel.value, source: "form" });
      say(r.ok ? (r.sent && r.sent.length ? "Sent! Check the inbox (and spam) of the address(es) you gave. " : "Request received. ") + (r.notes || []).join(" ") + " Joshua has been notified."
               : (r.error || "Something went wrong."), "bot");
      if (r.ok) { [...sel].forEach(i => toggle(i, false)); f.reset(); }
    } catch (x) { say("I couldn't reach the server. Please email joshua.f1915@gmail.com.", "bot"); }
    think(false);
  };

  // --- open / close / greeting ---
  const open = (o) => { panel.hidden = false; $(".noll-bubble", root).hidden = true; sessionStorage.setItem("noll-seen", "1");
    if (!log.children.length) say(C.WELCOME[M], "bot");
    if (o && o.preselect) o.preselect.forEach(id => toggle(id, true));
    if (o && o.cert) { cert = o.cert; refresh(); say("Pre-selected: " + (C.CERTS[o.cert] || o.cert) + ". Add your email and send the request.", "bot"); } };
  $(".noll-launch", root).onclick = () => (panel.hidden ? open() : (panel.hidden = true));
  $(".noll-x", root).onclick = () => (panel.hidden = true);
  $(".noll-bubble button", root).onclick = () => { $(".noll-bubble", root).hidden = true; };
  $(".noll-bubble span", root).textContent = C.GREETING[M];
  $(".noll-bubble span", root).onclick = () => open();
  setTimeout(() => { if (panel.hidden && !sessionStorage.getItem("noll-seen")) $(".noll-bubble", root).hidden = false; }, C.GREETING_DELAY_MS);

  window.NOLL = { open };          // used by certificate lightbox: NOLL.open({preselect:['cert_request'], cert:'degree'})
})();
