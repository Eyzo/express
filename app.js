//Importation des dépendances
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const twig = require('twig');

//Connection avec la bdd
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Admin:berserk62155@cluster0-nddx4.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true ,useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', () => {
   console.error.bind(console, 'connection error:');
});

db.on('open',() => {
   console.log('vous êtes connecté');
});

//Importation des controllers
const mainController = require('./controllers/mainController');

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
app.use('/img',express.static(__dirname + '/public/img'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js',express.static(__dirname + '/public/js'));
app.use('/vendor',express.static(__dirname + '/public/vendor'));

//Ajout des différents controllers
app.use('/',mainController);

app.listen('3000',() => {
   console.log('sever Listening on port 3000');
});
