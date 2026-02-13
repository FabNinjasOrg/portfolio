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

    const slides = document.querySelectorAll('#heroSlider .hero-img');
    let current = 0;

    function showNextSlide() {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }

    setInterval(showNextSlide, 1500); // change every 3 sec

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

    // 5. Video Auto-play
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

    // 6. Load More Reviews Functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hiddenReviews = document.querySelectorAll('.hidden-review');

    if (loadMoreBtn && hiddenReviews.length > 0) {
        let reviewsVisible = false;

        loadMoreBtn.addEventListener('click', () => {
            if (!reviewsVisible) {
                // Show hidden reviews
                hiddenReviews.forEach((review, index) => {
                    setTimeout(() => {
                        review.style.display = 'flex';
                        review.classList.add('animated');
                    }, index * 100); // Staggered animation
                });
                loadMoreBtn.innerHTML = '<i class="fas fa-minus"></i> Show Less Reviews';
                reviewsVisible = true;
            } else {
                // Hide reviews
                hiddenReviews.forEach(review => {
                    review.style.display = 'none';
                    review.classList.remove('animated');
                });
                loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Reviews';
                reviewsVisible = false;
            }
        });
    }

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
