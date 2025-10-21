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

  // Make header sticky - CLEAN SIMPLE VERSION using position: fixed
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('[data-ae-header]') || 
                   document.querySelector('.ae-header') ||
                   document.querySelector('[id*="shopify-section"][id*="header"]');
    
    if (!header) {
      console.log('❌ Header not found');
      return;
    }
    
    console.log('✅ Header found:', header);
    
    let isSticky = false;
    let headerOriginalTop = 0;
    
    const makeSticky = () => {
      if (isSticky) return;
      
      isSticky = true;
      header.classList.add('is-sticky');
      
      // Use position: fixed instead of sticky to avoid conflicts
      header.setAttribute('style', 'position: fixed !important; top: 20px !important; left: 50% !important; transform: translateX(-50%) !important; width: 100% !important; max-width: 100vw !important; z-index: 1000 !important; margin: 0 !important; padding: 0 !important;');
      
      // Fix container height
      const container = header.querySelector('.ae-header__container');
      if (container) {
        container.setAttribute('style', 'height: 60px !important; min-height: 60px !important; max-height: 60px !important; padding: 12px var(--container-padding) !important; background: #252525 !important; border: 1px solid rgba(255, 255, 255, 0.12) !important; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5) !important; border-radius: 16px !important; position: relative !important; margin: 0 !important; transform: none !important;');
      }
      
      console.log('🔒 Header is now FIXED at top');
    };
    
    const removeSticky = () => {
      if (!isSticky) return;
      
      isSticky = false;
      header.classList.remove('is-sticky');
      header.removeAttribute('style');
      
      const container = header.querySelector('.ae-header__container');
      if (container) {
        container.removeAttribute('style');
      }
      
      console.log('🔓 Header is now normal');
    };
    
    const checkScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      
      if (scrollY > 5 && !isSticky) {
        makeSticky();
      } else if (scrollY <= 5 && isSticky) {
        removeSticky();
      }
    };
    
    // Listen to scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    // Initial check
    checkScroll();
  });
  
})();