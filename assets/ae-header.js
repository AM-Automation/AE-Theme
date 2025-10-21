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

  // Make header sticky with smooth transitions - SIMPLIFIED VERSION
  document.addEventListener('DOMContentLoaded', () => {
    // Try multiple selectors to find the header
    const header = document.querySelector('[data-ae-header]') || 
                   document.querySelector('.ae-header') ||
                   document.querySelector('[id*="shopify-section"][id*="header"]') ||
                   document.querySelector('#shopify-section-sections--19397825560915__header');
    
    if (!header) {
      console.log('Header element not found');
      console.log('Available elements:', document.querySelectorAll('[id*="header"]'));
      return;
    }
    
    // Use only the header element, not the header-group
    const targetElement = header;
    
    if (!targetElement) {
      console.log('No target element found');
      return;
    }
    
    console.log('Header found:', header);
    console.log('Target element:', targetElement);
    console.log('Target element ID:', targetElement.id);
    
    const COLLAPSE_Y = 0; // Header becomes sticky immediately when banner edge appears
    const HYSTERESIS = 5; // Add 5px hysteresis to prevent flickering
    let ticking = false;
    let isSticky = false;

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      
      // Add hysteresis to prevent flickering at the threshold
      const stickyThreshold = isSticky ? COLLAPSE_Y - HYSTERESIS : COLLAPSE_Y + HYSTERESIS;
      
      // Simple logic with hysteresis: sticky when banner edge appears
      if (!isSticky && y > stickyThreshold) {
        targetElement.classList.add('is-sticky');
        isSticky = true;
        console.log('✅ Header is now sticky (banner edge visible) at scroll position:', y);
        
        // Force a reflow to ensure styles are applied
        targetElement.getBoundingClientRect();
      } else if (isSticky && y <= stickyThreshold) {
        targetElement.classList.remove('is-sticky');
        isSticky = false;
        console.log('❌ Header is no longer sticky (at top) at scroll position:', y);
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