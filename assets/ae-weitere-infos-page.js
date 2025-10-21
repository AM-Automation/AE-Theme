/**
 * AE Weitere Infos Page JavaScript
 * Handles navigation, scroll behavior and collapse functionality for the 3 main categories with subchapters
 */

class AEWeitereInfosPage {
  constructor() {
    this.currentSection = 'zulassung';
    this.currentSubsection = 'neuzulassung';
    this.mainSections = ['zulassung', 'abmeldung', 'adress-aenderung'];
    this.subsections = {
      'zulassung': ['neuzulassung', 'halterwechsel', 'umschreibung', 'saisonzulassung'],
      'abmeldung': ['standard-abmeldung', 'express-abmeldung', 'kennzeichen-rueckgabe'],
      'adress-aenderung': ['adress-aenderung-service', 'namens-aenderung', 'kombinierte-aenderung']
    };
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupSmoothScrolling();
    this.setupActiveStates();
    this.setupScrollDetection();
    this.setupCollapseBehavior();
    this.setupAnimations();
    this.setupParallax();
  }

  setupNavigation() {
    // Desktop navigation categories
    const categories = document.querySelectorAll('.ae-weitere-infos-nav__category');
    const subchapters = document.querySelectorAll('.ae-weitere-infos-nav__subchapter');
    const sections = document.querySelectorAll('.ae-weitere-infos-section, .ae-weitere-infos-subsection');

    // Category header clicks
    categories.forEach(category => {
      const header = category.querySelector('.ae-weitere-infos-nav__header');
      header.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryType = this.getCategoryType(category);
        this.toggleCategory(category, categoryType);
      });
    });

    // Subchapter navigation
    subchapters.forEach(subchapter => {
      subchapter.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = subchapter.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          this.scrollToSection(targetSection);
          this.updateActiveSubchapter(subchapter);
          this.currentSubsection = targetId;
        }
      });
    });

    // Mobile navigation
    const mobileNavItems = document.querySelectorAll('.ae-weitere-infos-mobile-nav__item');
    mobileNavItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          this.scrollToSection(targetSection);
          this.updateActiveMobileNavItem(item);
          this.currentSection = targetId;
        }
      });
    });

    // Update active states on scroll
    window.addEventListener('scroll', () => {
      this.updateActiveStatesOnScroll(sections, categories, subchapters, mobileNavItems);
    });
  }

  setupSmoothScrolling() {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          this.scrollToSection(targetElement);
        }
      });
    });
  }

  setupActiveStates() {
    // Add hover effects to features
    const features = document.querySelectorAll('.ae-weitere-infos-feature');
    features.forEach(feature => {
      feature.addEventListener('mouseenter', () => {
        feature.style.transform = 'translateY(-4px)';
      });
      
      feature.addEventListener('mouseleave', () => {
        feature.style.transform = 'translateY(0)';
      });
    });

    // Add hover effects to category headers
    const categoryHeaders = document.querySelectorAll('.ae-weitere-infos-nav__header');
    categoryHeaders.forEach(header => {
      header.addEventListener('mouseenter', () => {
        if (!header.closest('.ae-weitere-infos-nav__category--expanded')) {
          header.style.background = '#2a2a2a';
        }
      });
      
      header.addEventListener('mouseleave', () => {
        if (!header.closest('.ae-weitere-infos-nav__category--expanded')) {
          header.style.background = '';
        }
      });
    });
  }

  setupCollapseBehavior() {
    // Initialize collapsed state for non-active categories
    const categories = document.querySelectorAll('.ae-weitere-infos-nav__category');
    categories.forEach(category => {
      if (!category.classList.contains('ae-weitere-infos-nav__category--expanded')) {
        const subchapters = category.querySelector('.ae-weitere-infos-nav__subchapters');
        if (subchapters) {
          subchapters.classList.add('ae-weitere-infos-nav__subchapters--hidden');
        }
      }
    });
  }

  setupScrollDetection() {
    // Throttled scroll handler for better performance
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateActiveStatesOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
  }

  getCategoryType(category) {
    if (category.classList.contains('ae-weitere-infos-nav__category--zulassung')) return 'zulassung';
    if (category.classList.contains('ae-weitere-infos-nav__category--abmeldung')) return 'abmeldung';
    if (category.classList.contains('ae-weitere-infos-nav__category--adress-aenderung')) return 'adress-aenderung';
    return null;
  }

  toggleCategory(category, categoryType) {
    const isExpanded = category.classList.contains('ae-weitere-infos-nav__category--expanded');
    const subchapters = category.querySelector('.ae-weitere-infos-nav__subchapters');
    
    if (isExpanded) {
      // Collapse category
      category.classList.remove('ae-weitere-infos-nav__category--expanded');
      category.classList.add('ae-weitere-infos-nav__category--collapsed');
      if (subchapters) {
        subchapters.classList.add('ae-weitere-infos-nav__subchapters--hidden');
      }
    } else {
      // Expand category
      category.classList.remove('ae-weitere-infos-nav__category--collapsed');
      category.classList.add('ae-weitere-infos-nav__category--expanded');
      if (subchapters) {
        subchapters.classList.remove('ae-weitere-infos-nav__subchapters--hidden');
      }
    }
  }

  scrollToSection(element) {
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  updateActiveSubchapter(activeSubchapter) {
    // Remove active class from all subchapters
    document.querySelectorAll('.ae-weitere-infos-nav__subchapter').forEach(subchapter => {
      subchapter.classList.remove('ae-weitere-infos-nav__subchapter--active');
    });
    
    // Add active class to clicked subchapter
    activeSubchapter.classList.add('ae-weitere-infos-nav__subchapter--active');
  }

  updateActiveMobileNavItem(activeItem) {
    // Remove active class from all mobile nav items
    document.querySelectorAll('.ae-weitere-infos-mobile-nav__item').forEach(item => {
      item.classList.remove('ae-weitere-infos-mobile-nav__item--active');
    });
    
    // Add active class to clicked item
    activeItem.classList.add('ae-weitere-infos-mobile-nav__item--active');
  }

  updateActiveStatesOnScroll() {
    const sections = document.querySelectorAll('.ae-weitere-infos-section, .ae-weitere-infos-subsection');
    const categories = document.querySelectorAll('.ae-weitere-infos-nav__category');
    const subchapters = document.querySelectorAll('.ae-weitere-infos-nav__subchapter');
    const mobileNavItems = document.querySelectorAll('.ae-weitere-infos-mobile-nav__item');
    
    let current = '';
    let currentMainSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      
      if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
        current = section.getAttribute('id');
        
        // Determine main section based on current subsection
        if (this.subsections.zulassung.includes(current)) {
          currentMainSection = 'zulassung';
        } else if (this.subsections.abmeldung.includes(current)) {
          currentMainSection = 'abmeldung';
        } else if (this.subsections['adress-aenderung'].includes(current)) {
          currentMainSection = 'adress-aenderung';
        } else if (this.mainSections.includes(current)) {
          currentMainSection = current;
        }
      }
    });

    // Update category states based on current section
    categories.forEach(category => {
      const categoryType = this.getCategoryType(category);
      const subchaptersContainer = category.querySelector('.ae-weitere-infos-nav__subchapters');
      
      if (categoryType === currentMainSection) {
        // Expand current category
        category.classList.remove('ae-weitere-infos-nav__category--collapsed');
        category.classList.add('ae-weitere-infos-nav__category--expanded');
        if (subchaptersContainer) {
          subchaptersContainer.classList.remove('ae-weitere-infos-nav__subchapters--hidden');
        }
      } else {
        // Collapse other categories
        category.classList.remove('ae-weitere-infos-nav__category--expanded');
        category.classList.add('ae-weitere-infos-nav__category--collapsed');
        if (subchaptersContainer) {
          subchaptersContainer.classList.add('ae-weitere-infos-nav__subchapters--hidden');
        }
      }
    });

    // Update subchapters
    subchapters.forEach(subchapter => {
      subchapter.classList.remove('ae-weitere-infos-nav__subchapter--active');
      if (subchapter.getAttribute('href') === `#${current}`) {
        subchapter.classList.add('ae-weitere-infos-nav__subchapter--active');
      }
    });

    // Update mobile navigation
    mobileNavItems.forEach(item => {
      item.classList.remove('ae-weitere-infos-mobile-nav__item--active');
      if (item.getAttribute('href') === `#${currentMainSection}`) {
        item.classList.add('ae-weitere-infos-mobile-nav__item--active');
      }
    });

    // Update current section and subsection
    if (current) {
      this.currentSubsection = current;
    }
    if (currentMainSection) {
      this.currentSection = currentMainSection;
    }
  }

  // Method to get current section color
  getCurrentSectionColor() {
    const colorMap = {
      'zulassung': 'var(--ae-color-zulassung)',
      'abmeldung': 'var(--ae-color-abmeldung)',
      'adress-aenderung': 'var(--ae-color-adress-aenderung)'
    };
    
    return colorMap[this.currentSection] || 'var(--ae-color-zulassung)';
  }

  // Method to update page theme based on current section
  updatePageTheme() {
    const color = this.getCurrentSectionColor();
    document.documentElement.style.setProperty('--ae-current-section-color', color);
  }

  setupAnimations() {
    // Check if animations should be enabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Setup intersection observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ae-animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('[class*="ae-animate-"]');
    animatedElements.forEach((element, index) => {
      // Add stagger delay
      if (index > 0) {
        element.classList.add(`ae-stagger-${Math.min(index, 5)}`);
      }
      this.animationObserver.observe(element);
    });
  }

  setupParallax() {
    // Check if parallax should be enabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const parallaxElements = document.querySelectorAll('.ae-parallax');
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallaxSpeed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Method to add animation classes to elements
  addAnimationClass(element, animationType = 'fade-up') {
    if (element) {
      element.classList.add(`ae-animate-${animationType}`);
    }
  }

  // Method to remove animation classes
  removeAnimationClass(element) {
    if (element) {
      element.classList.remove('ae-animate-fade-up', 'ae-animate-fade-down', 'ae-animate-fade-left', 'ae-animate-fade-right', 'ae-animate-slide-up', 'ae-animate-zoom-in');
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AEWeitereInfosPage();
});

// Export for potential module usage
export default AEWeitereInfosPage;