/**
 * Aditya Kumar - AI/ML Developer Portfolio
 * JavaScript for Interactive Features and Animations
 */

// DOM Elements
const header = document.getElementById('header');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const typingText = document.querySelector('.typing-text');

// Typed Text Array for Hero Section
const typingTexts = [
    'AI/ML Developer',
    'Python Developer', 
    'NLP Specialist',
    'Computer Vision Engineer',
    'Web Developer'
];

// Current typing index
let typingIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let delayBetweenTexts = 2000;

/**
 * Initialize all event listeners and functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollEffects();
    initBackToTop();
    initContactForm();
    initTypingAnimation();
    initProgressBars();
    initScrollReveal();
});

/**
 * Mobile Navigation Toggle
 */
function initNavbar() {
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideNav = navLinks.contains(e.target) || hamburger.contains(e.target);
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

/**
 * Scroll-based Effects
 */
function initScrollEffects() {
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header scroll effect
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollTop > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        lastScrollTop = scrollTop;
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Typing Animation for Hero Section
 */
function initTypingAnimation() {
    if (!typingText) return;

    function typeWriter() {
        const currentText = typingTexts[typingIndex];
        const currentFullText = typingText.innerText;

        if (isDeleting) {
            // Remove character
            typingText.innerText = currentFullText.slice(0, -1);
            
            if (currentFullText === '') {
                isDeleting = false;
                typingIndex = (typingIndex + 1) % typingTexts.length;
                setTimeout(typeWriter, 500);
                return;
            }
        } else {
            // Add character
            typingText.innerText = currentText.slice(0, currentFullText.length + 1);
            
            if (currentFullText === currentText) {
                isDeleting = true;
                setTimeout(typeWriter, delayBetweenTexts);
                return;
            }
        }

        // Set typing speed
        const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeWriter, currentSpeed);
    }

    // Start typing animation
    setTimeout(typeWriter, 1000);
}

/**
 * Progress Bars Animation (Skills Section)
 */
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Observer for progress bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                // Animate to target width
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 300);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const subject = contactForm.subject.value.trim();
        const message = contactForm.message.value.trim();

        // Basic validation
        if (!name || !email || !message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        submitForm({ name, email, subject, message });
    });
}

/**
 * Validate Email Format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Simulate Form Submission
 */
function submitForm(data) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';

    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;

        // Show success message
        showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    }, 2000);
}

/**
 * Show Message to User
 */
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message-toast');
    existingMessages.forEach(msg => msg.remove());

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast message-${type}`;
    messageDiv.innerText = message;

    // Style the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        border-left: 4px solid ${type === 'success' ? '#27c93f' : '#ff5f56'};
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    // Add to DOM
    document.body.appendChild(messageDiv);

    // Trigger animation
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after 4 seconds
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 4000);
}

/**
 * Smooth Scrolling for Navigation Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Parallax Effect for Hero Section
 */
function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroVisual.style.transform = `translateY(${rate}px)`;
        });
    }
}

/**
 * Enhanced Scroll Progress Indicator
 */
function initScrollProgress() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrolled / maxScroll) * 100;
            
            if (scrollPercentage > 10) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// Initialize additional effects
initParallax();
initScrollProgress();

/**
 * Accessibility Enhancements
 */
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add focus management for mobile menu
hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
        const firstLink = navLinks.querySelector('.nav-link');
        if (firstLink) firstLink.focus();
    }
});

/**
 * Performance Optimizations
 */
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll event listeners
window.addEventListener('scroll', debounce(() => {
    // Throttled scroll effects
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 10));

/**
 * Dark Mode Toggle (Optional Enhancement)
 */
function initDarkModeToggle() {
    // This could be added as a future enhancement
    // For now, the theme is set via CSS variables and prefers-color-scheme
}

// Console welcome message
console.log(`
🚀 Portfolio Website Loaded Successfully!

👨‍💻 Developer: Aditya Kumar
🎯 Role: AI/ML & Python Developer
📍 Location: India

✨ Features:
- Modern Dark Theme with Glassmorphism
- Fully Responsive Design
- Smooth Animations & Transitions
- Typing Animation
- Scroll Effects
- Interactive Navigation
- Contact Form

📧 Contact: adityakumar@example.com
🔗 GitHub: github.com/adityakumar
`);

/**
 * Performance Monitoring
 */
// Log performance metrics
window.addEventListener('load', () => {
    if ('performance' in window) {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            console.log(`⚡ Page Load Time: ${loadTime.toFixed(2)}ms`);
        }, 0);
    }
});