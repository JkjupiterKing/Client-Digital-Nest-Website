// Load header component dynamically with path fallback
let headerDiv;
document.addEventListener('DOMContentLoaded', function() {
  headerDiv = document.getElementById('header');
  if (headerDiv) {
    // Try subfolder path first, fallback to root path if at root index.html
    const targetUrl = window.location.pathname.endsWith('Client-Digital-Nest-Website/') || window.location.pathname.endsWith('index.html') && !window.location.pathname.includes('/')
      ? './components/header/header.html'
      : '../components/header/header.html';

    fetch(targetUrl)
      .then(response => {
        if (!response.ok) return fetch('./components/header/header.html').then(res => res.text());
        return response.text();
      })
      .then(html => {
        headerDiv.innerHTML = html;
        initializeHamburgerMenu();
        highlightActiveNav();
      })
      .catch(error => console.error('Error loading header:', error));
  }
});

// Highlight active page link in header
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar a');
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath && currentPath.includes(linkPath.replace('../', '').replace('./', ''))) {
      link.classList.add('active');
    }
  });
}

// Initialize hamburger menu functionality
function initializeHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');
  
  if (hamburger && navbar) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navbar.classList.toggle('active');
    });
    
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
      });
    });
    
    document.addEventListener('click', function(event) {
      if (headerDiv && !headerDiv.contains(event.target) && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
      }
    });
  }
}
