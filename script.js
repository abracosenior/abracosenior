(function(){
  var btn=document.querySelector('.menu-btn'),menu=document.getElementById('menu');
  btn.addEventListener('click',function(){
    var aberto=menu.classList.toggle('aberto');
    btn.setAttribute('aria-expanded',aberto);
  });
  menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){menu.classList.remove('aberto');btn.setAttribute('aria-expanded',false);});
  });
  document.getElementById('ano').textContent=new Date().getFullYear();
  // Mensagem pré-preenchida no WhatsApp
  var w=document.getElementById('wpp');
  w.href='https://wa.me/5511984959512?text='+encodeURIComponent('Olá, Alê! Gostaria de agendar uma conversa.');
  // Revelação suave ao rolar a página (um único efeito)
  var alvos=document.querySelectorAll('.cartao,.beneficios li,.clareza');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visivel');io.unobserve(e.target);}});},{threshold:.2});
    alvos.forEach(function(el){el.classList.add('revelar');io.observe(el);});
  }

  // Destaca no menu a seção em que a pessoa está
  var links=[].slice.call(menu.querySelectorAll('a:not(.destaque)'));
  var secoes=links.map(function(a){return document.querySelector(a.getAttribute('href'));});
  function marcar(){
    var y=window.scrollY+120,atual=0;
    secoes.forEach(function(s,i){if(s&&s.offsetTop<=y)atual=i;});
    links.forEach(function(a,i){a.classList.toggle('ativo',i===atual);});
  }
  window.addEventListener('scroll',marcar,{passive:true});marcar();

})();
