// Бургер-меню с анимацией (через .is-open)
export function initMenu() {
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  if (!burger || !mobileNav) return;

  function openMenu() {
    burger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
  }
  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
  }

  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  // Закрыть меню при клике по пункту
  mobileNav.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // Закрыть по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') closeMenu();
  });
}
