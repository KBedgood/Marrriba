// ajax call to pull in blog info and put it on the homepage
$(document).ready(() => {
  $.ajax({
    method: "GET",
    url: `https://tiyagencyweek.herokuapp.com/blogs`,
    headers: { 'X_CSRF_TOKEN': 'N5JGY3RWWTW51XZTYVSN' },
    success: data => {
      let htmlString = ``;

      data.blogs.forEach(blog => {
        htmlString += `
        <div class="blog-post">
          <h1>${blog.title}</h1>
          <h2>${moment(blog.posted).fromNow()}</h2>
          <p>${blog.description}<p>
        </div>
        <hr />`;
      });

      $('#blog-data-goes-here').html(htmlString);
    }
  });
});
