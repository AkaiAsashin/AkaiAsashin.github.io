// common.js
// - setzt Jahr in Footer
// - mobile nav toggle
// - markiert aktiven Link anhand von location.pathname

(function(){
  // Jahr
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  // mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  navToggle?.addEventListener('click', () => {
    const navList = document.getElementById('nav-list');
    const expanded = navList.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  // aktiven Link markieren
  const links = document.querySelectorAll('.nav-list a');
  const path = (window.location.pathname || '').split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (!href) return;
    // einfache Normalisierung: index.html == home
    if ((path === '' || path === 'index.html') && (href === 'index.html' || href === './' || href === '/')) {
      a.classList.add('active');
    } else if (href === path) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
})();
