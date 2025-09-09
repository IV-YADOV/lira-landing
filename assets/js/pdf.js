// Модальное окно для PDF
export function initPdfModal() {
  const dialog = document.getElementById('pdfDialog');
  const frame  = document.getElementById('pdfFrame');
  const dl     = document.getElementById('pdfDownload');
  const openNew= document.getElementById('pdfOpenNew');
  const close  = document.getElementById('pdfClose');
  if (!dialog || !frame || !dl || !openNew || !close) return;

  document.querySelectorAll('[data-pdf]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.getAttribute('href');
      frame.src = url;
      dl.href = url;
      openNew.href = url;
      dialog.showModal();
    });
  });

  close.addEventListener('click', () => {
    dialog.close();
    frame.src = '';
  });
}
