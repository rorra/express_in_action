const http = require("http");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/new-entry", (request, response) => {
  response.render("new-entry");
});

app.post("/new-entry", (request, response) => {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }

  entries.push({
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });

  response.redirect("/");
});

app.use((request, response) => {
  response.status(404).render("404");
});

http.createServer(app).listen(3000, () => {
  console.log("Guestbook app started on port 3000");
});
