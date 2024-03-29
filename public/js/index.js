/* eslint-disable */
import '@babel/polyfill';

import { login, logout } from './login';
import displayMap from './mapbox';
import updateSettings from './updateSettings';
import { bookTour } from './stripe';

// DOM ELEMENTS
const mapBox = document.querySelector('#map');
const loginForm = document.querySelector('#login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');
const bookBtn = document.querySelector('#book-tour');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData();
    form.append('name', document.querySelector('#name').value);
    form.append('email', document.querySelector('#email').value);
    form.append('photo', document.querySelector('#photo').files[0]);
    updateSettings(form, 'data');
  });

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async event => {
    event.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.querySelector('#password-current').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );

    document.querySelector('.btn--save-password').textContent = 'Save Password';
    document.querySelector('#password-current').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#password-confirm').value = '';
  });
}

if (bookBtn)
  bookBtn.addEventListener('click', async event => {
    event.target.textContent = 'Processing...';
    const { tourId } = event.target.dataset;
    await bookTour(tourId);
    event.target.textContent = 'Booked!';
  });
