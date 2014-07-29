var express = require('express');
var pageRouter = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var Page = require('../models/page');


/* GET users listing. */
pageRouter.get('/sword/page', ensureAuthenticated, function(req, res) {
    Page.find({}, function (err, docs) {
      
        console.log(docs);
      
        res.render('page', {title: 'Sword CMS', pages: docs});
    });

    
});

pageRouter.get('/sword/page/add', ensureAuthenticated, function(req, res) {
    res.render('add_page', {title: 'add new page - Sword CMS'});
});

pageRouter.post('/sword/page/add', ensureAuthenticated, function(req, res) {
    
    var page = new Page({
        title: req.body.title,
        content: req.body.content
    });
    page.save(function (err) {
        if (err) console.log('error');
        console.log('saved');
        
        res.redirect('/sword/page');
        
    });
});

pageRouter.get('/sword/page/edit/:id', ensureAuthenticated, function(req, res) {
    res.render('add_page', {title: 'add new page - Sword CMS'});
});


module.exports = pageRouter;


/* route middleware to ensure user is authenticated */
function ensureAuthenticated(req, res, next){
    if(/*req.isAuthenticated()*/1){
        return next();
    }else{
        req.flash('urlto', req.path);
        res.redirect('/sword/user/login');
    }
}