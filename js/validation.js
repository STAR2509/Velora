/* === VELORA FORM VALIDATION MODULE === */

/* Validation rules for each field */
const VALIDATION_RULES = {
  fullName: {
    validate: v => v.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(v.trim()),
    message: 'Please enter your full name (letters only)'
  },
  email: {
    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: 'Please enter a valid email address'
  },
  phone: {
    validate: v => /^\d{10}$/.test(v.replace(/\D/g, '')),
    message: 'Phone must be 10 digits'
  },
  street: {
    validate: v => v.trim().length >= 10,
    message: 'Please enter your full street address'
  },
  city: {
    validate: v => /^[a-zA-Z\s]+$/.test(v.trim()) && v.trim().length > 0,
    message: 'Please enter a valid city name'
  },
  postal: {
    validate: v => /^\d{5,6}$/.test(v.trim()),
    message: 'Please enter a valid postal code'
  },
  cardNumber: {
    validate: v => /^\d{16}$/.test(v.replace(/\s/g, '')),
    message: 'Card number must be 16 digits'
  },
  expiry: {
    validate: v => {
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(v.trim())) return false;
      const [month, year] = v.split('/');
      const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
      return expDate > new Date();
    },
    message: 'Please enter a valid future expiry date'
  },
  cvv: {
    validate: v => /^\d{3}$/.test(v.trim()),
    message: 'CVV must be 3 digits'
  }
};

/* Validate a single field and show/hide error message */
function validateField(fieldId) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (!input || !VALIDATION_RULES[fieldId]) return true;

  const rule = VALIDATION_RULES[fieldId];
  const isValid = rule.validate(input.value);

  input.classList.remove('valid', 'error', 'shake');
  if (errorEl) errorEl.classList.remove('visible');

  if (input.value.trim() === '' && !isFormSubmitting) {
    return true; // Don't mark empty as error until submit
  }

  if (isValid) {
    input.classList.add('valid');
    if (errorEl) errorEl.classList.remove('visible');
  } else {
    input.classList.add('error');
    if (errorEl) {
      errorEl.textContent = rule.message;
      errorEl.classList.add('visible');
    }
    void input.offsetWidth; // force reflow for shake
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 450);
  }

  return isValid;
}

let isFormSubmitting = false;

/* Attach real-time validation listeners (oninput) */
function initValidation() {
  Object.keys(VALIDATION_RULES).forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (!input) return;
    // Demonstrate both oninput AND addEventListener
    input.oninput = () => validateField(fieldId);
    input.addEventListener('blur', () => {
      if (input.value.trim()) validateField(fieldId);
    });
  });
}

/* Validate all fields on submit */
function validateAll() {
  isFormSubmitting = true;
  const results = Object.keys(VALIDATION_RULES).map(validateField);
  isFormSubmitting = false;
  return results.every(Boolean);
}

/* Handle checkout form submission */
function handleCheckoutSubmit(event) {
  event.preventDefault();
  if (!validateAll()) {
    const firstError = document.querySelector('.form-input.error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  clearCart();
  window.location.href = 'confirmation.html';
}

/* Initialize when DOM is ready */
document.addEventListener('DOMContentLoaded', () => {
  initValidation();
  const form = document.getElementById('checkout-form');
  if (form) form.addEventListener('submit', handleCheckoutSubmit);
});
