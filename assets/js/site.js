/* === Renders everything from content.js. You normally never edit this file. === */
(function () {
  const $ = (s) => document.querySelector(s), base = document.body.dataset.base || "";
  const card = (p) => `<a class="card" href="${base}${p.slug}/"><div class="thumb" style="${p.img ? `background-image:url(${base}${p.img})` : ""}"></div><small>${p.tag}</small><h3>${p.title}</h3><p>${p.blurb}</p><span>View breakdown &rarr;</span></a>`;
  const stats = (a) => a.map(s => `<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join("");

  if ($("#hero-title")) {                                   // ---------- HOME ----------
    $("#hero").style.setProperty("--banner", `url(${new URL(SITE.BANNER_IMAGE, location.href).href})`);
    $("#hero-kicker").textContent = HERO.kicker; $("#hero-title").innerHTML = HERO.title; $("#hero-bio").textContent = HERO.bio;
    $("#dl-cv").href = SITE.DOWNLOADS.cv; $("#dl-ats").href = SITE.DOWNLOADS.ats; $("#dl-cover").href = SITE.DOWNLOADS.cover;
    $("#stats").innerHTML = stats(STATS);
    $("#projects").innerHTML = PROJECTS.map(card).join("");
    $("#certs").innerHTML = CERTS.map(c => `<button class="cert" data-id="${c[0]}" aria-label="View ${c[1]}"><img src="assets/certs/${c[0]}.jpg" alt="" draggable="false" oncontextmenu="return false"><span>${c[1]}</span></button>`).join("");
    const lb = $("#lightbox"), img = $("#lb-img"); let cur = "";
    document.querySelectorAll(".cert").forEach(b => b.onclick = () => {
      cur = b.dataset.id; img.src = `assets/certs/${cur}.jpg`; $("#lb-title").textContent = (CERTS.find(c => c[0] === cur) || [])[1];
      lb.style.setProperty("--wm", `"${SITE.WATERMARK}"`); lb.hidden = false; });
    $("#lb-close").onclick = () => (lb.hidden = true); lb.onclick = (e) => { if (e.target === lb) lb.hidden = true; };
    document.addEventListener("keydown", e => { if (e.key === "Escape") lb.hidden = true; });
    $("#lb-request").onclick = () => { lb.hidden = true; NOLL.open({ preselect: ["cert_request"], cert: cur }); };   // opens NØLL with this certificate pre-selected
  } else {                                                   // ---------- PROJECT PAGE ----------
    const p = PROJECTS.find(x => x.slug === document.body.dataset.slug); if (!p) return;
    document.title = p.title + " \u2014 " + SITE.NAME;
    $("#p-tag").textContent = p.tag; $("#p-title").textContent = p.title; $("#p-blurb").textContent = p.blurb; $("#p-stats").innerHTML = stats(p.stats);
    $("#p-img").style.backgroundImage = p.img ? `url(${base}${p.img})` : "";
    $("#p-body").innerHTML = p.sections.map((s, i) => `<section><h2><i>0${i + 1}</i>${s[0]}</h2><p>${s[1]}</p></section>`).join("");
    $("#p-more").innerHTML = PROJECTS.filter(x => x.slug !== p.slug).map(card).join("");
  }
})();
