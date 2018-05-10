var Movie = require('../models/movie');
var User = require('../models/user');

function ranking(req, res) {
    User.find({})
    .then(function(users){
        var favorites = [];
        users.forEach(u => favorites = favorites.concat(u.favorites));
        var favCount = favorites.reduce((acc, f) => {
            var id = f.toString();
            acc[id] = acc[id] ? ++acc[id] : 1;
            return acc; 
        }, {});
        Movie.find({_id: {$in: Object.keys(favCount)}})
            .then(function(movies){
                var results = Object.keys(favCount).map(id => ({
                    count: favCount[id],
                    movie: movies.find(m => m._id.equals(id))
                }));
                results.sort((a, b) => b.count - a.count);
                res.status(200).json(results);
            });
    });
}

module.exports = {
    ranking 
};