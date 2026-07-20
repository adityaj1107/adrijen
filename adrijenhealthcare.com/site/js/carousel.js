/* Adrijen Healthcare — hero carousel. Renders window.SLIDES into any
   [data-carousel] container. No cropping: images use object-fit:contain
   inside a fixed-aspect, brand-colored letterbox frame. */
(function () {
  'use strict';

  document.querySelectorAll('[data-carousel]').forEach(root => {
    const slides = window.SLIDES || [];
    if (!slides.length) return;

    const track = root.querySelector('[data-carousel-track]');
    const dotsWrap = root.querySelector('[data-carousel-dots]');
    const prevBtn = root.querySelector('[data-carousel-prev]');
    const nextBtn = root.querySelector('[data-carousel-next]');
    const progressBar = root.querySelector('[data-carousel-progress]');
    const AUTOPLAY_MS = 6000;

    track.innerHTML = slides.map((s, i) => `
      <div class="hero-slide" data-index="${i}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${slides.length}">
        <picture class="hero-slide-media">
          <source media="(max-width: 640px)" srcset="${s.mobileImage}">
          <img src="${s.desktopImage}" alt="" loading="${i === 0 ? 'eager' : 'lazy'}" ${i === 0 ? 'fetchpriority="high"' : ''} />
        </picture>
        <div class="hero-slide-overlay">
          <div class="hero-slide-textcard">
            ${s.eyebrow ? `<span class="pill"><span class="dot"></span> ${s.eyebrow}</span>` : ''}
            <h2>${s.headline}</h2>
            <p>${s.subline}</p>
            <a href="${s.ctaLink}" class="btn btn-gold">${s.ctaText} <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
          </div>
        </div>
      </div>
    `).join('');

    if (dotsWrap) {
      dotsWrap.innerHTML = slides.map((_, i) =>
        `<button type="button" class="carousel-dot${i === 0 ? ' active' : ''}" data-dot="${i}" aria-label="Go to slide ${i + 1}"></button>`
      ).join('');
    }
    const dots = dotsWrap ? [...dotsWrap.querySelectorAll('.carousel-dot')] : [];

    let idx = 0;
    let timer = null;

    const render = () => {
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };

    const runProgress = () => {
      if (!progressBar) return;
      progressBar.classList.remove('animate');
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      // force reflow so the next transition actually animates
      void progressBar.offsetWidth;
      progressBar.classList.add('animate');
      progressBar.style.transition = `width ${AUTOPLAY_MS}ms linear`;
      progressBar.style.width = '100%';
    };

    const goTo = (i, userInitiated) => {
      idx = (i + slides.length) % slides.length;
      render();
      if (userInitiated) restartAutoplay();
      else runProgress();
    };
    const next = () => goTo(idx + 1);
    const prev = () => goTo(idx - 1, true);

    const restartAutoplay = () => {
      clearInterval(timer);
      runProgress();
      timer = setInterval(next, AUTOPLAY_MS);
    };
    const stopAutoplay = () => {
      clearInterval(timer);
      if (progressBar) { progressBar.style.transition = 'none'; }
    };

    prevBtn && prevBtn.addEventListener('click', () => goTo(idx - 1, true));
    nextBtn && nextBtn.addEventListener('click', () => goTo(idx + 1, true));
    dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.dot, 10), true)));

    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', restartAutoplay);
    root.addEventListener('focusin', stopAutoplay);
    root.addEventListener('focusout', restartAutoplay);

    root.setAttribute('tabindex', '0');
    root.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(idx - 1, true); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(idx + 1, true); }
    });

    // Touch swipe
    let touchStartX = null;
    root.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAutoplay(); }, { passive: true });
    root.addEventListener('touchend', e => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) { dx > 0 ? goTo(idx - 1, true) : goTo(idx + 1, true); }
      else restartAutoplay();
      touchStartX = null;
    });

    render();
    restartAutoplay();
    if (window.lucide) lucide.createIcons();
  });
})();
