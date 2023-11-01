//Create a web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./model/comments');
var cors = require('cors');
var port = 3000;
var router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mean-angular5', { useNewUrlParser: true });

// Added check for DB connection
if(!mongoose.connection){
    console.log("Error connecting db");
}
else{
    console.log("Db connected successfully");
}

//
