const express = require("express");
const app = express();

//Middlewares
app.use(express.json());

app.use("/", require("./routes/auth.route"));

module.exports = app;
