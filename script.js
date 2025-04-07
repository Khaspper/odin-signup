const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const errorMessage = document.querySelectorAll('span');

form.addEventListener('submit', (event) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].validity.valid) {
      errorMessage[i].textContent = "";
    }
    else if (inputs[i].id === 'password-2' && !inputs[i].validity.valueMissing) {
      let match = checkPassword(inputs[i], errorMessage[i]);
      if (match === false) {
        event.preventDefault();
      }
    }
    else {
      showError(inputs[i], errorMessage[i]);
      event.preventDefault();
    }
  }
})

function showError(input, span) {
  message = input.validationMessage;

  if (input.type == 'email' && input.validity.typeMismatch) {
    message = "Missing an '@' in the email";
    if (input.value.includes('@')) {
      message = "Missing the domain name after '@'";
    }
  }
  if (input.type == 'tel' && !input.validity.valueMissing) {
    message = "Please use this format: XXX-XXX-XXXX";
  }
  else if (input.id === 'password-1') {
    if (input.validity.tooShort) {
      message = "Must be at least 8 characters long";
    }
    else if (input.validity.patternMismatch) {
      if (!/[A-Z]/.test(input.value)) {
        message = "Must at least have 1 uppercase letter";
      }
      else if (!/[0-9]/.test(input.value)) {
        message = "Must at least have 1 digit";
      }
      else if (!/[a-z]/.test(input.value)) {
        message = "Must at least have 1 lowercase letter";
      }
      else if (/\s/.test(input.value)) {
        message = "Spaces are not allowed";
      }
    }
  }

  span.textContent = message;
}

function checkPassword(input, span) {
  const firstPass = document.getElementById('password-1'); 
  if (!(input.value === firstPass.value)) {
    span.textContent = "Passwords do not match";
    return false;
  }
  return true;
}