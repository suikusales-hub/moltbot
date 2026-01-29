document.addEventListener('DOMContentLoaded', () => {
  console.log('%c SYSTEM READY // MOLTBOT INTERFACE LOADED ', 'background: #000; color: #00f3ff; font-size: 20px; font-family: monospace; border: 1px solid #00f3ff; padding: 10px;');

  // Glitch effect on click for headings
  const headings = document.querySelectorAll('h1, h2, h3');
  headings.forEach(h => {
    h.addEventListener('click', () => {
      h.classList.add('glitch-hover');
      setTimeout(() => {
        h.classList.remove('glitch-hover');
      }, 500);
    });
  });

  // Typewriter effect for elements with class 'typewriter'
  const typeWriters = document.querySelectorAll('.typewriter');
  typeWriters.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    let i = 0;
    const speed = 50; 
    
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    // Intersection Observer to start typing when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          type();
          observer.unobserve(el);
        }
      });
    });
    
    observer.observe(el);
  });
});
