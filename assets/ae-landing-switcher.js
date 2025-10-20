// @ts-nocheck
/**
 * AE Landing Switcher - MongoDB-Style Content Switcher
 * Smooth Content-Wechsel zwischen Online Zulassung und Wunschkennzeichen
 */

class AELandingSwitcher {
  constructor() {
    /** @type {HTMLElement|null} */
    this.switcher = document.querySelector('.ae-switcher');
    /** @type {NodeListOf<HTMLButtonElement>} */
    this.buttons = document.querySelectorAll('.ae-switcher__button');
    /** @type {NodeListOf<HTMLElement>} */
    this.contentItems = document.querySelectorAll('.ae-switcher-content__item');
    /** @type {HTMLElement|null} */
    this.slider = this.switcher ? this.switcher.querySelector('.ae-switcher__slider') : null;
    this.currentRole = 'zulassung';
    
    this.init();
  }

  init() {
    if (!this.switcher) return;
    
    this.bindEvents();
    this.setInitialState();
  }

  bindEvents() {
    this.buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const role = button.dataset.role;
        this.switchContent(role);
      });

      // Keyboard navigation
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const role = button.dataset.role;
          this.switchContent(role);
        }
      });
    });
  }

  setInitialState() {
    // Set initial active state
    this.updateButtonStates();
    this.updateContentVisibility();
    this.updateSliderPosition();
  }

  switchContent(role) {
    if (role === this.currentRole) return;
    
    this.currentRole = role;
    
    // Update button states
    this.updateButtonStates();
    
    // Update content with smooth transition
    this.updateContentVisibility();
    this.updateSliderPosition();
    
    // Update URL hash (optional, for deep linking)
    this.updateUrlHash(role);
    
    // Trigger custom event for analytics
    this.dispatchSwitchEvent(role);
  }

  updateButtonStates() {
    this.buttons.forEach(button => {
      const isActive = button.dataset.role === this.currentRole;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  updateSliderPosition() {
    if (!this.slider || this.buttons.length === 0) return;
    // Find active button and set slider width + transform
    const activeBtn = Array.from(this.buttons).find(b => b.dataset.role === this.currentRole) || this.buttons[0];
    const btnRect = activeBtn.getBoundingClientRect();
    const containerRect = this.switcher.getBoundingClientRect();
    const width = btnRect.width;
    const offsetX = btnRect.left - containerRect.left;
    this.slider.style.width = `${Math.round(width)}px`;
    this.slider.style.transform = `translateX(${Math.round(offsetX)}px)`;
  }

  updateContentVisibility() {
    this.contentItems.forEach(item => {
      const isActive = item.dataset.roleContent === this.currentRole;
      item.classList.toggle('active', isActive);
      
      // Update ARIA attributes for accessibility
      item.setAttribute('aria-hidden', !isActive);
      
      // Update tabindex for keyboard navigation
      const focusableElements = item.querySelectorAll('a, button, input, textarea, select');
      focusableElements.forEach(el => {
        el.setAttribute('tabindex', isActive ? '0' : '-1');
      });
    });
  }

  updateUrlHash(role) {
    // Update URL hash without page reload
    const url = new URL(window.location.href);
    url.hash = role;
    window.history.replaceState({}, '', url);
  }

  dispatchSwitchEvent(role) {
    // Custom event for analytics or other integrations
    const event = new CustomEvent('ae-switcher-change', {
      detail: { role, timestamp: Date.now() }
    });
    document.dispatchEvent(event);
  }

  // Public method to switch programmatically
  switchTo(role) {
    this.switchContent(role);
  }

  // Public method to get current role
  getCurrentRole() {
    return this.currentRole;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize switcher
  const switcher = new AELandingSwitcher();
  // Update slider on resize to keep alignment
  window.addEventListener('resize', () => switcher.updateSliderPosition());
  
  // Handle URL hash changes (for deep linking)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash === 'zulassung' || hash === 'kennzeichen') {
      switcher.switchTo(hash);
    }
  });
  
  // Handle initial hash
  const initialHash = window.location.hash.substring(1);
  if (initialHash === 'zulassung' || initialHash === 'kennzeichen') {
    switcher.switchTo(initialHash);
  }
});

// Export for potential external use
window.AELandingSwitcher = AELandingSwitcher;
