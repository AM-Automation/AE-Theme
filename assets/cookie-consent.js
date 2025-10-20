/**
 * Cookie Consent Banner - Apple Design
 * Modern cookie consent management with Apple-like aesthetics
 */

class CookieConsentBanner extends HTMLElement {
  constructor() {
    super();
    this.consentKey = 'ae-cookie-consent';
    this.consentVersion = '1.0';
    this.showDelay = 1000; // Show banner after 1 second
    this.consentGiven = false;
    
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.handlePreferences = this.handlePreferences.bind(this);
  }

  connectedCallback() {
    // Immediately hide existing banners
    this.hideExistingBanners();
    this.init();
  }

  init() {
    // Hide any existing Shopify cookie banners
    this.hideExistingBanners();
    
    // Check if consent has already been given
    if (this.hasConsent()) {
      this.consentGiven = true;
      return;
    }

    // Show banner after delay
    setTimeout(() => {
      this.showBanner();
    }, this.showDelay);

    this.bindEvents();
  }

  hideExistingBanners() {
    // Hide Shopify's default cookie banner
    const existingBanners = document.querySelectorAll('[data-shopify-cookie-banner], .shopify-cookie-banner, [data-cookie-banner], .cookie-banner');
    existingBanners.forEach(banner => {
      banner.style.display = 'none';
      banner.remove();
    });

    // Also hide any banner with "cookie consent" text
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      if (element.textContent && element.textContent.toLowerCase().includes('cookie consent')) {
        if (element.closest('[data-shopify-cookie-banner], .shopify-cookie-banner, [data-cookie-banner], .cookie-banner')) {
          element.style.display = 'none';
        }
      }
    });
  }

  bindEvents() {
    const acceptBtn = this.querySelector('[data-cookie-accept]');
    const declineBtn = this.querySelector('[data-cookie-decline]');
    const preferencesBtn = this.querySelector('[data-cookie-preferences]');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', this.handleAccept);
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', this.handleDecline);
    }

    if (preferencesBtn) {
      preferencesBtn.addEventListener('click', this.handlePreferences);
    }

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.classList.contains('show')) {
        this.handleDecline();
      }
    });
  }

  showBanner() {
    if (this.consentGiven) return;
    
    this.classList.add('show');
    
    // Add body class to prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const firstButton = this.querySelector('button');
    if (firstButton) {
      firstButton.focus();
    }

    // Announce to screen readers
    this.announceToScreenReader('Cookie consent banner is now visible');
  }

  hideBanner() {
    this.classList.remove('show');
    document.body.style.overflow = '';
    
    // Announce to screen readers
    this.announceToScreenReader('Cookie consent banner has been dismissed');
  }

  handleAccept() {
    this.setConsent(true);
    this.hideBanner();
    this.dispatchConsentEvent('accepted');
  }

  handleDecline() {
    this.setConsent(false);
    this.hideBanner();
    this.dispatchConsentEvent('declined');
  }

  handlePreferences() {
    // Open preferences modal or redirect to privacy policy
    const privacyLink = this.querySelector('[data-cookie-privacy-link]');
    if (privacyLink) {
      privacyLink.click();
    } else {
      // Fallback: scroll to privacy policy section
      const privacySection = document.querySelector('#privacy-policy');
      if (privacySection) {
        privacySection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  setConsent(accepted) {
    const consentData = {
      accepted,
      version: this.consentVersion,
      timestamp: new Date().toISOString()
    };

    try {
      localStorage.setItem(this.consentKey, JSON.stringify(consentData));
      this.consentGiven = true;
    } catch (error) {
      console.warn('Could not save cookie consent:', error);
    }
  }

  hasConsent() {
    try {
      const stored = localStorage.getItem(this.consentKey);
      if (!stored) return false;

      const consentData = JSON.parse(stored);
      
      // Check if consent version matches current version
      if (consentData.version !== this.consentVersion) {
        return false;
      }

      return consentData.accepted === true;
    } catch (error) {
      return false;
    }
  }

  dispatchConsentEvent(action) {
    const event = new CustomEvent('cookie-consent', {
      detail: {
        action,
        timestamp: new Date().toISOString()
      }
    });
    
    document.dispatchEvent(event);
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Public method to reset consent (useful for testing)
  resetConsent() {
    try {
      localStorage.removeItem(this.consentKey);
      this.consentGiven = false;
      this.showBanner();
    } catch (error) {
      console.warn('Could not reset cookie consent:', error);
    }
  }

  // Public method to check consent status
  getConsentStatus() {
    return {
      hasConsent: this.hasConsent(),
      consentGiven: this.consentGiven
    };
  }
}

// Register the custom element
if (!customElements.get('cookie-consent-banner')) {
  customElements.define('cookie-consent-banner', CookieConsentBanner);
}

// Export for module usage
export { CookieConsentBanner };
