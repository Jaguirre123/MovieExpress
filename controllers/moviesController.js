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
    var id = req.params.apiId
    Movie.findOne({apiId: id}, function(err, movie) {
        if (!movie) {
            movieApiUtil(id, function(err, res, body) {
                let movie=new Movie({
                    title: body.title,
                    poster: body.poster_path, 
                    apiId: id,
                })
                movie.save(function(err){
                    req.user.favorites.push(movie); 
                    req.user.save();
                    res.redirect('/');
                });
            })
        } else {
            req.user.favorites.push(id);
            req.user.save();
        }
    })
};

function movieApiUtil(apiId, cb) {
    request(
        `${rootURL}movie/${apiId}?api_key=${process.env.API_KEY}`,
        function (err, response, body) {
            cb(err, response, body);
        }
    )
};

module.exports = {
    nowShowing,
    getMovie
}