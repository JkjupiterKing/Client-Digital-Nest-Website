// Enquiry Form Slot Booking Handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('enquiryForm');
  const dateInput = document.getElementById('enquiryDate');
  const timeSelect = document.getElementById('enquiryTime');
  
  // Define available time slots (09:00 AM to 05:00 PM)
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  // Set minimum date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // When date changes, update available time slots
    dateInput.addEventListener('change', function() {
      const selectedDate = dateInput.value;
      if (!selectedDate) {
        timeSelect.innerHTML = '<option value="">-- Select a date first --</option>';
        timeSelect.disabled = true;
        return;
      }

      timeSelect.disabled = false;
      timeSelect.innerHTML = '<option value="">-- Select Time --</option>';

      // Get booked slots for this date from localStorage
      const bookedSlots = JSON.parse(localStorage.getItem('bookedSlots') || '{}');
      const bookedForDate = bookedSlots[selectedDate] || [];

      timeSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        
        // Format time for display (e.g., 09:00 AM)
        const [hour, minute] = slot.split(':');
        const hourNum = parseInt(hour, 10);
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        const displayHour = hourNum > 12 ? hourNum - 12 : (hourNum === 0 ? 12 : hourNum);
        const displayTime = `${displayHour.toString().padStart(2, '0')}:${minute} ${ampm}`;

        if (bookedForDate.includes(slot)) {
          option.textContent = `${displayTime} (Booked)`;
          option.disabled = true;
        } else {
          option.textContent = displayTime;
        }
        timeSelect.appendChild(option);
      });
    });
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('enquiryName').value;
      const email = document.getElementById('enquiryEmail').value;
      const date = document.getElementById('enquiryDate').value;
      const time = document.getElementById('enquiryTime').value;
      const message = document.getElementById('enquiryMessage').value;
      
      if (!name || !email || !date || !time || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }

      // Save booked slot to localStorage
      const bookedSlots = JSON.parse(localStorage.getItem('bookedSlots') || '{}');
      if (!bookedSlots[date]) {
        bookedSlots[date] = [];
      }
      
      // Prevent double booking just in case
      if (bookedSlots[date].includes(time)) {
        showMessage('Sorry, this slot just got booked. Please select another.', 'error');
        // Refresh slots
        const event = new Event('change');
        dateInput.dispatchEvent(event);
        return;
      }

      bookedSlots[date].push(time);
      localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
      
      showMessage('Your enquiry and slot have been successfully booked!', 'success');
      form.reset();
      
      // Reset time dropdown
      timeSelect.innerHTML = '<option value="">-- Select a date first --</option>';
      timeSelect.disabled = true;
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
