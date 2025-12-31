// ========================================
// WORK PAGE - FILTER FUNCTIONALITY
// ========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to clicked button
    button.classList.add('active');

    // Get filter value
    const filterValue = button.getAttribute('data-filter');

    // Filter projects
    projectCards.forEach((card, index) => {
      const categories = card.getAttribute('data-category');

      if (filterValue === 'all' || categories.includes(filterValue)) {
        // Show card with animation
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        }, index * 50);
      } else {
        // Hide card with animation
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Add hover sound effect (optional - for premium feel)
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    // You could add a subtle sound here if desired
    // const audio = new Audio('path/to/hover-sound.mp3');
    // audio.volume = 0.1;
    // audio.play();
  });
});

// Add click interaction for project cards
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    // Get project title
    const title = card.querySelector('.project-card-title').textContent;

    // Show alert (in a real app, this would navigate to project detail page)
    console.log(`Clicked on project: ${title}`);

    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '100%';
    ripple.style.height = '100%';
    ripple.style.top = '0';
    ripple.style.left = '0';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.borderRadius = '50%';
    ripple.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
    ripple.style.opacity = '1';
    ripple.style.pointerEvents = 'none';

    card.style.position = 'relative';
    card.appendChild(ripple);

    setTimeout(() => {
      ripple.style.transform = 'scale(2)';
      ripple.style.opacity = '0';
    }, 10);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    // In a real application, navigate to project detail:
    // window.location.href = `project-detail.html?project=${encodeURIComponent(title)}`;
  });
});

// Keyboard navigation for filters
document.addEventListener('keydown', (e) => {
  if (e.key >= '1' && e.key <= '5') {
    const index = parseInt(e.key) - 1;
    if (filterButtons[index]) {
      filterButtons[index].click();
    }
  }
});

console.log('Work page filters initialized');

