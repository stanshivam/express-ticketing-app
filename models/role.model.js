var mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
    name: String,
    index: true
});

module.exports = mongoose.model('Role', RoleSchema)