"use strict";

$(document).ready(function () {

    var getBoats = document.getElementById('boatDock');
    // var boatsURL = `https://tiyagencyweek.herokuapp.com/boats`

    $.ajax({
        method: "GET",
        url: "https://tiyagencyweek.herokuapp.com/boats",
        success: function success(results) {
            console.log(results);

            // Loop over our array to get access to each day.
            results.boats.forEach(function (boats) {
                console.log(boats);

                // Put the search results info into our page.
                $("#boatDock").append("\n                                      <div class=\"boatDock col-md-3\">\n                                      <h3>Name: " + boats.name + "</h3>\n                                      <img class=\"boatPhotos\" src=\"" + boats.picture + "\">\n                                      <h3>Price: " + boats.price + "</h3>\n                                      <h3>Details " + boats.description + "</h3>\n                                      </div>");
            });
        }
    });
});