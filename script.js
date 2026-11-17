document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  const thumbs = [...document.querySelectorAll('.scan-thumb')];
  const lightbox = document.getElementById('lightbox');
  const preview = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');
  let current = 0;
  function show(index) {
    current = (index + thumbs.length) % thumbs.length;
    preview.src = thumbs[current].dataset.full;
    caption.textContent = `Document ${String(current + 1).padStart(2, '0')} — Séance 2`;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    preview.src = '';
  }
  thumbs.forEach((thumb, index) => thumb.addEventListener('click', () => show(index)));
  document.getElementById('lightboxClose').addEventListener('click', close);
  document.getElementById('lightboxPrev').addEventListener('click', () => show(current - 1));
  document.getElementById('lightboxNext').addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox) close(); });
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
});
