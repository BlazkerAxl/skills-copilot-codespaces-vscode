//create web server
//create web server
const express = require("express");
const app = express();
//import the database connection
const db = require("./db");

//import the model
const Comment = require("./models/comment");

//import the router
const router = require("./routes/comments");

//import the cors library
const cors = require("cors");

//configure cors
app.use(cors());

//configure express to use json
app.use(express.json());

//use the router
app.use("/comments", router);

//create the home route
app.get("/", (req, res) => {
    res.send("Welcome to the comments API!");
});

//configure port number
const port = process.env.PORT || 3000;

//create the server
app.listen(port, () => console.log(`Listening on port ${port}...`));