'use strict';

// ajax call to pull in blog info and put it on the homepage
$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: 'https://tiyagencyweek.herokuapp.com/blogs',
    headers: { 'X_CSRF_TOKEN': 'N5JGY3RWWTW51XZTYVSN' },
    success: function success(data) {
      var htmlString = '';

      var blogEntries = data.blogs;
      blogEntries.sort(function (a, b) {
        var dateA = new Date(a.posted);
        var dateB = new Date(b.posted);

        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
      });
      blogEntries.splice(2);
      console.log(blogEntries);

      blogEntries.forEach(function (blog, index) {
        htmlString += '\n        <div class="blog-post">\n          <h1>' + blog.title + '</h1>\n          <span class="timestamp">' + moment(blog.posted).fromNow() + '</span>\n          <p>' + blog.description + '<p>\n        </div>' + (data.blogs.length != index + 1 ? '<hr />' : '');
      });

      $('#blog-data-goes-here').html(htmlString);
    }
  });
});