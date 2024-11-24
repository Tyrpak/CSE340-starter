const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<div id="inv-display">'
    grid += '<ul>'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
    grid += '</div>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the inventory item view HTML
* ************************************ */
Util.buildInventoryItemGrid = async function(data){
  let grid
  if(data.length > 0){
    data.forEach(vehicle => { 
    grid = '<div id="inv-item-display">'
      grid += '<div id="inv-item-left">'
        grid += '<div class="name">'
        grid += '<h1>' 
        + vehicle.inv_year + ' ' + vehicle.inv_make + ' ' + vehicle.inv_model
        grid += '</h1>'
        grid += '</div>'

        grid += '<div class="price">'
        grid += '<h2>Price: $' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price)
        grid += '</h2>'
        grid += '</div>'

        grid += '<div class="mileage">'
        grid += '<p>Mileage: ' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_miles)
        grid += '</p>'
        grid += '</div>'
        grid += '<div class="description">'
        grid += '<p>' + vehicle.inv_description + '</p>'
        grid += '</div>'
      grid += '</div>'
      grid += '<div id="inv-item-right">'    
        grid +=  '<img src="' + vehicle.inv_image 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" />'
      grid += '</div>'
    grid += '</div>'
    })
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}




/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util