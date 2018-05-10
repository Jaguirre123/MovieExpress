var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/apiController');

router.get('/movies/ranking', apiCtrl.ranking);
router.get('/movies', apiCtrl.getAllMovies);
router.get('/movies/:id', apiCtrl.getComment);


module.exports = router;