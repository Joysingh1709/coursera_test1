const express = require('express');
const router = express.Router();
const Questions = require('../models/Questions');

// gets all the questions --- //

router.get('/', async (req, res) => {
    try{    
        const questions = await Questions.find();
        res.json(questions);
    }catch(err){
        res.json({message: err});
    }
});

// puts all the questions --- //

router.post('/', async (req, res) => {
    const questions = new Questions({
        QnId: req.body.QnId,
        Qn: req.body.Qn,
        image: req.body.image,
        options: [
            {
                option: req.body.option
            },
            {
                option: req.body.option
            },
            {
                option: req.body.option
            },
            {
                option: req.body.option
            }
        ],
        answer: req.body.answer
    });

    try{
        const savedQuestion = await questions.save();
        res.json(savedQuestion);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;