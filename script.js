// Revelar ao rolar
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Galeria (troca de imagem, se usada)
function switchImg(imgId, thumb, src) {
  const img = document.getElementById(imgId);
  if (!img) return;
  img.src = src;
  const container = thumb.closest('.galeria-thumbs');
  if (!container) return;
  container.querySelectorAll('.galeria-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

// Tema claro/escuro (o tema inicial é aplicado no <head> para não piscar)
const themeToggle = document.getElementById('themeToggle');
function paintToggle(theme) {
  if (!themeToggle) return;
  themeToggle.innerHTML = theme === 'dark' ? '<i class="ri-sun-line"></i>' : '<i class="ri-moon-line"></i>';
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
}
if (themeToggle) {
  paintToggle(document.documentElement.getAttribute('data-theme') || 'light');
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    paintToggle(next);
    try { localStorage.setItem('thauluna-theme', next); } catch (e) {}
  });
}

// Voltar ao topo
const backToTop = document.getElementById('backToTop');
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Menu: destaca a seção atual e mostra o botão de topo
const navLinks = [...document.querySelectorAll('.nav-links a')];
function onScroll() {
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
  let current = navLinks[0];
  navLinks.forEach(a => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target && target.getBoundingClientRect().top <= 140) current = a;
  });
  navLinks.forEach(a => a.classList.toggle('active', a === current));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
