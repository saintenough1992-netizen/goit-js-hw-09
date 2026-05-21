const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const storageKey = 'feedback-form-state';
const prevEmail = document.querySelector('.prev-email');
const prevMessage = document.querySelector('.prev-message');
const prevKey = 'feedback-form-prev';
const clearCache = document.querySelector('.clear-cache');

let formData = {
  email: '',
  message: '',
};
const savedData = localStorage.getItem(storageKey);
const prevData = localStorage.getItem(prevKey);
if (prevData) {
  prevEmail.textContent = JSON.parse(prevData).email || '';
  prevMessage.textContent = JSON.parse(prevData).message || '';
}
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
  localStorage.setItem(prevKey, JSON.stringify(formData));
  prevEmail.textContent = formData.email;
  prevMessage.textContent = formData.message;
  localStorage.removeItem(storageKey);
  formData = {
    email: '',
    message: '',
  };
  form.reset();
});
clearCache.addEventListener('click', e => {
  e.preventDefault();
  localStorage.removeItem(prevKey);
  prevEmail.textContent = '';
  prevMessage.textContent = '';
});
