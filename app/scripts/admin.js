const postError = $('#post-error');

tinymce.init({
  selector: 'textarea',
  min_height: 400
});

$('#blog-post').on('submit', event => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  const title = event.target[0].value;
  const description = tinyMCE.activeEditor.getContent();

  $.ajax({
    method: 'POST',
    url: 'https://tiyagencyweek.herokuapp.com/blogs/create',
    headers: {
      X_CSRF_TOKEN: token
    },
    data: {
      title,
      description
    }
  }).then(result => {
    if (result.error) {
      postError.show();
      postError.find('span').html(result.error);
    } else {
      postError.show();
      postError.removeClass('alert-danger');
      postError.addClass('alert-success');
      postError.find('span').html('Blog post submitted! Redirecting to <strong>/blogs</strong> in 3 seconds...');

      window.setTimeout(() => window.location.href = 'blog.html', 3000);
    }
  });
});

$(document).ready(() => {
  const localToken = localStorage.getItem('token');

  if (!localToken) window.location.href = 'index.html';
})
