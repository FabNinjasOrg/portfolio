const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

function validateForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    if (formData.phone && formData.phone.trim() !== '') {
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        const digitsOnly = formData.phone.replace(/\D/g, '');
        if (!phoneRegex.test(formData.phone) || digitsOnly.length < 10) {
            errors.push('Please enter a valid phone number (at least 10 digits)');
        }
    }

    if (!formData.subject) {
        errors.push('Please select a subject');
    }

    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }

    return errors;
}

function showErrors(errors) {
    const existingErrors = document.querySelector('.form-errors');
    if (existingErrors) {
        existingErrors.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-errors';
    errorDiv.style.cssText = `
        background-color: #fee2e2;
        border: 1px solid #fca5a5;
        color: #991b1b;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1.5rem;
    `;

    const errorList = document.createElement('ul');
    errorList.style.cssText = 'margin: 0.5rem 0 0 1.5rem;';

    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = error;
        li.style.marginBottom = '0.5rem';
        errorList.appendChild(li);
    });

    const errorTitle = document.createElement('strong');
    errorTitle.textContent = 'Please correct the following errors:';

    errorDiv.appendChild(errorTitle);
    errorDiv.appendChild(errorList);

    contactForm.parentNode.insertBefore(errorDiv, contactForm);

    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim()
        };

        const errors = validateForm(formData);

        if (errors.length > 0) {
            showErrors(errors);
            return;
        }

        const existingErrors = document.querySelector('.form-errors');
        if (existingErrors) {
            existingErrors.remove();
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
            contactForm.style.display = 'none';

            formSuccess.style.display = 'block';

            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';

            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

            setTimeout(() => {
                contactForm.reset();
                formSuccess.style.display = 'none';
                contactForm.style.display = 'flex';
            }, 5000);

        }, 1500);
    });
}

function addRealTimeValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value.trim().length > 0 && this.value.trim().length < 2) {
                this.style.borderColor = '#f87171';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#f87171';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                const digitsOnly = this.value.replace(/\D/g, '');
                if (digitsOnly.length < 10) {
                    this.style.borderColor = '#f87171';
                } else {
                    this.style.borderColor = '';
                }
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            if (this.value.trim().length > 0 && this.value.trim().length < 10) {
                this.style.borderColor = '#f87171';
            } else {
                this.style.borderColor = '';
            }
        });
    }
}

addRealTimeValidation();

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }

        e.target.value = value;
    });
}

const messageInput = document.getElementById('message');
if (messageInput) {
    const maxChars = 500;

    const counterDiv = document.createElement('div');
    counterDiv.style.cssText = `
        text-align: right;
        font-size: 0.875rem;
        color: var(--gray-500);
        margin-top: 0.5rem;
    `;
    counterDiv.innerHTML = `<span id="char-count">0</span> / ${maxChars} characters`;

    messageInput.parentNode.appendChild(counterDiv);

    messageInput.addEventListener('input', function() {
        const count = this.value.length;
        document.getElementById('char-count').textContent = count;

        if (count > maxChars) {
            counterDiv.style.color = '#ef4444';
            this.value = this.value.substring(0, maxChars);
        } else {
            counterDiv.style.color = 'var(--gray-500)';
        }
    });
}
