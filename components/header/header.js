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
  
  // Initialize animations for elements already in DOM
  initializeScrollAnimations();
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

// Initialize Scroll Animations globally
function initializeScrollAnimations() {
  const selectors = [
    '.card', '.page-hero h1', '.page-hero p', 'section h2', 
    '.btn:not(.nav-cta)', '.article-card', '.topic-card', 
    '.cta-section', '.case-card', '.feature-card', 
    '.timeline-item', '.info-card', '.hero-slide h1', '.hero-slide p'
  ];
  
  const elementsToAnimate = document.querySelectorAll(selectors.join(', '));
  
  elementsToAnimate.forEach(el => {
    el.classList.add('animate-on-scroll');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
