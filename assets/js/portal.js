/* =====================================================================
   PORTAL: the NØLL-symbol transition between the two sites.  Settings come from content.js -> PORTAL.
   LEAVING : click the footer Ø -> screen turns black (or blue), the Ø pops to the centre and spins 360° once -> other site opens.
   ARRIVING: the colour screen is already there with the Ø in the centre -> the Ø glides to the chat-widget spot and the widget pops in.
   You normally never edit this file.
   ===================================================================== */
(function () {
  const P = window.PORTAL; if (!P) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, COLORS = { black: "#000000", blue: "#0b5fff" };
  const EASE = "cubic-bezier(.6,0,.2,1)", css = document.createElement("style");
  css.textContent = `.portal-layer{position:fixed;inset:0;z-index:99998;transition:opacity .7s ease}
.portal-sym{position:fixed;z-index:99999;color:#fff;display:grid;place-items:center;transition:left .75s ${EASE},top .75s ${EASE},width .75s ${EASE},height .75s ${EASE},color .75s,transform 1s cubic-bezier(.65,0,.25,1)}
.portal-sym svg{width:100%;height:100%}.portal-in body>*:not(.portal-layer):not(.portal-sym){visibility:hidden}
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
      await wait(30); o.style.opacity = 1; s.style.color = "#fff";                                                         // screen changes colour, Ø pops to the centre
      const S = 130, W = document.documentElement.clientWidth, H = document.documentElement.clientHeight;
      s.style.left = W / 2 - S / 2 + "px"; s.style.top = H / 2 - S / 2 + "px"; s.style.width = s.style.height = S + "px";
      await wait(800); s.style.transform = "rotate(360deg)";                                                              // one full turn
      await wait(1050); location.href = P.url + (P.url.includes("?") ? "&" : "?") + "portal=" + P.leave;
    });
  }
  // ---- arriving from the other site: the Ø settles on the chat widget ----
  const from = new URLSearchParams(location.search).get("portal"), root = document.documentElement, L = document.querySelector(".noll-launch");
  const clean = () => history.replaceState(null, "", location.pathname + location.hash);
  if (from && COLORS[from] && !reduce) {
    if (L) { L.style.visibility = "hidden"; L.style.animation = "none"; }
    (async () => {
      const W = document.documentElement.clientWidth, H = document.documentElement.clientHeight, S = 130;
      const o = layer(COLORS[from]), s = sym({ left: W / 2 - S / 2, top: H / 2 - S / 2, width: S, height: S }, "#fff");
      root.classList.remove("portal-in"); await wait(450);                                                                // page is ready underneath, Ø rests in the centre
      const T = 32, tx = W - 20 - 60 + (60 - T) / 2, ty = H - 20 - 60 + (60 - T) / 2;                                    // where the widget's Ø sits (bottom-right)
      s.style.left = tx + "px"; s.style.top = ty + "px"; s.style.width = s.style.height = T + "px";
      await wait(280); o.style.opacity = 0;                                                                               // colour screen fades while the Ø glides
      await wait(560);
      if (L) { L.style.visibility = ""; L.style.animation = "nollpop .5s cubic-bezier(.2,.9,.3,1.35) both"; }            // widget circle pops in around the Ø
      await wait(120); s.remove(); await wait(400); o.remove(); clean();
    })();
  } else { root.classList.remove("portal-in"); if (from) clean(); }
})();
