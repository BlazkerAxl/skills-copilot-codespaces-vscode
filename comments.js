//Create a web server
const express = require('express');
const app = express();
const port = 3000;

// Use the express.static built-in middleware function to serve static files
app.use(express.static('public'));

// Use the express.urlencoded() built-in middleware function to parse urlencoded bodies
app.use(express.urlencoded({ extended: true }));

// Use the express.json() built-in middleware function to parse json bodies
app.use(express.json());

// Use the express.text() built-in middleware function to parse text bodies
app.use(express.text());

// Use the express.raw() built-in middleware function to parse raw bodies
app.use(express.raw());

// Use the express.static() built-in middleware function to serve static files
app.use(express.static('public'));

// Use the express.Router() class to create modular, mountable route handlers
const router = express.Router();

// Use the router.use() function to load middleware functions
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// Use the router.get() function to handle GET requests
router.get('/', function(req, res) {
    res.send('GET request to the homepage');
});

// Use the router.post() function to handle POST requests
router.post('/', function(req, res) {
    res.send('POST request to the homepage');
});

// Use the router.put() function to handle PUT requests
router.put('/', function(req, res) {
    res.send('PUT request to the homepage');
});

// Use the router.delete() function to handle DELETE requests
router.delete('/', function(req, res) {
    res.send('DELETE request to the homepage');
});

// Use the router.all() function to handle all HTTP methods and requests
router.all('/', function(req, res) {
    res.send('HTTP methods and requests');
});

// Use the router.param() function to handle parameters
router.param('id', function(req, res, next, id) {
    console.log('CALLED ONLY ONCE');
    next();
});

// Use the router.route() function to handle multiple routes