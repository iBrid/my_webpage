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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', function() {
    // Animate about section
    const aboutText = document.querySelectorAll('.about-text p');
    aboutText.forEach((p, index) => {
        p.classList.add('animate-on-scroll');
        p.style.transform = 'translateX(-50px)';
        p.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(p);
    });

    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transform = 'translateY(30px)';
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Animate contact section
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-content form');
    
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
});

// Add smooth navbar background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
    } else {
        nav.style.backgroundColor = '#fff';
        nav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

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
        
        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
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
                submitButton.textContent = 'Send Message';
                
                // Remove success message after 5 seconds
                setTimeout(removeFormMessage, 5000);
            }, 2000);
        }, 500);
    });
    
    // Real-time email validation
    const emailInput = document.getElementById('formEmail');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#ddd';
            }
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
