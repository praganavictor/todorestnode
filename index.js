require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");
// const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);

requireDir("./src/models");

app.use(require("./src/routes"));

app.listen(process.env.PORT || 3001);
