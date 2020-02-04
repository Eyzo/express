const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: String,
    synopsis: String,
    image: String,
    year: Number,
    rate: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;