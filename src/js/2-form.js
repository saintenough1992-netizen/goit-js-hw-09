const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const storageKey = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};
document.addEventListener('DOMContentLoaded', e => {
  if (localStorage.getItem(storageKey) !== null) {
    const savedData = localStorage.getItem(storageKey);
    formData = JSON.parse(savedData);
    for (const key in formData) {
      if (key == emailInput.name) {
        emailInput.value = formData[key];
      } else if (key == messageInput.name) {
        messageInput.value = formData[key];
      }
    }
  }
});
form.addEventListener('input', e => {
  for (const key in formData) {
    if (e.target.name == key) {
      formData[key] = e.target.value;
    }
  }
  localStorage.setItem(storageKey, JSON.stringify(formData));
});
form.addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  if (emailInput.value.trim() == '' || messageInput.value.trim() == '') {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem(storageKey);
  formData = {
    email: '',
    message: '',
  };
  form.reset();
});
