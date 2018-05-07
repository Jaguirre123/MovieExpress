var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/moviesController');

router.get('/movies', moviesCtrl.nowShowing);

module.exports = router;