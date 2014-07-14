var express = require('express');
var pageRouter = express.Router();
var passport = require('passport');
var Account = require('../models/account');

/* GET users listing. */
pageRouter.get('/page', ensureAuthenticated, function(req, res) {
    res.render('page', {title: 'Sword CMS'});
});

module.exports = pageRouter;


/* route middleware to ensure user is authenticated */
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('urlto', req.path);
        res.redirect('/login');
    }
}