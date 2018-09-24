const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SellerSchema = new Schema({
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true},
    contact: {type: String, required: true},
    password: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Seller', SellerSchema);