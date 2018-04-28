const mainRouter = require('express').Router();

mainRouter.get('/', (req, res) => {
    res.render('home.hbs');
});

module.exports = mainRouter;