const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('movies/page/list.twig');
});

router.get('/form',(req,res) => {
   res.render('movies/form/add.twig');
});

module.exports = router;