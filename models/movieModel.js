const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    movieTitle: String,
    movieYear: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;