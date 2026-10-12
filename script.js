
(function () {
  'use strict';
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
 
  function fechar() {
    menu.classList.remove('aberto');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Abrir menu');
  }
  btn.addEventListener('click', function () {
    var aberto = menu.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', String(aberto));
    btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', fechar); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && !btn.contains(e.target)) fechar();
  });
 
  document.getElementById('ano').textContent = new Date().getFullYear();
 
  // Mensagem pré-preenchida no WhatsApp
  var w = document.getElementById('wpp');
  if (w) w.href = 'https://wa.me/5511984959512?text=' + encodeURIComponent('Olá, Alê! Gostaria de agendar uma conversa.');
 
  // Revelação suave ao rolar (só se o navegador suportar e o usuário permitir movimento)
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var alvos = document.querySelectorAll('.cartao,.beneficios li,.clareza');
  if ('IntersectionObserver' in window && !reduz) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visivel'); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    alvos.forEach(function (el) { el.classList.add('revelar'); io.observe(el); });
  }
 
  // Destaca no menu a seção atual
  var links = [].slice.call(menu.querySelectorAll('a:not(.destaque)'));
  var secoes = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  var ticking = false;
  function marcar() {
    var atual = 0;
    secoes.forEach(function (s, i) {
      if (s && s.getBoundingClientRect().top <= 120) atual = i;
    });
    links.forEach(function (a, i) {
      a.classList.toggle('ativo', i === atual);
      if (i === atual) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(marcar); }
  }, { passive: true });
  marcar();
})();
 