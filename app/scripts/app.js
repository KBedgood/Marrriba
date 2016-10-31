const userButton = $('#user-button');
const loginModal = $('#login-modal');
const loginForm = $('#login-form');
const loginError = $('#login-error');

function requestUserToken(username, password, callback) {
  $.post('https://tiyagencyweek.herokuapp.com/auth/login', {
    username,
    password
  }).then(result => callback(result));
}

function userLogin(event) {
  event.preventDefault();

  const username = event.target[0].value;
  const password = event.target[1].value;

  requestUserToken(username, password, result => {
    if (result.error) return displayLoginError(result.error);

    localStorage.setItem('token', result.token);
    window.location.href = 'admin.html';
  });
}

function userLogout() {
  localStorage.removeItem('token');

  if (/admin.html/ig.test(window.location.href)) {
    window.location.href = '/';
  } else {
    userButton.removeClass('logged-in');
    userButton.find('span').html('Login');
  }
}

function handleUserButton(event) {
  if (userButton.hasClass('logged-in')) {
    userLogout();
  } else {
    loginModal.modal();
  }
}

function displayLoginError(message) {
  loginError.show();
  loginError.find('span').html(message);
}

function loadToken() {
  const localToken = localStorage.getItem('token');

  if (localToken) {
    userButton.addClass('logged-in');
    userButton.find('span').html('Logout');
  }
}

function init() {
  loadToken();

  userButton.on('click', handleUserButton);
  loginForm.on('submit', userLogin);
}

$(document).ready(init);
