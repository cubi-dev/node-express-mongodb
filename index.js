const express = require("express");
const bodyParser = require('body-parser')
const nationRouter = require('./route/nationRouter')
const playerRouter = require('./route/playerRouter')
const morgan = require("morgan");


const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(bodyParser.json())
app.use(morgan('dev'));
// LOG
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// ROUTE FOR NATION
app.use('/nations', nationRouter);
// ROUTE FOR PLAYER
app.use('/players', playerRouter);

// EXPORT 
module.exports = app;

