'use strict';

// ajax call to pull in blog info and put it on the homepage
$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: 'https://tiyagencyweek.herokuapp.com/blogs',
    headers: { 'X_CSRF_TOKEN': 'N5JGY3RWWTW51XZTYVSN' },
    success: function success(data) {
      var htmlString = '';

      data.blogs.forEach(function (blog) {
        htmlString += '\n        <div class="blog-post">\n          <h1>' + blog.title + '</h1>\n          <span class="timestamp">' + moment(blog.posted).fromNow() + '</span>\n          <p>' + blog.description + '<p>\n        </div>\n        <hr />';
      });

      $('#blog-data-goes-here').html(htmlString);
    }
  });
});