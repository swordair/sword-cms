var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');


router.get('/sword', ensureAuthenticated, function(req, res){
    var urlto = req.flash("urlto");
    
    console.log(urlto);
    
    if(urlto.length){
        res.redirect(urlto);
    }    
	res.render('index', {title: 'Sword CMS'});
});

router.get('/sword/user/register', function(req, res){
	res.render('register', {title: 'Sword CMS register'});
});

router.post('/sword/user/register', function(req, res){
	Account.register(new Account({
        username: req.body.username,
        nickname: req.body.nickname,
        email: req.body.email
    }), req.body.password, function(err, account){
		if(err){
			return res.render('register', {err_msg : err.message});
		}
		passport.authenticate('local')(req, res, function(){
			res.redirect('/sword');
		});
	});
});

router.get('/sword/user/login', function(req, res){
    var error = req.flash("error");
	res.render('login', {msg:error});
});

router.post('/sword/user/login', passport.authenticate('local',{
    successRedirect: '/sword',
    failureRedirect: '/sword/user/login',
    failureFlash: 'Invalid username or password.' 
}), function(req, res) {
    res.redirect('/sword');
});

router.get('/sword/user/logout', function(req, res){
	req.logout();
	res.render('logout', {});
});

module.exports = router;


/* route middleware to ensure user is authenticated */
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/sword/user/login');
    }
}