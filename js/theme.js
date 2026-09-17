/**
 * Theme Switcher & Web Audio API Zen Sound Synthesizer
 */

(function () {
  const themeToggle = document.getElementById('theme-toggle');
  const soundToggle = document.getElementById('sound-toggle');
  const currentTheme = localStorage.getItem('pratap_portfolio_theme') || 'dark';

  // Apply initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('pratap_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
      playZenChime(520, 'sine');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'light' 
      ? '<span title="Switch to Twilight Night">🌙</span>' 
      : '<span title="Switch to Daylight">☀️</span>';
  }

  // ==========================================
  // Web Audio API Synthesizer (Zero file loads!)
  // ==========================================
  let audioCtx = null;
  let isMuted = localStorage.getItem('pratap_sound_muted') === 'true';

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playZenChime(freq = 440, type = 'sine', duration = 0.8) {
    if (isMuted) return;
    try {
      initAudio();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      // Gentle exponential decay for zen chime
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Expose sound globally for app interactions
  window.playZenSound = playZenChime;

  function updateSoundUI() {
    if (!soundToggle) return;
    if (isMuted) {
      soundToggle.classList.add('audio-muted');
      soundToggle.title = "Unmute Zen Chimes";
    } else {
      soundToggle.classList.remove('audio-muted');
      soundToggle.title = "Mute Ambient Chimes";
    }
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      isMuted = !isMuted;
      localStorage.setItem('pratap_sound_muted', isMuted);
      updateSoundUI();
      if (!isMuted) playZenChime(660);
    });
    updateSoundUI();
  }

  // Trigger gentle chime on primary buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-primary') || e.target.closest('.filter-pill') || e.target.closest('.project-card')) {
      playZenChime(587.33); // D5 pitch
    }
  });
})();
