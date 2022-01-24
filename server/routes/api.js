const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');

const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

/* Redirect to all posts. */
router.get('/', function (req, res, next) {
	res.redirect('/posts');
});

/////
/* POST log in */
router.post('/log-in', user_controller.log_in_user);

/* POST log out */
router.post('/log-out', user_controller.log_out_user);

/* POST sign up user */
router.post('/sign-up', user_controller.sign_up_new_user);

/* GET logged in user */
router.get('/authUser', user_controller.check_user);

/////
/* POST new post */
router.post('/create', verifyToken, post_controller.create_post);

/* PUT user's post */
router.get('/dashboard/:postid', post_controller.update_post);

/* PUT update a post */
router.put('/dashboard/:postid', post_controller.update_post);

/* DELETE delete a post */
router.delete('/dashboard/:postid', post_controller.delete_post);

/////
/* GET all users */
router.get('/authors', user_controller.get_all_users);

/* GET one user */
router.get('/authors/:userid', user_controller.get_user);

/* PUT update a user */
router.put('/authors/:userid', user_controller.update_user);

/* DELETE delete a user */
router.delete('/authors/:userid', user_controller.delete_user);

/////
/* GET all posts */
router.get('/posts', post_controller.get_all_posts);

/* GET one post */
router.get('/posts/:postid', post_controller.get_post);

/////
/* GET all post's comments */
router.get('/posts/:postid/comments', comment_controller.get_all_comments);

/* GET one post's comment */
router.get(
	'/posts/:postid/comments/:commentid',
	comment_controller.get_comment
);

/* POST new post's comment */
router.post('/posts/:postid/comments', comment_controller.create_comment);

/* PUT update post's comment */
router.put(
	'/posts/:postid/comments/:commentid',
	comment_controller.update_comment
);

/* DELETE delete post's comment */
router.delete(
	'/posts/:postid/comments/:commentid',
	comment_controller.delete_comment
);

module.exports = router;
