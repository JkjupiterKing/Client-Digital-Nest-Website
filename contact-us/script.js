// Standard Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('enquiryForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('enquiryName').value;
      const email = document.getElementById('enquiryEmail').value;
      const phone = document.getElementById('enquiryPhone').value;
      const message = document.getElementById('enquiryMessage').value;
      
      const submitBtn = form.querySelector('button[type="submit"]');

      if (!name || !email || !phone || !message) {
        showMessage('Please fill out the missing field before sending message.', 'error');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }
      
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = 'SENDING...';
      submitBtn.disabled = true;

      // Send automated email using EmailJS
      const templateParams = {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        message: message
      };

      // Replace with your actual EmailJS Service ID and Template ID
      emailjs.send('service_v50ihkh', 'template_ignjrs8', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
           submitBtn.innerHTML = 'SENT <i class="fas fa-check"></i>';
           showMessage('Your message has been successfully sent! A confirmation email has been sent to you.', 'success');
           setTimeout(() => {
             submitBtn.innerHTML = originalBtnHtml;
             submitBtn.disabled = false;
             form.reset();
           }, 3000);
        }, function(error) {
           console.log('FAILED...', error);
           submitBtn.innerHTML = originalBtnHtml;
           submitBtn.disabled = false;
           showMessage('We encountered an error sending your message. Please try again later.', 'error');
        });
    });
  }
});

function showMessage(text, type) {
  const messageDiv = document.getElementById('enquiryFormMessage') || document.getElementById('formMessage');
  if (messageDiv) {
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    
    setTimeout(() => {
      messageDiv.className = 'form-message';
    }, 5000);
  }
}
