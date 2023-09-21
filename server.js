const http = require("http");
const app = require('./index')
const hostname = "localhost";
const port = 5000;
// 1. Create server
const server = http.createServer(app);
// 2. Start server
server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});