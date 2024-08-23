const express = require("express");
const app = express();

//Middlewares
app.use(express.json());

//ROUTES
app.use("/", require("./routes/authRoute"));
app.use("/", require("./routes/userRoute"));

module.exports = app;
