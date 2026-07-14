// Load header component
let headerDiv;
document.addEventListener('DOMContentLoaded', function() {
  headerDiv = document.getElementById('header');
  if (headerDiv) {
    fetch('../../components/header/header.html')
      .then(response => response.text())
      .then(html => {
        headerDiv.innerHTML = html;
        // Initialize hamburger menu after header is loaded
        initializeHamburgerMenu();
      })
      .catch(error => console.error('Error loading header:', error));
  }
});

// Initialize hamburger menu functionality
function initializeHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');
  
  if (hamburger && navbar) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navbar.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (headerDiv && !headerDiv.contains(event.target) && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
      }
    });
  }
}
