const mongoose = require("mongoose");


const ownerSchema = new mongoose.Schema({
  name:String,
  password:String,
  email:String,
  phone:Number,
  mypet:{
    name:String,
    species:String,
    breed:String,
    dob:String,
    address:String
  }
});
const Owner=mongoose.model("Owner",ownerSchema);

module.exports = Owner;
