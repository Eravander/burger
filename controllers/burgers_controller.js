var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  burger.insertOne([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function() {
    res.redirect("/");
  });
});

router.post('/api/burgers/:id', function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition)

  burger.updateOne({
    devoured: true
  }, condition, function(data) {
    if (res.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.redirect("/");
      // res.redirect('/');
      // reload();
    }
  });
});

module.exports = router;