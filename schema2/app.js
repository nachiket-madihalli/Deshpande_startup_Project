//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//
// const ejsLint = require('ejs-lint');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/css",express.static(__dirname + "public/css"))
app.use("/img",express.static(__dirname + "public/img"))


mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const petSchema = new mongoose.Schema({
  name:String,
  species:String,
  breed:String,
  dob:String,
  address:String
});
const Pet = mongoose.model("Pet",petSchema);


const ownerSchema = new mongoose.Schema({
  name:String,
  password:String,
  email:String,
  phone:Number,
  status:Boolean,
  mypet:petSchema
});
const Owner=mongoose.model("Owner",ownerSchema);



const assignTimeSchema= new mongoose.Schema({
  time : Date
});
const AsignTime = mongoose.model("asignTime",assignTimeSchema);


const vetSchema = new mongoose.Schema({
  name:String,
  password:String,
  email:String,
  specialist:String,
  timeSlot: assignTimeSchema
});
const Vet = mongoose.model("vet",vetSchema);


const appointmentSchema = new mongoose.Schema({
  petID:String,
  petName:String,
  petDisease:String,
  petSpecies:String,
  appTime:assignTimeSchema
});
const Appointment = mongoose.model("appointment",appointmentSchema);
// edit by nachiket
// nachiket
app.get("/",function(req,res){
  res.render("home2")
});
app.get("/contact",function(req,res){
  res.render("contact")
});
app.get("/ngo",function(req,res){
  res.render("ngo")
});

app.get("/login", function(req, res) {
  res.render("login")
});
app.get("/about", function(req, res) {
  res.render("about")
});
app.get("/product", function(req, res) {
  res.render("product")
});
app.get("/loout", function(req, res) {
  res.render("home2")
});
app.post("/registero",function(req,res){
  const newUser=new Owner({
    email:req.body.username,
    password:req.body.password,
    phone:req.body.phone,
    name:req.body.name
  });
  newUser.save(function (err) {
    if(err){
      console.log(err);
    }
    else {
      res.render("home2")
      console.log("suceesful register");
    }
  });
});
var username;
app.post("/login",function(req,res){
 username  =req.body.username;
const password=req.body.password;
  Owner.findOne({email:username},function (err,foundUser) {
    if (err) {
      console.log(err);
    } else {
      if(foundUser){
        if(foundUser.password==password){
          res.render("dash")
          console.log(foundUser);
        }
      }
    }
  });
});
// edit
app.get("/dash",function(req,res){
  Owner.find({email:username}, function(err, foundItems){
      res.render("dash", { Email:username});
      console.log(foundItems);
  });
});

app.get("/user",function(req,res){
  Owner.find({email:username}, function(err, foundItems){
      res.render("users", { newListItems: foundItems});
  });
});

app.get("/vet",function(req,res){
  Vet.find({},function(err,foundItems){
    res.render("vet", { newListItems: foundItems});
  });
});


app.get("/vetAppointment",function(req,res){
  Appointment.find({},function(err,foundItems){
    res.render("vetAppointment", { newAppointments: foundItems});
  });
});

app.get("/userAppointment",function(req,res){
  AsignTime.find({},function(err,foundItems){
    res.render("userAppointment", { newAppointments: foundItems});
  });
});



app.post("/vet",function(req,res){
  const scheduleTime = req.body.newTime;

  const asignTime = new AsignTime({
    time : scheduleTime
  });

  const vet = new Vet({
    _id:asignTime._id,
    name:"Dr Jason",
    email:"dejson@gmail.com",
    timeSlot:{
      _id:asignTime._id,
      time:scheduleTime
    }
  });
  asignTime.save();
  vet.save();
  res.redirect("/vet")
});

app.post("/user",function(req,res){
  const petId = req.body.newId;
  const petName = req.body.newName;
  const petSpecies = req.body.newSpecies;
  const petBreed = req.body.newBreed;
  const petDob = req.body.newDob;
  const petAddress = req.body.newAddress;


  const owner = new Owner({
    email:username,
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

app.post("/userAppointment",function(req,res){
  const petId = req.body.petId;
  const petName = req.body.petName;
  const petSpecies = req.body.petSpecies;
  const petDisease = req.body.petDisease;
  const appDate = req.body.appoint;
  const id = req.body.id;
  console.log(id);

  AsignTime.findByIdAndRemove(id, function(err){
    if(!err){
      console.log("Successfully deleted checked item");
    }
  });
  Vet.findByIdAndRemove(id, function(err){
    if(!err){
      console.log("Successfully deleted checked item");
    }
  });
  const appointment = new Appointment({
    petID:petId,
    petName:petName,
    petDisease:petDisease,
    petSpecies:petSpecies,
    appTime: {
      time:appDate
    }
  });
  Owner.update({name:"John"},{$set:{status:true}});
  appointment.save();
  res.redirect("/userAppointment")
});


app.post("/vetAppointment",function(req,res){

  const appTime = req.body.newTime;

  const asignTime = new AsignTime({
      time : appTime
  });
  asignTime.save();
  res.redirect("/vetAppointment")
});


app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;

  Owner.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfully deleted checked item");
      res.redirect("/user");
    }
  });
});

app.post("/vetDelete",function(req,res){
  const checkedItemId = req.body.checkbox;
  Appointment.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfully deleted checked item");
    }
  });

  AsignTime.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfully deleted checked item");
    }
  });

  Vet.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfully deleted checked item");
    }
  });
  Owner.update({name:"John"},{$set:{status:false}});
  res.redirect("/vetAppointment");
});

app.post("/appointmentDelete",function(req,res){
  const checkedItemId = req.body.checkbox;
  AsignTime.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfully deleted checked item");
    }
    else {
      console.log(err);
    }
  });

  Vet.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfully deleted checked item");
    }
    else {
      console.log(err);
    }
  });
  res.redirect("/vet");
});

// app.post("/userTime",function(req,res){
//   const checkedItemId = req.body.appoint;
//   AsignTime.deleteOne({time:checkedItemId}, function(err){
//     if(!err){
//       console.log("Successfully deleted checked item");
//       res.redirect("/vetAppointment");
//     }
//   });
// });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
