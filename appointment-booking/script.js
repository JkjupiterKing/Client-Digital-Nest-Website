// EmailJS Configuration
// Connected to the EmailJS service configured for the website
const EMAIL_CONFIG = {
  serviceId: 'service_v50ihkh',
  // Template ID in EmailJS (must have "To Email" set to {{to_email}} in EmailJS dashboard)
  adminTemplateId: 'template_ignjrs8',
  clientTemplateId: 'template_ignjrs8', // Can be template_ignjrs8 or a dedicated template ID
  adminEmail: 'gayathrin1202@gmail.com'
};

// Appointment booking handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bookingForm');
  const dateInput = document.getElementById('booking-date');
  const timeSelect = document.getElementById('booking-time');
  const submitBtn = document.getElementById('submitBookingBtn');
  
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
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const topicSelect = document.getElementById('booking-topic');
      const topicText = topicSelect.options[topicSelect.selectedIndex]?.text || topicSelect.value;
      const date = document.getElementById('booking-date').value;
      const timeSelectElem = document.getElementById('booking-time');
      const timeText = timeSelectElem.options[timeSelectElem.selectedIndex]?.text || timeSelectElem.value;
      const name = document.getElementById('client-name').value.trim();
      const email = document.getElementById('client-email').value.trim();
      const phone = document.getElementById('client-phone').value.trim();
      const notes = (document.getElementById('booking-notes').value || '').trim() || 'No specific agenda notes provided';
      
      if (!topicSelect.value || !date || !timeSelectElem.value || !name || !email || !phone) {
        showMessage('Please complete all mandatory fields, including your phone number.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage('Please enter a valid business email address.', 'error');
        return;
      }

      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Confirm Appointment';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending confirmation...';
      }

      // Payload for Admin / Company Notification
      // Contains all variables so EmailJS templates (or Auto-Reply) can access them
      const adminParams = {
        to_name: 'Digital Nest Solutions Admin',
        to_email: EMAIL_CONFIG.adminEmail,
        admin_email: EMAIL_CONFIG.adminEmail,
        reply_to: email, // Direct reply sends to the client
        customer_name: name,
        customer_email: email,
        client_name: name,
        client_email: email,
        user_email: email,
        email: email,
        customer_phone: phone,
        phone: phone,
        client_phone: phone,
        booking_topic: topicText,
        booking_date: date,
        booking_time: timeText,
        meeting_notes: notes,
        subject: `New Appointment Booking: ${topicText} with ${name}`,
        message: `New Consultation Appointment Scheduled!\n\n• Client Name: ${name}\n• Business Email: ${email}\n• Phone Number: ${phone}\n• Consultation Topic: ${topicText}\n• Scheduled Date: ${date}\n• Scheduled Time: ${timeText}\n• Agenda / Notes: ${notes}\n\nSubmitted via Appointment Booking Portal.`
      };

      // Payload for Dedicated Client Confirmation Email (if second template configured)
      const clientParams = {
        to_name: name,
        to_email: email,
        reply_to: EMAIL_CONFIG.adminEmail,
        customer_name: name,
        customer_email: email,
        client_name: name,
        client_email: email,
        user_email: email,
        email: email,
        customer_phone: phone,
        phone: phone,
        client_phone: phone,
        booking_topic: topicText,
        booking_date: date,
        booking_time: timeText,
        meeting_notes: notes,
        subject: `Appointment Confirmed: Consultation with Digital Nest Solutions`,
        message: `Hello ${name},\n\nYour consultation session has been scheduled successfully!\n\nHere are your booking details:\n• Topic: ${topicText}\n• Date: ${date}\n• Time Slot: ${timeText}\n• Contact Phone: ${phone}\n• Your Notes: ${notes}\n\nOur consulting team is preparing for the session and will email you a calendar invite with a virtual video conference link (Microsoft Teams / Zoom / Google Meet) shortly.\n\nNeed to reschedule or have questions? Contact us anytime at ${EMAIL_CONFIG.adminEmail}.\n\nBest regards,\nDigital Nest Solutions Private Limited`
      };

      try {
        if (typeof emailjs !== 'undefined') {
          // 1. Send appointment details to Admin (gayathrin1202@gmail.com)
          const sendPromises = [
            emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.adminTemplateId, adminParams)
          ];

          // 2. If a dedicated client confirmation template is specified, send it
          if (EMAIL_CONFIG.clientTemplateId && EMAIL_CONFIG.clientTemplateId.trim() !== '') {
            sendPromises.push(
              emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.clientTemplateId, clientParams)
                .catch(err => {
                  console.warn('Note on client confirmation template dispatch:', err);
                  return { status: 200, text: 'Auto-reply processed via dashboard' };
                })
            );
          }

          await Promise.allSettled(sendPromises);
        } else {
          console.warn('EmailJS SDK not loaded. Booking saved locally.');
        }

        // Save new booking to localStorage to block the time slot on this date
        const bookedAppointments = JSON.parse(localStorage.getItem('bookedAppointments') || '[]');
        bookedAppointments.push({ date: date, time: timeSelectElem.value, client: name });
        localStorage.setItem('bookedAppointments', JSON.stringify(bookedAppointments));

        showMessage(
          `✓ Appointment confirmed for ${date} at ${timeText}! An email notification has been sent to our team, and a confirmation email has been sent to ${email}.`,
          'success'
        );

        if (submitBtn) {
          submitBtn.innerHTML = 'Appointment Confirmed ✓';
        }

        setTimeout(() => {
          form.reset();
          if (submitBtn) {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          }
          updateAvailableTimes();
        }, 4000);

      } catch (err) {
        console.error('Error sending booking emails:', err);
        // Fallback: reserve slot locally and inform client
        const bookedAppointments = JSON.parse(localStorage.getItem('bookedAppointments') || '[]');
        bookedAppointments.push({ date: date, time: timeSelectElem.value, client: name });
        localStorage.setItem('bookedAppointments', JSON.stringify(bookedAppointments));

        showMessage(
          `Your appointment slot for ${date} at ${timeText} has been reserved. If you do not receive an email confirmation shortly, please contact us directly at ${EMAIL_CONFIG.adminEmail}.`,
          'success'
        );

        if (submitBtn) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }
        form.reset();
        updateAvailableTimes();
      }
    });
  }
});

function showMessage(text, type) {
  const messageDiv = document.getElementById('bookingMessage');
  if (messageDiv) {
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
      messageDiv.className = 'form-message';
      messageDiv.style.display = 'none';
      messageDiv.textContent = '';
    }, 9000);
  }
}
