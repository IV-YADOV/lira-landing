// assets/js/app.js
import { initMenu } from './menu.js';
import { initDocsToggle } from './docs.js';
import { initPdfModal } from './pdf.js';
import { initObservers } from './observe.js';
import { initDoctor } from './doctor.js';

window.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initDocsToggle();
  initPdfModal();
  initObservers();
  initDoctor();       // ВАЖНО: инициализируем модалку врачей
});
