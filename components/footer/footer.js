// Load footer component
document.addEventListener('DOMContentLoaded', function() {
  const footerDiv = document.getElementById('footer');
  if (footerDiv) {
    fetch('../../components/footer/footer.html')
      .then(response => response.text())
      .then(html => {
        footerDiv.innerHTML = html;
      })
      .catch(error => console.error('Error loading footer:', error));
  }
});
