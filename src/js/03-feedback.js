import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');

feedbackForm.addEventListener('input', throttle(getCurrentValue, 500));
document.addEventListener('DOMContentLoaded', checkingStorageStatus);
feedbackForm.addEventListener('submit', removeStorage);

function getCurrentValue() {
  const value = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(value));
}

function checkingStorageStatus() {
  const savedValue = localStorage.getItem('feedback-form-state');

  if (savedValue) {
    emailInput.value = JSON.parse(savedValue).email;
    messageInput.value = JSON.parse(savedValue).message;
  }
}

function removeStorage(evt) {
  evt.preventDefault();

  const currentValue = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(currentValue);

  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
}
