# Кабинет косметологии «Лира»

Современный адаптивный лендинг для косметологического кабинета «Лира» (г. Хабаровск).

## 📋 Возможности
- Адаптивный дизайн (десктоп, планшет, смартфон)
- Плавная анимация появления элементов
- Анимированное бургер-меню
- Просмотр PDF-документов во встроенном окне
- Разделы: услуги, специалисты, документы, контакты с картой
- SEO-мета-данные и структурированные данные schema.org

## 🛠 Технологии
- **HTML5**
- **TailwindCSS** (utility-first стили)
- **Vanilla JavaScript** (бургер-меню, анимации, PDF-viewer)
- **Google Maps Embed**

## 🚀 Деплой
Сайт можно опубликовать с помощью **GitHub Pages**:
1. Settings → Pages → Deploy from a branch  
2. Branch: `main` → `/ (root)`  
3. Адрес: `https://<логин>.github.io/lira-landing/`

## 📂 Структура
/
├── index.html # Главная страница
├── assets/
│ ├── css/
│ │ ├── base.css # сбросы/базовые стили
│ │ ├── layout.css # сетка, шапка, подвал
│ │ └── components.css # анимации, кнопки, карточки
│ ├── js/
│ │ ├── menu.js # логика бургер-меню
│ │ ├── docs.js # раскрытие/сворачивание документов
│ │ └── pdf-viewer.js # открытие PDF во всплывающем окне
│ └── img/
│ ├── hero.jpg
│ ├── doctor1.jpg
│ └── doctor2.jpg
└── docs/ # PDF-документы
├── rights.pdf
├── extract.pdf
├── usrip.pdf
├── paid-services.pdf
└── ...

csharp
Копировать код

## 👤 Автор
Разработка: [YADOV](https://github.com/IV-YADOV)  
«Code is art. Signed by YADOV.»

## 📜 Лицензия
Проект распространяется под лицензией MIT — см. файл [LICENSE](LICENSE).