'use strict';

$(document).ready(function () {

    var getBoats = document.getElementById('boatDock');
    // var boatsURL = `https://tiyagencyweek.herokuapp.com/boats`

    $.ajax({
        method: "GET",
        url: 'https://tiyagencyweek.herokuapp.com/boats',
        success: function success(results) {
            console.log(results);

            // Loop over our array to get access to each day.
            results.boats.forEach(function (boats) {
                console.log(boats);

                var priceFormat = boats.price.formatMoney(2, '.', ',');

                // Put the search results info into our page.
                $("#boatDock").append('\n                  <div class="container boatBlock">\n                       <div class="row">\n                            <div class="boatSlip col-md-5">\n                                  <div class="boatImage">\n                                      <img class="boat-photos" src="' + boats.picture + '">\n                                  </div>\n                            </div>\n                            <div class="boat col-md-7">\n                                <div class="boatSale">\n                                    <h3 class="boat-name">' + boats.name + '</h3>\n                                    <h3 class="boat-details">Details ' + boats.description + '</h3>\n                                    <h3 class="boat-price">$ ' + priceFormat + '</h3>\n                                </div>\n                            </div>\n                      </div>\n                  </div>\n                ');
            });
        }
    });
});

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};