const router = require('express').Router();
const Movie = require('../models/movieModel');
const faker = require('faker');
faker.locale = 'fr';

//Route Home
router.get('/',(req,res) => {
    res.render('main/index.twig');
});

module.exports = router;
