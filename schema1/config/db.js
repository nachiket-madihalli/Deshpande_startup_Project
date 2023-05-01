const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb://localhost:27017/hoDB", {useNewUrlParser: true});

    console.log(`MonogoDB Connected : ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
