'use strict';

var userButton = $('#user-button');
var loginModal = $('#login-modal');
var loginForm = $('#login-form');
var loginError = $('#login-error');

function requestUserToken(username, password, callback) {
  $.post('https://tiyagencyweek.herokuapp.com/auth/login', {
    username: username,
    password: password
  }).then(function (result) {
    return callback(result);
  });
}

function userLogin(event) {
  event.preventDefault();

  var username = event.target[0].value;
  var password = event.target[1].value;

  requestUserToken(username, password, function (result) {
    if (result.error) return displayLoginError(result.error);

    localStorage.setItem('token', result.token);
    window.location.href = '/admin.html';
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
  if (loginError.hasClass('invisible')) loginError.removeClass('invisible');
  loginError.find('span').html(message);
}

function loadToken() {
  var localToken = localStorage.getItem('token');

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