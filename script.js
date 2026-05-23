const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// GALERIA
function switchImg(imgId, thumb, src) {
  const img = document.getElementById(imgId);
  if (!img) return;

  img.src = src;

  const container = thumb.closest('.galeria-thumbs');
  if (!container) return;

  container.querySelectorAll('.galeria-thumb')
    .forEach(t => t.classList.remove('active'));

  thumb.classList.add('active');
}

// THEME
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  const saved = localStorage.getItem('thauluna-theme') || 'light';

  document.documentElement.setAttribute('data-theme', saved);
  themeToggle.textContent = saved === 'dark' ? '🌙' : '☀️';

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', next);
    themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';

    localStorage.setItem('thauluna-theme', next);
  });
}

// BACK TO TOP
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// SCROLL EFFECTS
window.addEventListener('scroll', () => {
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }

  const header = document.querySelector('header');
  if (header) {
    header.style.boxShadow =
      window.scrollY > 50
        ? '0 4px 24px rgba(0,0,0,0.08)'
        : 'none';
  }
});

// TL DESIGN (opcional - animação em cascata)
const tlCards = document.querySelectorAll('#tl-design .tl-card');

if (tlCards.length) {
  tlCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 120}ms`;
  });
}
