/* ============================================
   Personal Site — Glass Edition v3
   Gallery + Lightbox + Filter + Liquid Flow
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Liquid Flow Canvas
  // ==========================================
  const canvas = document.getElementById('heroLiquid');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let time = 0;

    const blobs = [];
    const palette = [
      { r: 201, g: 169, b: 110 },
      { r: 184, g: 115, b: 74 },
      { r: 212, g: 160, b: 160 },
      { r: 232, g: 213, b: 168 },
      { r: 160, g: 140, b: 120 },
    ];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    for (let i = 0; i < 5; i++) {
      blobs.push({
        x: Math.random(),
        y: Math.random(),
        radius: 0.12 + Math.random() * 0.18,
        speedX: (Math.random() - 0.5) * 0.0002,
        speedY: (Math.random() - 0.5) * 0.0002,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        freqX: 0.2 + Math.random() * 0.3,
        freqY: 0.2 + Math.random() * 0.3,
        ampX: 0.02 + Math.random() * 0.04,
        ampY: 0.02 + Math.random() * 0.04,
        color: palette[i],
        alpha: 0.04 + Math.random() * 0.03,
        distortion: 3 + Math.random() * 4,
      });
    }

    function drawBlob(blob, t, w, h) {
      const cx = (blob.x + Math.sin(t * blob.freqX + blob.phaseX) * blob.ampX) * w;
      const cy = (blob.y + Math.cos(t * blob.freqY + blob.phaseY) * blob.ampY) * h;
      const r = blob.radius * Math.min(w, h) * (0.8 + Math.sin(t * 0.3 + blob.phaseX) * 0.15);

      const points = 24;
      const step = (Math.PI * 2) / points;

      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const angle = i * step;
        const distort = Math.sin(angle * blob.distortion + t * 0.5 + blob.phaseX) * r * 0.12
                      + Math.cos(angle * 2 + t * 0.3 + blob.phaseY) * r * 0.08;
        const px = cx + Math.cos(angle) * (r + distort);
        const py = cy + Math.sin(angle) * (r + distort);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.2);
      const c = blob.color;
      grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${blob.alpha * 1.5})`);
      grad.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},${blob.alpha})`);
      grad.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    function draw() {
      time += 0.003;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      blobs.forEach(b => {
        b.x += b.speedX + Math.sin(time * 0.08 + b.phaseY) * 0.0001;
        b.y += b.speedY + Math.cos(time * 0.08 + b.phaseX) * 0.0001;
        if (b.x < -0.1) b.x = 1.1;
        if (b.x > 1.1) b.x = -0.1;
        if (b.y < -0.1) b.y = 1.1;
        if (b.y > 1.1) b.y = -0.1;
        drawBlob(b, time, w, h);
      });

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
  }

  // ==========================================
  // 2. Gallery Filter
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery__item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
            item.style.opacity = '0';
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.4s ease';
              item.style.opacity = '1';
            });
          } else {
            item.style.opacity = '0';
            setTimeout(() => { item.style.display = 'none'; }, 400);
          }
        });
      });
    });
  }

  // ==========================================
  // 3. Lightbox
  // ==========================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxClose = lightbox?.querySelector('.lightbox__close');
  const lightboxPrev = lightbox?.querySelector('.lightbox__prev');
  const lightboxNext = lightbox?.querySelector('.lightbox__next');

  let currentIndex = -1;
  let visibleItems = [];

  function updateVisibleItems() {
    visibleItems = [];
    galleryItems.forEach(item => {
      if (item.style.display !== 'none') {
        visibleItems.push(item);
      }
    });
  }

  function openLightbox(index) {
    updateVisibleItems();
    if (index < 0 || index >= visibleItems.length) return;
    currentIndex = index;

    const item = visibleItems[index];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery__title');
    const tag = item.querySelector('.gallery__tag');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = title ? title.textContent : '';
    lightboxTag.textContent = tag ? tag.textContent : '';

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    if (currentIndex === -1) return;
    updateVisibleItems();
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = visibleItems.length - 1;
    if (newIndex >= visibleItems.length) newIndex = 0;
    openLightbox(newIndex);
  }

  // Click on gallery items
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  // Lightbox controls
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

  // Keyboard nav
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Click outside image to close
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // ==========================================
  // 4. Scroll Reveal Engine
  // ==========================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      const dir = el.dataset.dir || 'up';
      const dist = el.dataset.dist || 50;

      let transforms = [];
      if (dir === 'up') transforms.push(`translateY(${dist}px)`);
      if (dir === 'down') transforms.push(`translateY(-${dist}px)`);
      if (dir === 'left') transforms.push(`translateX(${dist}px)`);
      if (dir === 'right') transforms.push(`translateX(-${dist}px)`);
      if (dir === 'scale') transforms.push('scale(0.8)');
      transforms.push('translateZ(0)');

      el.style.transform = transforms.join(' ');
      el.style.opacity = '0';
      el.style.transition = `transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, opacity 0.8s ease ${delay}s`;

      el.getBoundingClientRect();

      requestAnimationFrame(() => {
        el.style.transform = 'translateZ(0)';
        el.style.opacity = '1';
      });

      revealObserver.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Hero elements - immediate reveal
  document.querySelectorAll('.hero__tag, .hero__title, .hero__desc, .hero__actions, .hero__stats, .hero__contact-bar').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) translateZ(0)';
    el.style.transition = `transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.1}s, opacity 0.8s ease ${0.2 + i * 0.1}s`;
    setTimeout(() => {
      el.style.transform = 'translateZ(0)';
      el.style.opacity = '1';
    }, 100);
  });

  // Section headers
  document.querySelectorAll('.section__head').forEach(el => {
    revealObserver.observe(el);
  });

  // Gallery items - staggered
  document.querySelectorAll('.gallery__item').forEach((el, i) => {
    el.dataset.delay = (0.1 + i * 0.05).toString();
    el.dataset.dir = 'up';
    el.dataset.dist = '50';
    revealObserver.observe(el);
  });

  // About bio
  document.querySelectorAll('.about__bio').forEach(el => {
    el.dataset.dir = 'left';
    el.dataset.dist = '40';
    revealObserver.observe(el);
  });

  // About cards
  document.querySelectorAll('.about__card').forEach((el, i) => {
    el.dataset.delay = (0.1 + i * 0.1).toString();
    el.dataset.dir = 'right';
    el.dataset.dist = '40';
    revealObserver.observe(el);
  });

  // Contact cards
  document.querySelectorAll('.contact__card').forEach((el, i) => {
    el.dataset.delay = (0.1 + i * 0.1).toString();
    el.dataset.dir = 'up';
    el.dataset.dist = '40';
    revealObserver.observe(el);
  });

  // ==========================================
  // 5. Counter Animation on Scroll
  // ==========================================
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        let current = 0;
        const increment = Math.ceil(target / 30);
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.textContent = current;
        }, 30);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  // ==========================================
  // 6. Navbar
  // ==========================================
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.pageYOffset > 60);
  });

  // ==========================================
  // 7. Mobile Menu
  // ==========================================
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('nav__links--open');
    });
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('nav__links--open');
      });
    });
  }

  // ==========================================
  // 8. Skill Bar Animation on Scroll
  // ==========================================
  const skillBars = document.querySelectorAll('.skill__fill');
  if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        const w = bar.style.width;
        bar.style.width = '0%';
        requestAnimationFrame(() => {
          bar.style.transition = 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
          bar.style.width = w;
        });
        skillObserver.unobserve(bar);
      });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  }

});
