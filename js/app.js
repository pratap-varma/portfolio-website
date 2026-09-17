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
  const dockNavLinks = document.querySelectorAll('.floating-bottom-dock .dock-nav-item, .nav-links a');

  function updateDockActiveState(activeId) {
    dockNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
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

  // IntersectionObserver to activate per-section unique signature animation
  const sectionSignatureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-page-active');
        updateDockActiveState(entry.target.id);
      } else {
        // Reset when scrolled out so re-entry plays animation cleanly
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

  // Smooth in-page navigation without screen-covering overlays
  function navigateToSection(targetId) {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const chapterMeta = CHAPTERS_LIST.find(c => c.id === targetId);
    if (chapterMeta && typeof window.playZenSound === 'function') {
      window.playZenSound(chapterMeta.soundFreq || 528, 'triangle', 0.45);
    }

    const headerOffset = 60;
    const elementPosition = targetEl.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    });

    // Mark active for signature animation
    targetEl.classList.add('is-page-active');
    updateDockActiveState(targetId);
  }

  // Intercept in-page navigation links (nav links, dock items, buttons)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.length > 1) {
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
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

  // Keyboard navigation shortcuts: PageDown/PageUp, J/K, Alt+ArrowDown/Up
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    if (e.key === 'PageDown' || (e.key === 'ArrowDown' && e.altKey) || (e.key.toLowerCase() === 'j' && !e.ctrlKey && !e.metaKey && !e.altKey)) {
      e.preventDefault();
      const currentIdx = getCurrentSectionIndex();
      const nextIdx = Math.min(CHAPTERS_LIST.length - 1, currentIdx + 1);
      navigateToSection(CHAPTERS_LIST[nextIdx].id);
    } else if (e.key === 'PageUp' || (e.key === 'ArrowUp' && e.altKey) || (e.key.toLowerCase() === 'k' && !e.ctrlKey && !e.metaKey && !e.altKey)) {
      e.preventDefault();
      const currentIdx = getCurrentSectionIndex();
      const prevIdx = Math.max(0, currentIdx - 1);
      navigateToSection(CHAPTERS_LIST[prevIdx].id);
    }
  });

  // Global exposure for testing & developer console
  window.navigateToChapter = navigateToSection;
  window.navigateToSection = navigateToSection;
});
