// Appointment booking handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bookingForm');
  const dateInput = document.getElementById('booking-date');
  const timeSelect = document.getElementById('booking-time');
  
  if (timeSelect) {
    // Save original option texts
    Array.from(timeSelect.options).forEach(option => {
      if (option.value !== "") {
        option.setAttribute('data-original-text', option.textContent);
      }
    });
  }
  
  if (dateInput) {
    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];

    // Update times whenever the date changes
    dateInput.addEventListener('change', updateAvailableTimes);
  }

  function updateAvailableTimes() {
    if (!timeSelect || !dateInput.value) return;
    
    // Retrieve booked appointments from localStorage
    const bookedAppointments = JSON.parse(localStorage.getItem('bookedAppointments') || '[]');
    const selectedDate = dateInput.value;
    
    // Filter booked times for the currently selected date
    const bookedTimesForDate = bookedAppointments
      .filter(appt => appt.date === selectedDate)
      .map(appt => appt.time);
      
    Array.from(timeSelect.options).forEach(option => {
      if (option.value === "") return;
      
      // Check if this option's time is already booked
      if (bookedTimesForDate.includes(option.value)) {
        option.disabled = true;
        option.style.color = '#a0aec0'; // Grey out
        option.style.backgroundColor = '#f8f9fa';
        option.textContent = option.getAttribute('data-original-text') + ' (Booked)';
      } else {
        option.disabled = false;
        option.style.color = '';
        option.style.backgroundColor = '';
        option.textContent = option.getAttribute('data-original-text');
      }
    });
    
    // Clear selection if the currently selected time became disabled
    if (timeSelect.selectedOptions[0] && timeSelect.selectedOptions[0].disabled) {
      timeSelect.value = "";
    }
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
      
      // Save new booking to localStorage
      const bookedAppointments = JSON.parse(localStorage.getItem('bookedAppointments') || '[]');
      bookedAppointments.push({ date: date, time: time });
      localStorage.setItem('bookedAppointments', JSON.stringify(bookedAppointments));
      
      showMessage(`Appointment confirmed for ${date} at ${time}! Calendar invite has been sent to ${email}.`, 'success');
      form.reset();
      updateAvailableTimes(); // Refresh the dropdown availability
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
      messageDiv.textContent = '';
    }, 7000);
  }
}
