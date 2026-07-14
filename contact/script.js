// Contact page script
console.log('Contact page loaded');

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const company = document.getElementById('company').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Validate form
  if (!name || !email || !subject || !message) {
    showMessage('Please fill in all required fields.', 'error');
    return;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }
  
  // Create form data
  const formData = {
    name,
    email,
    phone,
    company,
    subject,
    message,
    timestamp: new Date().toISOString()
  };
  
  // Log form data (in a real application, this would be sent to a server)
  console.log('Form submitted with data:', formData);
  
  // Show success message
  showMessage('Thank you for your message! We will get back to you soon.', 'success');
  
  // Reset form
  document.getElementById('contactForm').reset();
});

// Show message function
function showMessage(text, type) {
  const messageDiv = document.getElementById('formMessage');
  messageDiv.textContent = text;
  messageDiv.className = `form-message ${type}`;
  
  // Auto-hide message after 5 seconds
  setTimeout(() => {
    messageDiv.className = 'form-message';
  }, 5000);
}
