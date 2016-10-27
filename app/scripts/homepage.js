// ajax call to pull in blog info and put it on the homepage

$.ajax({
    method: "GET",
    url: `https://tiyagencyweek.herokuapp.com/blogs`,
    headers: { 'X_CSRF_TOKEN': 'N5JGY3RWWTW51XZTYVSN' },
    success: function(data) {
        console.log(data);
        var arrayofBlogs = data.blogs.forEach(function(blogs) {
            $('#blog-data-goes-here').html(`
            <div class="col-md-12 blog-post-1 blog-post">
                <div class="row">
                  <div id="blog-post-title" class="blog-title"><${blogs.title}</div>
                  <div id="blog-post-time" class="blog-time">${moment(blogs.posted).fromNow()}</div>
                  <div id="blog-post-text" class="blog-text comment more">${blogs.description}</div>
                </div>
            </div>
            `)
        })
    }
})



















