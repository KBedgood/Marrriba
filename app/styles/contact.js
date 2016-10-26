 $(document).ready(function() {

 var getBoats = document.getElementById('boatDock');
 // var boatsURL = `https://tiyagencyweek.herokuapp.com/boats`

 $.ajax({
         method: "GET",
         url: `https://tiyagencyweek.herokuapp.com/boats`,
         success: function(boats) {
             console.log(boats);
         }
       })

                             Loop over our array to get access to each day.
                             result.data.results.forEach(function(boats) {
                                 console.log(boats);

                                 Put the search results info into our page.
                                 $("#boatDock").append(`
                            <div class="boatDock col-md-3">
                            <h3>Name: ${boats.name}</h3>
                            <img class="boatPhotos" src="${boats.xxx}.${comic.thumbnail.extension}">
                            <h3>Price: ${boats.price}</h3>
                            <h3>Details ${boats.details}</h3>
                            </div>`)


 
});

