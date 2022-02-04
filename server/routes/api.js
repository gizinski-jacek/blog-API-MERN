const express = require('express');
const router = express.Router();
const passport = require('passport');

const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

/* Redirect to all posts. */
router.get('/', function (req, res, next) {
	res.redirect('/posts');
});

/////
/* GET logged in user */
router.use('/authUser', user_controller.auth_user);

/* POST log in */
router.post('/log-in', user_controller.log_in_user);

/* POST log out */
router.post('/log-out', user_controller.log_out_user);

/* POST sign up user */
router.post('/sign-up', user_controller.sign_up_user);

/////
/* GET all authors */
router.get('/authors', user_controller.get_user_list);

/* GET all posts */
router.get('/posts', post_controller.get_all_posts);

/* GET few preview posts */
router.get('/posts/preview', post_controller.get_preview_posts);

/* POST new post */
router.post(
	'/posts/create',
	passport.authenticate('jwt', { session: false }),
	post_controller.create_post
);

/* GET user's posts */
router.get(
	'/posts/user/:userid',
	passport.authenticate('jwt', { session: false }),
	post_controller.get_user_posts
);

/* GET single post */
router.get('/posts/:postid', post_controller.get_single_post);

/* PUT update a post */
router.put(
	'/posts/:postid',
	passport.authenticate('jwt', { session: false }),
	post_controller.update_post
);

/* DELETE delete a post */
router.delete(
	'/posts/:postid/',
	passport.authenticate('jwt', { session: false }),
	post_controller.delete_post
);

/* PUT publish a post */
router.put(
	'/posts/:postid/publish',
	passport.authenticate('jwt', { session: false }),
	post_controller.publish_post
);

/* PUT unpublish a post */
router.put(
	'/posts/:postid/unpublish',
	passport.authenticate('jwt', { session: false }),
	post_controller.unpublish_post
);

/////
/* GET all post comments */
router.get('/posts/:postid/comments', comment_controller.get_all_post_comments);

/* POST new comment */
router.post(
	'/posts/:postid/comments',
	passport.authenticate('jwt', { session: false }),
	comment_controller.create_comment
);

/* PUT update comment */
router.put(
	'/posts/:postid/comments/:commentid',
	passport.authenticate('jwt', { session: false }),
	comment_controller.update_comment
);

/* DELETE delete comment */
router.delete(
	'/posts/:postid/comments/:commentid',
	passport.authenticate('jwt', { session: false }),
	comment_controller.delete_comment
);

module.exports = router;
