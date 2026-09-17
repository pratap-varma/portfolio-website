/**
 * Master Application Logic for Pratap Varma's Portfolio
 * Renders project cards, handles filtering, modal interactions, live clock, and toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.getElementById('navbar');
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const projectsContainer = document.getElementById('projects-grid-container');
  const filterPills = document.querySelectorAll('.filter-pill');
  const liveClock = document.getElementById('live-time-ticker');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const siteToast = document.getElementById('site-toast');
  const toastMessage = document.getElementById('toast-message');

  // Modal elements
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalTagline = document.getElementById('modal-tagline');
  const modalProblem = document.getElementById('modal-problem');
  const modalSolution = document.getElementById('modal-solution');
  const modalFeatures = document.getElementById('modal-features');
  const modalTech = document.getElementById('modal-tech');
  const modalGithubLink = document.getElementById('modal-github-link');
  const modalLiveLink = document.getElementById('modal-live-link');

  // ==========================================
  // 1. Navbar Scroll Effect & Mobile Drawer
  // ==========================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // Active Nav Link Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 2. Render Project Cards
  // ==========================================
  function renderProjects(category = 'all') {
    if (!projectsContainer) return;
    projectsContainer.innerHTML = '';

    const filtered = category === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === category);

    filtered.forEach((project) => {
      const card = document.createElement('div');
      card.className = 'bento-card project-card';
      card.setAttribute('data-id', project.id);

      const statusBadge = `<span class="project-status">${project.status}</span>`;
      const techTags = project.tech.slice(0, 4).map(t => `<span class="tech-tag">${t}</span>`).join('');

      card.innerHTML = `
        <div class="project-header-top">
          <span class="project-num">ARTIFACT ${project.number}</span>
          ${statusBadge}
        </div>
        <h3 class="project-name">
          <span>${project.name}</span>
          <span style="font-size:1.1rem; color:var(--twilight-rose);">↗</span>
        </h3>
        <div class="project-tagline">${project.tagline}</div>
        <p class="project-desc">${project.shortDesc}</p>
        <div class="project-tech-strip">${techTags}</div>
        <div class="project-footer-actions">
          <span class="details-prompt-btn">Explore Architecture & Results →</span>
          <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">${project.category.toUpperCase()}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        openProjectModal(project);
      });

      projectsContainer.appendChild(card);
    });
  }

  renderProjects();

  // Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      renderProjects(filter);
    });
  });

  // ==========================================
  // 3. Project Detail Modal
  // ==========================================
  function openProjectModal(project) {
    if (!modal) return;
    modalBadge.textContent = `PROJECT ${project.number} · ${project.category.toUpperCase()}`;
    modalTitle.textContent = project.name;
    modalTagline.textContent = project.tagline;
    modalProblem.textContent = project.problem;
    modalSolution.textContent = project.solution;

    // Populate features
    modalFeatures.innerHTML = project.features.map(f => `
      <li class="modal-feature-item">
        <span class="check-icon">✓</span>
        <span>${f}</span>
      </li>
    `).join('');

    // Populate tech
    modalTech.innerHTML = project.tech.map(t => `
      <span class="tech-tag">${t}</span>
    `).join('');

    // Set GitHub link
    modalGithubLink.href = project.github;

    // Set Live link if valid
    if (project.live && project.live !== '#') {
      modalLiveLink.href = project.live;
      modalLiveLink.style.display = 'inline-flex';
    } else {
      modalLiveLink.style.display = 'none';
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================
  // 4. Live IST Clock (Vizianagaram, AP)
  // ==========================================
  function updateClock() {
    if (!liveClock) return;
    const now = new Date();
    // Format in Indian Standard Time (UTC+5:30)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    liveClock.textContent = now.toLocaleTimeString('en-US', options) + ' IST';
  }
  updateClock();
  setInterval(updateClock, 1000);

  // ==========================================
  // 5. Toast System & Copy Email
  // ==========================================
  function showToast(msg) {
    if (!siteToast || !toastMessage) return;
    toastMessage.textContent = msg;
    siteToast.classList.add('show');
    setTimeout(() => {
      siteToast.classList.remove('show');
    }, 3200);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'pratapvarma@example.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast("Pratap Varma's email copied to clipboard!");
      }).catch(() => {
        showToast("Email: pratapvarma@example.com");
      });
    });
  }

  // ==========================================
  // 6. Stats Number Count-Up Animation
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          if (isNaN(target)) return;

          let current = 0;
          const step = Math.max(1, Math.floor(target / 30));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              stat.textContent = target === 100 ? `${target}%` : `${target}+`;
              clearInterval(interval);
            } else {
              stat.textContent = target === 100 ? `${current}%` : `${current}+`;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.about-card-stats');
  if (statsSection) statsObserver.observe(statsSection);

  // ==========================================
  // 7. Scroll Reveal Observer for Sections & Cards
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 8. Distinct Per-Page Signature Section Animations & Navigation Controller
  // ==========================================
  const CHAPTERS_LIST = [
    { id: 'hero', title: 'The Twilight Sanctuary', soundFreq: 528 },
    { id: 'about', title: 'Profile & Philosophy', soundFreq: 440 },
    { id: 'arsenal', title: 'Technical Arsenal', soundFreq: 587 },
    { id: 'playground', title: 'AI Agent Sandbox', soundFreq: 659 },
    { id: 'projects', title: 'Featured Artifacts', soundFreq: 523 },
    { id: 'experience', title: 'Journey & Hackathons', soundFreq: 494 },
    { id: 'certifications', title: 'Credentials Vault', soundFreq: 698 },
    { id: 'approach', title: 'Engineering Lifecycle', soundFreq: 784 },
    { id: 'beyond', title: 'Beyond Code', soundFreq: 880 },
    { id: 'contact', title: 'Currently Building & Connect', soundFreq: 659 }
  ];

  const prevChapterBtn = document.getElementById('prev-chapter-btn');
  const nextChapterBtn = document.getElementById('next-chapter-btn');
  const signatureSections = document.querySelectorAll('.signature-section');
  const allNavLinks = document.querySelectorAll('.floating-bottom-dock .dock-nav-item, .floating-bottom-dock .nav-link, .mobile-nav-link');
  const transitionStage = document.getElementById('page-transition-stage');
  const transitionFxContainer = document.getElementById('transition-fx-container');
  const headerChapterNum = document.getElementById('header-chapter-num');
  const headerChapterTitle = document.getElementById('header-chapter-title');

  let isPageTransitioning = false;

  // Transition Markup Templates for Each Individual Destination Page
  const TRANSITION_TEMPLATES = {
    about: `
      <div class="transition-canvas-ink">
        <div class="ink-sweep-blade"></div>
        <div class="ink-emblem-text">自己紹介 · ABOUT</div>
      </div>`,
    arsenal: `
      <div class="transition-canvas-cyber">
        <div class="cyber-grid-flash"></div>
        <div class="cyber-laser-h"></div>
        <div class="cyber-laser-v"></div>
      </div>`,
    playground: `
      <div class="transition-canvas-crt">
        <div class="crt-scanline-bar"></div>
        <div class="crt-glitch-badge">⚡ AI AGENT SANDBOX</div>
      </div>`,
    projects: `
      <div class="transition-canvas-deck">
        <div class="deck-warp-panel"></div>
      </div>`,
    experience: `
      <div class="transition-canvas-chrono">
        <div class="chrono-light-stream"></div>
      </div>`,
    certifications: `
      <div class="transition-canvas-quantum">
        <div class="quantum-hex-ring-fx"></div>
      </div>`,
    approach: `
      <div class="transition-canvas-pipeline">
        <div class="pipeline-conveyor-streak"></div>
      </div>`,
    beyond: `
      <div class="transition-canvas-prism"></div>`,
    contact: `
      <div class="transition-canvas-radar">
        <div class="radar-shockwave-ring"></div>
      </div>`,
    hero: `
      <div class="transition-canvas-hero">
        <div class="hero-vortex-ring"></div>
      </div>`
  };

  function updateNavActiveState(activeId) {
    allNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const chapterIdx = CHAPTERS_LIST.findIndex(c => c.id === activeId);
    if (chapterIdx !== -1) {
      if (headerChapterNum) {
        headerChapterNum.textContent = `CH.${String(chapterIdx + 1).padStart(2, '0')}`;
      }
      if (headerChapterTitle) {
        headerChapterTitle.textContent = CHAPTERS_LIST[chapterIdx].title;
      }
    }
  }

  function getCurrentSectionIndex() {
    const scrollMiddle = window.scrollY + window.innerHeight * 0.35;
    for (let i = CHAPTERS_LIST.length - 1; i >= 0; i--) {
      const el = document.getElementById(CHAPTERS_LIST[i].id);
      if (el && el.offsetTop <= scrollMiddle) {
        return i;
      }
    }
    return 0;
  }

  // IntersectionObserver to track active page during natural scroll
  const sectionSignatureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-page-active');
        if (!isPageTransitioning) {
          updateNavActiveState(entry.target.id);
        }
      } else {
        entry.target.classList.remove('is-page-active');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -60px 0px'
  });

  signatureSections.forEach(section => {
    sectionSignatureObserver.observe(section);
  });

  // Distinct Per-Page Cinematic Transition Engine for Menu Navigation
  function navigateToSection(targetId) {
    if (isPageTransitioning) return;
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    isPageTransitioning = true;
    updateNavActiveState(targetId);

    const chapterMeta = CHAPTERS_LIST.find(c => c.id === targetId);
    if (chapterMeta && typeof window.playZenSound === 'function') {
      window.playZenSound(chapterMeta.soundFreq || 528, 'triangle', 0.45);
    }

    const fxType = targetId in TRANSITION_TEMPLATES ? targetId : 'hero';

    // Step 1: Render and activate this page's signature transition
    if (transitionStage && transitionFxContainer) {
      transitionFxContainer.innerHTML = TRANSITION_TEMPLATES[fxType];
      transitionStage.className = `page-transition-stage stage-active fx-${fxType}`;
    }

    // Step 2: At midpoint (220ms), instant teleport without slow scroll
    setTimeout(() => {
      const headerOffset = 65;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'instant'
      });

      // Target section entrance flair
      targetEl.classList.add('is-page-active', 'section-arrival-glow');
      setTimeout(() => targetEl.classList.remove('section-arrival-glow'), 800);

      // Harmonized arrival chime
      if (typeof window.playZenSound === 'function') {
        setTimeout(() => {
          window.playZenSound((chapterMeta?.soundFreq || 528) * 1.25, 'sine', 0.4);
        }, 50);
      }
    }, 220);

    // Step 3: Complete transition and clear stage (440ms)
    setTimeout(() => {
      if (transitionStage) {
        transitionStage.className = 'page-transition-stage';
        if (transitionFxContainer) transitionFxContainer.innerHTML = '';
      }
      isPageTransitioning = false;
    }, 440);
  }

  // Intercept all in-page navigation clicks (Desktop menu bar, bottom dock, buttons)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.length > 1) {
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          // Close mobile drawer if open
          const drawer = document.getElementById('mobile-drawer');
          if (drawer) drawer.classList.remove('open');
          navigateToSection(targetId);
        }
      }
    });
  });

  // Bottom dock stepper buttons (Prev / Next)
  if (prevChapterBtn) {
    prevChapterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentIdx = getCurrentSectionIndex();
      const prevIdx = Math.max(0, currentIdx - 1);
      navigateToSection(CHAPTERS_LIST[prevIdx].id);
    });
  }

  if (nextChapterBtn) {
    nextChapterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentIdx = getCurrentSectionIndex();
      const nextIdx = Math.min(CHAPTERS_LIST.length - 1, currentIdx + 1);
      navigateToSection(CHAPTERS_LIST[nextIdx].id);
    });
  }

  // Kinetic Scroll & Gesture Navigation Engine:
  // Triggers the bespoke cinematic transition when scrolling down/up between chapters
  let wheelCooldown = false;
  let wheelAccumulator = 0;
  const WHEEL_THRESHOLD = 35;

  window.addEventListener('wheel', (e) => {
    // If transition in flight, suppress wheel to prevent momentum bleed
    if (isPageTransitioning) {
      e.preventDefault();
      return;
    }

    // Ignore if scrolling inside scrollable interactive widgets
    if (e.target.closest('.interactive-terminal-content, .playground-chat-log, textarea, input, select')) {
      return;
    }

    if (wheelCooldown) {
      e.preventDefault();
      return;
    }

    wheelAccumulator += e.deltaY;

    if (Math.abs(wheelAccumulator) < WHEEL_THRESHOLD) {
      return;
    }

    const direction = wheelAccumulator > 0 ? 1 : -1;
    wheelAccumulator = 0;

    const currentIdx = getCurrentSectionIndex();
    const currentEl = document.getElementById(CHAPTERS_LIST[currentIdx]?.id);

    if (direction === 1) {
      // Scrolling DOWN
      if (currentIdx >= CHAPTERS_LIST.length - 1) return; // At last chapter

      // If current section is taller than screen and user hasn't reached its bottom yet,
      // allow natural reading scroll through the section
      if (currentEl) {
        const rect = currentEl.getBoundingClientRect();
        if (rect.bottom > (window.innerHeight + 40)) {
          return;
        }
      }

      e.preventDefault();
      wheelCooldown = true;
      navigateToSection(CHAPTERS_LIST[currentIdx + 1].id);
      setTimeout(() => { wheelCooldown = false; }, 650);
    } else {
      // Scrolling UP
      if (currentIdx <= 0) return; // At first chapter

      // If user hasn't reached the top of current section yet, allow reading scroll
      if (currentEl) {
        const rect = currentEl.getBoundingClientRect();
        if (rect.top < -40) {
          return;
        }
      }

      e.preventDefault();
      wheelCooldown = true;
      navigateToSection(CHAPTERS_LIST[currentIdx - 1].id);
      setTimeout(() => { wheelCooldown = false; }, 650);
    }
  }, { passive: false });

  // Touch Swipe Navigation for mobile & tablet screens
  let touchStartY = 0;
  let touchStartX = 0;
  let touchCooldown = false;

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (isPageTransitioning || touchCooldown) return;
    if (e.changedTouches.length === 1) {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      const deltaX = touchStartX - e.changedTouches[0].clientX;

      // Ensure vertical gesture is dominant and intentional (> 45px)
      if (Math.abs(deltaY) > 45 && Math.abs(deltaY) > Math.abs(deltaX) * 1.3) {
        const currentIdx = getCurrentSectionIndex();
        const currentEl = document.getElementById(CHAPTERS_LIST[currentIdx]?.id);

        if (deltaY > 0) {
          // Swipe up = scroll down
          if (currentIdx >= CHAPTERS_LIST.length - 1) return;
          if (currentEl) {
            const rect = currentEl.getBoundingClientRect();
            if (rect.bottom > (window.innerHeight + 40)) return;
          }
          touchCooldown = true;
          navigateToSection(CHAPTERS_LIST[currentIdx + 1].id);
          setTimeout(() => { touchCooldown = false; }, 650);
        } else {
          // Swipe down = scroll up
          if (currentIdx <= 0) return;
          if (currentEl) {
            const rect = currentEl.getBoundingClientRect();
            if (rect.top < -40) return;
          }
          touchCooldown = true;
          navigateToSection(CHAPTERS_LIST[currentIdx - 1].id);
          setTimeout(() => { touchCooldown = false; }, 650);
        }
      }
    }
  }, { passive: true });

  // Keyboard navigation shortcuts: ArrowDown, ArrowUp, PageDown, PageUp, Space, J/K
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    if (e.key === 'PageDown' || e.key === 'ArrowDown' || e.key === ' ' || (e.key.toLowerCase() === 'j' && !e.ctrlKey && !e.metaKey)) {
      e.preventDefault();
      const currentIdx = getCurrentSectionIndex();
      const nextIdx = Math.min(CHAPTERS_LIST.length - 1, currentIdx + 1);
      if (nextIdx !== currentIdx) {
        navigateToSection(CHAPTERS_LIST[nextIdx].id);
      }
    } else if (e.key === 'PageUp' || e.key === 'ArrowUp' || (e.key.toLowerCase() === 'k' && !e.ctrlKey && !e.metaKey)) {
      e.preventDefault();
      const currentIdx = getCurrentSectionIndex();
      const prevIdx = Math.max(0, currentIdx - 1);
      if (prevIdx !== currentIdx) {
        navigateToSection(CHAPTERS_LIST[prevIdx].id);
      }
    }
  });

  // Global exposure for testing & developer console
  window.navigateToChapter = navigateToSection;
  window.navigateToSection = navigateToSection;
});
