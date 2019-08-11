const express = require("express");
const port = 4000;
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const upload = require("./upload");
const updateInfo = require("./routes/uploadInfo");
require("dotenv").config();
require("express-session");

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log("connected to mongo db");
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "*", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

app.post("/upload", upload);

app.use("/api/", updateInfo);

app.listen(port, () => console.log(`Server is running on port ${port}!`));

module.exports = app;
