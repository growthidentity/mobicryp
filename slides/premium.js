/* MobiCryp Premium Enhancement Scripts */

document.addEventListener('DOMContentLoaded', function() {
    // Add premium class to main elements
    applyPremiumClasses();
    
    // Initialize animations
    initializeAnimations();
    
    // Handle slide visibility for animation restarts
    handleVisibilityChanges();
    
    // Initialize progress bars
    initializeProgressBars();
    
    // Initialize typographic effects
    initializeTypingEffect();
    
    // Add shine effects to cards
    addShineEffects();
});

/**
 * Apply premium classes to core elements
 */
function applyPremiumClasses() {
    // Add premium-slide class to slide-content
    document.querySelectorAll('.slide-content').forEach(el => {
        el.classList.add('premium-slide');
    });
    
    // Add premium-text class to all section titles
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('premium-text');
    });
    
    // Add enhanced background to circuit background
    document.querySelectorAll('.circuit-background').forEach(el => {
        el.classList.add('premium-circuit-background');
    });
    
    // Add premium class to navigation buttons
    document.querySelectorAll('.nav-button').forEach(el => {
        el.classList.add('premium-button');
    });
    
    // Make "Next" button a call-to-action
    const nextButton = document.getElementById('next-button');
    if (nextButton) {
        nextButton.classList.add('premium-cta');
    }
}

/**
 * Initialize animations for elements with animation classes
 */
function initializeAnimations() {
    // Add floating animation to elements with premium-float class
    document.querySelectorAll('.premium-float').forEach(el => {
        // Random delay for more natural movement
        const delay = Math.random() * 2;
        el.style.animationDelay = `${delay}s`;
    });
    
    // Add shine effect to all elements with .shine-container class
    document.querySelectorAll('.shine-container').forEach((container, index) => {
        const shineEl = document.createElement('div');
        shineEl.classList.add('shine-effect');
        shineEl.style.setProperty('--shine-delay', `${index * 0.5}s`);
        container.appendChild(shineEl);
    });
}

/**
 * Handle visibility changes to restart animations
 */
function handleVisibilityChanges() {
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            // Restart all animations by temporarily removing classes and adding them back
            
            // Handle shine effects
            document.querySelectorAll('.shine-effect').forEach(effect => {
                effect.style.animation = 'none';
                void effect.offsetWidth; // Force reflow
                effect.style.animation = '';
            });
            
            // Handle float animations
            document.querySelectorAll('.premium-float').forEach(el => {
                el.style.animation = 'none';
                void el.offsetWidth; // Force reflow
                el.style.animation = 'float 4s ease-in-out infinite';
            });
            
            // Restart progress bars
            initializeProgressBars();
            
            // Restart typing effects
            initializeTypingEffect();
        }
    });
}

/**
 * Initialize animated progress bars
 */
function initializeProgressBars() {
    document.querySelectorAll('.premium-progress-bar').forEach(bar => {
        // Get width from data attribute or default to 50%
        const targetWidth = bar.dataset.width || '50%';
        
        // Reset width first
        bar.style.width = '0%';
        
        // Use setTimeout to create animation effect after a slight delay
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 300);
    });
}

/**
 * Initialize typing text effect
 */
function initializeTypingEffect() {
    document.querySelectorAll('.typing-text').forEach(el => {
        // Reset animation
        el.style.animation = 'none';
        void el.offsetWidth; // Force reflow
        el.style.animation = 'typing 3.5s steps(30, end), blink .75s step-end infinite';
    });
}

/**
 * Add shine effects to cards and important elements
 */
function addShineEffects() {
    // Add shine effect to premium cards if they don't already have it
    document.querySelectorAll('.premium-card, .rank-card, .benefit-card').forEach(card => {
        if (!card.querySelector('.shine-effect')) {
            card.classList.add('shine-container');
            
            const shineEl = document.createElement('div');
            shineEl.classList.add('shine-effect');
            
            // Random delay for shine effect
            const delay = Math.random() * 5; // 0-5s delay
            shineEl.style.setProperty('--shine-delay', `${delay}s`);
            
            card.appendChild(shineEl);
        }
    });
}

/**
 * Reveal elements one by one with animation
 * @param {string} selector - CSS selector for elements to animate
 * @param {number} delay - Delay between each element animation
 */
function animateElementsSequentially(selector, delay = 0.1) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + (index * delay * 1000));
    });
}

/**
 * Creates a premium progress indicator dot
 * For use with timelines, progress bars, etc.
 * @param {HTMLElement} container - The container to add the dot to
 * @param {number} positionPercent - Position along the container (0-100)
 * @param {string} color - The color of the indicator
 */
function createProgressIndicator(container, positionPercent, color = 'var(--accent-color)') {
    const indicator = document.createElement('div');
    indicator.classList.add('premium-progress-indicator');
    indicator.style.position = 'absolute';
    indicator.style.width = '12px';
    indicator.style.height = '12px';
    indicator.style.background = 'white';
    indicator.style.borderRadius = '50%';
    indicator.style.left = `${positionPercent}%`;
    indicator.style.top = '50%';
    indicator.style.transform = 'translate(-50%, -50%)';
    indicator.style.boxShadow = `0 0 15px 5px ${color}`;
    indicator.style.animation = 'premium-pulse 2s infinite';
    
    container.appendChild(indicator);
    return indicator;
}

/**
 * Animates numbers counting up
 * @param {HTMLElement} element - Element to update with count
 * @param {number} target - Target number to count to
 * @param {number} duration - Duration in milliseconds
 * @param {string} prefix - Prefix to add before the number (e.g., "$")
 * @param {string} suffix - Suffix to add after the number (e.g., "%")
 */
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

/**
 * Add hover glow effects to elements
 * @param {string} selector - CSS selector for elements to add glow to
 * @param {string} color - The color of the glow
 */
function addHoverGlowEffect(selector, color = 'rgba(0, 209, 255, 0.4)') {
    document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.boxShadow = `0 5px 25px ${color}`;
            el.style.borderColor = color.replace('0.4', '0.8');
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.boxShadow = '';
            el.style.borderColor = '';
        });
    });
}

/**
 * Parallax effect for background elements
 */
function initParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.querySelectorAll('.parallax-item').forEach(item => {
            const speed = item.getAttribute('data-speed') || 1;
            item.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });
}