// Contact Form Validation
const contactForm = document.getElementById("contactForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const successMessage = document.querySelector(
  '[data-testid="test-contact-success"]'
);

const validators = {
  fullName: {
    validate: (value) => value.trim().length > 0,
    message: "Full name is required",
  },
  email: {
    validate: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value.trim());
    },
    message: "Please enter a valid email address (e.g., name@example.com)",
  },
  subject: {
    validate: (value) => value.trim().length > 0,
    message: "Subject is required",
  },
  message: {
    validate: (value) => value.trim().length >= 10,
    message: "Message must be at least 10 characters long",
  },
};

function showError(fieldName, message) {
  const input = document.getElementById(fieldName);
  const errorElement = document.getElementById(`error-${fieldName}`);

  input.classList.add("error");
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

function clearError(fieldName) {
  const input = document.getElementById(fieldName);
  const errorElement = document.getElementById(`error-${fieldName}`);

  input.classList.remove("error");
  errorElement.textContent = "";
  errorElement.classList.remove("show");
}

function validateField(fieldName, value) {
  const validator = validators[fieldName];
  if (!validator.validate(value)) {
    showError(fieldName, validator.message);
    return false;
  } else {
    clearError(fieldName);
    return true;
  }
}

// Real-time validation
fullNameInput.addEventListener("blur", () =>
  validateField("fullName", fullNameInput.value)
);
emailInput.addEventListener("blur", () =>
  validateField("email", emailInput.value)
);
subjectInput.addEventListener("blur", () =>
  validateField("subject", subjectInput.value)
);
messageInput.addEventListener("blur", () =>
  validateField("message", messageInput.value)
);

// Form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate all fields
  const isFullNameValid = validateField("fullName", fullNameInput.value);
  const isEmailValid = validateField("email", emailInput.value);
  const isSubjectValid = validateField("subject", subjectInput.value);
  const isMessageValid = validateField("message", messageInput.value);

  // If all valid, show success message
  if (isFullNameValid && isEmailValid && isSubjectValid && isMessageValid) {
    successMessage.classList.add("show");
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 3000);

    // Focus on success message for screen readers
    successMessage.focus();
  } else {
    // Focus on first error field
    if (!isFullNameValid) fullNameInput.focus();
    else if (!isEmailValid) emailInput.focus();
    else if (!isSubjectValid) subjectInput.focus();
    else if (!isMessageValid) messageInput.focus();
  }
});
