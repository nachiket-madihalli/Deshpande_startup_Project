const router = require("express").Router();
const User = require("../../models/doctor/user");
const passport = require("passport");
const Patient = require("../../models/patients/patient");


router.post("/user",function(req,res){
  const petId = req.body.newId;
  const petName = req.body.newName;
  const petSpecies = req.body.newSpecies;
  const petBreed = req.body.newBreed;
  const petDob = req.body.newDob;
  const petAddress = req.body.newAddress;



  const owner = new Owner({
    name:"John",
    email:"abcd@gmail.com",
    mypet:{
    name: petName,
    species:petSpecies,
    breed:petBreed,
    dob:petDob,
    address:petAddress
  }
  });
  owner.save()
  res.redirect("/user");
});

router.post("/appointment",function(req,res){

  const petId = req.body.newId;
  const petName = req.body.newName;
  const petDisease = req.body.newDisease;
  const petSpecies = req.body.newSpecies;
  const appTime = req.body.newTime;

  const vet = new Vet({
    name:String,
    email:String,
    specialist:String,
    appointment:{
      petId:petId,
      Name:petName,
      Disease:petDisease,
      species:petSpecies,
      time:appTime
    }
  });
  vet.save();
  res.redirect("/appointment")
});


router.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;

  Owner.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfully deleted checked item");
      res.redirect("/user");
    }
  });
});



module.exports = router;
