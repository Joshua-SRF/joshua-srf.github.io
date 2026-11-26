/* Renders Site A from content.js. You normally never edit this file. */
(function () {
  const $ = (s) => document.querySelector(s), base = document.body.dataset.base || "";
  const stats = (a) => a.map(s => `<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join("");
  const card = (p) => `<a class="card" href="${base}${p.slug}/"><div class="thumb noimg" data-slug="${p.slug}"></div><small>${p.tag}</small><h3>${p.title}</h3><p>${p.blurb}</p><span>${p.deck ? "Slides + report" : p.docs.length ? "Read report" : "View breakdown"} &rarr;</span></a>`;
  // thumbnails: your picture (IMG_DIR/<slug>.jpg|png|webp) first, then the default cover (COVER_DIR/<slug>.jpg)
  function loadThumbs() { document.querySelectorAll(".thumb[data-slug]").forEach(el => { const s = el.dataset.slug;
    const urls = ["jpg", "png", "webp", "jpeg"].map(e => `${base}${IMG_DIR}${s}.${e}`).concat([`${base}${COVER_DIR}${s}.jpg`]);
    (function next(i) { if (i >= urls.length) return; const im = new Image(); im.onload = () => { el.style.backgroundImage = `url(${urls[i]})`; el.classList.remove("noimg"); }; im.onerror = () => next(i + 1); im.src = urls[i]; })(0); }); }
  const IN = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.75h4V21H3zM9.75 9.75h3.8v1.6h.06c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.64 4.74 6.07V21h-4v-5.05c0-1.2-.02-2.75-1.68-2.75-1.68 0-1.94 1.31-1.94 2.66V21h-4z"/></svg>';
  const MAIL = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
  document.querySelectorAll(".brand").forEach(b => { b.textContent = SITE.BRAND; });
  document.querySelectorAll(".social").forEach(box => {                      // LinkedIn opens; email icon reveals the address
    box.innerHTML = `<a href="${SITE.LINKEDIN}" target="_blank" rel="noopener" aria-label="LinkedIn">${IN}</a><span class="mailwrap"><button type="button" class="mailbtn" aria-label="Show email address">${MAIL}</button><span class="mailpop" hidden><a href="mailto:${SITE.EMAIL}">${SITE.EMAIL}</a></span></span>`;
    box.querySelector(".mailbtn").onclick = () => { const p = box.querySelector(".mailpop"); p.hidden = !p.hidden; }; });

  // ----- slideshow banner (auto-flips, click arrows / dots / swipe / arrow keys) -----
  function deck(d, box) {
    const n = d.count, src = (i) => `${base}${d.dir}/${String(i + 1).padStart(2, "0")}.jpg`; let i = 0, timer = null, paused = false, hover = false;
    box.hidden = false;
    box.innerHTML = `<div class="vbar"><b>${d.label || "Presentation"}</b><span class="dcount"></span><a class="dl" href="${base}${d.pdf}" download>Download slides (PDF)</a></div>
      <div class="dstage" tabindex="0" aria-label="Slideshow"><img alt="Slide"><button class="dnav prev" aria-label="Previous slide">&#10094;</button><button class="dnav next" aria-label="Next slide">&#10095;</button></div>
      <div class="dbar"><button class="dplay" type="button">Pause</button><div class="ddots"></div></div>`;
    const img = box.querySelector("img"), dots = box.querySelector(".ddots"), cnt = box.querySelector(".dcount"), stage = box.querySelector(".dstage");
    dots.innerHTML = Array.from({ length: n }, (_, k) => `<button aria-label="Slide ${k + 1}" data-k="${k}"></button>`).join("");
    const show = (k) => { i = (k + n) % n; img.style.opacity = 0; setTimeout(() => { img.src = src(i); }, 120); cnt.textContent = (i + 1) + " / " + n;
      dots.querySelectorAll("button").forEach((b, x) => b.classList.toggle("on", x === i)); new Image().src = src((i + 1) % n); };
    img.onload = () => { img.style.opacity = 1; };
    const tick = () => { clearInterval(timer); if (!paused) timer = setInterval(() => { if (!hover) show(i + 1); }, d.interval || 4500); };
    const go = (k) => { show(k); tick(); };
    box.querySelector(".prev").onclick = () => go(i - 1); box.querySelector(".next").onclick = () => go(i + 1);
    dots.onclick = (e) => { if (e.target.dataset.k) go(+e.target.dataset.k); };
    box.querySelector(".dplay").onclick = function () { paused = !paused; this.textContent = paused ? "Play" : "Pause"; tick(); };
    stage.onmouseenter = () => (hover = true); stage.onmouseleave = () => (hover = false);
    stage.onkeydown = (e) => { if (e.key === "ArrowLeft") go(i - 1); if (e.key === "ArrowRight") go(i + 1); };
    let x0 = null; stage.onpointerdown = (e) => (x0 = e.clientX); stage.onpointerup = (e) => { if (x0 !== null && Math.abs(e.clientX - x0) > 50) go(i + (e.clientX < x0 ? 1 : -1)); x0 = null; };
    show(0); tick();
  }

  if ($("#hero-bio")) {                                     // ---------- HOME ----------
    const b = $("#banner"); b.src = SITE.BANNER_IMAGE; b.onerror = () => b.parentNode.classList.add("nobanner");
    $("#hero-kicker").innerHTML = HERO.kicker.map(k => k[1] ? `<a href="${k[1]}" target="_blank" rel="noopener">${k[0]}</a>` : k[0]).join(" \u00b7 ");
    $("#hero-bio").textContent = HERO.bio;
    [["#dl-cv", "cv"], ["#dl-ats", "ats"], ["#dl-cover", "cover"]].forEach((x, i) => { $(x[0]).href = SITE.DOWNLOADS[x[1]]; $(x[0]).textContent = HERO.buttons[i]; });
    $("#stats").innerHTML = stats(STATS);
    $("#projects-title").textContent = PROJECTS_SECTION.title; $("#projects-sub").textContent = PROJECTS_SECTION.sub;
    $("#projects").innerHTML = PROJECTS.map(card).join(""); loadThumbs();
    $("#certs-title").textContent = CERTS_SECTION.title; $("#certs-sub").textContent = CERTS_SECTION.sub; $("#certs-note").textContent = CERTS_SECTION.note;
    // certificate pictures: <id>-thumb.jpg = small preview shown BEFORE clicking, <id>.jpg = the picture shown when clicked (.png/.webp also work). Falls back to the other one.
    const EXT = ["jpg", "png", "webp"];
    const certSrc = (img, id, thumb) => { const list = []; (thumb ? [id + "-thumb", id] : [id, id + "-thumb"]).forEach(n => EXT.forEach(e => list.push(`assets/certs/${n}.${e}`)));
      const next = (k) => { img.onerror = () => { if (k + 1 < list.length) next(k + 1); }; img.src = list[k]; }; next(0); };
    $("#certs").innerHTML = CERTS.map(c => `<button class="cert" data-id="${c[0]}" aria-label="View ${c[1]}"><img alt="" draggable="false" oncontextmenu="return false"><span>${c[1]}</span></button>`).join("");
    document.querySelectorAll(".cert").forEach(b => certSrc(b.querySelector("img"), b.dataset.id, true));
    const lb = $("#lightbox"), img = $("#lb-img"); let cur = "";
    document.querySelectorAll(".cert").forEach(b => b.onclick = () => { cur = b.dataset.id; certSrc(img, cur, false); $("#lb-title").textContent = (CERTS.find(c => c[0] === cur) || [])[1]; lb.style.setProperty("--wm", `"${SITE.WATERMARK}"`); lb.hidden = false; });
    $("#lb-close").onclick = () => (lb.hidden = true); lb.onclick = (e) => { if (e.target === lb) lb.hidden = true; };
    document.addEventListener("keydown", e => { if (e.key === "Escape") lb.hidden = true; });
    $("#lb-request").onclick = () => { lb.hidden = true; NOLL.certRequest([cur]); };      // centred request pop-up, this certificate pre-ticked
  } else {                                                  // ---------- PROJECT PAGE ----------
    const p = PROJECTS.find(x => x.slug === document.body.dataset.slug); if (!p) return;
    document.title = p.title + " \u2014 " + SITE.NAME;
    $("#p-tag").textContent = p.tag; $("#p-title").textContent = p.title; $("#p-blurb").textContent = p.blurb; $("#p-stats").innerHTML = stats(p.stats);
    if (p.deck) deck(p.deck, $("#p-deck"));
    if (p.docs.length) {                                    // report viewer (scrollable)
      const v = $("#p-viewer"); v.hidden = false;
      v.innerHTML = `<div class="vbar"><b>${p.docs.length > 1 ? "Documents" : p.docs[0][0]}</b>${p.docs.length > 1 ? p.docs.map((d, i) => `<button class="tab ${i ? "" : "on"}" data-i="${i}">${d[0]}</button>`).join("") : ""}<a id="vopen" target="_blank" rel="noopener">Open in new tab &#8599;</a></div><iframe id="vframe" title="Project report" loading="lazy"></iframe><p class="vhint">Scroll inside the document. On a phone, use &ldquo;Open in new tab&rdquo;.</p>`;
      const show = (i) => { const u = base + p.docs[i][1]; $("#vframe").src = u + "#view=FitH"; $("#vopen").href = u; v.querySelectorAll(".tab").forEach(t => t.classList.toggle("on", +t.dataset.i === i)); };
      v.querySelectorAll(".tab").forEach(t => t.onclick = () => show(+t.dataset.i)); show(0);
    }
    if (p.figures) $("#p-gallery").innerHTML = `<h2 class="t">Pictures & results</h2><div class="figs">` + p.figures.map(f => `<figure><img src="${base}assets/img/figures/${f[0]}" alt="${f[1]}" loading="lazy"><figcaption>${f[1]}</figcaption></figure>`).join("") + `</div>`;
    $("#p-body").innerHTML = p.sections.map((s, i) => `<section><h2><i>0${i + 1}</i>${s[0]}</h2><p>${s[1]}</p></section>`).join("");
    $("#p-more").innerHTML = PROJECTS.filter(x => x.slug !== p.slug).map(card).join(""); loadThumbs();
  }

  // top bar: hides while you scroll down, comes back as soon as you scroll up
  const nav = document.querySelector("nav");
  if (nav) { let y0 = scrollY, tick = false;
    addEventListener("scroll", () => { if (tick) return; tick = true; requestAnimationFrame(() => { const y = scrollY;
      if (y < 60 || y < y0 - 6) nav.classList.remove("nav-hidden"); else if (y > y0 + 6) { nav.classList.add("nav-hidden"); document.querySelectorAll(".mailpop").forEach(m => (m.hidden = true)); }
      y0 = y; tick = false; }); }, { passive: true }); }
})();
