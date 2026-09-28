// Homepage: video-hero. Vereist js/site.js en js/components.js.

// ============================================================
// Instellingen
// ============================================================

// Hero-video op Vimeo. Speelt stil als achtergrond en opent met geluid
// in de popup als je op de hero klikt. Link: vimeo.com/<id>/<hash>
const VIDEO = { id: '1230871561', hash: '105626cf2b' };
const vimeoUrl = params => `https://player.vimeo.com/video/${VIDEO.id}?h=${VIDEO.hash}&${params}`;

// ============================================================
// Hero: video, custom cursor, video-popup
// ============================================================
const heroCard = $('#heroCard'), heroVideo = $('#heroVideo');
// Bij 'minder beweging' blijft de stilstaande thumbnail staan
if (!reduceMotion) {
  heroVideo.addEventListener('load', () => setTimeout(() => heroVideo.classList.add('ready'), 700));
  heroVideo.src = vimeoUrl('background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1');
}

// Cursor volgt de muis met wat vertraging
const cursor = $('#cursorPlay');
if (finePointer) {
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
  const follow = () => {
    cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
    cursor.style.translate = `${cx}px ${cy}px`;
    raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(follow) : null;
  };
  heroCard.addEventListener('pointermove', e => {
    const r = heroCard.getBoundingClientRect();
    tx = e.clientX - r.left; ty = e.clientY - r.top;
    const overUi = e.target.closest('a, button');
    heroCard.classList.toggle('cursor-on', !overUi);
    if (!raf) raf = requestAnimationFrame(follow);
  });
  heroCard.addEventListener('pointerenter', e => {
    const r = heroCard.getBoundingClientRect();
    cx = tx = e.clientX - r.left; cy = ty = e.clientY - r.top;
    cursor.style.translate = `${cx}px ${cy}px`;
  });
  heroCard.addEventListener('pointerleave', () => heroCard.classList.remove('cursor-on'));
}

const modal = $('#videoModal'), modalVideo = $('#modalVideo');
const openVideo = () => {
  modalVideo.src = vimeoUrl('autoplay=1&title=0&byline=0&portrait=0&dnt=1');
  modal.showModal();
};
const closeVideo = () => modal.close();
modal.addEventListener('close', () => { modalVideo.src = 'about:blank'; });
heroCard.addEventListener('click', e => {
  if (e.target.closest('a')) return;
  if (e.target.closest('[data-open-video]') || !e.target.closest('button')) openVideo();
});
$('#modalClose').addEventListener('click', closeVideo);
modal.addEventListener('click', e => { if (e.target === modal) closeVideo(); });

// Hero schuift en vervaagt tijdens het scrollen
const heroMedia = $('#heroMedia'), heroInner = $('#heroInner');
if (!reduceMotion) {
  let ticking = false;
  const onScroll = () => {
    const p = clamp01(scrollY / heroCard.offsetHeight);
    heroMedia.style.transform = `scale(${1 + p * 0.12}) translateY(${p * 8}%)`;
    heroInner.style.transform = `translateY(${p * -60}px)`;
    heroInner.style.opacity = 1 - p * 1.4;
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
}
