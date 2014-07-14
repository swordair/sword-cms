var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');


router.get('/', ensureAuthenticated, function(req, res){
    var urlto = req.flash("urlto");
    if(urlto){
        res.redirect(urlto);
    }    
	res.render('index', {title: 'Sword CMS'});
});

router.get('/register', function(req, res){
	res.render('register', {title: 'Sword CMS register'});
});

router.post('/register', function(req, res){
	Account.register(new Account({
        username: req.body.username,
        nickname: req.body.nickname,
        email: req.body.email
    }), req.body.password, function(err, account){
		if(err){
			return res.render('register', {err_msg : err.message});
		}
		passport.authenticate('local')(req, res, function(){
			res.redirect('/');
		});
	});
});

router.get('/login', function(req, res){
    var error = req.flash("error");
	res.render('login', {msg:error});
});

router.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.' 
}), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res){
	req.logout();
	res.render('logout', {});
});

module.exports = router;


/* route middleware to ensure user is authenticated */
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }
}