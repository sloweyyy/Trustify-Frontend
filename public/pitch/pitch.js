(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const page = document.getElementById('page');
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  const readingButton = document.getElementById('reading');
  const presentButton = document.getElementById('present');
  const status = document.getElementById('slide-status');
  let index = Math.max(0, Math.min(slides.length - 1, Number(window.location.hash.match(/^#slide-(\d+)$/)?.[1] || 1) - 1));
  let reading = matchMedia('(max-width:700px)').matches;
  document.body.classList.add('enhanced');
  function update(announce = false) {
    slides.forEach((slide, position) => { slide.hidden = !reading && position !== index; });
    page.value = String(index + 1);
    previous.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    readingButton.setAttribute('aria-pressed', String(reading));
    presentButton.textContent = document.body.classList.contains('presenting') ? 'Thoát trình chiếu' : 'Trình chiếu';
    if (announce) status.textContent = `Trang ${index + 1} / ${slides.length}: ${slides[index].querySelector('h2').textContent}`;
  }
  function go(position) {
    index = Math.max(0, Math.min(slides.length - 1, position));
    window.history.replaceState(null, '', `#slide-${index + 1}`);
    update(true);
    if (reading) slides[index].scrollIntoView({ block: 'start', behavior: 'auto' });
  }
  previous.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));
  page.addEventListener('change', () => go(Number(page.value) - 1));
  readingButton.addEventListener('click', () => {
    reading = !reading;
    if (reading) document.body.classList.remove('presenting');
    update();
  });
  presentButton.addEventListener('click', () => {
    document.body.classList.toggle('presenting');
    reading = false;
    update();
  });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || /^(INPUT|SELECT|TEXTAREA)$/.test(event.target.tagName) || event.target.isContentEditable) return;
    if (event.key === 'Escape') { document.body.classList.remove('presenting'); update(); }
    if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); go(index + 1); }
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); go(index - 1); }
  });
  window.addEventListener('hashchange', () => {
    const number = Number(window.location.hash.match(/^#slide-(\d+)$/)?.[1]);
    if (Number.isInteger(number) && number >= 1 && number <= slides.length) { index = number - 1; update(); }
  });
  update();
})();
