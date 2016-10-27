$(document).ready(function() {

            var getBoats = document.getElementById('boatDock');
            // var boatsURL = `https://tiyagencyweek.herokuapp.com/boats`

            $.ajax({
                method: "GET",
                url: `https://tiyagencyweek.herokuapp.com/boats`,
                success: function(results) {
                    console.log(results);


                    // Loop over our array to get access to each day.
                    results.boats.forEach(function(boats) {
                            console.log(boats);

                            // Put the search results info into our page.
                            $("#boatDock").append(`
                                      <div class="boatDock col-md-3">
                                      <h3>Name: ${boats.name}</h3>
                                      <img class="boatPhotos" src="${boats.picture}">
                                      <h3>Price: ${boats.price}</h3>
                                      <h3>Details ${boats.description}</h3>
                                      </div>`)
                        })
                    }
            });
    });
