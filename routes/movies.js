var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/moviesController');

router.get('/', moviesCtrl.nowShowing);
router.get('/search', moviesCtrl.searchMovies);
router.get('/recs', moviesCtrl.recs);
router.get('/:id', moviesCtrl.getMovie);
router.get('/favorites/:id', moviesCtrl.addFavorite);
router.delete('/favorites/:id', moviesCtrl.delFavorite);
router.post('/:id/comments', moviesCtrl.addComment);
// router.delete('/:id/comments', moviesCtrl.delComment);
module.exports = router;