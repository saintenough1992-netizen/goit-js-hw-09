const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const storageKey = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};
const savedData = localStorage.getItem(storageKey);

if (savedData) {
  formData = JSON.parse(savedData);

  emailInput.value = formData.email || '';
  messageInput.value = formData.message || '';
}

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
