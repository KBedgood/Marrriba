// ajax call to pull in blog info and put it on the homepage
$(document).ready(() => {
  $.ajax({
    method: "GET",
    url: `https://tiyagencyweek.herokuapp.com/blogs`,
    headers: { 'X_CSRF_TOKEN': 'N5JGY3RWWTW51XZTYVSN' },
    success: data => {
      let htmlString = ``;

      let blogEntries = data.blogs;
      blogEntries.sort((a, b) => {
        const dateA = new Date(a.posted);
        const dateB = new Date(b.posted);

        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
      });
      blogEntries.splice(2);

      blogEntries.forEach((blog, index) => {
        htmlString += `
        <div class="blog-post">
          <h1>${blog.title}</h1>
          <span class="timestamp">${moment(blog.posted).fromNow()}</span>
          <p>${blog.description}<p>
        </div>${(data.blogs.length != index + 1) ? '<hr />' : ''}`;
      });

      $('#blog-data-goes-here').html(htmlString);
    }
  });
});
