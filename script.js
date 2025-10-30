/* Theme toggle (persists in localStorage) */
(function(){
  const btns = document.querySelectorAll('#theme-toggle'); // there are multiple btns loaded across pages
  const current = localStorage.getItem('kk_theme');
  if(current === 'dark'){ document.body.classList.add('dark'); updateToggleIcons('dark'); }

  function toggleTheme(){
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('kk_theme', isDark ? 'dark' : 'light');
    updateToggleIcons(isDark ? 'dark' : 'light');
  }

  function updateToggleIcons(mode){
    document.querySelectorAll('#theme-toggle').forEach(b=>{
      b.textContent = (mode === 'dark') ? '☀️' : '🌙';
    });
  }

  btns.forEach(b=>b.addEventListener('click', toggleTheme));
})();

/* Scroll reveal observer for panels & cards */
(function(){
  const reveals = document.querySelectorAll('.scroll-reveal');
  const cards = document.querySelectorAll('.card-reveal');

  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.18 });

  reveals.forEach(r=>obs.observe(r));
  cards.forEach(c=>obs.observe(c));
})();

/* Projects carousel controls + gentle auto-scroll */
(function(){
  const container = document.getElementById('projects-scroll');
  if(!container) return;

  const left = document.getElementById('scroll-left');
  const right = document.getElementById('scroll-right');
  const autoToggle = document.getElementById('auto-scroll-toggle');

  // click scroll
  left && left.addEventListener('click', ()=> container.scrollBy({ left: -340, behavior: 'smooth' }));
  right && right.addEventListener('click', ()=> container.scrollBy({ left: 340, behavior: 'smooth' }));

  // gentle auto-scroll (pauses on hover or interaction)
  let autoId = null;
  let direction = 1; // 1 right, -1 left
  let isPaused = false;

  function startAutoScroll(){
    if(autoId) return;
    autoId = setInterval(()=> {
      if(isPaused) return;
      // when reaching near the end, reverse direction
      const max = container.scrollWidth - container.clientWidth;
      if(container.scrollLeft >= max - 2) direction = -1;
      if(container.scrollLeft <= 2) direction = 1;
      container.scrollLeft += direction * 1.2; // px per tick
    }, 16); // roughly 60fps smooth
  }

  function stopAutoScroll(){
    if(autoId){ clearInterval(autoId); autoId = null; }
  }

  autoToggle && autoToggle.addEventListener('change',(e)=>{
    if(e.target.checked) startAutoScroll();
    else stopAutoScroll();
  });

  // hover/pointer pause
  container.addEventListener('mouseenter', ()=> isPaused = true);
  container.addEventListener('mouseleave', ()=> isPaused = false);
  container.addEventListener('pointerdown', ()=> isPaused = true);
  document.addEventListener('pointerup', ()=> isPaused = false);
})();
