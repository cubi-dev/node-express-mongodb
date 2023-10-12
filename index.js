const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const nationRouter = require("./route/nationRouter");
const playerRouter = require("./route/playerRouter");
const morgan = require("morgan");

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(bodyParser.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
// middleware to access static file (HTML/CSS/JS)
app.use(express.static('./public'));
// middleware custom
app.use((req, res, next) => {
  console.log('Hello form the middleware this is mi-xao-bo 🙋‍♂️');
  next();
});
// LOG
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// ROUTE FOR NATION
app.use("/nations", nationRouter);
// ROUTE FOR PLAYER
app.use("/players", playerRouter);

// EXPORT
module.exports = app;
