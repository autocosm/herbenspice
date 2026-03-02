/* ── Theme toggle ─────────────────────────────── */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-label').textContent = isDark ? 'Dark mode' : 'Light mode';
  try { localStorage.setItem('dsw-theme', isDark ? 'light' : 'dark'); } catch(e) {}
}

/* Restore saved theme */
try {
  const saved = localStorage.getItem('dsw-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('theme-label').textContent = saved === 'dark' ? 'Light mode' : 'Dark mode';
  }
} catch(e) {}

/* ── Active nav highlight on scroll ──────────── */
const sections = document.querySelectorAll('.sp-section[id]');
const navLinks  = document.querySelectorAll('.sp-nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.sp-nav a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-10% 0px -80% 0px' });

sections.forEach(s => observer.observe(s));

/* ── Smooth scroll for nav links ─────────────── */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});