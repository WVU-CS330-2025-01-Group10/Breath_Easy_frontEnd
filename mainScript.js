// Wait for Lucide to load before using it
document.addEventListener('DOMContentLoaded', function() {
    // Check if Lucide is loaded
    if (typeof lucide !== 'undefined') {
      // Initialize Lucide icons
      lucide.createIcons();
      
      // Mobile menu functionality
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      let isMenuOpen = false;
      
      mobileMenuButton.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.className = isMenuOpen ? 'mobile-menu open' : 'mobile-menu';
        
        // Change icon based on menu state
        const menuIcon = mobileMenuButton.querySelector('.menu-icon');
        if (menuIcon) {
          menuIcon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
          lucide.createIcons();
        }
      });
    } else {
      console.warn('Lucide library not loaded. Using fallback for menu button.');
      // Fallback for menu button if Lucide fails to load
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      let isMenuOpen = false;
      
      // Add text fallback to button
      mobileMenuButton.textContent = '☰';
      
      mobileMenuButton.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.className = isMenuOpen ? 'mobile-menu open' : 'mobile-menu';
        mobileMenuButton.textContent = isMenuOpen ? '✕' : '☰';
      });
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 64, // Account for fixed navbar
            behavior: 'smooth'
          });
        }
      }
      
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu.className.includes('open')) {
        mobileMenu.className = 'mobile-menu';
        const menuButton = document.querySelector('.mobile-menu-button');
        if (menuButton.querySelector('.menu-icon')) {
          menuButton.querySelector('.menu-icon').setAttribute('data-lucide', 'menu');
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        } else {
          menuButton.textContent = '☰';
        }
      }
    });
  });
  
  // Explore button functionality
  document.getElementById('explore-button').addEventListener('click', () => {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      window.scrollTo({
        top: mapElement.offsetTop - 64,
        behavior: 'smooth'
      });
    }
  });