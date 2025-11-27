// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav ul li a');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            // Close menu on mobile after click
            closeMenu();
        }
    });
});

if (navToggle) {
    navToggle.addEventListener('click', function() {
        toggleMenu();
    });
}

// Close menu when clicking overlay
if (navOverlay) {
    navOverlay.addEventListener('click', function() {
        closeMenu();
    });
}

function toggleMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Particle Animation
class ParticleAnimation {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.init();
        this.animate();
        this.addEventListeners();
    }
    
    init() {
        this.resize();
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    addEventListeners() {
        // Debounce resize for better performance
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.resize(), 100);
        });
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
            
            // Connect particles
            for (let j = index + 1; j < this.particles.length; j++) {
                const dx = this.particles[j].x - particle.x;
                const dy = this.particles[j].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 - distance / 600})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.3})`;
    }
    
    update(mouse) {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
            }
        }
        
        // Wrap around edges
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Typing Effect
class TypingEffect {
    constructor() {
        this.element = document.querySelector('.typed-text');
        if (!this.element) return;
        
        this.words = ['Developer', 'Cloud Engineer', 'Creator', 'Problem Solver'];
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        
        this.type();
    }
    
    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let delay = this.typeSpeed;
        
        if (!this.isDeleting && this.charIndex === currentWord.length) {
            delay = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            delay = 500; // Pause before typing next word
        } else if (this.isDeleting) {
            delay = 50; // Faster deletion
        }
        
        setTimeout(() => this.type(), delay);
    }
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle animation
    new ParticleAnimation();
    
    // Initialize typing effect
    new TypingEffect();
    
    // Animate about section text
    const fadeInElements = document.querySelectorAll('.fade-in-up');
    fadeInElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(el);
    });

    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Animate contact section
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form') || document.querySelector('.contact-content form');
    
    if (contactInfo) {
        contactInfo.classList.add('animate-on-scroll');
        contactInfo.style.transform = 'translateX(-50px)';
        observer.observe(contactInfo);
    }
    
    if (contactForm) {
        contactForm.classList.add('animate-on-scroll');
        contactForm.style.transform = 'translateX(50px)';
        observer.observe(contactForm);
    }
    
    // Animate skill badges
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge) => {
        observer.observe(badge);
    });
});

// Cache DOM references for scroll handlers
const navElement = document.querySelector('nav');
const heroElement = document.querySelector('.hero');
const heroContentElement = document.querySelector('.hero-content');

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Combined scroll handler for better performance
function handleScroll() {
    const scrolled = window.scrollY;
    
    // Navbar background on scroll
    if (navElement) {
        if (scrolled > 50) {
            navElement.classList.add('scrolled');
            navElement.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navElement.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navElement.classList.remove('scrolled');
            navElement.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navElement.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
    }
    
    // Parallax effect for hero section
    if (heroElement && heroContentElement) {
        heroContentElement.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContentElement.style.opacity = 1 - (scrolled * 0.002);
    }
}

// Add throttled scroll event listener
window.addEventListener('scroll', throttle(handleScroll, 16));

// Enhanced form handling with validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const message = document.getElementById('formMessage').value.trim();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Clear previous messages
        removeFormMessage();
        
        // Validate form fields
        if (!name) {
            showFormMessage('Please enter your name.', 'error');
            document.getElementById('formName').focus();
            return;
        }
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            document.getElementById('formEmail').focus();
            return;
        }
        
        if (!message || message.length < 10) {
            showFormMessage('Please enter a message (at least 10 characters).', 'error');
            document.getElementById('formMessage').focus();
            return;
        }
        
        // Disable submit button with animation
        submitButton.disabled = true;
        const originalContent = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Sending...</span>';
        submitButton.style.transform = 'scale(0.98)';
        
        // Create mailto link with properly formatted data
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}\n\n` +
            `---\nSent from portfolio contact form`
        );
        const mailtoLink = `mailto:connfedd@outlook.com?subject=${subject}&body=${body}`;
        
        // Simulate sending delay for better UX
        setTimeout(() => {
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showFormMessage('Opening your email client... Please send the message from there.', 'success');
            
            // Reset form and button after successful submission
            setTimeout(() => {
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = originalContent;
                submitButton.style.transform = '';
                
                // Remove success message after 5 seconds
                setTimeout(removeFormMessage, 5000);
            }, 2000);
        }, 800);
    });
    
    // Real-time email validation with visual feedback
    const emailInput = document.getElementById('formEmail');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                this.style.borderColor = '#ef4444';
                this.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
            } else if (email) {
                this.style.borderColor = '#22c55e';
                this.style.boxShadow = '0 0 0 4px rgba(34, 197, 94, 0.1)';
            } else {
                this.style.borderColor = '#e5e7eb';
                this.style.boxShadow = 'none';
            }
        });
        
        emailInput.addEventListener('focus', function() {
            this.style.borderColor = '#6366f1';
            this.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
        });
    }
}

function showFormMessage(msg, type) {
    removeFormMessage(); // Remove any existing message first
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `form-message ${type}`;
    msgDiv.textContent = msg;
    
    const form = document.getElementById('contactForm');
    if (form && form.parentNode) {
        form.parentNode.insertBefore(msgDiv, form);
    }
}

function removeFormMessage() {
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) {
        existingMsg.remove();
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (navMenu && navToggle && navOverlay) {
        if (!navMenu.contains(e.target) && 
            !navToggle.contains(e.target) && 
            navMenu.classList.contains('active')) {
            closeMenu();
        }
    }
});
