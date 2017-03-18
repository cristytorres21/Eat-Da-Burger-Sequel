var express = require("express");

var router = express.Router();
var db = require("../models/");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

// get route, match sequelize
router.get("/burgers", function(req, res) {

  // sequeize function that calls selectAll
  // promise structure .then... to catch errors .catch at end
  db.Burger.findAll({
    include: [db.Customer],
    // return burger in order by ascending burger_name
    order: [["burger_name", "ASC"]]
  }).then(function(dbBurger) {
  // pass burgers into main index, updating page
    var hbsObject = { burger: dbBurger };
    return res.render("index", hbsObject);
  });
});


// post route to add burger
router.post("/burgers/insert", function(req, res) {
  // add in a burger_name
  db.Burger.create({ 
    burger_name: req.body.burger_name
  }).then(function(dbBurger) {
    // log result in console
    console.log(dbBurger);
    // redirect to home page
    res.redirect("/");
  });
});

// put route to show burger, customer, status
router.put("/burgers/update", function(req, res) {
  // if there's a customer, create customer and give them devoured burger
  if (req.body.customer) {
    db.Customer.create({
      customer: req.body.customer,
      BurgerId: req.body.burger_id
    }).then(function(dbCustomer) {
      return db.Burger.update({
        devoured: true
      }, {
        where: {
          id: req.body.burger_id
        }
      });
    }).then(function(dbBurger) {
      // redirect to home page
      res.redirect("/");
    });
  }

  // if not customer, just update devoured status
  else {
    db.Burger.update({
      devoured: true
    }, {
      where: {
        id: req.body.burger_id
      }
    }).then(function(dbBurger) {
      // redirect to home page
      res.redirect("/");
    });
  }
}); 

module.exports = router;