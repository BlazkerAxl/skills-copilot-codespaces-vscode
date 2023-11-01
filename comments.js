//Create a web server
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

//Set up the database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true, useUnifiedTopology: true});

//Set up the schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

//Set up the model
const Comment = mongoose.model('Comment', commentSchema);

//Set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Set up the static files
app.use(express.static('public'));

//Set up the body parser
app.use(bodyParser.urlencoded({extended: true}));

//Set up the routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if(err){
            console.log(err);
        }else{
            res.render('comments', {comments: comments});
        }
    });
}
);

app.post('/comments', (req, res) => {
    Comment.create(req.body.comment, (err, newComment) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/comments');
        }
    });
}
);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
}
);
