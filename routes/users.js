var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/usersController');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', usersCtrl.getUser);

module.exports = router;
