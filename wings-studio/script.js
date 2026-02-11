document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // 3. Correct Smooth Scroll for Website
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll Reveal Animations
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('reveal-on-scroll')) {
                    entry.target.classList.add('is-visible');
                }
                if (entry.target.hasAttribute('data-animate')) {
                    entry.target.classList.add('animated');
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal-on-scroll, [data-animate]').forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Testimonials Slider (V2 Restore)
    const slider = document.getElementById('testimonialsWrapper');
    const testimonialCards = document.querySelectorAll('.testimonial-card-v2');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (slider && testimonialCards.length > 0) {
        let currentPosition = 0;
        const cardWidth = testimonialCards[0].offsetWidth + 32;
        const maxScroll = (testimonialCards.length * cardWidth) - slider.parentElement.offsetWidth;

        function updateSlider() {
            slider.style.transform = `translateX(-${currentPosition}px)`;
        }

        const advanceSlider = () => {
            currentPosition += cardWidth;
            if (currentPosition > maxScroll) currentPosition = 0;
            updateSlider();
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                advanceSlider();
                resetAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentPosition -= cardWidth;
                if (currentPosition < 0) currentPosition = maxScroll;
                updateSlider();
                resetAutoPlay();
            });
        }

        // Auto-play (Live Scroll)
        let autoPlayInterval = setInterval(advanceSlider, 5000);

        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(advanceSlider, 5000);
        };

        // Pause on hover
        slider.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        slider.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(advanceSlider, 5000);
        });

        // Handle Resize
        window.addEventListener('resize', () => {
            currentPosition = 0;
            updateSlider();
        });
    }

    // 6. Video Auto-play
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.muted = true;
                video.play().catch(() => { });
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.reel-video').forEach(video => {
        videoObserver.observe(video);
    });

    // 7. Form Handling
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Booking Sent!';
            setTimeout(() => {
                bookingForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Confirm Booking';
            }, 3000);
        });
    }
});
