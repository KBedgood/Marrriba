// ajax call to pull in blog info and put it on the homepage
$(document).ready(() => {
  $.ajax({
    method: "GET",
    url: `https://tiyagencyweek.herokuapp.com/blogs`,
    headers: { 'X_CSRF_TOKEN': 'N5JGY3RWWTW51XZTYVSN' },
    success: function(data) {
      let htmlString = ``;
      data.blogs.forEach(function(blog, index) {
        htmlString += `
          <div class="col-md-12 blog-post-${index+1} blog-post">
              <div class="row">
                <div id="blog-post-title" class="blog-title">${blog.title}</div>
                <div id="blog-post-time" class="blog-time">${moment(blog.posted).fromNow()}</div>
                <div id="blog-post-text" class="blog-text comment more">${blog.description}</div>
              </div>
          </div>`;
      });
      $('#blog-data-goes-here').html(htmlString);
    }
  });
});
