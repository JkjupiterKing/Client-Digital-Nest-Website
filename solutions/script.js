// Solutions page script
console.log('Solutions page loaded');

// Add hover effect to CTA section when button is hovered
const ctaButton = document.querySelector('.cta-section .btn');
const ctaSection = document.querySelector('.cta-section');

if (ctaButton && ctaSection) {
  ctaButton.addEventListener('mouseenter', () => {
    ctaSection.classList.add('lifted');
  });

  ctaButton.addEventListener('mouseleave', () => {
    ctaSection.classList.remove('lifted');
  });
}
