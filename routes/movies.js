var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/moviesController');

router.get('/', moviesCtrl.nowShowing);
router.get('/search', moviesCtrl.searchMovies);
router.get('/recs', isLoggedIn, moviesCtrl.recs);
router.get('/:id', isLoggedIn, moviesCtrl.getMovie);
router.get('/favorites/:id', isLoggedIn, moviesCtrl.addFavorite);
router.delete('/favorites/:id', isLoggedIn, moviesCtrl.delFavorite);
router.post('/:id/comments', isLoggedIn, moviesCtrl.addComment);
router.delete('/:apiId/comments/:id', isLoggedIn, moviesCtrl.delComment);;;

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;