const mongoose = require('mongoose');


const UserPostSchema = mongoose.Schema({
    name: String,
    email: String,
    score: Number,
    timeSpent: String
});



module.exports = mongoose.model('User', UserPostSchema);