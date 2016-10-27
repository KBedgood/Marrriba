'use strict';

// ajax call to pull in blog info and put it on the homepage
$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: 'https://tiyagencyweek.herokuapp.com/blogs',
    headers: { 'X_CSRF_TOKEN': 'N5JGY3RWWTW51XZTYVSN' },
    success: function success(data) {
      var htmlString = '';
      data.blogs.forEach(function (blog, index) {
        htmlString += '\n        <div class="col-md-12 blog-post-' + (index + 1) + ' blog-post">\n            <div class="row">\n              <div id="blog-post-title" class="blog-title">' + blog.title + '</div>\n              <div id="blog-post-time" class="blog-time">' + moment(blog.posted).fromNow() + '</div>\n              <div id="blog-post-text" class="blog-text comment more">' + blog.description + '</div>\n            </div>\n        </div>';
      });
      $('#blog-data-goes-here').html(htmlString);
    }
  });
});