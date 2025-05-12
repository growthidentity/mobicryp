// MobiCryp Enhanced Presentation - Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initAnimations();
  
  // Initialize interactive elements
  initInteractiveElements();
  
  // Initialize progress indicators if they exist
  initProgressBars();
  
  // Initialize background effects
  initBackgroundEffects();
  
  // Initialize smooth scroll behavior
  initSmoothScroll();
});

// Initialize animations for elements
function initAnimations() {
  // Animate elements as they come into view
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    animatedElements.forEach(el => {
      el.classList.add('animated');
    });
  }
}

// Add interactive elements functionality
function initInteractiveElements() {
  // Add card hover effects
  const hoverCards = document.querySelectorAll('.hover-card');
  
  hoverCards.forEach(card => {
    // Only add listeners if not on a touch device
    if (!isTouchDevice()) {
      card.addEventListener('mouseenter', function() {
        this.classList.add('card-hover');
      });
      
      card.addEventListener('mouseleave', function() {
        this.classList.remove('card-hover');
      });
    }
  });
  
  // Add 3D tilt effect to elements with tilt-effect class
  const tiltElements = document.querySelectorAll('.tilt-effect');
  
  tiltElements.forEach(element => {
    // Only add tilt on non-touch devices
    if (!isTouchDevice()) {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        // Get intensity from data attribute or use default
        const intensity = element.getAttribute('data-tilt-intensity') || 5;
        
        element.style.transform = `perspective(1000px) rotateY(${deltaX * intensity}deg) rotateX(${-deltaY * intensity}deg)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = '';
      });
    }
  });
  
  // Initialize tooltips
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    const tooltipText = element.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    element.appendChild(tooltip);
    
    element.addEventListener('mouseenter', function() {
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';
    });
    
    element.addEventListener('mouseleave', function() {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    });
  });
  
  // Add tab functionality to tab groups
  const tabButtons = document.querySelectorAll('.tab-button');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabGroup = this.closest('.tab-group');
      const targetId = this.getAttribute('data-tab');
      
      // Deactivate all tabs in this group
      const allTabs = tabGroup.querySelectorAll('.tab-content');
      const allButtons = tabGroup.querySelectorAll('.tab-button');
      
      allTabs.forEach(tab => tab.classList.remove('active'));
      allButtons.forEach(btn => btn.classList.remove('active'));
      
      // Activate the selected tab
      document.getElementById(targetId).classList.add('active');
      this.classList.add('active');
    });
  });
}

// Initialize progress bars animation
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  if ('IntersectionObserver' in window && progressBars.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const percentage = target.getAttribute('data-percentage');
          
          setTimeout(() => {
            target.style.width = percentage + '%';
          }, 200);
          
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.2 });
    
    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    progressBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      bar.style.width = percentage + '%';
    });
  }
}

// Initialize background effects
function initBackgroundEffects() {
  // Add parallax effect to background elements
  const parallaxElements = document.querySelectorAll('.parallax');
  
  if (parallaxElements.length > 0 && !isTouchDevice()) {
    document.addEventListener('mousemove', function(e) {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 20;
        const x = (0.5 - mouseX) * speed;
        const y = (0.5 - mouseY) * speed;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }
  
  // Add mouse cursor glow effect
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);
  
  // Only add cursor glow on non-touch devices
  if (!isTouchDevice()) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
    
    // Add hover state for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.classList.add('cursor-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('cursor-hover');
      });
    });
  }
}

// Initialize smooth scroll behavior
function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Get the target element
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Helper function to check if the device is a touch device
function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

// Function to animate numbers counting up
function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
  if (!element) return;
  
  let start = 0;
  const increment = target / (duration / 16); // Update every 16ms (60fps)
  let current = 0;
  
  function updateCounter() {
    current += increment;
    if (current >= target) {
      current = target;
      element.textContent = `${prefix}${Math.round(current).toLocaleString()}${suffix}`;
      return;
    }
    
    element.textContent = `${prefix}${Math.round(current).toLocaleString()}${suffix}`;
    requestAnimationFrame(updateCounter);
  }
  
  updateCounter();
}

// Global utility functions that can be called from any slide
window.MobiCryp = {
  // Animate a counter
  animateCounter: function(elementId, target, duration, prefix, suffix) {
    const element = document.getElementById(elementId);
    animateCounter(element, target, duration, prefix, suffix);
  },
  
  // Show an element with animation
  showElement: function(elementId, animationClass) {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add(animationClass || 'fade-in');
    }
  },
  
  // Hide an element with animation
  hideElement: function(elementId, animationClass) {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add(animationClass || 'fade-out');
      setTimeout(() => {
        element.style.display = 'none';
      }, 500);
    }
  },
  
  // Add CSS class after a delay
  addClassWithDelay: function(elementId, className, delay) {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.classList.add(className);
      }
    }, delay);
  }
};

// Add CSS to style the cursor glow effect
const style = document.createElement('style');
style.textContent = `
  .cursor-glow {
    position: fixed;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 209, 255, 0.4) 0%, rgba(0, 209, 255, 0) 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
    opacity: 0.7;
    filter: blur(5px);
    transition: width 0.3s, height 0.3s, opacity 0.3s;
  }
  
  .cursor-hover {
    width: 60px;
    height: 60px;
    opacity: 0.9;
  }
`;
document.head.appendChild(style);