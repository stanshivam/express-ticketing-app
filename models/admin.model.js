const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

let AdminSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.createAdmin = function(newAdmin, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newAdmin.password, salt, function(err, hash) {
	        newAdmin.password = hash;
	        newAdmin.save(callback);
	    });
	});
}

module.exports.getAdminByUsername = function(username, callback) {
    Admin.findOne({ username: username }, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports.getAdminById = function(id, callback){
	Admin.findById(id, callback);
}
