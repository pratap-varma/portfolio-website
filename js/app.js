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
  // 8. Page Transitions: Option 1 (Energy Sweep) & Option 3 (Torii Shutter)
  // ==========================================
  const CHAPTERS_LIST = [
    { id: 'hero', chapter: 'CHAPTER 00', kanji: '人工知能', title: 'The Twilight Sanctuary' },
    { id: 'about', chapter: 'CHAPTER 01', kanji: '自己紹介', title: 'Profile & Philosophy' },
    { id: 'arsenal', chapter: 'CHAPTER 02', kanji: '技術兵器', title: 'Technical Arsenal' },
    { id: 'playground', chapter: 'CHAPTER 03', kanji: '実証実験', title: 'AI Agent Sandbox' },
    { id: 'projects', chapter: 'CHAPTER 04', kanji: '実績作品', title: 'Featured Artifacts' },
    { id: 'experience', chapter: 'CHAPTER 05', kanji: '経歴道程', title: 'Journey & Hackathons' },
    { id: 'certifications', chapter: 'CHAPTER 06', kanji: '資格認証', title: 'Credentials Vault' },
    { id: 'approach', chapter: 'CHAPTER 07', kanji: '開発手法', title: 'Engineering Lifecycle' },
    { id: 'beyond', chapter: 'CHAPTER 08', kanji: '趣味情熱', title: 'Beyond Code' },
    { id: 'contact', chapter: 'CHAPTER 09', kanji: '接続連絡', title: 'Currently Building & Connect' }
  ];

  // Animation Mode State ('opt1' = Energy Sweep, 'opt3' = Torii Shutter)
  let currentAnimationMode = localStorage.getItem('pratap_anim_mode') || 'opt1';
  let isTransitioning = false;

  // DOM Elements - Mode Switcher & HUD
  const modeOpt1Btn = document.getElementById('mode-opt1-btn');
  const modeOpt3Btn = document.getElementById('mode-opt3-btn');
  const hudKanji = document.getElementById('hud-kanji');
  const hudChapter = document.getElementById('hud-chapter');
  const hudTitle = document.getElementById('hud-title');
  const prevChapterBtn = document.getElementById('prev-chapter-btn');
  const nextChapterBtn = document.getElementById('next-chapter-btn');

  // DOM Elements - Option 1 (Energy Portal)
  const energyPortal = document.getElementById('energy-portal');
  const energyKanji = document.getElementById('energy-kanji');
  const energyBadge = document.getElementById('energy-badge');
  const energyTitle = document.getElementById('energy-title');

  // DOM Elements - Option 3 (Torii Shutter)
  const toriiShutter = document.getElementById('torii-shutter');
  const shutterKanji = document.getElementById('shutter-kanji');
  const shutterBadge = document.getElementById('shutter-badge');
  const shutterTitle = document.getElementById('shutter-title');

  function setAnimationMode(mode) {
    currentAnimationMode = mode;
    localStorage.setItem('pratap_anim_mode', mode);
    if (modeOpt1Btn && modeOpt3Btn) {
      if (mode === 'opt1') {
        modeOpt1Btn.classList.add('active');
        modeOpt3Btn.classList.remove('active');
      } else {
        modeOpt3Btn.classList.add('active');
        modeOpt1Btn.classList.remove('active');
      }
    }
  }

  // Initialize mode UI
  setAnimationMode(currentAnimationMode);

  if (modeOpt1Btn) {
    modeOpt1Btn.addEventListener('click', () => {
      setAnimationMode('opt1');
      if (typeof window.playZenSound === 'function') window.playZenSound(660, 'sine', 0.4);
    });
  }

  if (modeOpt3Btn) {
    modeOpt3Btn.addEventListener('click', () => {
      setAnimationMode('opt3');
      if (typeof window.playZenSound === 'function') window.playZenSound(440, 'triangle', 0.5);
    });
  }

  function updateHUD(chapterMeta) {
    if (hudKanji) hudKanji.textContent = chapterMeta.kanji;
    if (hudChapter) hudChapter.textContent = chapterMeta.chapter.replace('CHAPTER', 'CH.');
    if (hudTitle) hudTitle.textContent = chapterMeta.title;
  }

  function getCurrentChapterIndex() {
    const scrollMiddle = window.scrollY + window.innerHeight * 0.35;
    for (let i = CHAPTERS_LIST.length - 1; i >= 0; i--) {
      const el = document.getElementById(CHAPTERS_LIST[i].id);
      if (el && el.offsetTop <= scrollMiddle) {
        return i;
      }
    }
    return 0;
  }

  // Sync HUD on passive scroll
  window.addEventListener('scroll', () => {
    if (!isTransitioning) {
      const currentIdx = getCurrentChapterIndex();
      updateHUD(CHAPTERS_LIST[currentIdx]);
    }
  });

  // OPTION 1: Fast Cinematic Energy Portal Sweep & 3D Depth Bloom
  function triggerOption1Transition(targetId, targetEl, chapterMeta) {
    if (!energyPortal) return;
    isTransitioning = true;

    // Update Card Information
    if (energyKanji) energyKanji.textContent = chapterMeta.kanji;
    if (energyBadge) energyBadge.textContent = chapterMeta.chapter;
    if (energyTitle) energyTitle.textContent = chapterMeta.title;
    updateHUD(chapterMeta);

    // Audio chime
    if (typeof window.playZenSound === 'function') {
      window.playZenSound(587.33, 'triangle', 0.45);
    }

    // Activate Energy Sweep
    energyPortal.classList.add('is-active', 'sweeping');

    // Midway through the warp sweep (280ms), teleport scroll & bloom
    setTimeout(() => {
      const headerOffset = 70;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'instant'
      });

      // Apply 3D depth bloom to target section
      targetEl.classList.remove('section-depth-bloom');
      void targetEl.offsetWidth; // force reflow
      targetEl.classList.add('section-depth-bloom');

      setTimeout(() => {
        targetEl.classList.remove('section-depth-bloom');
      }, 750);

      // Play arrival harmonic chime
      if (typeof window.playZenSound === 'function') {
        window.playZenSound(784, 'sine', 0.6);
      }

      // Exit Energy Sweep
      setTimeout(() => {
        energyPortal.classList.remove('sweeping');
        setTimeout(() => {
          energyPortal.classList.remove('is-active');
          isTransitioning = false;
        }, 180);
      }, 140);
    }, 280);
  }

  // OPTION 3: Japanese Cyber-Torii Shutter Gates
  function triggerOption3Transition(targetId, targetEl, chapterMeta) {
    if (!toriiShutter) return;
    isTransitioning = true;

    // Update Shutter Emblem
    if (shutterKanji) shutterKanji.textContent = chapterMeta.kanji;
    if (shutterBadge) shutterBadge.textContent = chapterMeta.chapter;
    if (shutterTitle) shutterTitle.textContent = chapterMeta.title;
    updateHUD(chapterMeta);

    // Audio chime
    if (typeof window.playZenSound === 'function') {
      window.playZenSound(440, 'sine', 0.6);
    }

    // Step 1: Slide panels closed
    toriiShutter.classList.add('is-active', 'closing');

    // Step 2: Jump scroll position when shutters meet in center (380ms)
    setTimeout(() => {
      const headerOffset = 70;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'instant'
      });

      // Play arrival chord
      if (typeof window.playZenSound === 'function') {
        setTimeout(() => window.playZenSound(659.25, 'triangle', 0.8), 60);
      }

      // Step 3: Part shutters open outward
      setTimeout(() => {
        toriiShutter.classList.remove('closing');
        setTimeout(() => {
          toriiShutter.classList.remove('is-active');
          isTransitioning = false;
        }, 420);
      }, 140);
    }, 380);
  }

  // Unified Chapter Transition Router
  function navigateToChapter(targetId) {
    if (isTransitioning) return;
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const chapterMeta = CHAPTERS_LIST.find(c => c.id === targetId) || {
      chapter: 'CHAPTER',
      kanji: '転換',
      title: targetId.toUpperCase()
    };

    if (currentAnimationMode === 'opt3') {
      triggerOption3Transition(targetId, targetEl, chapterMeta);
    } else {
      triggerOption1Transition(targetId, targetEl, chapterMeta);
    }
  }

  // Intercept all in-page navigation clicks
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.length > 1) {
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          navigateToChapter(targetId);
        }
      }
    });
  });

  // Prev / Next Chapter Stepper buttons in bottom dock
  if (prevChapterBtn) {
    prevChapterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentIndex = getCurrentChapterIndex();
      const prevIndex = Math.max(0, currentIndex - 1);
      navigateToChapter(CHAPTERS_LIST[prevIndex].id);
    });
  }

  if (nextChapterBtn) {
    nextChapterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentIndex = getCurrentChapterIndex();
      const nextIndex = Math.min(CHAPTERS_LIST.length - 1, currentIndex + 1);
      navigateToChapter(CHAPTERS_LIST[nextIndex].id);
    });
  }

  // Keyboard navigation shortcuts: PageDown/PageUp or J/K or Alt+ArrowDown/Up
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    if (e.key === 'PageDown' || (e.key === 'ArrowDown' && e.altKey) || (e.key.toLowerCase() === 'j' && !e.ctrlKey && !e.metaKey && !e.altKey)) {
      e.preventDefault();
      const currentIndex = getCurrentChapterIndex();
      const nextIndex = Math.min(CHAPTERS_LIST.length - 1, currentIndex + 1);
      navigateToChapter(CHAPTERS_LIST[nextIndex].id);
    } else if (e.key === 'PageUp' || (e.key === 'ArrowUp' && e.altKey) || (e.key.toLowerCase() === 'k' && !e.ctrlKey && !e.metaKey && !e.altKey)) {
      e.preventDefault();
      const currentIndex = getCurrentChapterIndex();
      const prevIndex = Math.max(0, currentIndex - 1);
      navigateToChapter(CHAPTERS_LIST[prevIndex].id);
    }
  });

  // Expose transition navigation globally for testing
  window.navigateToChapter = navigateToChapter;
  window.setAnimationMode = setAnimationMode;
});
