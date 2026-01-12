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

        const getItemsPerView = () => {
            if (window.innerWidth >= 1024) return 3; // Desktop: show 3 items
            return 1; // Mobile and Tablet: scroll 1 item at a time
        };

        const getScrollAmount = () => {
            if (cakeSliderItems.length === 0) return 0;

            // Get the first item to calculate width
            const firstItem = cakeSliderItems[0];
            const itemWidth = firstItem.offsetWidth;
            const itemStyle = window.getComputedStyle(firstItem);
            const marginRight = parseFloat(itemStyle.marginRight) || 0;

            return itemWidth + marginRight;
        };

        const updateSlider = () => {
            const scrollAmount = getScrollAmount();
            const translateX = -(currentIndex * scrollAmount);

            cakeSlider.style.transform = `translateX(${translateX}px)`;
            cakeSlider.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

            // Update arrow states
            const itemsPerView = getItemsPerView();
            const maxIndex = totalItems - itemsPerView;

            if (cakeLeftArrow) {
                cakeLeftArrow.disabled = currentIndex === 0;
                cakeLeftArrow.style.opacity = currentIndex === 0 ? '0.5' : '1';
                cakeLeftArrow.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
            }
            if (cakeRightArrow) {
                cakeRightArrow.disabled = currentIndex >= maxIndex;
                cakeRightArrow.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
                cakeRightArrow.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
            }
        };

        const scrollLeft = () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        };

        const scrollRight = () => {
            const itemsPerView = getItemsPerView();
            const maxIndex = totalItems - itemsPerView;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        };

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
                const itemsPerView = getItemsPerView();
                const maxIndex = totalItems - itemsPerView;
                if (currentIndex > maxIndex) {
                    currentIndex = Math.max(0, maxIndex);
                }
                updateSlider();
            }, 250);
        });

        // Initialize slider
        setTimeout(() => {
            updateSlider();
        }, 100);
    }
});
