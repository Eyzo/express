const router = require('express').Router();

router.get('/',(req,res) => {
    res.render('index.twig');
});

module.exports = router;
