const express = require("express");
const helmet = require("helmet");
const projectRouter = require("../Routes/projectRouter");
const actionRouter = require("../Routes/actionRouter");
const cors = require("cors");
const server = express();

server.use(logger);
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send("Hello");
});

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  next();
}

module.exports = server;