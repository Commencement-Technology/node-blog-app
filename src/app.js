const express = require("express");
const app = express();

//Middlewares
app.use(express.json());

app.use("/", async (req, res) => {
  res.send("Hello Blog App!");
});

module.exports = app;
