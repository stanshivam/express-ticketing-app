var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('dashboard');
});


router.get('/logout', function (req, res) {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/admin/login');
});

// router.get('/login', function(req, res){
// 	// res.render('auth/login');
// 	//while rendering the view we can specify the laout to be used
// 	res.render('auth/login', { title: 'my other page', layout: 'auth' });
// });

// router.get('/register', function(req, res){
// 	res.render('auth/register', { title: 'my other page', layout: 'auth' });
// });

// router.post('/register', function(req, res){
// 	res.send('start registeration here!!');
// });


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/admin/login');
	}
}

module.exports = router;