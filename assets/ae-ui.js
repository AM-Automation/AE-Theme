/**
 * Autoschilder Express - UI JavaScript
 * Role-Switch, Mega-Menu, Mobile Navigation, Accessibility
 */

class AutoschilderExpressUI {
  constructor() {
    this.init();
  }

  init() {
    this.initRoleSwitch();
    this.initMegaMenu();
    // Mobile Menu now handled by ae-header.js
    this.initStickyHeader();
    this.initAOS();
    this.initReducedMotion();
  }

  /**
   * Role Switch (Hero Toggle)
   */
  initRoleSwitch() {
    const roleButtons = document.querySelectorAll('.ae-role-btn');
    
    if (roleButtons.length === 0) return;

    roleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const targetRole = button.dataset.role;
        
        // Update buttons
        roleButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        
        // Update subcopy
        const subcopyElements = document.querySelectorAll('.ae-hero__subcopy');
        subcopyElements.forEach(el => {
          if (el.dataset.roleContent === targetRole) {
            el.classList.add('active');
          } else {
            el.classList.remove('active');
          }
        });
        
        // Update CTAs
        const ctaElements = document.querySelectorAll('[data-role-cta]');
        ctaElements.forEach(el => {
          if (el.dataset.roleCta === targetRole) {
            el.classList.add('active');
          } else {
            el.classList.remove('active');
          }
        });
        
        // Update media
        const mediaElements = document.querySelectorAll('[data-role-media]');
        mediaElements.forEach(el => {
          if (el.dataset.roleMedia === targetRole) {
            el.classList.add('active');
          } else {
            el.classList.remove('active');
          }
        });
      });
    });
  }

  /**
   * Mega Menu (Desktop Navigation)
   */
  initMegaMenu() {
    const navItems = document.querySelectorAll('.ae-nav-item--has-dropdown');
    
    if (navItems.length === 0) return;

    navItems.forEach(item => {
      const link = item.querySelector('.ae-nav-link');
      const megaMenu = item.querySelector('.ae-mega-menu');
      
      if (!link || !megaMenu) return;

      let hoverTimeout;

      // Mouse enter
      item.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        link.setAttribute('aria-expanded', 'true');
      });

      // Mouse leave
      item.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
          link.setAttribute('aria-expanded', 'false');
        }, 200);
      });

      // Keyboard navigation
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isExpanded = link.getAttribute('aria-expanded') === 'true';
          link.setAttribute('aria-expanded', !isExpanded);
        }
        if (e.key === 'Escape') {
          link.setAttribute('aria-expanded', 'false');
          link.focus();
        }
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!item.contains(e.target)) {
          link.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Mobile Menu functionality moved to ae-header.js to avoid conflicts

  /**
   * Sticky Header
   */
  initStickyHeader() {
    const header = document.querySelector('.ae-header');
    
    if (!header || header.dataset.sticky !== 'true') return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > scrollThreshold) {
        header.classList.add('ae-header--scrolled');
        
        // Hide on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 200) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
      } else {
        header.classList.remove('ae-header--scrolled');
        header.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
  }

  /**
   * Animate On Scroll (Simple Implementation)
   */
  initAOS() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Respect prefers-reduced-motion
   */
  initReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (e) => {
      if (e.matches) {
        document.documentElement.style.setProperty('--ae-transition-fast', '0ms');
        document.documentElement.style.setProperty('--ae-transition-base', '0ms');
        document.documentElement.style.setProperty('--ae-transition-slow', '0ms');
        
        // Remove all AOS animations
        document.querySelectorAll('[data-aos]').forEach(el => {
          el.classList.add('aos-animate');
        });
      }
    };

    // Check on load
    handleReducedMotion(prefersReducedMotion);
    
    // Listen for changes
    prefersReducedMotion.addEventListener('change', handleReducedMotion);
  }
}

/**
 * Cart Update
 */
class CartManager {
  constructor() {
    this.init();
  }

  init() {
    this.updateCartCount();
    this.listenForCartChanges();
  }

  updateCartCount() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const countElement = document.querySelector('[data-cart-count]');
        if (countElement) {
          countElement.textContent = cart.item_count;
          
          // Hide if empty
          if (cart.item_count === 0) {
            countElement.style.display = 'none';
          } else {
            countElement.style.display = 'flex';
          }
        }
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
      });
  }

  listenForCartChanges() {
    // Listen for custom cart update events
    document.addEventListener('cart:updated', () => {
      this.updateCartCount();
    });

    // Listen for Shopify theme events
    document.addEventListener('shopify:section:load', () => {
      this.updateCartCount();
    });
  }
}

/**
 * Performance Optimization
 */
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.optimizeScrollEvents();
  }

  lazyLoadImages() {
    // Native lazy loading is handled by loading="lazy" attribute
    // This is a fallback for browsers that don't support it
    if ('loading' in HTMLImageElement.prototype) {
      return; // Browser supports native lazy loading
    }

    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  optimizeScrollEvents() {
    // Throttle scroll events for better performance
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Scroll event handlers here
          ticking = false;
        });
        ticking = true;
      }
    });
  }
}

/**
 * Accessibility Enhancements
 */
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.manageFocusVisible();
    this.trapFocusInModals();
    this.announceChanges();
  }

  manageFocusVisible() {
    // Add focus-visible class for keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  trapFocusInModals() {
    const modals = document.querySelectorAll('[role="dialog"]');
    
    modals.forEach(modal => {
      const focusableElements = modal.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      
      modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      });
    });
  }

  announceChanges() {
    // Create a live region for screen reader announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    document.body.appendChild(liveRegion);
    
    // Function to announce messages
    window.announceToScreenReader = (message) => {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    };
  }
}

/**
 * Initialize Everything
 */
document.addEventListener('DOMContentLoaded', () => {
  new AutoschilderExpressUI();
  new CartManager();
  new PerformanceOptimizer();
  new AccessibilityManager();
});

/**
 * Shopify Theme Editor Support
 */
document.addEventListener('shopify:section:load', () => {
  new AutoschilderExpressUI();
});

document.addEventListener('shopify:section:reorder', () => {
  new AutoschilderExpressUI();
});

/**
 * Export for use in other scripts
 */
window.AE = {
  UI: AutoschilderExpressUI,
  Cart: CartManager,
  Performance: PerformanceOptimizer,
  Accessibility: AccessibilityManager
};

