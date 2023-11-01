//create web server
//get express module
const express = require('express');
//create express app
const app = express();
//get http module
const http = require('http');
//create http server
const server = http.createServer(app);
//get socket.io module
const io = require('socket.io')(server);
//get path module
const path = require('path');
//get fs module
const fs = require('fs');
//get moment module
const moment = require('moment');
//get mysql module
const mysql = require('mysql');
//get body-parser module
const bodyParser = require('body-parser');

//create connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  database: 'comments',
  password: 'root',
  port: 8889
});

//use body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//use static files
app.use(express.static(path.join(__dirname, 'public')));

//set view engine
app.set('view engine', 'ejs');

//set views directory
app.set('views', path.join(__dirname, 'views'));

//set port
app.set('port', process.env.PORT || 3000);

//get index page
app.get('/', (req, res) => {
  res.render('index');
});

//get comments page
app.get('/comments', (req, res) => {
  res.render('comments');
});

//get comments from database
app.get('/get-comments', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query('SELECT * FROM comments', (err, rows) => {
      connection.release(); // return the connection to pool
      if (err) throw err;
      res.send(rows);
    });
  });
});

//post comment to database
app.post('/post-comment', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(
      'INSERT INTO comments SET ?',
      {
        name: req.body.name,
        comment: req.body.comment,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      (err, rows) => {
