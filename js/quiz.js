// "Vrijblijvend sparren": korte vragenlijst van 5 vragen, één voor één.
// Elke knop of link met data-open-quiz opent hem. Vereist js/site.js.
// Pas vragen en antwoorden aan in QUIZ hieronder.

const QUIZ = [
  {
    key: 'hulp', q: 'Waar kunnen we je mee helpen?',
    options: ['Een nieuw product laten ontwikkelen', 'Een bestaand product beter of voordeliger inkopen', 'Relatiegeschenken of promotieartikelen', 'Kwaliteitscontrole of inspectie', 'Iets anders']
  },
  {
    key: 'branche', q: 'In welke branche zit je?',
    options: ['Automotive', 'Retail', 'Industrie', 'Food & Horeca', 'Leisure & Hospitality', 'Overige']
  },
  {
    key: 'aantallen', q: 'Om welke aantallen gaat het ongeveer?',
    options: ['Minder dan 500 stuks', '500 – 5.000 stuks', '5.000 – 25.000 stuks', 'Meer dan 25.000 stuks', 'Weet ik nog niet']
  },
  {
    key: 'planning', q: 'Wanneer wil je starten?',
    options: ['Zo snel mogelijk', 'Binnen 3 maanden', 'Binnen 6 maanden', 'Ik oriënteer me nog']
  },
  { key: 'contact', q: 'Hoe kunnen we je bereiken?', contact: true }
];
const QUIZ_EMAIL = 'info@tracopen.com';

// ============================================================
// Popup opbouwen
// ============================================================
document.body.insertAdjacentHTML('beforeend', `
<dialog class="quiz" id="quiz" aria-labelledby="quizTitle">
  <div class="quiz-top">
    <img src="assets/img/logo-mark.png" alt="" class="quiz-mark">
    <div class="quiz-progress"><span id="quizStepLabel">5 korte vragen</span><div class="quiz-bar"><i id="quizBar"></i></div></div>
    <button type="button" class="quiz-close" id="quizClose" aria-label="Sluiten">${icon('x')}</button>
  </div>
  <div class="quiz-stage" id="quizStage" aria-live="polite"></div>
</dialog>`);

const quiz = $('#quiz'), stage = $('#quizStage'), bar = $('#quizBar'), stepLabel = $('#quizStepLabel');
let step = -1;               // -1 = intro, 0..4 = vragen, 5 = bedankt
const answers = {};

function render(dir = 1) {
  const total = QUIZ.length;
  bar.style.width = `${step < 0 ? 0 : Math.min(step + 1, total) / total * 100}%`;
  stepLabel.textContent = step < 0 ? '5 korte vragen · ± 1 minuut' : step < total ? `Vraag ${step + 1} van ${total}` : 'Klaar!';

  let html;
  if (step < 0) {
    html = `
      <div class="eyebrow">Vrijblijvend sparren</div>
      <h2 class="quiz-q" id="quizTitle">Vertel ons kort over je plannen<span class="dot">.</span></h2>
      <p class="quiz-intro">Het zijn maar <strong>5 korte vragen</strong>. Daarna nemen we binnen korte tijd persoonlijk contact met je op.</p>
      <ol class="quiz-steps">${QUIZ.map((s, i) => `<li><span>${i + 1}</span>${s.q}</li>`).join('')}</ol>
      <button type="button" class="btn btn-primary btn-lg" data-next>start ${icon('arrow-right')}</button>`;
  } else if (step < total && !QUIZ[step].contact) {
    const s = QUIZ[step];
    html = `
      <h2 class="quiz-q" id="quizTitle">${s.q}</h2>
      <div class="quiz-options">${s.options.map((o, i) => `
        <button type="button" class="quiz-opt${answers[s.key] === o ? ' sel' : ''}" data-opt="${esc(o)}" style="--i:${i}">
          <kbd>${i + 1}</kbd><span>${esc(o)}</span>${icon('arrow-right')}
        </button>`).join('')}</div>
      <div class="quiz-nav"><button type="button" class="quiz-back" data-back>← vorige</button><span class="quiz-hint">Tip: gebruik de cijfertoetsen</span></div>`;
  } else if (step < total) {
    const c = answers.contact || {};
    html = `
      <h2 class="quiz-q" id="quizTitle">${QUIZ[step].q}</h2>
      <form class="quiz-form" id="quizForm">
        <div class="field-row">
          <div class="field"><label for="q-name">Naam</label><input id="q-name" name="name" autocomplete="name" required value="${esc(c.name || '')}"></div>
          <div class="field"><label for="q-company">Bedrijf</label><input id="q-company" name="company" autocomplete="organization" value="${esc(c.company || '')}"></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="q-email">E-mail</label><input id="q-email" name="email" type="email" autocomplete="email" required value="${esc(c.email || '')}"></div>
          <div class="field"><label for="q-phone">Telefoon</label><input id="q-phone" name="phone" type="tel" autocomplete="tel" value="${esc(c.phone || '')}"></div>
        </div>
        <div class="field"><label for="q-msg">Nog iets dat we moeten weten? <em>(optioneel)</em></label><textarea id="q-msg" name="message" rows="3" placeholder="Bijvoorbeeld het product dat je in gedachten hebt.">${esc(c.message || '')}</textarea></div>
        <div class="quiz-nav">
          <button type="button" class="quiz-back" data-back>← vorige</button>
          <button type="submit" class="btn btn-primary btn-lg">verstuur ${icon('arrow-right')}</button>
        </div>
      </form>`;
  } else {
    html = `
      <div class="quiz-done">
        <span class="quiz-check">${icon('badge-check')}</span>
        <h2 class="quiz-q" id="quizTitle">Bedankt${answers.contact?.name ? ', ' + esc(answers.contact.name.split(' ')[0]) : ''}!</h2>
        <p class="quiz-intro">Je e-mailprogramma opent met je antwoorden klaar om te versturen. Verstuur de mail en we nemen snel contact met je op.</p>
        <p class="quiz-intro">Liever direct bellen? <a href="tel:+31341741041">+31 341 741 041</a></p>
        <button type="button" class="btn btn-outline" data-close>sluiten</button>
      </div>`;
  }

  // slide-overgang tussen stappen
  stage.classList.remove('in-next', 'in-prev'); void stage.offsetWidth;
  stage.innerHTML = html;
  stage.classList.add(dir > 0 ? 'in-next' : 'in-prev');
  const first = stage.querySelector('.quiz-opt.sel, .quiz-opt, input, [data-next]');
  if (first && finePointer) first.focus({ preventScroll: true });
}

const go = (to, dir) => { step = to; render(dir); };

stage.addEventListener('click', e => {
  const opt = e.target.closest('[data-opt]');
  if (opt) {
    answers[QUIZ[step].key] = opt.dataset.opt;
    stage.querySelectorAll('.quiz-opt').forEach(b => b.classList.toggle('sel', b === opt));
    setTimeout(() => go(step + 1, 1), reduceMotion ? 0 : 280); // automatisch door
    return;
  }
  if (e.target.closest('[data-next]')) go(step + 1, 1);
  if (e.target.closest('[data-back]')) { saveContact(); go(step - 1, -1); }
  if (e.target.closest('[data-close]')) quiz.close();
});

function saveContact() {
  const f = $('#quizForm'); if (!f) return;
  answers.contact = Object.fromEntries(new FormData(f));
}

stage.addEventListener('submit', e => {
  e.preventDefault();
  saveContact();
  const c = answers.contact;
  const lines = QUIZ.filter(s => !s.contact).map(s => `${s.q}\n→ ${answers[s.key] || '-'}`);
  const body = `${lines.join('\n\n')}\n\n${c.message ? 'Toelichting:\n' + c.message + '\n\n' : ''}—\n${c.name}${c.company ? '\n' + c.company : ''}\n${c.email}${c.phone ? '\n' + c.phone : ''}`;
  const subject = `Vrijblijvend sparren${c.company ? ' – ' + c.company : ''}`;
  location.href = `mailto:${QUIZ_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  go(QUIZ.length, 1);
});

// cijfertoetsen kiezen een antwoord
quiz.addEventListener('keydown', e => {
  if (step < 0 || step >= QUIZ.length || QUIZ[step].contact || e.target.matches('input, textarea')) return;
  const n = parseInt(e.key, 10);
  const btn = stage.querySelectorAll('.quiz-opt')[n - 1];
  if (btn) btn.click();
});

$('#quizClose').addEventListener('click', () => quiz.close());
quiz.addEventListener('click', e => { if (e.target === quiz) quiz.close(); });
quiz.addEventListener('close', () => { document.body.style.overflow = ''; });

// Vragen ook tonen in het contactblok onderaan de pagina
const teaser = $('#quizTeaserSteps');
if (teaser) teaser.innerHTML = QUIZ.map((s, i) => `<li><span>${i + 1}</span>${s.q}</li>`).join('');

function openQuiz(e) {
  e?.preventDefault();
  if (header.classList.contains('open')) menuBtn.click();
  if (step >= QUIZ.length) { step = -1; Object.keys(answers).forEach(k => delete answers[k]); }
  render(1);
  quiz.showModal();
  document.body.style.overflow = 'hidden';
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-open-quiz]');
  if (t) openQuiz(e);
});

// Deelbare link: pagina.html#vragen opent de vragenlijst direct
if (location.hash === '#vragen') openQuiz();
