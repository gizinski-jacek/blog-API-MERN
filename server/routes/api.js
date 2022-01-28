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
/* GET logged in user */
router.get('/authUser', user_controller.auth_user);

/* POST log in */
router.post('/log-in', user_controller.log_in_user);

/* POST log out */
router.post('/log-out', user_controller.log_out_user);

/* POST sign up user */
router.post('/sign-up', user_controller.sign_up_user);

/////
/* POST new post */
router.post('/dashboard/create', verifyToken, post_controller.create_post);

/* GET user's post */
router.get('/dashboard/:postid', verifyToken, post_controller.update_post);

/* PUT update a post */
router.put(
	'/dashboard/:postid/update',
	verifyToken,
	post_controller.update_post
);

/* DELETE delete a post */
router.delete(
	'/dashboard/:postid/delete',
	verifyToken,
	post_controller.delete_post
);

/* PUT publish a post */
router.put(
	'/dashboard/:postid/publish',
	verifyToken,
	post_controller.publish_post
);

/* PUT unpublish a post */
router.put(
	'/dashboard/:postid/unpublish',
	verifyToken,
	post_controller.unpublish_post
);

/////
/* GET all posts */
router.get('/posts', post_controller.get_all_posts);

/////
/* GET all comments */
router.get('/comments', comment_controller.get_all_comments);

/* POST new comment */
router.post(
	'/posts/:postid/comments',
	verifyToken,
	comment_controller.create_comment
);

/* PUT update comment */
router.put(
	'/posts/:postid/comments/:commentid',
	comment_controller.update_comment
);

/* DELETE delete comment */
router.delete(
	'/posts/:postid/comments/:commentid',
	comment_controller.delete_comment
);

module.exports = router;
