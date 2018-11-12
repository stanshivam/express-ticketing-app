const Redeemer = require('../models/redeemer.model');

exports.redeemer_details = function (req, res, next) {
    Redeemer.findById(req.params.id, function (err, redeemer) {
        if (err) return next(err);
        res.send(redeemer);
    })
};

exports.list = function (req, res) {
    // res.send('Greetings from the Test controller!');
    Redeemer.find({}).exec(function(err, redeemers) {   
        if (err) throw err;
        // res.send(redeemers);
        res.render('redeemers/redeemers_list', {"redeemers": redeemers});
    });
    
};

exports.create = function (req, res) {
    // res.send('Greetings from the Test controller!');
    res.render('redeemers/redeemers_create', { 
        success: req.session.success, 
        errors: req.session.errors,
        message: req.session.message
    });
    req.session.errors = null;
    req.session.message = null;
}

exports.editRedeemer = function(req, res, next) {
    Redeemer.findById(req.params.id, function (err, redeemer) {
        if (err) return next(err);
        console.log(redeemer);
        res.render('redeemers/redeemers_edit', { "redeemer": redeemer });
    })
    
}

exports.updateRedeemer = function(req, res, next) {
    const redeemerID = req.params.id;
    console.log(req.body);
    // Redeemer.findByIdAndUpdate(redeemerID, {$set: req.body}, function (err, redeemer) {
    //     if (err) return next(err);
    //     res.render('redeemers/redeemers_edit', { 'redeemer': redeemer });
    // });

    Redeemer.findOneAndUpdate({_id: redeemerID}, {$set:req.body}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        res.render('redeemers/redeemers_edit', { 'redeemer': doc });
    });

    // Redeemer.update({ '_id': redeemerID }, 
    // { $set: req.body }, function(err, result) { 

    //   if (err) return next(err);
    //   console.log(result);
    //   res.render('redeemers/redeemers_edit', { 'redeemer': result });
    // }); 
}

exports.addRedeemer = function (req, res, next) {
    let redeemer = new Redeemer(
        req.body
    );
    // Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('contact', 'Contact is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        // console.log(errors);
        req.session.errors = errors;
        req.session.success = false;
    } else {
        req.session.message = 'Redeemer Created Successfully !!';
        // console.log(req);
        redeemer.save(function (err) {
            if (err) {
                return next(err);
            }
        });
    }
    res.redirect('/redeemers/create');
    req.session.errors
}

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


