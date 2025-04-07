const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const errorMessage = document.querySelectorAll('span');

// for (let i = 0; i < inputs.length; i++) {
//   console.log(inputs[i].validity);
// }

form.addEventListener('submit', (event) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].validity.valid) {
      errorMessage[i].textContent = "";
      //! Remove active error class
      errorMessage.className = "error";
    }
    else {
      showError(inputs[i], errorMessage[i]);
    }
  }
  event.preventDefault();
})

function showError(input, span) {
  message = input.validationMessage;
  // let message = "";

  if (input.type == 'email' && input.validity.typeMismatch) {
    message = "Missing an '@' in the email";
    if (input.value.includes('@')) {
      message = "Missing the domain name after '@'";
    }
  }
  else if (input.type == 'password') {
    message = "";
  }
  span.textContent = message;
}