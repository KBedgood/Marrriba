$(document).ready(() => {
  $.ajax({
    method: 'GET',
    url: 'https://tiyagencyweek.herokuapp.com/boats',
    success: results => {
      const boatsElem = document.getElementById('boat-data-goes-here');
      let boatsHTML = ``;

      results.boats.forEach(boat => {
        const formattedPrice = boat.price.formatMoney(2, '.', ',');
        boatsHTML += `
          <article class="boat row">
            <img class="picutre col-md-5" src="${boat.picture}" />
            <div class="information col-md-7">
              <h1>${boat.name}</h1>
              <div class="price">$${formattedPrice}</div>
              <p>${boat.description}</p>
            </div>
          </article>`;
      });

      boatsElem.innerHTML = boatsHTML;
      return boatsHTML;
    }
  });
});


Number.prototype.formatMoney = function(c, d, t) {
  var n = this,
      c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
