const express = require('express');
const router = express.Router();
const User = require('../models/User');

// gets all the users --- //

router.get('/', async (req, res) => {
    try{    
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message: err});
    }
});

//submits a User --//

router.post('/', async (req, res) => {
    const users = new User({
        name: req.body.name,
        email: req.body.email,
        score: req.body.score,
        timeSpent: req.body.timeSpent
    });

    try{
        const savedPost = await users.save();
        res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }
});

// get a specific User-- //

router.get('/:userId', async (req, res) => {
    try{
    const user = await User.findById(req.params.userId);
    res.json(user);
    }catch(err) {
        res.json({message: err});
    }
});

// delete post --//

router.delete('/:userId', async (req, res) => {
    try {
    const removedUser = await User.remove({_id: req.params.userId});
    res.json(removedUser);
    }catch(err) {
        res.json({message: err});
    }
});

// update a post // 

router.patch('/:postId', async (req, res) => {
    try {
    const updatedPatchUser = await User.updateOne({_id: req.params.postId}, { $set: {
        name: req.body.name,
        email: req.body.email,
        score: req.body.score,
        timeSpent: req.body.timeSpent
    }});
    res.json(updatedPatchUser);
    }catch(err) {
        res.json({message: err});
    }
});

router.put('/:userId', async (req, res) => {
    var body = req.body;
    try {
    const updatedUser = await User.updateOne({_id: req.params.userId}, { $set: {body}});
    res.json(updatedUser);
    }catch(err) {
        res.json({message: err});
    }
});

module.exports = router;