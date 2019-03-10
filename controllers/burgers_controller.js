var express = require("express");

var router = express.Router();

//Import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");

//set default route for pulling initial list from DB
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      res.render("index", hbsObject);
    });
  });
  
  //Post new burger to list
  router.post("/burgers", function(req, res) {
    burger.insertOne([
      "burger_name"
    ], [
      req.body.burger_name
    ], function(data) {
      res.redirect("/");
    });
  });
  
  //update the burger from not devoured to devoured 
  router.put("/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("Burger ID: ", condition);
  
    burger.updateOne({
      devoured: true
    }, condition, function(data) {
      res.redirect("/");
    });
  });
  
  // Export routes for server.js
  module.exports = router;