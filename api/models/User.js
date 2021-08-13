const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    event: {type: String, required: true, unique: true},
}, {timestamps: true}, { _id: false }

);
module.exports = mongoose.model('User', userSchema);