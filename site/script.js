(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Ouvrir le menu');
      });
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImage) {
    document.querySelectorAll('[data-lightbox]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const image = link.querySelector('img');
        lightboxImage.src = link.getAttribute('href');
        lightboxImage.alt = image ? image.alt : (link.dataset.lightbox || 'Image agrandie');
        lightboxCaption.textContent = link.dataset.lightbox || 'Aperçu';
        if (typeof lightbox.showModal === 'function') {
          lightbox.showModal();
        } else {
          window.open(link.href, '_blank', 'noopener');
        }
      });
    });

    const closeLightbox = () => {
      if (lightbox.open) lightbox.close();
      lightboxImage.src = '';
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    lightbox.addEventListener('close', () => { lightboxImage.src = ''; });
  }

  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
