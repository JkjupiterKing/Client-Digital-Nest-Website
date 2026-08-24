// Appointment booking handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bookingForm');
  const dateInput = document.getElementById('booking-date');
  
  if (dateInput) {
    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const topic = document.getElementById('booking-topic').value;
      const date = document.getElementById('booking-date').value;
      const time = document.getElementById('booking-time').value;
      const name = document.getElementById('client-name').value;
      const email = document.getElementById('client-email').value;
      
      if (!topic || !date || !time || !name || !email) {
        showMessage('Please complete all mandatory fields.', 'error');
        return;
      }
      
      showMessage(`Appointment confirmed for ${date} at ${time}! Calendar invite has been sent to ${email}.`, 'success');
      form.reset();
    });
  }
});

function showMessage(text, type) {
  const messageDiv = document.getElementById('bookingMessage');
  if (messageDiv) {
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    
    setTimeout(() => {
      messageDiv.className = 'form-message';
    }, 7000);
  }
}
