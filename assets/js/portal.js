/* =====================================================================
   PORTAL: the NØLL-symbol transition between the two sites.  Settings come from content.js -> PORTAL.
   Leaving: the screen turns black (or blue) with the symbol in the middle and a loader, then the other site opens.
   Arriving: the symbol drops into the footer icon.  You normally never edit this file.
   ===================================================================== */
(function () {
  const P = window.PORTAL; if (!P) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, COLORS = { black: "#000000", blue: "#0b5fff" };
  const css = document.createElement("style");
  css.textContent = `.portal-layer{position:fixed;inset:0;z-index:99998;transition:opacity .7s ease}
.portal-sym{position:fixed;z-index:99999;color:#fff;display:grid;place-items:center;transition:left .8s cubic-bezier(.6,0,.2,1),top .8s cubic-bezier(.6,0,.2,1),width .8s cubic-bezier(.6,0,.2,1),height .8s cubic-bezier(.6,0,.2,1),color .8s}
.portal-sym svg{width:100%;height:100%}.portal-ring{position:fixed;z-index:99999;border:3px solid rgba(255,255,255,.25);border-top-color:#fff;border-radius:50%;animation:pspin .8s linear infinite}
@keyframes pspin{to{transform:rotate(360deg)}}.portal-in body>*:not(.portal-layer):not(.portal-sym){visibility:hidden}
#portal{display:inline-flex;align-items:center;gap:6px;text-decoration:none;color:${P.iconColor}}#portal .pi{display:inline-flex}#portal .pl{font-size:10px;opacity:.45;letter-spacing:.06em;text-transform:lowercase}#portal:hover .pl{opacity:.9}`;
  document.head.appendChild(css);
  const sym = (r, color) => { const s = document.createElement("div"); s.className = "portal-sym"; s.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;color:${color || "#fff"}`; s.innerHTML = window.NOLL_ICON ? window.NOLL_ICON("100%") : ""; document.body.appendChild(s); return s; };
  const layer = (c) => { const o = document.createElement("div"); o.className = "portal-layer"; o.style.background = c; document.body.appendChild(o); return o; };
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const btn = document.getElementById("portal");
  if (btn) {
    btn.href = P.url; btn.setAttribute("aria-label", P.label);
    btn.innerHTML = `<span class="pi">${window.NOLL_ICON ? window.NOLL_ICON(22) : "Ø"}</span><span class="pl"></span>`; btn.querySelector(".pl").textContent = P.label;
    btn.addEventListener("click", async (e) => {
      if (reduce || e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault();
      const r = btn.querySelector(".pi").getBoundingClientRect(), o = layer(COLORS[P.leave]); o.style.opacity = 0; const s = sym(r, P.iconColor);
      await wait(30); o.style.opacity = 1; s.style.color = "#fff"; const S = 120; s.style.left = innerWidth / 2 - S / 2 + "px"; s.style.top = innerHeight / 2 - S / 2 + "px"; s.style.width = s.style.height = S + "px";
      await wait(850); const ring = document.createElement("div"); ring.className = "portal-ring"; const R = 190; ring.style.cssText = `left:${innerWidth / 2 - R / 2}px;top:${innerHeight / 2 - R / 2}px;width:${R}px;height:${R}px`; document.body.appendChild(ring);
      await wait(1100); location.href = P.url + (P.url.includes("?") ? "&" : "?") + "portal=" + P.leave;
    });
  }
  // ---- arriving from the other site ----
  const from = new URLSearchParams(location.search).get("portal");
  if (from && COLORS[from] && btn) {
    const root = document.documentElement; root.classList.add("portal-in");
    const run = async () => {
      const o = layer(COLORS[from]), S = 120; const s = sym({ left: innerWidth / 2 - S / 2, top: innerHeight / 2 - S / 2, width: S, height: S }, "#fff");
      await wait(500); scrollTo(0, document.documentElement.scrollHeight); await wait(60);       // bring the footer icon into view (hidden under the layer)
      const t = btn.querySelector(".pi").getBoundingClientRect(); btn.style.visibility = "hidden";
      root.classList.remove("portal-in"); btn.style.visibility = "hidden";
      s.style.left = t.left + "px"; s.style.top = t.top + "px"; s.style.width = t.width + "px"; s.style.height = t.height + "px"; s.style.color = P.iconColor;
      await wait(350); o.style.opacity = 0; await wait(520); btn.style.visibility = ""; s.remove(); o.remove();
      scrollTo({ top: 0, behavior: "smooth" }); history.replaceState(null, "", location.pathname + location.hash);
    };
    if (reduce) { root.classList.remove("portal-in"); history.replaceState(null, "", location.pathname + location.hash); } else run();
  } else document.documentElement.classList.remove("portal-in");
})();
