let navbarAlwaysScrolled = false;

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hasHero = document.querySelector('.hero');

    if (!hasHero) {
        navbarAlwaysScrolled = true;
        navbar.classList.add('scrolled');
    }
});

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        if (!navbarAlwaysScrolled) {
            navbar.classList.remove('scrolled');
        }
    }
});

const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');

        const spans = this.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const favoriteButtons = document.querySelectorAll('.favorite-btn');

favoriteButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        const svg = this.querySelector('svg');
        const isActive = this.classList.contains('active');

        if (isActive) {
            this.classList.remove('active');
            svg.style.fill = 'none';
            this.style.backgroundColor = 'var(--white)';
        } else {
            this.classList.add('active');
            svg.style.fill = 'red';
            this.style.backgroundColor = 'var(--primary-color)';
        }
    });
});

const searchButton = document.querySelector('.btn-search');

if (searchButton) {
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.property-card, .feature-card, .mission-card, .agent-card'
    );

    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('#')[0];

        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

let scrollToTopBtn = document.getElementById('scroll-to-top');

if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const scheduleBtn = document.getElementById('schedule-visit-btn');
    const modal = document.getElementById('schedule-modal');
    const modalClose = document.getElementById('modal-close');
    const scheduleForm = document.getElementById('schedule-form');
    const modalSuccess = document.getElementById('modal-success');
    const modalOk = document.getElementById('modal-ok');

    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            const dateInput = document.getElementById('visit-date');
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        });
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        scheduleForm.reset();
        scheduleForm.style.display = 'flex';
        modalSuccess.style.display = 'none';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    if (modalOk) {
        modalOk.addEventListener('click', closeModal);
    }

    if (scheduleForm) {
        scheduleForm.addEventListener('submit', function(e) {
            e.preventDefault();

            scheduleForm.style.display = 'none';
            modalSuccess.style.display = 'block';
        });
    }
});
