// Typing Animation logic
const typingCode = document.getElementById('typing-code');
const codeLines = [
    'class Project Manager {',
    '  constructor() {',
    '    this.name = "Hafezd El Daffa";',
    '    this.focus = ["Project Management", "Product Development"];',
    '    this.velocity = "Increased 40%";',
    '  }',
    '  maximizeROI() {',
    '    return "Success";',
    '  }',
    '}'
];

let lineIndex = 0;
let charIndex = 0;

function typeCode() {
    if (lineIndex < codeLines.length) {
        if (charIndex < codeLines[lineIndex].length) {
            typingCode.innerHTML += codeLines[lineIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeCode, 50);
        } else {
            typingCode.innerHTML += '<br>';
            lineIndex++;
            charIndex = 0;
            setTimeout(typeCode, 200);
        }
    }
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered', reg))
            .catch(err => console.error('Service Worker failed', err));
    });
}

// Active Nav Link Tracking
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    typeCode();

    // Smooth appearance for sections
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});

// Add CSS for fade-in-section via JS to keep style.css cleaner if needed, 
// but I'll assume they are handled or I can add a few more styles here.
const style = document.createElement('style');
style.textContent = `
    .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .fade-in-section.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
