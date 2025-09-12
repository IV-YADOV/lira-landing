// assets/js/doctor.js
export function initDoctor() {
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const dialog = $('#doctorDialog');
  const nameEl = $('#doctorName');
  const aboutEl = $('#doctorAbout');

  const tabAbout  = $('#tabAbout');
  const tabCerts  = $('#tabCerts');
  const certsWrap = $('#doctorCerts');
  const certGrid  = $('#certGrid');
  const closeEl   = $('#doctorClose');

  // используем уже существующий PDF-диалог
  const pdfDialog   = $('#pdfDialog');
  const pdfFrame    = $('#pdfFrame');
  const pdfDownload = $('#pdfDownload');
  const pdfOpenNew  = $('#pdfOpenNew');

  if (!dialog || !nameEl || !aboutEl || !tabAbout || !tabCerts || !certGrid) return;

  // ====== ДАННЫЕ: все ссылки — на PDF ======
  const doctors = {
    litvinovskaya: {
      name: 'Литвиновская Ирина Анатольевна',
      about: `
        <p><b>Образование:</b> высшее медицинское</p>
        <p><b>Специальность:</b> «Дерматовенерология», «Косметология»</p>
        <p>В 2004 г окончила Амурскую Государственную Медицинскую Академию («Лечебное дело»).</p>
        <p>В 2017 г — профпереподготовка «Косметология» (ИПКСЗ Минздрава Хабаровского края).</p>
        <p>В 2025 г — аккредитация по «Косметологии».</p>
        <p><b>Стаж по косметологии:</b> 8 лет.</p>
      `,
      // Вариант А: отдельные PDF (покажем сеткой)
      pdfs: [
        { title: 'Диплом', url: 'docs/doctor1/diplom.pdf' },
        { title: 'Сертификат', url: 'docs/doctor1/certificate.pdf' },
      ],
      // Вариант Б: один общий «портфолио» PDF (оставь null, если не нужно)
      portfolio: null // 'docs/certs/litvinovskaya/portfolio.pdf'
    },

    shumakova: {
      name: 'Шумакова Екатерина Сергеевна',
      about: `
        <p><b>Образование:</b> среднее медицинское</p>
        <p><b>Специальность:</b> косметик-эстетист</p>
        <p>1998 г — Хабаровское базовое медицинское училище («фельдшер-лаборант»).</p>
        <p>2024 г — Академия “EstheticPROF”, профпереподготовка «Эстетическая косметология. Косметик-эстетист по уходу за лицом».</p>
        <p>С 2024 г — косметик-эстетист в «Лира».</p>
      `,
      pdfs: [
        { title: 'Диплом + Сертификат',         url: 'docs/doctor2/certificate.pdf' },
      ],
      portfolio: null
    }
  };

  // ====== helpers ======
  function openPdf(url, name = 'document.pdf') {
    if (!pdfDialog || !pdfFrame || !pdfDownload || !pdfOpenNew) return;
    pdfFrame.src = url;
    pdfDownload.href = url;
    pdfDownload.download = name;
    pdfOpenNew.href = url;
    pdfDialog.showModal();
  }

  function renderPdfChips(pdfs = [], portfolio = null, doctorKey = '') {
    certGrid.innerHTML = '';

    // Если есть один общий файл «портфолио», покажем крупную кнопку
    if (portfolio) {
      const a = document.createElement('a');
      a.href = portfolio;
      a.className = 'block p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition text-center';
      a.innerHTML = `
        <div class="mx-auto w-12 h-12 rounded-lg border border-slate-200 grid place-items-center text-xs">PDF</div>
        <div class="mt-2 font-medium">Портфолио дипломов и сертификатов</div>
        <div class="text-xs text-slate-500">Открыть общий файл</div>
      `;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        openPdf(portfolio, `${doctorKey}-portfolio.pdf`);
      });
      certGrid.appendChild(a);
      return;
    }

    // Иначе — сетка из PDF
    if (!pdfs.length) {
      certGrid.innerHTML = '<div class="text-sm text-slate-500">Документы не добавлены.</div>';
      return;
    }

    const frag = document.createDocumentFragment();
    pdfs.forEach((item, i) => {
      const a = document.createElement('a');
      a.href = item.url;
      a.className = 'group rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition overflow-hidden';
      a.innerHTML = `
        <div class="flex items-center gap-3 p-3">
          <div class="w-10 h-10 rounded-lg border border-slate-200 grid place-items-center text-xs shrink-0">PDF</div>
          <div class="text-sm">
            <div class="font-medium">${item.title}</div>
            <div class="text-slate-500 text-xs">Открыть</div>
          </div>
        </div>
      `;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const safeName = (item.title || `doc-${i+1}`).replace(/\s+/g, '_') + '.pdf';
        openPdf(item.url, safeName);
      });
      frag.appendChild(a);
    });
    certGrid.appendChild(frag);
  }

  function activateTab(which = 'about') {
    const on  = (el) => el.classList.add('bg-slate-100');
    const off = (el) => el.classList.remove('bg-slate-100');

    if (which === 'about') {
      on(tabAbout); off(tabCerts);
      aboutEl.classList.remove('hidden');
      certsWrap.classList.add('hidden');
    } else {
      on(tabCerts); off(tabAbout);
      aboutEl.classList.add('hidden');
      certsWrap.classList.remove('hidden');
    }
  }

  // ====== события ======
  $$('[data-doctor]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.doctor;
      const d = doctors[key];
      if (!d) return;

      nameEl.textContent = d.name;
      aboutEl.innerHTML = d.about;
      renderPdfChips(d.pdfs || [], d.portfolio || null, key);
      activateTab('about');

      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', 'open');
    });
  });

  tabAbout.addEventListener('click', () => activateTab('about'));
  tabCerts.addEventListener('click', () => activateTab('certs'));
  closeEl.addEventListener('click', () => dialog.close());

  // клик по фону — закрыть
  dialog.addEventListener('click', (e) => {
    const r = dialog.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) dialog.close();
  });
}
