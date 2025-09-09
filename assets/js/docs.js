// Показать все / Свернуть в сетке документов (ПК/планшет)
export function initDocsToggle() {
  const docsToggle = document.getElementById('docsToggle');
  const docsGrid   = document.getElementById('docsGrid');
  if (!docsToggle || !docsGrid) return;

  let expanded = false;
  const allItems   = Array.from(docsGrid.querySelectorAll('a'));
  const extraItems = allItems.slice(4); // лишние элементы (5-й и далее)

  // начальное состояние — скрываем лишние
  extraItems.forEach(el => el.classList.add('hidden'));

  docsToggle.addEventListener('click', () => {
    expanded = !expanded;
    extraItems.forEach(el => el.classList.toggle('hidden', !expanded));
    docsToggle.textContent = expanded ? 'Свернуть' : `Показать все (${allItems.length})`;

    if (!expanded) {
      document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
