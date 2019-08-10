const express = require("express");
const upload = require("./upload");
const cors = require("cors");

const server = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

server.post("/upload", upload);

server.post("/form", async (req, res) => {
  console.log(req.body.data);
  await res.status(200).json({
    authenticated: false,
    message: "Account already exists "
  });
});

server.listen(8000, () => {
  console.log("Server started!");
});
