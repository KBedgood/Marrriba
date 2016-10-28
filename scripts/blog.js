'use strict';

$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: 'https://tiyagencyweek.herokuapp.com/blogs',
    headers: { 'X_CSRF_TOKEN': 'N5JGY3RWWTW51XZTYVSN' },
    success: function success(data) {
      var blog = document.getElementById('blog-data-goes-here');
      var blogString = '';

      data.blogs.forEach(function (blog, index) {
        blogString += '\n          <div class="blog-post row">\n            <h1>' + blog.title + '</h1>\n            <span class="timestamp">' + moment(blog.posted).fromNow() + '</span>\n            <p>' + blog.description + '</p>\n          </div>' + (data.blogs.length != index + 1 ? '<hr />' : '');
      });

      blog.innerHTML = blogString;
    }
  });
});