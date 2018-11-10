const express = require("express");
const logger = require("morgan");
const path = require("path");
const http = require("http");

const app = express();

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use(logger("short"));

app.use((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello world!");
});

http.createServer(app).listen(3000);
