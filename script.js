// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav ul li a');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            // Close menu on mobile after click
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        }
    });
});

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
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

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const message = document.getElementById('formMessage').value.trim();
        
        // Validate form
        if (!name) {
            showFormMessage('Please enter your name.', 'error');
            return;
        }
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        if (!message) {
            showFormMessage('Please enter your message.', 'error');
            return;
        }
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:connfedd@outlook.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showFormMessage('Opening your email client... You can send the message from there.', 'success');
        
        // Reset form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
            const msgDiv = document.querySelector('.form-message');
            if (msgDiv) {
                msgDiv.remove();
            }
        }, 3000);
    });
}

function showFormMessage(msg, type) {
    let msgDiv = document.querySelector('.form-message');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.className = 'form-message';
        contactForm.parentNode.insertBefore(msgDiv, contactForm);
    }
    msgDiv.textContent = msg;
    msgDiv.className = `form-message ${type}`;
}
