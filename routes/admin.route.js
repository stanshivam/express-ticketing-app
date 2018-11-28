var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Admin = require('../models/admin.model');

// Load Register View
router.get('/register', function (req, res) {
	res.render('auth/register', { title: 'Register', layout: 'auth' });
});

// Load Login View
router.get('/login', function (req, res) {
	res.render('auth/login', { title: 'Register', layout: 'auth' });
});

// Register Admin
router.post('/register', function (req, res) {
	var name = req.body.name;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var cpassword = req.body.cpassword;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('cpassword', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('auth/register', { title: 'Register', layout: 'auth', errors: errors });
	}
	else {
		//checking for email and username are already taken
		Admin.findOne({ username: {
				"$regex": "^" + username + "\\b", "$options": "i"
		}}, function (err, user) {
			Admin.findOne({ email: {
					"$regex": "^" + email + "\\b", "$options": "i"
			}}, function (err, mail) {
				if (user || mail) {
					res.render('auth/register', {
						errors: [
							{ param: 'name', msg: 'Username or Email is already taken!', value: '' },
						],
						title: 'Register', 
						layout: 'auth', 
					});
				}
				else {
					var newAdmin = new Admin({
						name: name,
						email: email,
						username: username,
						password: password
					});
					Admin.createAdmin(newAdmin, function (err, admin) {
						if (err) throw err;
						console.log(admin);
					});
         			req.flash('success_msg', 'You are registered and can now login');
					res.redirect('/admin/login');
				}
			});
		});
	}
});

passport.use(new LocalStrategy(
	function (username, password, done) {
		Admin.getAdminByUsername(username, function (err, admin) {
			console.log('inside admin route');
			if (err) throw err;
			if (!admin) {
				return done(null, false, { message: 'Unknown Admin' });
			}
			Admin.comparePassword(password, admin.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, admin);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}
));

passport.serializeUser(function (admin, done) {
	done(null, admin.id);
});

passport.deserializeUser(function (id, done) {
	Admin.getAdminById(id, function (err, admin) {
		done(err, admin);
	});
});

// Admin Login
router.post('/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/admin/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/');
	});

router.get('/logout', function (req, res) {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
});

module.exports = router;
