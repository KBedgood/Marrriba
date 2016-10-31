'use strict';

var postError = $('#post-error');

tinymce.init({
  selector: 'textarea',
  min_height: 400
});

$('#blog-post').on('submit', function (event) {
  event.preventDefault();

  var token = localStorage.getItem('token');
  var title = event.target[0].value;
  var description = tinyMCE.activeEditor.getContent();

  $.ajax({
    method: 'POST',
    url: 'https://tiyagencyweek.herokuapp.com/blogs/create',
    headers: {
      X_CSRF_TOKEN: token
    },
    data: {
      title: title,
      description: description
    }
  }).then(function (result) {
    if (result.error) {
      postError.show();
      postError.find('span').html(result.error);
    } else {
      postError.show();
      postError.removeClass('alert-danger');
      postError.addClass('alert-success');
      postError.find('span').html('Blog post submitted! Redirecting to <strong>/blogs</strong> in 3 seconds...');

      window.setTimeout(function () {
        return window.location.href = 'blog.html';
      }, 3000);
    }
  });
});