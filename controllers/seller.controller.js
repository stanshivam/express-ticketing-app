const Seller = require('../models/seller.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.seller_details = function (req, res, next) {
    Seller.findById(req.params.id, function (err, seller) {
        if (err) return next(err);
        res.send(seller);
    })
};

exports.seller_create = function (req, res, next) {
    let seller = new Seller(
        {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            password: req.body.password
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
    
    seller.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Seller Created Successfully')
    })
};

exports.seller_update = function (req, res) {
    Seller.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, seller) {
        if (err) return next(err);
        res.send('Seller udpated.');
    });
};

exports.seller_delete = function (req, res) {
    Seller.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Seller deleted successfully!');
    })
};

