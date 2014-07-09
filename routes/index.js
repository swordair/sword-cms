var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');


router.get('/', function(req, res){

	if(req.user){
		res.render('index', {title: 'Sword CMS'});
	}
	else{
		res.redirect('/login');
	}

	
});


router.get('/register', function(req, res) {
	res.render('register', {title: 'Sword CMS register'});
});


router.post('/register', function(req, res){
	Account.register(new Account({username : req.body.username}), req.body.password, function(err, account){
		if(err){
			return res.render('register', {err_msg : err.message});
		}
		console.log(account);
		passport.authenticate('local')(req, res, function(){
			res.redirect('/');
		});
	});
});


router.get('/login', function(req, res){
	res.render('login', {msg:req.flash("error")});
});


router.post('/login', passport.authenticate('local',{ successRedirect: '/',
                                   failureRedirect: '/login',
								   failureFlash: 'Invalid username or password.' }), function(req, res) {
	res.redirect('/');
});


router.get('/logout', function(req, res){
	req.logout();
	res.render('logout', {});
});



module.exports = router;
