// ===== TYPING EFFECT =====
const words = [
    "Frontend Developer",
    "PHP Developer",
    "Web Developer",
    "WordPress Developer",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
        charIndex++;
    } else {
        charIndex--;
    }

    document.getElementById("typed-text").textContent = currentWord.substring(0, charIndex);

    let speed = isDeleting ? 80 : 120;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(type, speed);
}

type();


const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.progress-bar-fill').forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
            });
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-content');
if (skillsSection) skillsObserver.observe(skillsSection);

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        // Active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});


// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const successBox = document.getElementById('successBox');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Errors
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    // Reset errors
    [name, email, subject, message].forEach(f => f.classList.remove('error'));
    [nameError, emailError, subjectError, messageError].forEach(e => e.classList.remove('show'));

    let valid = true;

    // Validation
    if (name.value.trim() === '') {
        name.classList.add('error');
        nameError.classList.add('show');
        valid = false;
    }

    if (email.value.trim() === '' || !/^\S+@\S+\.\S+$/.test(email.value)) {
        email.classList.add('error');
        emailError.classList.add('show');
        valid = false;
    }

    if (subject.value.trim() === '') {
        subject.classList.add('error');
        subjectError.classList.add('show');
        valid = false;
    }

    if (message.value.trim() === '') {
        message.classList.add('error');
        messageError.classList.add('show');
        valid = false;
    }

    if (!valid) return;

    // Submit Button disable
    const btn = contactForm.querySelector('.submit-btn');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    // Web3Forms API
    const formData = new FormData(contactForm);
    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    if (result.success) {
        contactForm.style.display = 'none';
        successBox.style.display = 'block';
    } else {
        btn.disabled = false;
        btn.textContent = 'Send Message';
        alert('Something went wrong. Please try again.');
    }
});