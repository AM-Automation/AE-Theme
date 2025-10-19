// AE Header JavaScript
(() => {
  console.log('AE Header loaded successfully');
  
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
      const lines = burgerButton.querySelectorAll('.ae-header__burger-line');
      lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }
  }
  
  // Close mobile menu
  function closeMobileMenu() {
    if (mobileMenu && burgerButton) {
      mobileMenu.classList.remove('active');
      burgerButton.classList.remove('active');
      document.body.style.overflow = '';
      
      // Reset burger lines
      const lines = burgerButton.querySelectorAll('.ae-header__burger-line');
      lines[0].style.transform = '';
      lines[1].style.opacity = '';
      lines[2].style.transform = '';
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
  
})();