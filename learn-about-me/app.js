const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const session = require("express-session");

const setUpPassport = require("./setuppassport");
const routes = require("./routes");
const app = express();

mongoose.connect("mongodb://localhost:27017/test");
setUpPassport();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "3dd2v7gsl8pY5LA5i8fNZe6aEiUHku6OqBv2y8OZ",
  resave: true,
  saveUnitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), () => {
  console.log(`Server started on port ${app.get("port")}`);
});
