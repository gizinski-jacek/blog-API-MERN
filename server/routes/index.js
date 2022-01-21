const express = require('express');
const router = express.Router();

/* Redirect to API. */
router.get('/', function (req, res, next) {
	res.redirect('/api');
});

module.exports = router;
