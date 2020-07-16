const mongoose = require('mongoose');

const QuePostSchema = mongoose.Schema({
    QnId: String,
    Qn: String,
    image: String,
    options: [
        {
            option: String
        },
        {
            option: String
        },
        {
            option: String
        },
        {
            option: String
        }
    ],
    answer: Number
});

module.exports = mongoose.model('Questions', QuePostSchema);