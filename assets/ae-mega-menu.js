// AE Mega Menu JavaScript
(() => {
  console.log('AE Mega Menu loaded successfully');
  
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('[data-mega-menu-trigger]');
    const megaMenus = document.querySelectorAll('[data-mega-menu-content]');
    let activeMenu = null;
    let hoverTimeout = null;

    // Function to show mega menu
    function showMegaMenu(menuItem) {
      const menuId = menuItem.closest('[data-mega-menu]').getAttribute('data-mega-menu');
      const megaMenu = document.querySelector(`[data-mega-menu-content]`);
      
      if (!megaMenu) return;

      // Hide all mega menus
      hideAllMegaMenus();
      
      // Show the target mega menu
      megaMenu.classList.add('active');
      menuItem.closest('.ae-header__menu-item').classList.add('active');
      activeMenu = megaMenu;
    }

    // Function to hide all mega menus
    function hideAllMegaMenus() {
      megaMenus.forEach(menu => {
        menu.classList.remove('active');
      });
      
      document.querySelectorAll('.ae-header__menu-item').forEach(item => {
        item.classList.remove('active');
      });
      
      activeMenu = null;
    }

    // Function to handle mouse enter with delay
    function handleMouseEnter(menuItem) {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        showMegaMenu(menuItem);
      }, 150); // Small delay to prevent accidental triggers
    }

    // Function to handle mouse leave with delay
    function handleMouseLeave() {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        hideAllMegaMenus();
      }, 200); // Small delay to allow moving to mega menu
    }

    // Event listeners for menu items
    menuItems.forEach(menuItem => {
      menuItem.addEventListener('mouseenter', () => handleMouseEnter(menuItem));
      menuItem.addEventListener('mouseleave', handleMouseLeave);
      
      // Handle click for mobile
      menuItem.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const isActive = menuItem.closest('.ae-header__menu-item').classList.contains('active');
          
          if (isActive) {
            hideAllMegaMenus();
          } else {
            showMegaMenu(menuItem);
          }
        }
      });
    });

    // Event listeners for mega menus
    megaMenus.forEach(megaMenu => {
      megaMenu.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
      });
      
      megaMenu.addEventListener('mouseleave', () => {
        hideAllMegaMenus();
      });
    });

    // Close mega menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.ae-header__menu-item') && !e.target.closest('.ae-mega-menu')) {
        hideAllMegaMenus();
      }
    });

    // Close mega menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideAllMegaMenus();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        hideAllMegaMenus();
      }
    });

    // Handle scroll - hide mega menu when scrolling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (activeMenu) {
        hideAllMegaMenus();
      }
    });

    console.log('Mega Menu initialized with', menuItems.length, 'menu items');
  });
})();
