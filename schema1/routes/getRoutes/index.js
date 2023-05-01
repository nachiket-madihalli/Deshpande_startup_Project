let mongoose = require("mongoose");
const router = require("express").Router();

router.get("/user",function(req,res){
  Owner.find({}, function(err, foundItems){
      res.render("users", { newListItems: foundItems});
  });
});

router.get("/appointment",function(req,res){
  Vet.find({},function(err,foundItems){
    res.render(("appointment",{newDocDetails:foundItems}));
  });
});

module.exports = router;
