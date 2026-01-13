document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Scroll Handler - Apply to all pages
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('active')) {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
        }
    });

    // Cake Slider Functionality
    const cakeSlider = document.querySelector('.cake-slider');
    const cakeSliderWrapper = document.querySelector('.cake-slider-wrapper');
    const cakeSliderItems = document.querySelectorAll('.cake-slider-item');
    const cakeLeftArrow = document.querySelector('.cake-slider-arrow-left');
    const cakeRightArrow = document.querySelector('.cake-slider-arrow-right');

    if (cakeSlider && cakeSliderItems.length > 0 && cakeSliderWrapper) {
        let currentIndex = 0;
        const totalItems = cakeSliderItems.length;

        const updateSlider = () => {
            // Remove active class from all items
            cakeSliderItems.forEach(item => item.classList.remove('active'));

            // Add active class to current item
            cakeSliderItems[currentIndex].classList.add('active');

            // Calculate centering offset
            const wrapperWidth = cakeSliderWrapper.offsetWidth;
            const itemWidth = cakeSliderItems[currentIndex].offsetWidth;
            const itemOffsetLeft = cakeSliderItems[currentIndex].offsetLeft;
            const itemCenter = itemOffsetLeft + (itemWidth / 2);

            const translateX = (wrapperWidth / 2) - itemCenter;

            cakeSlider.style.transform = `translateX(${translateX}px)`;

            // Update arrow states
            if (cakeLeftArrow) {
                cakeLeftArrow.disabled = currentIndex === 0;
                cakeLeftArrow.style.opacity = currentIndex === 0 ? '0.5' : '1';
            }
            if (cakeRightArrow) {
                cakeRightArrow.disabled = currentIndex === totalItems - 1;
                cakeRightArrow.style.opacity = currentIndex === totalItems - 1 ? '0.5' : '1';
            }
        };

        const scrollLeft = () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        };

        const scrollRight = () => {
            if (currentIndex < totalItems - 1) {
                currentIndex++;
                updateSlider();
            }
        };

        // Click on items to select them
        cakeSliderItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
                window.location.href = 'product/products.html';
            });
        });

        // Event listeners
        if (cakeLeftArrow) {
            cakeLeftArrow.addEventListener('click', scrollLeft);
        }
        if (cakeRightArrow) {
            cakeRightArrow.addEventListener('click', scrollRight);
        }

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                updateSlider();
            }, 250);
        });

        // Initialize slider
        setTimeout(() => {
            updateSlider();
        }, 100);
    }
});
