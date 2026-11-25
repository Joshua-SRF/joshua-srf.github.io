/* =====================================================================
   NØLL WIDGET  (shared code for both sites).  YOU NORMALLY EDIT ONLY  noll-settings.js  (same folder)
   ===================================================================== */
(function () {
  const C = Object.assign({ GREETING_DELAY_MS: 2500, SITE_MODE: "mech-eng", HEADER_TITLE: "Assistant", GREETING: "Questions or need help? Ask NØLL",
    WELCOME: "Hi, I'm NØLL. Ask me anything, or tick what you'd like.", CONTACT: { email: "", linkedin: "" }, CHIPS: [], CERTS: {}, WEB_APP_URL: "" }, window.NOLL_SETTINGS || {});
  const M = C.SITE_MODE, $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const el = (h) => { const d = document.createElement("div"); d.innerHTML = h.trim(); return d.firstChild; };
  // The Ø symbol: a TRUE circle with a diagonal slash (not an oval letter)
  const O = (n) => `<svg class="o" viewBox="0 0 24 24" width="${n}" height="${n}" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="7.6"/><path d="M4.4 19.6L19.6 4.4"/></svg>`;
  window.NOLL_ICON = O;
  const sel = new Set(); let history = [], busy = false;

  const root = el(`<div class="noll" data-mode="${M}">
    <div class="noll-bubble" hidden><span></span><button aria-label="Dismiss">&times;</button></div>
    <button class="noll-launch" aria-label="Open NØLL assistant"><i class="noll-ring"></i>${O(32)}</button>
    <section class="noll-panel" hidden aria-live="polite">
      <header>${O(22)}<small>${C.HEADER_TITLE}</small><button class="noll-x" aria-label="Close">&times;</button></header>
      <div class="noll-log"></div>
      <div class="noll-think" hidden><i class="noll-spin">${O(20)}</i><em></em></div>
      <div class="noll-chips"></div>
      <form class="noll-form" hidden>
        <div class="noll-certs" hidden><b>Which certificates?</b></div>
        <input name="emails" placeholder="Your email(s), comma-separated" autocomplete="email">
        <input name="companyUrl" placeholder="Company / Organization URL (optional)">
        <input name="jobUrl" placeholder="Job / Reference URL (optional)">
        <textarea name="message" rows="2" placeholder="Custom message (optional)"></textarea>
        <button type="submit" class="noll-send">Send request</button>
      </form>
      <form class="noll-chat"><input name="q" placeholder="Ask NØLL anything\u2026" autocomplete="off"><button aria-label="Send">&#10148;</button></form>
    </section></div>`);
  document.body.appendChild(root);
  const panel = $(".noll-panel", root), log = $(".noll-log", root), form = $(".noll-form", root), certBox = $(".noll-certs", root);

  // ----- chips (labels come from noll-settings.js -> CHIPS) -----
  C.CHIPS.forEach(ch => { const b = el(`<button type="button" class="noll-chip" data-id="${ch.id}"></button>`); b.textContent = ch.label;
    b.onclick = () => (ch.info ? contact() : toggle(ch.id)); $(".noll-chips", root).appendChild(b); });
  Object.keys(C.CERTS).forEach(k => { const l = el(`<label><input type="checkbox" value="${k}"> <span></span></label>`); $("span", l).textContent = C.CERTS[k]; certBox.appendChild(l); });
  function toggle(id, force) { const on = force !== undefined ? force : !sel.has(id); on ? sel.add(id) : sel.delete(id);
    const c = $(`.noll-chip[data-id="${id}"]`, root); if (c) c.classList.toggle("on", on); form.hidden = sel.size === 0; certBox.hidden = !sel.has("cert_request"); }

  // ----- messages -----
  function say(t, who) { const m = el(`<p class="noll-msg ${who}"></p>`); m.textContent = t; log.appendChild(m); log.scrollTop = log.scrollHeight; }
  function contact() { const c = C.CONTACT, m = el('<p class="noll-msg bot"></p>'); m.append("You can reach Joshua directly: ");
    const a = document.createElement("a"); a.href = "mailto:" + c.email; a.textContent = c.email; m.append(a);
    if (c.linkedin) { m.append(" \u00b7 "); const l = document.createElement("a"); l.href = c.linkedin; l.target = "_blank"; l.rel = "noopener"; l.textContent = "LinkedIn"; m.append(l); }
    log.appendChild(m); log.scrollTop = log.scrollHeight; }
  function think(on, t) { $(".noll-think", root).hidden = !on; if (t) $(".noll-think em", root).textContent = t; busy = on; log.scrollTop = log.scrollHeight; }
  async function api(body) {
    if (!C.WEB_APP_URL || /PASTE_/.test(C.WEB_APP_URL)) throw new Error("WEB_APP_URL is not set in noll-settings.js");
    body.page = location.href;
    const r = await fetch(C.WEB_APP_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) });
    const t = await r.text(); try { return JSON.parse(t); } catch (e) { throw new Error("The backend did not return JSON. Re-deploy Code.gs as a NEW VERSION (Anyone can access)."); }
  }

  // ----- free chat (Gemini + function calling runs in Code.gs) -----
  $(".noll-chat", root).onsubmit = async (e) => {
    e.preventDefault(); const q = e.target.q.value.trim(); if (!q || busy) return; e.target.q.value = "";
    say(q, "me"); think(true, "is thinking...");
    try { const r = await api({ action: "chat", message: q, history });
      history.push({ role: "user", text: q }, { role: "model", text: r.reply || "" }); say(r.reply || r.error || "Something went wrong.", "bot");
    } catch (x) { say("I couldn't reach my brain just now (" + x.message + "). Use the Contact chip to reach Joshua directly.", "bot"); }
    think(false);
  };

  // ----- structured request (chips + fields) -----
  form.onsubmit = async (e) => {
    e.preventDefault(); if (busy) return; const f = e.target, items = [...sel], certs = $$("input:checked", certBox).map(i => i.value);
    if (sel.has("cert_request") && !certs.length) { say("Please tick at least one certificate.", "bot"); return; }
    const instant = C.CHIPS.filter(c => c.instant && sel.has(c.id)).length;
    say("Requested: " + items.map(i => (C.CHIPS.find(c => c.id === i) || {}).label || i).join(", "), "me");
    think(true, instant ? "is sending your PDFs..." : "is sending your request...");
    try { const r = await api({ action: "request", items, certs, emails: f.emails.value, companyUrl: f.companyUrl.value, jobUrl: f.jobUrl.value, message: f.message.value, source: "form" });
      say(r.ok ? (instant ? "Sent! Check the inbox (and spam) of the address(es) you gave. " : "") + "Request sent. Joshua will be in touch with you." : (r.error || "Something went wrong."), "bot");
      if (r.ok) { [...sel].forEach(i => toggle(i, false)); $$("input:checked", certBox).forEach(i => (i.checked = false)); f.reset(); }
    } catch (x) { say("I couldn't reach the server (" + x.message + "). Use the Contact chip to reach Joshua directly.", "bot"); }
    think(false);
  };

  // ----- centred certificate request pop-up (used by the "Request Unredacted Copy" button) -----
  function certRequest(ids) {
    const m = el(`<div class="noll-modal" data-mode="${M}"><div class="noll-card" role="dialog" aria-modal="true">
      <button class="noll-x2" aria-label="Close">&times;</button><h3>${O(24)} Request unredacted certificates</h3>
      <p>Tick the documents you need and leave your email. Joshua will be in touch with you.</p>
      <div class="noll-certs"></div><input name="email" type="email" placeholder="Your email" required>
      <textarea name="message" rows="3" placeholder="Custom message (optional)"></textarea><button class="noll-send">Send request</button><p class="noll-status"></p></div></div>`);
    Object.keys(C.CERTS).forEach(k => { const l = el(`<label><input type="checkbox" value="${k}"${(ids || []).includes(k) ? " checked" : ""}> <span></span></label>`); $("span", l).textContent = C.CERTS[k]; $(".noll-certs", m).appendChild(l); });
    const close = () => m.remove(), st = $(".noll-status", m);
    $(".noll-x2", m).onclick = close; m.onclick = (e) => { if (e.target === m) close(); };
    $(".noll-send", m).onclick = async () => {
      const certs = $$("input:checked", m).map(i => i.value), email = $("input[name=email]", m).value.trim();
      if (!certs.length) { st.textContent = "Please tick at least one certificate."; return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { st.textContent = "Please enter a valid email."; return; }
      st.textContent = "Sending..."; $(".noll-send", m).disabled = true;
      try { const r = await api({ action: "request", items: ["cert_request"], certs, emails: email, message: $("textarea", m).value, source: "cert-popup" });
        if (!r.ok) throw new Error(r.error || "failed");
        $(".noll-card", m).innerHTML = `<button class="noll-x2" aria-label="Close">&times;</button><h3>${O(24)} Request sent</h3><p>Joshua will be in touch with you.</p>`; $(".noll-x2", m).onclick = close; setTimeout(close, 4500);
      } catch (x) { st.textContent = "Could not send (" + x.message + "). Please use the Contact chip in NØLL."; $(".noll-send", m).disabled = false; }
    };
    document.body.appendChild(m);
  }

  // ----- open / close / greeting (greeting shows on EVERY page load) -----
  const open = (o) => { panel.hidden = false; $(".noll-bubble", root).hidden = true;
    if (!log.children.length) say(C.WELCOME, "bot");
    if (o && o.preselect) o.preselect.forEach(id => toggle(id, true));
    if (o && o.cert) { $$("input", certBox).forEach(i => (i.checked = i.value === o.cert)); toggle("cert_request", true); } };
  $(".noll-launch", root).onclick = () => (panel.hidden ? open() : (panel.hidden = true));
  $(".noll-x", root).onclick = () => (panel.hidden = true);
  $(".noll-bubble button", root).onclick = () => { $(".noll-bubble", root).hidden = true; };
  $(".noll-bubble span", root).textContent = C.GREETING; $(".noll-bubble span", root).onclick = () => open();
  setTimeout(() => { if (panel.hidden) $(".noll-bubble", root).hidden = false; }, C.GREETING_DELAY_MS);
  window.NOLL = { open, certRequest };
})();
