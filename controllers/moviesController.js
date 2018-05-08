// We have to make requests on the backend (controllers) not the views(ejs) because CORS bullshit, they dont trust the info on the frontend.
// var nowPlaying = the response from that thing ^^
// make get request blah blah nowPlaying.forEach(movie => <div>movie.title</div>)
var request = require('request');
var Movie = require('../models/movie');
var User = require('../models/user');
// var imgRootURL = 'https://image.tmdb.org/t/p/w500/';
var rootURL = 'https://api.themoviedb.org/3/';

function nowShowing(req, res) {
    request(
        rootURL + 'movie/now_playing?api_key=' + process.env.API_KEY, 
        function(err, response, body){
            res.render('movies/index', {movies: JSON.parse(body).results, user: req.user});
        }
    )   
};

function getMovie(req, res) {
    movieApiUtil(req.params.id, function(err, response, body) {
        res.render('movies/show', {movie: JSON.parse(body), user: req.user});
    });
}

function addFavorite(req, res) {
    getOrCreateMovie(req.params.id)
        .then(function(movie) {
            movie.users.push(req.user._id);
            movie.save();
                if (req.user.favorites.indexOf(movie._id) === -1) { 
                req.user.favorites.push(movie._id);
                req.user.save();
            res.redirect('/');
        };
    })
}

function delFavorite(req, res) {
        req.user.favorites.remove(req.params.id)
        req.user.save(function(err) {
        res.redirect(`/users/${req.user._id}`);
    });
}
function addComment(req, res) {
    getOrCreateMovie(req.params.id)
    .then(function(movie) {
        let comment = new Comment(req.body);
        movie.comments.push(comment)
        movie.save();
        req.user.push(user._id);
        res.render('/:id');
    });
    }

function movieApiUtil(apiId, cb) {
    request(
        `${rootURL}movie/${apiId}?api_key=${process.env.API_KEY}`,
        function (err, response, body) {
            cb(err, response, body);
        }
    )
};

function getOrCreateMovie(apiId) {
    return new Promise(function(resolve, reject) {
        Movie.findOne({apiId: apiId}, function(err, movie) {
            if (!movie) {
                movieApiUtil(apiId, function(err, response, body) {
                    let movieData = JSON.parse(body);
                    let movie = new Movie({
                        title: movieData.title,
                        poster: movieData.poster_path, 
                        apiId,
                    });
                    movie.save(function(err) {
                        resolve(movie);
                    });
                })
            } else {
                resolve(movie);
            }
        });
    });   
}

module.exports = {
    nowShowing,
    getMovie, 
    movieApiUtil,
    addFavorite,
    delFavorite, 
    addComment
}