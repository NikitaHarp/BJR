
let isScrolling = false;

const hero = document.getElementById('home');
const shop = document.getElementById('shop');

const shopLink = document.querySelector('.shop-link');

function smoothScrollTo(targetY, duration = 1400) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInOut(t) {
    return t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const eased = easeInOut(progress);
    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}


shopLink.addEventListener('click', (e) => {
  e.preventDefault();

  if (isScrolling) return;

  isScrolling = true;

  smoothScrollTo(shop.offsetTop, 1200);

  setTimeout(() => {
    isScrolling = false;
  }, 900);
});

window.addEventListener('wheel', (e) => {

  const heroBottom = hero.getBoundingClientRect().bottom;
  
  if (window.innerWidth < 900) return;
  
  // если мы ещё на заставке
  if (heroBottom > window.innerHeight - 10 && !isScrolling) {

    // если крутим вниз
    if (e.deltaY > 0) {
      e.preventDefault();
      isScrolling = true;

      
    smoothScrollTo(shop.offsetTop, 1200);
      

      setTimeout(() => {
        isScrolling = false;
      }, 900);
    }
  }

}, { passive: false });


