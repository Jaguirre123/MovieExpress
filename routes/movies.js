var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/moviesController');

router.get('/', moviesCtrl.nowShowing);
router.get('/:id', moviesCtrl.getMovie);
router.get('/favorite/:id', moviesCtrl.addFavorite);
router.delete('/favorites/:id', moviesCtrl.delFavorite);
router.post('/:id', moviesCtrl.addComment);

module.exports = router;