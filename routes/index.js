var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('dashboard');
});

router.post('/login', function(req, res){
	// res.render('auth/login');
	console.log(req.body);
	//while rendering the view we can specify the laout to be used
	res.redirect('/login');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	}
}

module.exports = router;