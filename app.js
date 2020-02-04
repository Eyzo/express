//Importation des dépendances
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const Twig = require('twig');

Twig.extendFilter('resume', function(value, params) {
    var strReduce = value.substr(0,150);
    let lastSpace = strReduce.lastIndexOf(' ');
    strReduce.substr(0,lastSpace);
    return `${strReduce}...`;
});

Twig.extendFilter('slug', function(value,params) {
    var slug = value.toLowerCase();
    slug = slug.split(' ');
    slug = slug.join('-');
    return slug;
});

//Connection avec la bdd
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://****:*****@cluster0-nddx4.mongodb.net/maBase?retryWrites=true&w=majority', { useUnifiedTopology: true ,useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', () => {
   console.error.bind(console, 'connection error:');
});

db.on('open',() => {
   console.log('vous êtes connecté');
});

//Importation des controllers
const mainController = require('./controllers/mainController');
const moviesController = require('./controllers/moviesController');

const app = express();

//Ajout du middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Parametrage du moteur de template
app.set('twig_option', {
    allow_async: true,
    strict_variables: false
});

//Dossiers static de l'application
app.use('/img',express.static('./public/img'));
app.use('/css', express.static('./public/css'));
app.use('/js',express.static('./public/js'));
app.use('/vendor',express.static('./public/vendor'));

//Ajout des différents controllers
app.use('/',mainController);
app.use('/movies', moviesController);


app.listen('3000',() => {
   console.log('sever Listening on port 3000');
});
