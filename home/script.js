// Home page script
console.log('Home page loaded');

// Hero Slider Auto-slide
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
  const previousSlide = currentSlide;
  
  // Move current slide to the left
  heroSlides[previousSlide].classList.remove('active');
  heroSlides[previousSlide].classList.add('previous');
  
  // Bring next slide in from the right
  currentSlide = (currentSlide + 1) % heroSlides.length;
  heroSlides[currentSlide].classList.remove('previous'); // Ensure it's not stuck on the left
  heroSlides[currentSlide].classList.add('active');
  
  // Clean up the previous slide after animation completes (1 second)
  setTimeout(() => {
    heroSlides[previousSlide].classList.remove('previous');
  }, 1000);
}

// Auto-slide every 7 seconds
setInterval(nextSlide, 7000);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Add animation to cards on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});
