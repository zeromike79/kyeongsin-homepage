/* ==============================
   NAV TOGGLE (Mobile)
============================== */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('active');
    navMenu?.classList.remove('open');
  });
});

/* ==============================
   ACTIVE NAV LINK
============================== */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ==============================
   SCROLL FADE-IN (Stagger)
============================== */
const fadeEls = document.querySelectorAll('.fade-in');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.09}s`;
  scrollObserver.observe(el);
});

/* ==============================
   SUBSCRIBER COUNTER (youtube.html)
============================== */
const counterEl = document.getElementById('sub-count');

if (counterEl) {
  const target = parseInt(counterEl.dataset.target, 10);

  function animateCounter(el, end, duration = 2200) {
    const startTime = performance.now();
    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * end).toLocaleString('ko-KR');
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(counterEl, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterObserver.observe(counterEl);
}

/* ==============================
   CONTACT FORM (contact.html)
============================== */
const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name')?.value.trim();
  alert(`고마워요${name ? ', ' + name + '!' : '!'} 메시지를 잘 받았어 😊`);
  contactForm.reset();
});
