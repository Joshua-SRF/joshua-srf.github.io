/* Renders Site A from content.js. You normally never edit this file. */
(function () {
  const $ = (s) => document.querySelector(s), base = document.body.dataset.base || "";
  const stats = (a) => a.map(s => `<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join("");
  const card = (p) => `<a class="card" href="${base}${p.slug}/"><div class="thumb ${p.img ? "" : "noimg"}" style="${p.img ? `background-image:url(${base}${p.img})` : ""}"></div><small>${p.tag}</small><h3>${p.title}</h3><p>${p.blurb}</p><span>${p.docs.length ? "Read report" : "View breakdown"} &rarr;</span></a>`;
  const IN = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.75h4V21H3zM9.75 9.75h3.8v1.6h.06c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.64 4.74 6.07V21h-4v-5.05c0-1.2-.02-2.75-1.68-2.75-1.68 0-1.94 1.31-1.94 2.66V21h-4z"/></svg>';
  const MAIL = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';

  // contact icons (LinkedIn opens the profile; email icon reveals the address)
  document.querySelectorAll(".social").forEach(box => {
    box.innerHTML = `<a href="${SITE.LINKEDIN}" target="_blank" rel="noopener" aria-label="LinkedIn">${IN}</a><span class="mailwrap"><button type="button" class="mailbtn" aria-label="Show email address">${MAIL}</button><span class="mailpop" hidden><a href="mailto:${SITE.EMAIL}">${SITE.EMAIL}</a></span></span>`;
    box.querySelector(".mailbtn").onclick = () => { const p = box.querySelector(".mailpop"); p.hidden = !p.hidden; };
  });
  const o = $("#other"); if (o) { if (SITE.OTHER_SITE) { o.href = SITE.OTHER_SITE; o.textContent = SITE.OTHER_SITE_LABEL; } else o.remove(); }

  if ($("#hero-bio")) {                                     // ---------- HOME ----------
    const b = $("#banner"); b.src = SITE.BANNER_IMAGE; b.onerror = () => b.parentNode.classList.add("nobanner");
    $("#hero-kicker").textContent = HERO.kicker; $("#hero-bio").textContent = HERO.bio;
    [["#dl-cv", "cv"], ["#dl-ats", "ats"], ["#dl-cover", "cover"]].forEach((x, i) => { $(x[0]).href = SITE.DOWNLOADS[x[1]]; $(x[0]).textContent = HERO.buttons[i]; });
    $("#stats").innerHTML = stats(STATS);
    $("#projects-title").textContent = PROJECTS_SECTION.title; $("#projects-sub").textContent = PROJECTS_SECTION.sub;
    $("#projects").innerHTML = PROJECTS.map(card).join("");
    $("#certs-title").textContent = CERTS_SECTION.title; $("#certs-sub").textContent = CERTS_SECTION.sub; $("#certs-note").textContent = CERTS_SECTION.note;
    const EXT = ["jpg", "png", "webp"];                     // tries .jpg then .png then .webp
    const certSrc = (img, id, i = 0) => { img.onerror = () => { if (i < EXT.length - 1) certSrc(img, id, i + 1); }; img.src = `assets/certs/${id}.${EXT[i]}`; };
    $("#certs").innerHTML = CERTS.map(c => `<button class="cert" data-id="${c[0]}" aria-label="View ${c[1]}"><img alt="" draggable="false" oncontextmenu="return false"><span>${c[1]}</span></button>`).join("");
    document.querySelectorAll(".cert").forEach(b => certSrc(b.querySelector("img"), b.dataset.id));
    const lb = $("#lightbox"), img = $("#lb-img"); let cur = "";
    document.querySelectorAll(".cert").forEach(b => b.onclick = () => { cur = b.dataset.id; certSrc(img, cur); $("#lb-title").textContent = (CERTS.find(c => c[0] === cur) || [])[1]; lb.style.setProperty("--wm", `"${SITE.WATERMARK}"`); lb.hidden = false; });
    $("#lb-close").onclick = () => (lb.hidden = true); lb.onclick = (e) => { if (e.target === lb) lb.hidden = true; };
    document.addEventListener("keydown", e => { if (e.key === "Escape") lb.hidden = true; });
    $("#lb-request").onclick = () => { lb.hidden = true; NOLL.open({ preselect: ["cert_request"], cert: cur }); };
  } else {                                                  // ---------- PROJECT PAGE ----------
    const p = PROJECTS.find(x => x.slug === document.body.dataset.slug); if (!p) return;
    document.title = p.title + " \u2014 " + SITE.NAME;
    $("#p-tag").textContent = p.tag; $("#p-title").textContent = p.title; $("#p-blurb").textContent = p.blurb; $("#p-stats").innerHTML = stats(p.stats);
    if (p.docs.length) {                                    // report viewer at the TOP of the page
      const v = $("#p-viewer"); v.hidden = false;
      v.innerHTML = `<div class="vbar"><b>Report</b>${p.docs.map((d, i) => `<button class="tab ${i ? "" : "on"}" data-i="${i}">${d[0]}</button>`).join("")}<a id="vopen" target="_blank" rel="noopener">Open in new tab &#8599;</a></div><iframe id="vframe" title="Project report" loading="lazy"></iframe><p class="vhint">Scroll inside the document. On a phone, use &ldquo;Open in new tab&rdquo;.</p>`;
      const show = (i) => { const u = base + p.docs[i][1]; $("#vframe").src = u + "#view=FitH"; $("#vopen").href = u; v.querySelectorAll(".tab").forEach(t => t.classList.toggle("on", +t.dataset.i === i)); };
      v.querySelectorAll(".tab").forEach(t => t.onclick = () => show(+t.dataset.i)); show(0);
    }
    $("#p-body").innerHTML = p.sections.map((s, i) => `<section><h2><i>0${i + 1}</i>${s[0]}</h2><p>${s[1]}</p></section>`).join("");
    $("#p-more").innerHTML = PROJECTS.filter(x => x.slug !== p.slug).map(card).join("");
  }
})();
