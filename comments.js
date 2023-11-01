//create web server
const express = require("express");
const app = express();

//import mongoose
const mongoose = require("mongoose");

//import body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//import cors
const cors = require("cors");
app.use(cors());

//import model
const commentModel = require("./models/Comment");

//connect to database
mongoose
  .connect("mongodb://localhost:27017/comments", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(`error connecting to database ${err}`));

//create routes
app.post("/comment", (req, res) => {
  const comment = new commentModel({
    name: req.body.name,
    comment: req.body.comment,
  });
  comment
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(`error saving to database ${err}`));
});

app.get("/comments", (req, res) => {
  commentModel
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(`error fetching from database ${err}`));
});

//create port
const port = 5000;
app.listen(port, () => console.log(`server running on port ${port}`));