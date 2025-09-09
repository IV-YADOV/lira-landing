// Подсвет активного пункта меню при прокрутке + установка года
export function initObservers() {
  // Год в подвале
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const sections = ['services','experts','docs','contacts']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = document.querySelectorAll('.nav-link');
  const byId = (hash) => Array.from(navLinks).find(a => a.getAttribute('href') === '#' + hash);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = byId(id);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('text-purple-600','font-semibold'));
        link.classList.add('text-purple-600','font-semibold');
        history.replaceState(null, '', '#' + id);
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

  sections.forEach(sec => io.observe(sec));

  // Плавный скролл на прямое открытие #anchor
  window.addEventListener('load', () => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
