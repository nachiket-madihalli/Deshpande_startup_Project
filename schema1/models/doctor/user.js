const mongoose = require("mongoose");
const passportLocalMongoodse = require("passport-local-mongoose");


const vetSchema = new mongoose.Schema({
  name:String,
  password:String,
  email:String,
  specialist:String,
  appointment:{
    petId:String,
    Name:String,
    Disease:String,
    species:String,
    time:Date
  }
});

  vetSchema.plugin(passportLocalMongoodse);

  const Vet =new mongoose.model("vet",vetSchema);

module.exports = Vet;
