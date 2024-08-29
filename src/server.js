require("dotenv").config();
require("./config/db");
const app = require("./app");
const swaggerDocs = require("../swagger");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
  swaggerDocs(app, PORT);
});
