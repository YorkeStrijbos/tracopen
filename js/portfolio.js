// Portfoliopagina. Vereist js/site.js en js/components.js (daar staan de projecten en klanten).

// ============================================================
// Opbouwen
// ============================================================

// Projecten
$('#projects').innerHTML = PROJECTS.map((p, i) => `
  <article class="project" style="--i:${i}">
    <div class="project-img"><img src="${p.img}" alt="Product voor ${p.brand}" loading="lazy"></div>
    <div class="project-body">
      <h3>${esc(p.brand)}</h3>
      <p>${p.text}</p>
      <span class="project-arrow">${icon('arrow-right')}</span>
    </div>
  </article>`).join('');

// 3D-kanteling die de muis volgt
if (finePointer && !reduceMotion) {
  $$('.project').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
      card.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
      card.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  });
}

// Branches (filter)
$('#branches').innerHTML = BRANCHES.map(([k, label, ic]) =>
  `<button type="button" data-branch="${k}" aria-pressed="false">${icon(ic)}<span>${esc(label)}</span><em>${CLIENTS.filter(c => c[1] === k).length}</em></button>`).join('');

// Logo's
$('#logos').innerHTML = CLIENTS.map(([name, branch, style, logo], i) => `
  <div class="logo-cell" data-branch="${branch}" style="--i:${i % 5 + Math.floor(i / 5)}">
    ${logo ? `<img src="assets/logos/${logo}" alt="${name}" loading="lazy">` : `<span class="wordmark wm-${style}">${esc(name)}</span>`}
  </div>`).join('');

const logoCells = $$('.logo-cell');
$('#branches').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const on = b.getAttribute('aria-pressed') !== 'true'; // nogmaals klikken = alles tonen
  $$('#branches button').forEach(x => x.setAttribute('aria-pressed', on && x === b));
  const k = on ? b.dataset.branch : null;
  $('#logos').classList.toggle('filtering', !!k);
  logoCells.forEach(c => c.classList.toggle('match', c.dataset.branch === k));
});
