const express = require("express");
const app = express();

//Middlewares
app.use(express.json());

//ROUTES
app.use("/", require("./routes/authRoute"));
app.use("/", require("./routes/userRoute"));
app.use("/", require("./routes/postRoute"));
app.use("/", require("./routes/commentRoute"));

module.exports = app;
