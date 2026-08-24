// Contact Us form handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !subject || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }
      
      showMessage('Thank you for reaching out! Our team will get back to you within 24 hours.', 'success');
      form.reset();
    });
  }
});

function showMessage(text, type) {
  const messageDiv = document.getElementById('formMessage');
  if (messageDiv) {
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    
    setTimeout(() => {
      messageDiv.className = 'form-message';
    }, 5000);
  }
}
