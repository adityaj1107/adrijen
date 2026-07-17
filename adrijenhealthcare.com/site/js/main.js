/* Adrijen Healthcare — Main JS */
(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  const menu = document.getElementById('mobileMenu');
  const openBtn = document.getElementById('menuOpen');
  const closeBtn = document.getElementById('menuClose');
  if (menu && openBtn) {
    openBtn.addEventListener('click', () => menu.classList.add('open'));
    closeBtn && closeBtn.addEventListener('click', () => menu.classList.remove('open'));
    menu.addEventListener('click', (e) => { if (e.target === menu) menu.classList.remove('open'); });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }

  /* ---------- Active nav highlight ---------- */
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav.toLowerCase() === path) link.classList.add('active');
  });

  /* ---------- Sticky shadow on scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) header.style.boxShadow = '0 8px 28px -18px rgba(11,29,42,.25)';
      else header.style.boxShadow = 'none';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- AOS init ---------- */
  if (window.AOS) {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  /* ---------- Stat counter ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const decimals = (el.dataset.count.split('.')[1] || '').length;
        const suffix = el.dataset.suffix || '';
        const dur = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = (target * eased).toFixed(decimals);
          el.textContent = val.toLocaleString ? Number(val).toLocaleString('en-IN') + suffix : val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  }

  /* ---------- Tabs (Products / Services) ---------- */
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const panels  = group.querySelectorAll('[data-panel]');
    const searchInput = group.querySelector('[data-product-search-input]');
    const emptyNote = group.querySelector('[data-product-empty]');
    let activeTab = 'all';

    const applyFilters = () => {
      const q = (searchInput && searchInput.value || '').trim().toLowerCase();
      let visibleCount = 0;
      panels.forEach(p => {
        const tabMatch = activeTab === 'all' || p.dataset.panel === activeTab;
        const searchMatch = !q || (p.dataset.search || '').includes(q);
        const match = tabMatch && searchMatch;
        p.style.display = match ? '' : 'none';
        if (match) { p.classList.add('fade-in'); visibleCount++; }
      });
      if (emptyNote) emptyNote.classList.toggle('hidden', visibleCount !== 0);
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        buttons.forEach(b => b.classList.toggle('active', b === btn));
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() && activeTab !== 'all') {
          activeTab = 'all';
          buttons.forEach(b => b.classList.toggle('active', b.dataset.tab === 'all'));
        }
        applyFilters();
      });
    }

    if (panels.length) applyFilters();
  });

  /* ---------- Year ---------- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Form (demo) ---------- */
  document.querySelectorAll('[data-demo-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const note = form.querySelector('[data-form-note]');
      const btn  = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
      setTimeout(() => {
        if (note) {
          note.textContent = 'Thank you! Our team will get back to you within 24 hours.';
          note.classList.remove('hidden');
        }
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Submit'; }
      }, 900);
    });
  });

  /* ---------- Lucide icons render ---------- */
  if (window.lucide) lucide.createIcons();
})();
