const Redeemer = require('../models/redeemer.model');

exports.redeemer_details = function (req, res, next) {
    Redeemer.findById(req.params.id, function (err, redeemer) {
        if (err) return next(err);
        res.send(redeemer);
    })
};

exports.redeemer_create = function (req, res, next) {
    let redeemer = new Redeemer(
        {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            password: req.body.password,
            address: req.body.address
        }
    );

     // Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('contact', 'Contact is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    
    var errors = req.validationErrors();

	if (errors) {
		// res.render('register', {
		// 	errors: errors
        // });
        //return with errors
    }
    
    redeemer.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Redeemer Created Successfully')
    })
};

exports.redeemer_update = function (req, res) {
    Redeemer.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, redeemer) {
        if (err) return next(err);
        res.send('redeemer udpated.');
    });
};

exports.redeemer_delete = function (req, res) {
    Seller.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Redeemer deleted successfully!');
    })
};

