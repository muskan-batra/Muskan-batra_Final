const express = require("express");
const dotenv = require("dotenv").config();
const bookRoutes = require("./src/routes/routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const fileUpload = require("express-fileupload");
const path= require('path')

const PORT = process.env.PORT || 3002;
const app = express();

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, () => {
  console.log("connected to mongoo db");
});

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: "MYSECRETKEY" }));
app.use(fileUpload());
app.use("/", bookRoutes);
app.use(express.static(path.join(__dirname,"public")))

app.listen(PORT, () => {
  
  console.log("app is running on port " + PORT);
});
