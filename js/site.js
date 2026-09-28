// Gedeelde code voor alle pagina's. Laad dit vóór het pagina-script.

// ============================================================
// Helpers
// ============================================================
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const icon = n => `<svg class="ico" aria-hidden="true"><use href="assets/icons.svg#i-${n}"/></svg>`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const clamp01 = v => Math.min(1, Math.max(0, v));

// Titels met .split-words: elk woord in een masker, zodat het omhoog kan schuiven
$$('.split-words').forEach(el => {
  const dot = el.querySelector('.dot');
  const words = el.firstChild.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) => `<span class="w"><span style="animation-delay:${0.25 + i * 0.09}s">${w}</span></span>`).join(' ');
  if (dot) {
    dot.style.animationDelay = `${0.25 + words.length * 0.09 + 0.2}s`;
    el.lastElementChild.firstElementChild.append(dot);
  }
});

// ============================================================
// Header: menu, rand + verbergen bij omlaag scrollen, actieve link
// ============================================================
const header = $('header.site'), menuBtn = $('#menuBtn');
menuBtn.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
  document.body.style.overflow = open ? 'hidden' : '';
});
$$('#nav a').forEach(a => a.addEventListener('click', () => { if (header.classList.contains('open')) menuBtn.click(); }));

let lastY = scrollY;
addEventListener('scroll', () => {
  const y = scrollY;
  header.classList.toggle('scrolled', y > 8);
  if (!header.classList.contains('open')) header.classList.toggle('hide', y > 500 && y > lastY);
  lastY = y;
}, { passive: true });

// Menu-links naar een sectie op deze pagina lichten op als die sectie in beeld is
const navLinks = $$('#nav a:not(.btn)').filter(a => a.getAttribute('href').startsWith('#'));
const spy = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
navLinks.forEach(a => { const t = document.querySelector(a.getAttribute('href')); if (t) spy.observe(t); });

// ============================================================
// Grote "q" in de hero van subpagina's: beweegt mee met scroll en muis
// ============================================================
const heroQ = $('#heroQ');
if (heroQ && !reduceMotion) {
  let mx = 0, my = 0, qx = 0, qy = 0, raf = null;
  const render = () => {
    qx += (mx - qx) * 0.06; qy += (my - qy) * 0.06;
    const s = scrollY;
    heroQ.style.transform = `translate(${qx}px, ${qy + s * 0.25}px) rotate(${-8 + s * 0.02 + qx * 0.05}deg)`;
    raf = Math.abs(mx - qx) + Math.abs(my - qy) > 0.3 ? requestAnimationFrame(render) : null;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(render); };
  if (finePointer) addEventListener('pointermove', e => {
    mx = (e.clientX / innerWidth - 0.5) * 40; my = (e.clientY / innerHeight - 0.5) * 30; kick();
  });
  addEventListener('scroll', kick, { passive: true });
  render();
}

// ============================================================
// Reveal bij in beeld komen (na het opbouwen van de pagina-inhoud)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  $$('.reveal, .stagger').forEach(el => io.observe(el));
});

$('#year').textContent = new Date().getFullYear();
