// Enquiry form handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('enquiry-name').value;
      const company = document.getElementById('enquiry-company').value;
      const email = document.getElementById('enquiry-email').value;
      const service = document.getElementById('service-type').value;
      
      if (!name || !company || !email || !service) {
        showMessage('Please complete all required fields.', 'error');
        return;
      }
      
      showMessage('Enquiry submitted successfully! A proposal specialist will contact you within 24 hours.', 'success');
      form.reset();
    });
  }
});

function showMessage(text, type) {
  const messageDiv = document.getElementById('enquiryMessage');
  if (messageDiv) {
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    
    setTimeout(() => {
      messageDiv.className = 'form-message';
    }, 6000);
  }
}
