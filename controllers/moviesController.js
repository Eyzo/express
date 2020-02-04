const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel')


//Listing des films
router.get('/',(req,res) => {
    var movies = [];

    Movie.find((err,datas) => {
        if (err) {
            console.log('erreur :' + err.message);
        } else {
            movies = datas;
            res.render('movies/page/list.twig',{
                'movies': movies
            });
        }
    });
});

//Formulaire d'ajout film
router.get('/form',(req,res) => {
   res.render('movies/form/add.twig');
});

//Traitement du formulaire d'ajout
router.post('/form',(req,res) => {
   if (req.body) {
       var movie = new Movie({
           title: req.body.title,
           synopsis: req.body.synopsis,
           image: req.body.image,
           year: req.body.year,
           rate: req.body.rate
       });
       movie.save((err,movie) => {
            if (err) {
                console.log('erreur :' + err.message);
            } else {
                res.redirect('/movies/form');
            }
       });
   }
});

//Formulaire d'edition
router.get('/:id/edit',(req,res) => {
    var id = req.params.id;
    Movie.findById(id, (err,movie) => {
        if (err) {
            res.redirect('/movies');
        }
        res.render('movies/form/edit.twig', {
            'movie': movie
        });
    });
});

//Traitement formulaire d'edition
router.post('/:id/edit',(req,res) => {
    var id = req.params.id;
    Movie.findByIdAndUpdate(id,{$set: {
                title: req.body.title,
                synopsis: req.body.synopsis,
                image: req.body.image,
                year: req.body.year,
                rate: req.body.rate  }},{},
        (err,movie) => {
            if (err) {
                console.log(err);
                res.redirect('/movies')
            } else {
                res.redirect('/movies');
            }
        });
});

//Suppression
router.delete('/:id/delete',(req,res) => {
    var id  = req.params.id;
    Movie.findByIdAndRemove(id,{}, (err,success) => {
        if (err) {
            res.status(500);
        } else {
            res.status(200);
        }
        res.send();
    });
});

//Vue unique d'un film
router.get('/:id',(req,res) => {
    var id = req.params.id;
    Movie.findById(id, (err,movie) => {
        if (err) res.redirect('/movies');
        res.render('movies/page/single.twig',{
           'movie': movie
        });
    });
});

module.exports = router;