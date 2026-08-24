// Load footer component dynamically
document.addEventListener('DOMContentLoaded', function() {
  const footerDiv = document.getElementById('footer');
  if (footerDiv) {
    const targetUrl = window.location.pathname.endsWith('Client-Digital-Nest-Website/') || window.location.pathname.endsWith('index.html') && !window.location.pathname.includes('/')
      ? './components/footer/footer.html'
      : '../components/footer/footer.html';

    fetch(targetUrl)
      .then(response => {
        if (!response.ok) return fetch('./components/footer/footer.html').then(res => res.text());
        return response.text();
      })
      .then(html => {
        footerDiv.innerHTML = html;
      })
      .catch(error => console.error('Error loading footer:', error));
  }
});
