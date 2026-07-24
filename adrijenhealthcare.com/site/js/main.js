/* Adrijen Healthcare — Main JS */
(function () {
  'use strict';

  /* ---------- Loading screen ---------- */
  const hideLoading = () => {
    document.body.classList.add('loading-screen-done');
    sessionStorage.setItem('adrijenLoaded', '1');
    setTimeout(() => {
      const el = document.getElementById('loadingScreen');
      if (el) el.remove();
    }, 600);
  };
  if (sessionStorage.getItem('adrijenLoaded')) {
    document.body.classList.add('loading-screen-done');
    const el = document.getElementById('loadingScreen');
    if (el) el.remove();
  } else {
    window.addEventListener('load', () => setTimeout(hideLoading, 350));
    setTimeout(hideLoading, 2500); // safety timeout
  }

  /* ---------- Cookie consent banner ---------- */
  const cookieBanner = document.querySelector('[data-cookie-banner]');
  if (cookieBanner) {
    if (!localStorage.getItem('adrijenCookieConsent')) {
      setTimeout(() => cookieBanner.classList.add('visible'), 900);
    } else {
      cookieBanner.remove();
    }
    const acceptBtn = cookieBanner.querySelector('[data-cookie-accept]');
    acceptBtn && acceptBtn.addEventListener('click', () => {
      localStorage.setItem('adrijenCookieConsent', '1');
      cookieBanner.classList.remove('visible');
      setTimeout(() => cookieBanner.remove(), 400);
    });
  }

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

  /* ---------- Sticky shadow + shrink on scroll ---------- */
  const header = document.querySelector('.site-header');
  const progressBar = document.querySelector('[data-scroll-progress]');
  const backToTop = document.querySelector('[data-back-to-top]');
  if (header || progressBar || backToTop) {
    const onScroll = () => {
      const y = window.scrollY;
      if (header) {
        header.style.boxShadow = y > 8 ? '0 8px 28px -18px rgba(11,29,42,.25)' : 'none';
        header.classList.toggle('scrolled', y > 40);
      }
      if (progressBar) {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        progressBar.style.width = max > 0 ? `${Math.min(100, (y / max) * 100)}%` : '0%';
      }
      if (backToTop) backToTop.classList.toggle('visible', y > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Tilt-on-hover ---------- */
  document.querySelectorAll('[data-tilt]').forEach(card => {
    const strength = 8;
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ---------- Testimonial carousel ---------- */
  document.querySelectorAll('[data-testi-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.testi-track');
    const slides = carousel.querySelectorAll('.testi-slide');
    const dotsWrap = carousel.querySelector('[data-testi-dots]');
    const prevBtn = carousel.querySelector('.testi-nav.prev');
    const nextBtn = carousel.querySelector('.testi-nav.next');
    if (!track || !slides.length) return;
    let idx = 0, timer;

    slides.forEach((_, i) => {
      if (!dotsWrap) return;
      const dot = document.createElement('button');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap ? dotsWrap.querySelectorAll('.testi-dot') : [];

    const render = () => {
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };
    const goTo = (i) => { idx = (i + slides.length) % slides.length; render(); resetTimer(); };
    const next = () => goTo(idx + 1);
    const prev = () => goTo(idx - 1);
    const resetTimer = () => { clearInterval(timer); timer = setInterval(next, 5000); };

    nextBtn && nextBtn.addEventListener('click', next);
    prevBtn && prevBtn.addEventListener('click', prev);
    render();
    resetTimer();
  });

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
    const sortSelect = group.querySelector('[data-product-sort]');
    const grid = panels.length ? panels[0].parentElement : null;
    let activeTab = 'all';

    const applySort = () => {
      if (!sortSelect || sortSelect.value !== 'az' || !grid) return;
      const sorted = [...panels].sort((a, b) =>
        (a.querySelector('h3')?.textContent || '').localeCompare(b.querySelector('h3')?.textContent || '')
      );
      sorted.forEach(p => grid.appendChild(p));
    };

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

    if (sortSelect) sortSelect.addEventListener('change', applySort);

    if (panels.length) applyFilters();
  });

  /* ---------- Year ---------- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Forms: validate, then submit to the consolidated Google Form ---------- */
  const gform = window.GOOGLE_FORM;

  const submitToGoogleForm = (form) => {
    if (!gform || !gform.actionUrl) return Promise.resolve(); // not configured yet — no-op
    const entries = gform.entries || {};
    const params = new URLSearchParams();
    let hasAny = false;
    Object.keys(entries).forEach(key => {
      const entryId = entries[key];
      if (!entryId) return;
      const field = form.querySelector(`[name="${key}"]`);
      if (!field) return;
      let value = '';
      if (field.type === 'radio') {
        const checked = form.querySelector(`[name="${key}"]:checked`);
        value = checked ? checked.value : '';
      } else {
        value = field.value || '';
      }
      if (value) { params.append(entryId, value); hasAny = true; }
    });
    if (!hasAny) return Promise.resolve();
    return fetch(gform.actionUrl, { method: 'POST', mode: 'no-cors', body: params }).catch(() => {});
  };

  document.querySelectorAll('[data-demo-form]').forEach(form => {
    form.querySelectorAll('.input, .textarea, .select').forEach(field => {
      field.addEventListener('invalid', () => field.classList.add('field-error'));
      field.addEventListener('input', () => field.classList.remove('field-error'));
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const note = form.querySelector('[data-form-note]');
      const btn  = form.querySelector('button[type="submit"]');
      if (!form.checkValidity()) {
        form.querySelectorAll('.input, .textarea, .select').forEach(field => {
          if (!field.checkValidity()) field.classList.add('field-error');
        });
        if (note) {
          note.textContent = 'Please fill in the required fields highlighted above.';
          note.classList.remove('hidden');
          note.classList.add('form-note-error');
        }
        const firstInvalid = form.querySelector(':invalid');
        firstInvalid && firstInvalid.focus();
        return;
      }
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
      submitToGoogleForm(form).finally(() => {
        if (note) {
          note.classList.remove('form-note-error');
          note.textContent = 'Thank you! Our team will get back to you within 24 hours.';
          note.classList.remove('hidden');
        }
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Submit'; }
      });
    });
  });

  /* ---------- WhatsApp float button (uses SITE_SETTINGS) ---------- */
  const settings = window.SITE_SETTINGS;
  if (settings) {
    const waFloat = document.querySelector('.whatsapp-float');
    if (waFloat) waFloat.setAttribute('href', settings.whatsappUrl());
  }

  /* ---------- Product cards: per-card Enquire links + detail modal ---------- */
  const products = window.PRODUCTS;
  if (products && settings) {
    const byId = {};
    products.forEach(p => { byId[p.id] = p; });

    document.querySelectorAll('[data-product-enquire]').forEach(link => {
      const card = link.closest('[data-product-id]');
      const p = card && byId[card.dataset.productId];
      if (!p) return;
      link.setAttribute('href', settings.whatsappUrl(
        `Hello Adrijen Healthcare, I'd like to enquire about ${p.name} (${p.category}).`
      ));
      link.addEventListener('click', e => e.stopPropagation());
    });

    const modal = document.querySelector('[data-product-modal]');
    if (modal) {
      const closeBtn = modal.querySelector('[data-product-modal-close]');
      const els = {
        thumb: modal.querySelector('[data-modal-thumb]'),
        category: modal.querySelector('[data-modal-category]'),
        name: modal.querySelector('[data-modal-name]'),
        composition: modal.querySelector('[data-modal-composition]'),
        pack: modal.querySelector('[data-modal-pack]'),
        packLabel: modal.querySelector('[data-modal-pack-label]'),
        enquire: modal.querySelector('[data-modal-enquire]'),
      };
      const openModal = (p) => {
        els.category.textContent = p.category;
        els.name.textContent = p.name;
        els.composition.textContent = p.composition;
        els.pack.textContent = p.pack || 'On request';
        els.packLabel.style.display = p.pack ? '' : 'none';
        els.pack.style.display = p.pack ? '' : 'none';
        els.thumb.innerHTML = p.image
          ? `<img src="${p.image}" alt="${p.name} pack shot" />`
          : `<i data-lucide="${p.icon || 'pill'}"></i>`;
        els.enquire.setAttribute('href', settings.whatsappUrl(
          `Hello Adrijen Healthcare, I'd like to enquire about ${p.name} (${p.category}).`
        ));
        if (window.lucide) lucide.createIcons();
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
      };
      const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
      };
      document.querySelectorAll('[data-product-view]').forEach(btn => {
        btn.addEventListener('click', () => {
          const card = btn.closest('[data-product-id]');
          const p = card && byId[card.dataset.productId];
          if (p) openModal(p);
        });
      });
      closeBtn && closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }
  }

  /* ---------- Blog posts: read-more modal ---------- */
  const posts = window.BLOG_POSTS;
  if (posts) {
    const byId = {};
    posts.forEach(p => { byId[p.id] = p; });
    const modal = document.querySelector('[data-blog-modal]');
    if (modal) {
      const closeBtn = modal.querySelector('[data-blog-modal-close]');
      const els = {
        category: modal.querySelector('[data-blog-modal-category]'),
        title: modal.querySelector('[data-blog-modal-title]'),
        meta: modal.querySelector('[data-blog-modal-meta]'),
        content: modal.querySelector('[data-blog-modal-content]'),
      };
      const openModal = (p) => {
        els.category.textContent = p.category;
        els.title.textContent = p.title;
        els.meta.textContent = `${p.author} • ${new Date(p.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} • ${p.readTime}`;
        els.content.textContent = p.content;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
      };
      const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
      };
      document.querySelectorAll('[data-blog-read]').forEach(btn => {
        btn.addEventListener('click', () => {
          const card = btn.closest('[data-blog-id]');
          const p = card && byId[card.dataset.blogId];
          if (p) openModal(p);
        });
      });
      closeBtn && closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }
  }

  /* ---------- Career openings: apply link + WhatsApp ---------- */
  const jobs = window.JOB_OPENINGS;
  if (jobs && settings) {
    const byId = {};
    jobs.forEach(j => { byId[j.id] = j; });
    const applySelect = document.querySelector('#apply select');
    document.querySelectorAll('[data-job-apply-link]').forEach(link => {
      link.addEventListener('click', () => {
        const card = link.closest('[data-job-id]');
        const j = card && byId[card.dataset.jobId];
        if (j && applySelect) {
          [...applySelect.options].forEach(o => { if (o.text === j.title) applySelect.value = o.value; });
        }
      });
    });
    document.querySelectorAll('[data-job-whatsapp]').forEach(link => {
      const card = link.closest('[data-job-id]');
      const j = card && byId[card.dataset.jobId];
      if (!j) return;
      link.setAttribute('href', settings.whatsappUrl(
        `Hello Adrijen Healthcare, I'd like to apply for the ${j.title} role (${j.location}).`
      ));
    });
  }

  /* ---------- Category image grid (Home) ---------- */
  const catGrid = document.querySelector('[data-category-grid]');
  if (catGrid && window.CATEGORIES) {
    // Maps each marketing category (13, matches sister-brand Pykon's structure)
    // to the real catalogue categories in data/products.js, so counts shown
    // are genuine — not fabricated — even where naming differs.
    const COUNT_MAP = {
      'tablets': ['Tablets', 'Cardio / Diabetic'],
      'capsules': ['Capsules', 'Ayurvedic Capsules'],
      'syrups': ['Syrups', 'Dry Syrups', 'Ayurvedic Syrups'],
      'injections': ['Injections', 'Infusions'],
      'derma-products': ['Ointments', 'Face Wash & Gels', 'Soaps'],
      'dental-care': ['Dental Range'],
      'drops': ['Drops'],
      'eye-drops': ['Eye / Ear / Nose Drops & Sprays'],
      'energy-drink-ors': ['Energy Drink / Powder'],
      'oils': ['Ayurvedic Oils & Powder'],
      'paediatric': ['Pediatric Syrups & Suspension'],
      'protein-powder': ['Protein Powder'],
      'nano-shots-sachets': ['Respules']
    };
    const products = window.PRODUCTS || [];
    const countFor = (slug) => {
      const cats = COUNT_MAP[slug] || [];
      return products.filter(p => cats.includes(p.category)).length;
    };
    catGrid.innerHTML = window.CATEGORIES.map((c, i) => `
      <a href="/products.html?category=${c.slug}" class="category-card${c.image ? '' : ' icon-tile'}" data-aos="fade-up" data-aos-delay="${(i % 4) * 40}">
        ${c.image
          ? `<img src="${c.image}" alt="${c.name}" loading="lazy" width="400" height="300" />`
          : `<i data-lucide="${c.icon || 'pill'}"></i>`}
        <div class="category-card-overlay">
          <h3 class="font-display font-bold">${c.name}</h3>
          <span class="count">${countFor(c.slug)}+ products</span>
        </div>
      </a>
    `).join('') + `
      <a href="/products.html" class="category-card view-all" data-aos="fade-up">
        <i data-lucide="arrow-right"></i>
        <span>View all categories</span>
      </a>
    `;
    if (window.lucide) lucide.createIcons();
  }

  /* ---------- Slide-out enquiry panel ---------- */
  const enquiryPanel = document.querySelector('[data-enquiry-panel]');
  if (enquiryPanel) {
    const openBtns = document.querySelectorAll('[data-enquiry-open]');
    const closeBtn = enquiryPanel.querySelector('[data-enquiry-close]');
    const open = () => { enquiryPanel.classList.add('open'); enquiryPanel.setAttribute('aria-hidden', 'false'); };
    const close = () => { enquiryPanel.classList.remove('open'); enquiryPanel.setAttribute('aria-hidden', 'true'); };
    openBtns.forEach(b => b.addEventListener('click', open));
    closeBtn && closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ---------- Lucide icons render ---------- */
  if (window.lucide) lucide.createIcons();
})();
