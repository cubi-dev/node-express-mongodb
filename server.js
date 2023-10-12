const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const http = require("http");
const app = require("./index");
const hostname = "localhost";
const port = 5000 || process.env.PORT;
// MONGODB
const DB = process.env.DATABASE_LOCAL;
// Check env
// console.log(app.get('env'));
// console.log(process.env);
// Connect MongoDB
mongoose
  .connect(DB, {
    //hosted DB version (deal with deprecate)
    useNewUrlParser: true,
  })
  .then((con) =>
    console.log("DB_local connection successful\n" + con.connections)
  );
// 1. Create server
const server = http.createServer(app);
// 2. Start server
server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
