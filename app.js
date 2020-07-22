const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// Routes
const bookRoutes = require("./routes/books");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/books", bookRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
