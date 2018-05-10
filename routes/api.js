var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/apiController');

router.get('/movies/ranking', apiCtrl.ranking);


module.exports = router;