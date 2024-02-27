const express = require("express");
const logger = require("./util/error");
const connectDB = require("./config/dbConfig");
const bodyParser = require('body-parser')
const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;
const userRouter = require("./router/user");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// to read from api json data express
app.use(express.json());

connectDB();
app.get("/", (req, res ) => {
  res.json({message :"welcom to USER verify with otp "});
   
});
// Use the router for paths starting with /api
app.use("/api", userRouter);

//server
const server = app.listen(port, () => {
  logger.info(`Server is running on port http:localhost:${port}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    logger.error(`Port ${port} is already in use`);
  } else {
    logger.error("An error occurred while starting the server:", err);
  }
  process.exit(1);
});
