// AE Header JavaScript
(() => {
  // Production: Remove console.log for performance
  // console.log('AE Header loaded successfully');
  
  // Mobile Menu Toggle Functionality
  const mobileMenuToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const mobileMenuClose = document.querySelector('[data-mobile-menu-close]');
  const burgerButton = document.querySelector('.ae-header__burger');
  
  // Open mobile menu
  function openMobileMenu() {
    if (mobileMenu && burgerButton) {
      mobileMenu.classList.add('active');
      burgerButton.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Animate burger lines
      /** @type {NodeListOf<HTMLElement>} */
      const lines = /** @type {any} */ (burgerButton.querySelectorAll('.ae-header__burger-line'));
      if (lines[0]) lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      if (lines[1]) lines[1].style.opacity = '0';
      if (lines[2]) lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }
  }
  
  // Close mobile menu
  function closeMobileMenu() {
    if (mobileMenu && burgerButton) {
      mobileMenu.classList.remove('active');
      burgerButton.classList.remove('active');
      document.body.style.overflow = '';
      
      // Reset burger lines
      /** @type {NodeListOf<HTMLElement>} */
      const lines = /** @type {any} */ (burgerButton.querySelectorAll('.ae-header__burger-line'));
      if (lines[0]) lines[0].style.transform = '';
      if (lines[1]) lines[1].style.opacity = '';
      if (lines[2]) lines[2].style.transform = '';
    }
  }
  
  // Event listeners
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMobileMenu);
  }
  
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }
  
  // Close menu when clicking on overlay
  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });
  }
  
  // Close menu when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  // Close menu when window is resized to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Make header stay at 20px once banner is off-screen
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('[data-ae-header]') || document.querySelector('.ae-header');
    if (!header) return;
    const COLLAPSE_Y = 80; // sync with banner logic
    let ticking = false;
    let isFixed = false;

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      if (!isFixed && y > COLLAPSE_Y) {
        header.classList.add('is-fixed');
        isFixed = true;
      } else if (isFixed && y <= COLLAPSE_Y) {
        header.classList.remove('is-fixed');
        isFixed = false;
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    // initialize state
    onScroll();
  });
  
})();