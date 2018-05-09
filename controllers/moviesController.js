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
    getOrCreateMovie(req.params.id)
        .then(function(movie) {
            movie.populate('comments.user', function(err) {
                res.render('movies/show', {movie: movie, user: req.user});
            });
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
                res.redirect(`/users/${req.user._id}`);
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
        movie.comments.push({content: req.body.content, user: req.user._id});
        movie.save(function() {
            res.redirect(`/movies/${movie.apiId}`);
        });
    })
    .catch(err => console.log(`error is: ${err}`));
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
                        poster_path: movieData.poster_path, 
                        apiId,
                        overview: movieData.overview, 
                        vote_average: movieData.vote_average,                      
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

function searchMovies(req, res) {
    request(
        `${rootURL}search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${req.query.search}&include_adult=false`,
        function(err, response, body) {
            res.render('movies/results', {movies: JSON.parse(body).results, user: req.user});
        }
    )
}

function getUpcoming(req, res) {
    console.log('its hittin it!')
    request(
        rootURL + 'movie/upcoming?api_key=' + process.env.API_KEY + '&language=en-US', 
        function(err, response, body){
            res.render('movies/index', {upcomingMovies: JSON.parse(body).results, user: req.user});
        }
    )  
}
function recs(req, res) {
    User.find({_id: {$ne: req.user._id}})
    .where("favorites").in(req.user.favorites)
    .exec()
    .then(function(users) {
        var promises = [];
        users.forEach(function(u) {
            u.common = u.favorites.filter(f => req.user.favorites.some(uf => uf.equals(f)));
            u.recs = u.favorites.filter(f => !u.common.some(c => c.equals(f)));
            promises.push(u.populate('common recs').execPopulate());
        }); 
        Promise.all(promises).then(function() {
            users.sort(function(a, b) {
                return b.common.length - a.common.length; 
            });
            res.render('movies/recs', {users, user: req.user});
        });
    });
};

module.exports = {
    nowShowing,
    getMovie, 
    movieApiUtil,
    addFavorite,
    delFavorite, 
    addComment,
    searchMovies,
    getUpcoming, 
    recs
}