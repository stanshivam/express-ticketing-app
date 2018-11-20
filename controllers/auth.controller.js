const User = require('../models/user.model');

//Create new user
exports.register = function (req, res, next) {
    let user = new User(
        req.body
    );
    // Validation
	req.checkBody('fname', 'First Name is required').notEmpty();
	req.checkBody('lname', 'Last Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty().isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('cpassword', 'Confirm Password is required').notEmpty();
    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        // console.log(errors);
        req.session.errors = errors;
        req.session.success = false;
    } else {
        req.session.message = 'Redeemer Created Successfully !!';
        // console.log(req);
        user.save(function (err) {
            if (err) {
                return next(err);
            }
        });
    }
    res.redirect('/redeemers/create');
    req.session.errors

    // module.exports.createUser = function(newUser, callback){
    // 	bcrypt.genSalt(10, function(err, salt) {
    // 	    bcrypt.hash(newUser.password, salt, function(err, hash) {
    // 	        newUser.password = hash;
    // 	        newUser.save(callback);
    // 	    });
    // 	});
    // }
}
