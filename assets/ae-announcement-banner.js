// AE Announcement Banner JavaScript
(() => {
  // Production: Remove console.log for performance
  // console.log('AE Announcement Banner loaded successfully');
  
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('[data-ae-announcement]') || document.querySelector('.ae-announcement-banner');
    if (!banner) {
      // console.log('Banner not found');
      return;
    }

    const slides = banner.querySelectorAll('.ae-announcement-banner__slide');
    const nextButton = banner.querySelector('.ae-announcement-banner__nav--next');
    const prevButton = banner.querySelector('.ae-announcement-banner__nav--prev');
    
    if (slides.length === 0) {
      // console.log('No slides found');
      return;
    }

    let currentSlide = 0;
    /** @type {number|null} */
    let intervalId = null;
    const autoplayInterval = 3000; // 3 seconds

    // Function to show specific slide
    /**
     * @param {number} index
     */
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.setAttribute('aria-hidden', (i !== index).toString());
      });
      currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }

    // Function to go to previous slide
    function prevSlide() {
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
    }

    // Function to start autoplay
    function startAutoplay() {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(nextSlide, autoplayInterval);
    }

    // Function to stop autoplay
    function stopAutoplay() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    // Event listeners
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        setTimeout(startAutoplay, 5000); // Restart after 5 seconds
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        setTimeout(startAutoplay, 5000); // Restart after 5 seconds
      });
    }

    // Pause on hover
    banner.addEventListener('mouseenter', stopAutoplay);
    banner.addEventListener('mouseleave', startAutoplay);

    // Pause when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    // Keyboard navigation
    banner.addEventListener('keydown', (e) => {
      const evt = /** @type {KeyboardEvent} */ (e);
      if (evt.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
        stopAutoplay();
        setTimeout(startAutoplay, 5000);
      } else if (evt.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
        stopAutoplay();
        setTimeout(startAutoplay, 5000);
      }
    });

    // Initialize
    showSlide(0);
    startAutoplay();

    // console.log('Banner initialized with', slides.length, 'slides');

    // Collapse on scroll with hysteresis to avoid flicker near the boundary
    let ticking = false;
    let isCollapsed = false;
    const COLLAPSE_Y = 80; // collapse after 80px scroll
    const EXPAND_Y = 10;   // re-expand only when almost at top

    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      if (!isCollapsed && y > COLLAPSE_Y) {
        banner.classList.add('is-collapsed');
        isCollapsed = true;
      } else if (isCollapsed && y <= EXPAND_Y) {
        banner.classList.remove('is-collapsed');
        isCollapsed = false;
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    }, { passive: true });

    // Initialize state on load
    (function initCollapse() {
      const y = window.scrollY || window.pageYOffset;
      if (y > COLLAPSE_Y) {
        banner.classList.add('is-collapsed');
        isCollapsed = true;
      }
    })();
  });
})();
