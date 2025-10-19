// AE Announcement Banner JavaScript
(() => {
  console.log('AE Announcement Banner loaded successfully');
  
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.ae-announcement-banner');
    if (!banner) {
      console.log('Banner not found');
      return;
    }

    const slides = banner.querySelectorAll('.ae-announcement-banner__slide');
    const nextButton = banner.querySelector('.ae-announcement-banner__nav');
    
    if (slides.length === 0) {
      console.log('No slides found');
      return;
    }

    let currentSlide = 0;
    let intervalId = null;
    const autoplayInterval = 3000; // 3 seconds

    // Function to show specific slide
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.setAttribute('aria-hidden', i !== index);
      });
      currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
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

    // Initialize
    showSlide(0);
    startAutoplay();

    console.log('Banner initialized with', slides.length, 'slides');
  });
})();
