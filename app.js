const intro = document.querySelector('#curtain-intro');
const openIntro = () => {
  if (!intro || intro.classList.contains('is-opening')) return;
  intro.classList.add('is-opening');
  sessionStorage.setItem('elena-intro-seen', 'yes');
  window.setTimeout(() => { intro.classList.add('is-hidden'); document.body.classList.remove('intro-lock'); }, 1450);
};

if (intro) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || sessionStorage.getItem('elena-intro-seen')) intro.classList.add('is-hidden');
  else {
    document.body.classList.add('intro-lock');
    window.setTimeout(openIntro, 900);
    document.querySelector('#open-curtain')?.addEventListener('click', openIntro);
    document.querySelector('#skip-intro')?.addEventListener('click', openIntro);
  }
}

const form = document.querySelector('#visit-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const room = String(data.get('room') || 'ambiente');
  const priority = String(data.get('priority') || '');
  const notes = String(data.get('notes') || '').trim();
  const message = `Olá! Vi as inspirações da Elena e gostaria de conversar sobre uma visita para escolher cortinas.\n\nAmbiente: ${room}\nO que busco: ${priority}${notes ? `\nDetalhes: ${notes}` : ''}\n\nPodem me orientar sobre os próximos passos?`;
  const url = `https://wa.me/554898550024?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

const observer = 'IntersectionObserver' in window ? new IntersectionObserver((items) => {
  items.forEach((item) => { if (item.isIntersecting) { item.target.classList.add('is-visible'); observer.unobserve(item.target); } });
}, { threshold: 0.08 }) : null;
document.querySelectorAll('.gallery-item,.visit-copy,.finder-form').forEach((item) => {
  item.classList.add('reveal');
  if (observer) observer.observe(item); else item.classList.add('is-visible');
});
