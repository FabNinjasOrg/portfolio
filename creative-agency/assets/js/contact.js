// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      company: document.getElementById('company').value,
      message: document.getElementById('message').value
    };

    // Validate email
    if (!validateEmail(formData.email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Validate message length
    if (formData.message.length < 10) {
      showMessage('Please provide more details about your project.', 'error');
      return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual API call)
    try {
      // In a real application, you would send this to your backend:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
      contactForm.reset();

      // Log form data (for demo purposes)
      console.log('Form submitted:', formData);

    } catch (error) {
      showMessage('Oops! Something went wrong. Please try again.', 'error');
      console.error('Form submission error:', error);
    } finally {
      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
}

// Helper function to show messages
function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.style.display = 'block';

  if (type === 'success') {
    formMessage.style.backgroundColor = '#d4edda';
    formMessage.style.color = '#155724';
    formMessage.style.border = '1px solid #c3e6cb';
  } else {
    formMessage.style.backgroundColor = '#f8d7da';
    formMessage.style.color = '#721c24';
    formMessage.style.border = '1px solid #f5c6cb';
  }

  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
}

// Email validation function (if not imported from main.js)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Real-time form validation
const emailInput = document.getElementById('email');
if (emailInput) {
  emailInput.addEventListener('blur', () => {
    if (emailInput.value && !validateEmail(emailInput.value)) {
      emailInput.style.borderColor = '#f5576c';
    } else {
      emailInput.style.borderColor = '';
    }
  });
}

// Character counter for message field
const messageField = document.getElementById('message');
if (messageField) {
  const counterDiv = document.createElement('div');
  counterDiv.style.textAlign = 'right';
  counterDiv.style.fontSize = '0.875rem';
  counterDiv.style.color = 'var(--color-text-light)';
  counterDiv.style.marginTop = '0.5rem';
  messageField.parentElement.appendChild(counterDiv);

  messageField.addEventListener('input', () => {
    const length = messageField.value.length;
    const minLength = 10;

    if (length < minLength) {
      counterDiv.textContent = `${minLength - length} more characters needed`;
      counterDiv.style.color = 'var(--color-accent)';
    } else {
      counterDiv.textContent = `${length} characters`;
      counterDiv.style.color = 'var(--color-text-light)';
    }
  });
}

// Add focus animations to form inputs
const formInputs = document.querySelectorAll('.form-input, .form-textarea');
formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.style.transform = 'translateY(-2px)';
    input.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  });

  input.addEventListener('blur', () => {
    input.style.transform = '';
    input.style.boxShadow = '';
  });
});

console.log('Contact form initialized');

