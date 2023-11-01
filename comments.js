//Create web server
const express = require('express');
//Create router object
const router = express.Router();
//Load comment model
const Comment = require('../models/Comment');
//Load post model
const Post = require('../models/Post');
//Load user model
const User = require('../models/User');
//Load passport
const passport = require('passport');

// @route    GET api/comments/test
// @desc     Tests comments route
// @access   Public
router.get('/test', (req, res) => res.json({ msg: 'Comments Works' }));

// @route    POST api/comments
// @desc     Create comment
// @access   Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Validation
    const { errors, isValid } = validateCommentInput(req.body);

    //Check validation
    if (!isValid) {
      //If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.body.postId)
      .then(post => {
        const newComment = new Comment({
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
          post: req
        });
      )
)
