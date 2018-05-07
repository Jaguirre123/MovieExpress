var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/moviesController');

router.get('/', moviesCtrl.nowShowing);
router.get('/:id', moviesCtrl.getMovie);

module.exports = router;