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

mongoose.connect(
  "mongodb+srv://admin:Pragana987@cluster0-pxfgd.azure.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);
mongoose.set("useCreateIndex", true);

requireDir("./src/models");

app.use(require("./src/routes"));

app.listen(3001);
