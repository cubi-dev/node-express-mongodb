const http = require("http");
const express = require("express");
const hostname = "localhost";
const port = 5000;
const nationRouter = require('./routes/nationRouter')
const playerRouter = require('./routes/playerRouter')

const app = express();
// ROUTE FOR NATION
app.use('/nations', nationRouter);
// ROUTE FOR PLAYER
app.use('/players', playerRouter);
//MIDDLEWARE
app.use(express.json());


// 1. Create server
const server = http.createServer(app);
// 2. Start server
server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
