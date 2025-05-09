/**
 * MobiCryp Slideshow Main JavaScript
 * Handles all interactive functionality for the presentation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 500,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        on: {
            slideChange: function() {
                document.getElementById('currentSlide').textContent = this.activeIndex + 1;
            },
            init: function() {
                document.getElementById('totalSlides').textContent = this.slides.length;
            }
        }
    });
    
    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            swiper.slideNext();
        } else if (e.key === 'ArrowLeft') {
            swiper.slidePrev();
        }
    });
    
    // Initialize all slide functionality
    initBoostTabs();
    initRankCarousel();
    animatePower4();
});

/**
 * Minting Booster Tab Functionality
 * Handles tab switching and animations for the Minting Booster slide
 */
function initBoostTabs() {
    const tabButtons = document.querySelectorAll('.boost-tab-btn');
    const tabPanes = document.querySelectorAll('.boost-tab-pane');
    
    if (!tabButtons.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Boost meter animation
    setTimeout(function() {
        document.querySelectorAll('.boost-meter-fill').forEach(meter => {
            meter.style.width = '75%';
        });
    }, 500);
}

/**
 * Rank & Rewards Carousel Functionality
 * Handles horizontal scrolling and category filtering
 */
function initRankCarousel() {
    // Horizontal scrolling with buttons
    const carousel = document.querySelector('.rank-carousel');
    const prevButton = document.querySelector('.rank-carousel-arrow.prev');
    const nextButton = document.querySelector('.rank-carousel-arrow.next');
    
    if (!carousel || !prevButton || !nextButton) return;
    
    const cardWidth = 280 + 24; // card width + gap
    
    prevButton.addEventListener('click', function() {
        carousel.scrollBy({ left: -cardWidth * 3, behavior: 'smooth' });
    });
    
    nextButton.addEventListener('click', function() {
        carousel.scrollBy({ left: cardWidth * 3, behavior: 'smooth' });
    });
    
    // Category filtering
    const categories = document.querySelectorAll('.rank-category');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            // Remove active class from all categories
            categories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            const targetCategory = this.getAttribute('data-category');
            
            // Scroll to the first card of selected category
            const targetCard = document.querySelector(`.${targetCategory}-rank`);
            if (targetCard) {
                const scrollPosition = targetCard.offsetLeft - carousel.offsetLeft;
                carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            }
        });
    });
}

/**
 * Power of 4 Animation
 * Animates the levels in the Power of 4 slide
 */
function animatePower4() {
    const levels = document.querySelectorAll('.power4-level');
    
    if (!levels.length) return;
    
    // Add a small delay for each level to create a cascading effect
    levels.forEach((level, index) => {
        setTimeout(() => {
            level.classList.add('fade-in');
        }, 300 * index);
    });
}

/**
 * Product Card Hover Effects
 * For the Upcoming Products slide
 */
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    if (!productCards.length) return;
    
    productCards.forEach(card => {
        // Random delay for a staggered animation effect
        const delay = Math.random() * 0.5;
        card.style.animationDelay = `${delay}s`;
        card.classList.add('fade-in');
    });
}