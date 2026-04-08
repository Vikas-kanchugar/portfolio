/* =====================================================
   VIKAS KANCHUGAR — PREMIUM PORTFOLIO  |  script.js
   ===================================================== */

'use strict';

/* ─────────────────────────────────────────────
   1. PAGE LOADER
───────────────────────────────────────────── */
(function initLoader() {
  const loader  = document.getElementById('pageLoader');
  const fill    = document.getElementById('loaderFill');
  const txt     = document.getElementById('loaderTxt');
  const messages = ['Initializing...', 'Loading assets...', 'Almost ready...'];
  let i = 0;

  const interval = setInterval(() => {
    i++;
    if (txt && messages[i]) txt.textContent = messages[i];
  }, 700);

  window.addEventListener('load', () => {
    clearInterval(interval);
    setTimeout(() => {
      loader.classList.add('out');
2      document.querySelectorAll('.hero .ru').forEach(el => {
        el.classList.add('visible');
      });
    }, 400);
  });
})();


/* ─────────────────────────────────────────────
   2. CUSTOM CURSOR
───────────────────────────────────────────── */
(function initCursor() {
  const inner = document.getElementById('cursorInner');
  if (!inner) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = 0, mouseY = 0;
  let innerX = 0, innerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function lerpCursor() {
    const dx = mouseX - innerX;
    const dy = mouseY - innerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // adaptive smoothing (fast movement -> snappier; slow movement -> smooth)
    const minAlpha = 0.14;
    const maxAlpha = 0.20;
    const alpha = Math.min(maxAlpha, Math.max(minAlpha, dist / 50));

    innerX += dx * alpha;
    innerY += dy * alpha;
    inner.style.transform = `translate(calc(${innerX}px - 50%), calc(${innerY}px - 50%))`;

    requestAnimationFrame(lerpCursor);
  }

  lerpCursor();
})();


/* ─────────────────────────────────────────────
   3. NAVBAR — scroll + active + hamburger
───────────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navLinks  = document.querySelectorAll('.nav-link');
  const backTop   = document.getElementById('backTop');

  // Scroll effects
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky styles
    navbar.classList.toggle('scrolled', scrollY > 60);

    // Back-to-top visibility
    if (backTop) backTop.classList.toggle('show', scrollY > 500);

    // Active nav link
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
      if (scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(lk => {
      lk.classList.toggle('active', lk.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  // Hamburger
  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.forEach(lk => {
    lk.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll for all internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


/* ─────────────────────────────────────────────
   4. DARK / LIGHT THEME TOGGLE
───────────────────────────────────────────── */
(function initTheme() {
  const btn  = document.getElementById('themeBtn');
  const ico  = document.getElementById('themeIco');
  const html = document.documentElement;

  // Respect saved preference
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (ico) {
      ico.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
})();


/* ─────────────────────────────────────────────
   5. TYPED TEXT EFFECT
───────────────────────────────────────────── */
(function initTyped() {
  const el     = document.getElementById('typedTxt');
  if (!el) return;

  const phrases = [
    'web experiences.',
    'scalable APIs.',
    'beautiful UIs.',
    'cloud solutions.',
    'design systems.',
    'mobile apps.',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let pauseTick = 0;
  const PAUSE   = 38; // pause frames before deleting

  function type() {
    const phrase = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        if (++pauseTick < PAUSE) { setTimeout(type, 50); return; }
        pauseTick = 0;
        deleting  = true;
      }
    } else {
      el.textContent = phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 45 : 100);
  }

  // Start after loader
  setTimeout(type, 2600);
})();


/* ─────────────────────────────────────────────
   6. SCROLL REVEAL
───────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.ru');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ─────────────────────────────────────────────
   7. SKILL TABS
───────────────────────────────────────────── */
(function initSkillTabs() {
  const tabs   = document.querySelectorAll('.stab');
  const panels = document.querySelectorAll('.skill-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update buttons
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels
      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === `panel-${target}`) {
          p.classList.add('active');
          // Re-trigger bar animations
          p.querySelectorAll('.sk-fill').forEach(fill => {
            fill.style.width = '0';
            requestAnimationFrame(() => {
              setTimeout(() => {
                fill.style.width = fill.dataset.w + '%';
              }, 100);
            });
          });
          // Re-trigger reveals
          p.querySelectorAll('.ru').forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 50);
          });
        }
      });
    });
  });
})();


/* ─────────────────────────────────────────────
   8. SKILL BAR ANIMATIONS (on scroll)
───────────────────────────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.sk-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.w + '%';
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
})();


/* ─────────────────────────────────────────────
   9. COUNTER ANIMATIONS
───────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.count-anim');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const dur    = 2000; // ms
        const step   = Math.ceil(target / (dur / 16));
        let   cur    = 0;

        const timer = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = cur.toLocaleString();
          if (cur >= target) clearInterval(timer);
        }, 16);

        // Also animate hero stats
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));

  // Hero stats (separate)
  const heroNums = document.querySelectorAll('.hnum');
  const heroObs  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const dur    = 1600;
        const step   = Math.max(1, Math.ceil(target / (dur / 16)));
        let   cur    = 0;

        const timer = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = cur;
          if (cur >= target) clearInterval(timer);
        }, 16);

        heroObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  heroNums.forEach(n => heroObs.observe(n));
})();


/* ─────────────────────────────────────────────
   10. BUTTON RIPPLE EFFECT
───────────────────────────────────────────── */
(function initRipple() {
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect   = this.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const size   = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement('span');

      ripple.className = 'ripple-effect';
      ripple.style.cssText = `
        width:  ${size}px;
        height: ${size}px;
        left:   ${x - size / 2}px;
        top:    ${y - size / 2}px;
      `;

      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
})();


/* ─────────────────────────────────────────────
   11. CONTACT FORM
───────────────────────────────────────────── */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Simulate async send
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      success.classList.add('show');
      form.reset();

      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1800);
  });
})();


/* ─────────────────────────────────────────────
   12. PARALLAX HERO ORBS
───────────────────────────────────────────── */
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = [0.15, 0.08, 0.12][i] || 0.1;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
})();


/* ─────────────────────────────────────────────
   13. ACTIVE NAV HIGHLIGHT (Intersection)
───────────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(lk => {
          lk.classList.toggle('active', lk.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => observer.observe(sec));
})();


/* ─────────────────────────────────────────────
   14. RESUME / CERT DOWNLOAD FEEDBACK
───────────────────────────────────────────── */
(function initDownloads() {
  const resumeBtn = document.getElementById('resumeDl');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', function(e) {
      // Show feedback toast since no real file exists in demo
      showToast('Resume download starting...', 'success');
    });
  }

  // Certificate view buttons — open a modal-style overlay
  document.querySelectorAll('.ca-view').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const certName = this.closest('.cert-card')?.querySelector('h4')?.textContent || 'Certificate';
      showCertModal(certName);
    });
  });

  document.querySelectorAll('.ca-dl').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const certName = this.closest('.cert-card')?.querySelector('h4')?.textContent || 'Certificate';
      showToast(`Downloading: ${certName}`, 'success');
    });
  });
})();


/* ─────────────────────────────────────────────
   15. TOAST NOTIFICATIONS
───────────────────────────────────────────── */
function showToast(message, type = 'success') {
  // Create toast container if not exists
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = `
      position: fixed; bottom: 2rem; right: 2rem;
      z-index: 99998; display: flex; flex-direction: column; gap: .5rem;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: var(--bg3);
    border: 1px solid ${type === 'success' ? 'rgba(52,211,153,.35)' : 'rgba(248,113,113,.35)'};
    color: ${type === 'success' ? '#34d399' : '#f87171'};
    padding: .75rem 1.2rem;
    border-radius: 12px;
    font-size: .87rem;
    font-weight: 500;
    display: flex; align-items: center; gap: .5rem;
    box-shadow: 0 8px 24px rgba(0,0,0,.3);
    backdrop-filter: blur(16px);
    transform: translateX(120%);
    transition: transform .4s cubic-bezier(.4,0,.2,1), opacity .4s;
    font-family: var(--font-b, sans-serif);
  `;
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-times-circle'}"></i>${message}`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
  });

  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity   = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}


/* ─────────────────────────────────────────────
   16. CERTIFICATE MODAL
───────────────────────────────────────────── */
function showCertModal(certName) {
  // Remove existing if open
  const existing = document.getElementById('certModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'certModal';
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 99997;
    background: rgba(0,0,0,.75);
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(8px);
    opacity: 0; transition: opacity .3s;
    padding: 1.5rem;
  `;

  modal.innerHTML = `
    <div style="
      background: var(--bg3);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 2.5rem;
      max-width: 500px; width: 100%;
      text-align: center;
      transform: scale(.9);
      transition: transform .3s;
      box-shadow: 0 30px 80px rgba(0,0,0,.5);
    " id="certModalBox">
      <div style="
        width: 80px; height: 80px;
        background: linear-gradient(135deg, #38bdf8, #818cf8);
        border-radius: 20px;
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto 1.5rem;
        font-size: 2rem; color: #fff;
      "><i class="fas fa-certificate"></i></div>
      <h3 style="font-family: var(--font-h); font-size: 1.3rem; font-weight: 800; margin-bottom: .5rem;">${certName}</h3>
      <p style="color: var(--txt2); font-size: .9rem; margin-bottom: 2rem; line-height: 1.7;">
        This is a verified credential issued to Alex Morgan. 
        In a live portfolio, this would display the actual certificate image or PDF.
      </p>
      <div style="display: flex; gap: .8rem; justify-content: center; flex-wrap: wrap;">
        <button onclick="this.closest('#certModal').remove()" style="
          padding: .65rem 1.5rem; border-radius: 8px;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          color: #fff; font-weight: 600; font-size: .9rem;
          border: none; cursor: pointer;
        "><i class="fas fa-times"></i> Close</button>
        <button onclick="showToast('Downloading certificate...','success');this.closest('#certModal').remove();" style="
          padding: .65rem 1.5rem; border-radius: 8px;
          background: var(--surface); color: var(--txt);
          border: 1px solid var(--border); font-weight: 600; font-size: .9rem;
          cursor: pointer;
        "><i class="fas fa-download"></i> Download</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  requestAnimationFrame(() => {
    modal.style.opacity = '1';
    document.getElementById('certModalBox').style.transform = 'scale(1)';
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.remove();
  });

  // ESC to close
  const onEsc = e => {
    if (e.key === 'Escape') { modal.remove(); document.removeEventListener('keydown', onEsc); }
  };
  document.addEventListener('keydown', onEsc);
}


/* ─────────────────────────────────────────────
   17. TECH CHIP TOOLTIP
───────────────────────────────────────────── */
(function initTooltips() {
  document.querySelectorAll('.tchip[title]').forEach(chip => {
    chip.addEventListener('mouseenter', function() {
      const tip = document.createElement('div');
      tip.textContent = this.title;
      tip.style.cssText = `
        position: absolute;
        background: var(--bg3);
        border: 1px solid var(--border);
        color: var(--txt);
        padding: .3rem .7rem;
        border-radius: 6px;
        font-size: .75rem;
        font-weight: 600;
        pointer-events: none;
        z-index: 1000;
        white-space: nowrap;
        transform: translateX(-50%);
        box-shadow: 0 4px 16px rgba(0,0,0,.3);
        font-family: var(--font-m);
      `;
      this._tip = tip;

      // Position
      document.body.appendChild(tip);
      const rect = this.getBoundingClientRect();
      tip.style.left = (rect.left + rect.width/2 + window.scrollX) + 'px';
      tip.style.top  = (rect.top - 36 + window.scrollY) + 'px';
    });

    chip.addEventListener('mouseleave', function() {
      if (this._tip) { this._tip.remove(); this._tip = null; }
    });
  });
})();


/* ─────────────────────────────────────────────
   18. SMOOTH SECTION TRANSITIONS
───────────────────────────────────────────── */
(function initSectionTransitions() {
  // Add subtle entrance for alt-bg sections
  const altSections = document.querySelectorAll('.alt-bg');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.1 });
  altSections.forEach(s => observer.observe(s));
})();


/* ─────────────────────────────────────────────
   19. PERFORMANCE: requestIdleCallback for non-critical
───────────────────────────────────────────── */
const idleCallback = window.requestIdleCallback || (fn => setTimeout(fn, 50));

idleCallback(() => {
  // Pre-warm any future lazy sections
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  // no-op if none; just here for extensibility
});


/* ─────────────────────────────────────────────
   20. KEYBOARD NAVIGATION ACCESSIBILITY
───────────────────────────────────────────── */
(function initA11y() {
  // Skip-to-content on Tab
  document.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
})();