// This script detects whether a user is visiting a Thai or English page
// and redirects them to the correct version if needed
// Add this to your HTML pages

function checkLanguageAndRedirect() {
  // Get current URL path
  const path = window.location.pathname;
  
  // Check if we're on the language selection page already
  if (path.endsWith('/index.html') || path === '/') {
    // Already on the language selection page, no need to redirect
    return;
  }
  
  // Get user language preference (if stored previously)
  const preferredLanguage = localStorage.getItem('mobicryp_language');
  
  // Check if this is a Thai page (contains _th.html)
  const isThai = path.includes('_th.html');
  
  // Store user's language preference based on the current page
  if (isThai) {
    localStorage.setItem('mobicryp_language', 'th');
  } else {
    localStorage.setItem('mobicryp_language', 'en');
  }
  
  // Add language class to body for potential CSS customizations
  document.body.classList.add(`lang-${isThai ? 'th' : 'en'}`);
}

// Call the function when page loads
window.addEventListener('DOMContentLoaded', checkLanguageAndRedirect);