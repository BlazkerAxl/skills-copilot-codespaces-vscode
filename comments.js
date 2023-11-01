//create web server
var express = require('express');
var app = express();
//create server
var server = require('http').createServer(app);
//create socket
var io = require('socket.io').listen(server);
//create array
users = [];
connections = [];

//server listen
server.listen(process.env.PORT || 3000);
console.log('Server running...');

//route
