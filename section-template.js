// Section Name JavaScript
// Description: What this JS does and why it's needed

(() => {
  console.log('Section Name JavaScript loaded successfully');
  
  // Configuration
  const CONFIG = {
    animationDuration: 300, // ms
    autoplayInterval: 3000, // ms
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1280
    }
  };
  
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    
    // Get section elements
    const sections = document.querySelectorAll('.section-name');
    
    if (sections.length === 0) {
      console.log('No sections found');
      return;
    }
    
    // Initialize each section instance
    sections.forEach(section => {
      initSection(section);
    });
    
  });
  
  /**
   * Initialize a single section
   * @param {HTMLElement} section - The section element
   */
  function initSection(section) {
    const sectionId = section.dataset.sectionId;
    
    // Get interactive elements
    const items = section.querySelectorAll('.section-name__item');
    const ctaButton = section.querySelector('.section-name__cta');
    
    if (items.length === 0) {
      console.log(`No items found in section ${sectionId}`);
      return;
    }
    
    // State
    let currentIndex = 0;
    let intervalId = null;
    
    /**
     * Show specific item
     * @param {number} index - Item index to show
     */
    function showItem(index) {
      items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
        item.setAttribute('aria-hidden', i !== index);
      });
      currentIndex = index;
    }
    
    /**
     * Go to next item
     */
    function nextItem() {
      const nextIndex = (currentIndex + 1) % items.length;
      showItem(nextIndex);
    }
    
    /**
     * Go to previous item
     */
    function prevItem() {
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      showItem(prevIndex);
    }
    
    /**
     * Start autoplay
     */
    function startAutoplay() {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(nextItem, CONFIG.autoplayInterval);
    }
    
    /**
     * Stop autoplay
     */
    function stopAutoplay() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
    
    /**
     * Handle item click
     * @param {Event} e - Click event
     */
    function handleItemClick(e) {
      e.preventDefault();
      const item = e.currentTarget;
      const index = Array.from(items).indexOf(item);
      showItem(index);
      
      // Restart autoplay after interaction
      stopAutoplay();
      setTimeout(startAutoplay, 5000);
    }
    
    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} e - Keyboard event
     */
    function handleKeyboard(e) {
      if (e.key === 'ArrowLeft') {
        prevItem();
        stopAutoplay();
      } else if (e.key === 'ArrowRight') {
        nextItem();
        stopAutoplay();
      } else if (e.key === 'Escape') {
        stopAutoplay();
      }
    }
    
    /**
     * Handle window resize
     */
    function handleResize() {
      const width = window.innerWidth;
      
      // Adjust behavior based on screen size
      if (width < CONFIG.breakpoints.mobile) {
        // Mobile specific behavior
        stopAutoplay();
      } else {
        // Desktop specific behavior
        if (!intervalId) startAutoplay();
      }
    }
    
    // Event Listeners
    items.forEach(item => {
      item.addEventListener('click', handleItemClick);
    });
    
    // Keyboard navigation
    section.addEventListener('keydown', handleKeyboard);
    
    // Pause on hover
    section.addEventListener('mouseenter', stopAutoplay);
    section.addEventListener('mouseleave', startAutoplay);
    
    // Pause when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
    
    // Window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    });
    
    /**
     * Cleanup function
     */
    function destroy() {
      items.forEach(item => {
        item.removeEventListener('click', handleItemClick);
      });
      section.removeEventListener('keydown', handleKeyboard);
      section.removeEventListener('mouseenter', stopAutoplay);
      section.removeEventListener('mouseleave', startAutoplay);
      stopAutoplay();
    }
    
    // Initialize
    showItem(0);
    
    // Start autoplay if enabled
    if (section.dataset.animate !== undefined) {
      startAutoplay();
    }
    
    // Cleanup on page unload (optional, depends on use case)
    window.addEventListener('beforeunload', destroy);
    
    console.log(`Section ${sectionId} initialized with ${items.length} items`);
  }
  
})();

