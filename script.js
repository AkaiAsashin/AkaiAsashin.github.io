/* Einfaches SPA-Routing (kein Hash erforderlich) */
(function(){
  const navLinks = document.querySelectorAll('[data-section]');
  const pages = document.querySelectorAll('.page');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  // Konfiguration: setze hier deinen Twitch-Benutzernamen
  const TWITCH_CHANNEL = 'YOUR_TWITCH_CHANNEL'; // <--- ersetze
  // Bestimme parent automatisch (für lokale Entwicklung fallback 'localhost')
  const hostname = (window.location.hostname || 'localhost').split(':')[0] || 'localhost';
  const PARENT = hostname === '' ? 'localhost' : hostname;

  // Funktion, die Twitch iframe URLs zusammenbaut
  function buildTwitchSrc(channel, width, height, parent) {
    // Autoplay deaktiviert; muted=true erlaubt häufig Autoplay-Policies zu umgehen
    return `https://player.twitch.tv/?channel=${encodeURIComponent(channel)}&parent=${encodeURIComponent(parent)}&muted=true&time=` + Date.now();
  }

  // Setze Twitch iframe(s) (Home + Twitch Seite)
  function initTwitchEmbeds() {
    const iframeHome = document.getElementById('twitch-iframe-home');
    const iframeTwitch = document.getElementById('twitch-iframe-twitch');
    if (!TWITCH_CHANNEL || TWITCH_CHANNEL === 'YOUR_TWITCH_CHANNEL') {
      // Hinweis: Channel noch nicht gesetzt
      if (iframeHome) iframeHome.src = 'about:blank';
      if (iframeTwitch) iframeTwitch.src = 'about:blank';
      console.warn('Twitch channel not configured. Bitte in script.js TWITCH_CHANNEL setzen.');
      return;
    }
    const src = buildTwitchSrc(TWITCH_CHANNEL, 1280, 720, PARENT);
    if (iframeHome) iframeHome.src = src + '&parent=' + encodeURIComponent(PARENT);
    if (iframeTwitch) iframeTwitch.src = src + '&parent=' + encodeURIComponent(PARENT);
  }

  // Navigation handling
  function showSection(name) {
    pages.forEach(p => p.classList.toggle('hidden', p.dataset.section !== name));
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === name));
    // Wenn Twitch eingebettet werden soll (wird initial auch auf Home geladen)
    if (name === 'twitch' || name === 'home') {
      // lazy init oder refresh
      initTwitchEmbeds();
    }
  }

  // Attach events to nav
  document.querySelectorAll('.main-nav a, .brand').forEach(el => {
    el.addEventListener('click', (ev) => {
      ev.preventDefault();
      const section = el.dataset.section;
      if (section) showSection(section);
      // close mobile menu if open
      const navList = document.getElementById('nav-list');
      navList.classList.remove('show');
      document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
    });
  });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  navToggle?.addEventListener('click', () => {
    const navList = document.getElementById('nav-list');
    const expanded = navList.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  // Initial show home
  showSection('home');

  // Optional: keyboard navigation (1-5)
  window.addEventListener('keydown', (ev) => {
    if (ev.key >= '1' && ev.key <= '5') {
      const index = Number(ev.key) - 1;
      const link = document.querySelectorAll('.main-nav a')[index];
      if (link) link.click();
    }
  });

  // Initial twitch embed attempt on load
  document.addEventListener('DOMContentLoaded', () => {
    initTwitchEmbeds();
  });

})();
