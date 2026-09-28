// Herbruikbare onderdelen. Elk onderdeel start alleen als het op de pagina staat,
// dus dit script kan op elke pagina geladen worden. Vereist js/site.js.

// ============================================================
// Inhoud (pas hier teksten, diensten, team en kaart aan)
// ============================================================

// Vier pijlers, elk met drie diensten: [titel, korte omschrijving]
const PILLARS = [
  {
    icon: 'search', title: 'Sourcing', img: 'assets/img/pijler-sourcing.jpg',
    text: 'We vinden en beoordelen de juiste producent voor jouw product, binnen ons betrouwbare netwerk in China.',
    services: [['China sourcing', 'van idee tot levering'], ['Voorselectie leveranciers', 'gescreend en beoordeeld'], ['Producenten & leveranciers', 'betrouwbaar netwerk']]
  },
  {
    icon: 'handshake', title: 'Inkoop & afspraken', img: 'assets/img/pijler-inkoop.jpg',
    text: 'Direct en transparant inkopen, met heldere contracten en juridische zekerheid.',
    services: [['Inkoop & trading', 'direct en transparant'], ['Contracten', 'heldere afspraken'], ['Juridische ondersteuning', 'documenten en voorwaarden']]
  },
  {
    icon: 'shield-check', title: 'Productie & kwaliteit', img: 'assets/img/pijler-productie.jpg',
    text: 'Van concept tot realiseerbaar product, met controle ter plaatse vóór er iets wordt verzonden.',
    services: [['Productontwikkeling', 'concept tot product'], ['Kwaliteitscontrole', 'vóór verzending'], ['Risicomanagement', 'minder verrassingen']]
  },
  {
    icon: 'truck', title: 'Begeleiding & transport', img: 'assets/img/pijler-transport.jpg',
    text: 'Eén aanspreekpunt dat de taal spreekt en alles regelt tot het product bij jou is.',
    services: [['Inkoopbegeleiding', 'bij elke stap'], ['Communicatie in China', 'zonder taalbarrière'], ['Transportadvies', 'verzending en logistiek']]
  }
];

// Uitgebreide omschrijving + icoon per dienst (diensten-pagina)
const SERVICE_INFO = {
  'China sourcing': ['compass', 'Complete begeleiding van idee tot levering.'],
  'Voorselectie leveranciers': ['list-checks', 'Wij vinden en beoordelen geschikte producenten.'],
  'Producenten & leveranciers': ['factory', 'Toegang tot een betrouwbaar netwerk in China.'],
  'Inkoop & trading': ['handshake', 'Wij verzorgen jouw inkoop direct en transparant.'],
  'Contracten': ['file-text', 'Heldere afspraken met leveranciers en producenten.'],
  'Juridische ondersteuning': ['scale', 'Zekerheid bij afspraken, documenten en voorwaarden.'],
  'Productontwikkeling': ['lightbulb', 'Van concept tot realiseerbaar product.'],
  'Kwaliteitscontrole': ['shield-check', 'Controle op kwaliteit vóór verzending.'],
  'Risicomanagement': ['shield-alert', 'Beperk risico’s in inkoop en productie.'],
  'Inkoopbegeleiding': ['search', 'Ondersteuning bij elke stap van het inkoopproces.'],
  'Communicatie in China': ['messages-square', 'Lokale afstemming zonder taal- of cultuurbarrière.'],
  'Transportadvies': ['truck', 'Slimme begeleiding bij verzending en logistiek.']
};

// Bestemmingen waar vanuit Harderwijk aan geleverd wordt (lijnen op de wereldkaart).
// x/y zijn posities op de kaartafbeelding (1024 × 599). Pas aan naar de echte afzetmarkten.
const EXPORT = [
  ['Dublin', 462, 205], ['Londen', 478, 210], ['Parijs', 492, 232], ['Berlijn', 522, 215], ['Oslo', 515, 172],
  ['Stockholm', 535, 172], ['Helsinki', 560, 168], ['Warschau', 548, 212], ['Milaan', 513, 240], ['Madrid', 470, 258],
  ['Lissabon', 455, 262], ['Athene', 560, 262], ['Istanbul', 578, 250], ['Cairo', 585, 290], ['Dubai', 640, 305],
  ['Lagos', 505, 360], ['Nairobi', 605, 385], ['Johannesburg', 580, 470], ['Mumbai', 695, 325], ['Singapore', 772, 390],
  ['Tokio', 880, 262], ['Sydney', 905, 505], ['Toronto', 300, 232], ['New York', 328, 250], ['Miami', 282, 300],
  ['Los Angeles', 190, 272], ['Mexico-stad', 222, 318], ['São Paulo', 345, 470]
];
const HOME = [498, 221]; // Harderwijk

const USPS = [
  ['Betrouwbare partner', 'Eén aanspreekpunt en heldere afspraken, van eerste gesprek tot levering.'],
  ['Exclusief productierecht', 'Jouw product, jouw rechten: vastgelegd in duidelijke afspraken met de producent.'],
  ['Eigen team in China', 'Collega’s in Ningbo voor sourcing, kwaliteitscontrole en shipping.'],
  ['Kennis en ervaring', 'Lokale kennis van markt, taal en cultuur, met een Nederlandse werkwijze.'],
  ['Maatwerk en volledige ontzorging', 'Wij nemen het traject uit handen, afgestemd op jouw product en volume.'],
  ['Geen commissie', 'Transparant inkopen, zonder verborgen commissie op je bestelling.']
];

const TEAM_URL = 'https://www.tracopen.com/wp-content/uploads/';
const TEAM = [
  ['Max', 'NL', 'CEO', '2026/05/Max.jpg'], ['Alvin', 'PRC', 'Manager', '2026/05/12.jpg'],
  ['Roos', 'NL', 'Sales', '2026/05/Roos_3.jpg'], ['Daniel', 'NL', 'Design', '2026/05/Daniel.jpg'],
  ['Cindy', 'PRC', 'Assistant Manager', '2026/05/11.jpg'], ['Danny', 'PRC', 'Sourcing Manager', '2026/05/123244.jpg'],
  ['David', 'PRC', 'Quality Control', '2026/05/12344.jpg'], ['Doris', 'PRC', 'Assistant Manager', '2026/05/234sadf5.jpg'],
  ['Helen', 'PRC', 'Sourcing', '2026/05/3123.jpg'], ['Kate', 'PRC', 'Merchandiser', '2026/05/1234.jpg'],
  ['Mark', 'PRC', 'Sourcing', '2026/05/2345.jpg'], ['Olina', 'PRC', 'Shipping administrator', '2026/05/123.jpg'],
  ['Helen', 'PRC', 'Merchandiser', '2026/05/122.jpg'], ['Bob', 'NL', 'CHO (Chief happiness officer)', '2026/06/Bob.png']
];

// ---------- Portfolio: projecten, branches en klanten ----------
// Uitgelichte projecten. Vervang img door de echte productfoto.
const PROJECTS = [
  { brand: 'Porsche', text: 'Exclusieve premium gifts die merkenbeleving versterken.', img: 'assets/img/portfolio/porsche.jpg' },
  { brand: 'KLM', text: 'Duurzame relatiegeschenken voor klanten wereldwijd.', img: 'assets/img/portfolio/klm.jpg' },
  { brand: 'Makro', text: 'Praktische en kwalitatieve promotieartikelen voor elke dag.', img: 'assets/img/portfolio/makro.jpg' },
  { brand: 'De Boterlap', text: 'Sfeervolle producten die perfect passen bij het merk.', img: 'assets/img/portfolio/de-boterlap.jpg' }
];

const BRANCHES = [
  ['automotive', 'Automotive', 'car'],
  ['retail', 'Retail', 'shopping-cart'],
  ['industrie', 'Industrie', 'factory'],
  ['food', 'Food & Horeca', 'utensils'],
  ['leisure', 'Leisure & Hospitality', 'hotel'],
  ['overige', 'Overige', 'ellipsis']
];

// Klanten: [naam, branche, stijl van de tijdelijke woordmerk-weergave, logo-bestand]
// Zet een logo (svg/png) in assets/logos/ en vul de bestandsnaam in, dan vervangt
// die automatisch de tekstversie. Stijlen: caps, sans, bold, serif, script.
const CLIENTS = [
  ['Porsche', 'automotive', 'caps', ''],
  ['Volkswagen', 'automotive', 'bold', ''],
  ['Hyundai', 'automotive', 'caps', ''],
  ['bevaplast', 'industrie', 'bold', ''],
  ['KLM', 'leisure', 'bold', ''],
  ['De Regelmeisjes', 'overige', 'caps', ''],
  ['REYM', 'industrie', 'caps', ''],
  ['makro', 'retail', 'bold', ''],
  ['RVB Group', 'industrie', 'caps', ''],
  ['Phage Guard', 'industrie', 'caps', ''],
  ['Hans & Grietje', 'food', 'script', ''],
  ['De Boterlap', 'food', 'serif', ''],
  ["Buitenplaats 't Loo", 'leisure', 'caps', ''],
  ['de Zwarte Boer', 'food', 'script', ''],
  ['De Haringparty', 'food', 'script', ''],
  ['De Biergarten', 'food', 'serif', ''],
  ['Dries van den Berg', 'food', 'serif', ''],
  ['Art revisited', 'retail', 'bold', ''],
  ['Origineel pakket', 'retail', 'sans', ''],
  ['Procomm', 'overige', 'bold', '']
];

// ============================================================
// Statement: woorden kleuren in tijdens het scrollen
// ============================================================
const statement = $('#statement');
let statementWords = [];
if (statement) {
  const highlight = ['brug', 'productie', 'China.', 'Harderwijk', 'Ningbo.'];
  statement.innerHTML = statement.textContent.trim().split(/\s+/)
    .map(w => `<span class="sw${highlight.includes(w) ? ' hl' : ''}">${w}</span>`).join(' ');
  statementWords = $$('#statement .sw');
}

// ============================================================
// Pijlers (uitklappende panelen)
// ============================================================
if ($('#pillars')) {
  $('#pillars').innerHTML = PILLARS.map((p, i) => `
    <article class="pillar${i === 0 ? ' active' : ''}" tabindex="0" aria-expanded="${i === 0}">
      <div class="p-bg" style="background-image:url('${p.img}')"></div>
      <div class="p-top"><span class="p-num">0${i + 1}</span><span class="p-ico">${icon(p.icon)}</span></div>
      <div>
        <h3>${esc(p.title)}</h3>
        <div class="p-body"><div>
          <p>${p.text}</p>
          <ul>${p.services.map(([t, d]) => `<li>${esc(t)}<span>${d}</span></li>`).join('')}</ul>
        </div></div>
      </div>
    </article>`).join('');

  const pillars = $$('.pillar');
  const mqStack = matchMedia('(max-width: 960px)');
  const activate = el => !mqStack.matches && pillars.forEach(p => {
    p.classList.toggle('active', p === el);
    p.setAttribute('aria-expanded', p === el);
  });
  pillars.forEach(p => {
    if (finePointer) p.addEventListener('mouseenter', () => activate(p));
    p.addEventListener('click', () => activate(p));
    p.addEventListener('focus', () => activate(p));
  });
  // Op mobiel staan alle pijlers open onder elkaar
  const syncStack = () => mqStack.matches ? pillars.forEach(p => p.classList.add('active')) : activate(pillars[0]);
  mqStack.addEventListener('change', syncStack); syncStack();
}

// ============================================================
// Dienstenoverzicht per pijler (diensten-pagina)
// ============================================================
if ($('#serviceDetail')) {
  $('#serviceDetail').innerHTML = PILLARS.map((p, i) => `
    <div class="sd-row reveal" id="${p.title.toLowerCase().replace(/[^a-z]+/g, '-')}">
      <div class="sd-head">
        <span class="sd-num">0${i + 1}</span>
        <h3>${esc(p.title)}</h3>
        <p>${p.text}</p>
      </div>
      <div class="sd-img" style="background-image:url('${p.img}')"></div>
      <ul class="sd-list">${p.services.map(([t]) => {
        const [ic, d] = SERVICE_INFO[t] || ['check', ''];
        return `<li><span class="badge">${icon(ic)}</span><div><strong>${esc(t)}</strong><p>${d}</p></div></li>`;
      }).join('')}</ul>
    </div>`).join('');
}

// ============================================================
// Waarom Tracopen
// ============================================================
if ($('#whyGrid')) {
  $('#whyGrid').innerHTML = USPS.map(([t, d], i) =>
    `<div class="why-item reveal" style="transition-delay:${(i % 3) * 120}ms"><span class="n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></div>`).join('');
}

// ============================================================
// Team: spotlight met één grote foto, collega's als rondjes per kantoor
// ============================================================
if ($('#spotlight')) {
  const people = [...TEAM.filter(m => m[1] === 'NL'), ...TEAM.filter(m => m[1] === 'PRC')];
  const group = (loc, city) => {
    const list = people.map((m, i) => [m, i]).filter(([m]) => m[1] === loc);
    return `<div class="spot-group"><h3>${city}<span>${list.length}</span></h3><div class="avatars">${list.map(([[n, , r, img], i]) =>
      `<button type="button" class="avatar" data-i="${i}" aria-pressed="false" aria-label="${n}, ${r}"><img src="${TEAM_URL + img}" alt="" loading="lazy"></button>`).join('')}</div></div>`;
  };
  $('#spotGroups').innerHTML = group('NL', 'Harderwijk') + group('PRC', 'Ningbo');

  const spotPhoto = $('#spotPhoto'), spotImgs = [$('#spotImgA'), $('#spotImgB')], spotProgress = $('#spotProgress');
  const avatars = $$('.avatar');
  const SPOT_MS = 2500;
  let spotIndex = -1, front = 0, spotVisible = false;

  const restartTimer = () => {
    spotProgress.classList.remove('run'); void spotProgress.offsetWidth;
    if (reduceMotion || !spotVisible) return;
    spotProgress.style.setProperty('--dur', SPOT_MS + 'ms');
    spotProgress.classList.add('run');
  };
  const showPerson = i => {
    if (i === spotIndex) return;
    spotIndex = i;
    const [n, loc, r, img] = people[i];
    const next = spotImgs[1 - front];
    next.onload = () => {
      if (spotIndex !== i) return; // inmiddels al een andere persoon gekozen
      next.classList.add('show'); spotImgs[front].classList.remove('show'); front = 1 - front;
    };
    next.alt = `${n}, ${r}`;
    next.src = TEAM_URL + img;
    spotPhoto.classList.add('swap');
    setTimeout(() => {
      $('#spotName').textContent = n;
      $('#spotRole').textContent = r;
      $('#spotLoc').textContent = loc === 'NL' ? 'Harderwijk' : 'Ningbo';
      spotPhoto.classList.remove('swap');
    }, reduceMotion ? 0 : 250);
    avatars.forEach(a => a.setAttribute('aria-pressed', +a.dataset.i === i));
    restartTimer();
  };
  // volgende persoon zodra de balk vol is (pauzeert vanzelf bij hover)
  spotProgress.addEventListener('animationend', () => showPerson((spotIndex + 1) % people.length));
  avatars.forEach(a => {
    a.addEventListener('click', () => showPerson(+a.dataset.i));
    if (finePointer) a.addEventListener('mouseenter', () => showPerson(+a.dataset.i));
  });
  new IntersectionObserver(([en]) => { spotVisible = en.isIntersecting; restartTimer(); }, { threshold: 0.3 }).observe($('#spotlight'));
  showPerson(0);
}

// ============================================================
// Wereldkaart: exportlijnen vanuit Harderwijk
// ============================================================
if ($('#exportRoutes')) {
  const exportGroup = $('#exportRoutes');
  EXPORT.forEach(([name, x, y], i) => {
    const [hx, hy] = HOME, dx = x - hx, dy = y - hy, dist = Math.hypot(dx, dy);
    // boog: controlepunt loodrecht op de lijn, altijd naar boven
    let nx = -dy / dist, ny = dx / dist; if (ny > 0) { nx = -nx; ny = -ny; }
    const bend = Math.min(90, dist * 0.28);
    const d = `M${hx} ${hy} Q ${(hx + x) / 2 + nx * bend} ${(hy + y) / 2 + ny * bend}, ${x} ${y}`;
    const delay = 0.7 + i * 0.04;
    exportGroup.insertAdjacentHTML('beforeend', `
      <path class="export-line" d="${d}" pathLength="1" style="transition-delay:${delay}s"/>
      <circle class="export-end" cx="${x}" cy="${y}" r="3.5" style="transition-delay:${delay + 0.6}s"><title>${name}</title></circle>`);
  });
}

// ============================================================
// Klantenstrook (homepage): namen schuiven rustig voorbij
// ============================================================
if ($('#clientStrip')) {
  const row = CLIENTS.map(([name, , style]) => `<span class="wordmark wm-${style}">${esc(name)}</span>`).join('<span class="strip-dot" aria-hidden="true"></span>');
  // twee keer dezelfde rij, zodat de loop naadloos is
  $('#clientStrip').innerHTML = `<div class="strip-track"><div class="strip-row">${row}<span class="strip-dot" aria-hidden="true"></span></div><div class="strip-row" aria-hidden="true">${row}<span class="strip-dot"></span></div></div>`;
}

// ============================================================
// Diensten-hero: index van de pijlers, achtergrond wisselt mee
// ============================================================
if ($('#svcIndex')) {
  const hero = $('#svcHero');
  hero.insertAdjacentHTML('afterbegin', PILLARS.map((p, i) =>
    `<div class="svc-bg${i === 0 ? ' on' : ''}" style="background-image:url('${p.img}')"></div>`).join(''));
  const bgs = $$('.svc-bg');
  $('#svcIndex').innerHTML = PILLARS.map((p, i) => `
    <li><a href="#${p.title.toLowerCase().replace(/[^a-z]+/g, '-')}" data-i="${i}">
      <span class="n">0${i + 1}</span><span class="t">${esc(p.title)}</span><span class="c">${p.services.length} diensten</span>${icon('arrow-right')}
    </a></li>`).join('');
  $$('#svcIndex a').forEach(a => {
    const show = () => bgs.forEach((b, i) => b.classList.toggle('on', i === +a.dataset.i));
    a.addEventListener('mouseenter', show); a.addEventListener('focus', show);
  });
}

// ============================================================
// Scroll-gedreven: statement-woorden en werkwijze-voortgang
// ============================================================
const process = $('#process'), steps = $$('#process li');
if (statement || process) {
  let ticking = false;
  const onScroll = () => {
    const vh = innerHeight;
    if (statement && !reduceMotion) {
      const r = statement.getBoundingClientRect();
      const sp = clamp01((vh * 0.85 - r.top) / (r.height + vh * 0.35));
      const lit = Math.round(sp * statementWords.length);
      statementWords.forEach((w, i) => w.classList.toggle('on', i < lit));
    }
    if (process) {
      const pr = process.getBoundingClientRect();
      process.style.setProperty('--progress', clamp01((vh * 0.6 - pr.top) / pr.height));
      steps.forEach(li => li.classList.toggle('on', li.getBoundingClientRect().top + 20 < vh * 0.6));
    }
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();
}
