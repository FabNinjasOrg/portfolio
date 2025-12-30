// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

if (mobileMenuButton && mobileMenu && menuIcon && closeIcon) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
}

const particleConfig = {
    fpsLimit: 60,
    detectRetina: true,
    background: { color: { value: 'transparent' } },
    fullScreen: { enable: false },
    particles: {
        number: { value: 500, density: { enable: true, area: 800 } },
        color: { value: '#1a73e8' },
        shape: { type: 'circle' },
        opacity: { value: 0.7, random: { enable: true, minimumValue: 0.4 } },
        size: { value: 3, random: { enable: true, minimumValue: 1.5 } },
        move: {
            enable: true,
            speed: 0.6,
            direction: 'none',
            random: false,
            straight: false,
            outModes: { default: 'out' },
            attract: { enable: false }
        },
        links: { enable: false }
    },
    interactivity: {
        detectsOn: 'window',
        events: {
            onHover: { enable: true, mode: ['repulse', 'attract'] },
            resize: true
        },
        modes: {
            repulse: { distance: 120, duration: 0.4, speed: 0.06 },
            attract: { distance: 220, duration: 0.3, factor: 0.5 }
        }
    }
};

tsParticles.load('home-particles', particleConfig);

