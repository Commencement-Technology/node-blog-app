const express = require("express");
const app = express();

//Middlewares
app.use(express.json());

//ROUTES
app.use("/", require("./routes/authRoute"));
app.use("/", require("./routes/userRoute"));
app.use("/", require("./routes/postRoute"));
app.use("/", require("./routes/commentRoute"));
app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

module.exports = app;
