//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");
const User = require("./models/doctor/user");
const router = require("./routes");


require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./"));

connectDB()
app.use("/", router);


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
