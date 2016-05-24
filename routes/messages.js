var express = require('express');
var router  = express.Router();
var Message = require('../models/message');

router.get('/', function (req,res,next) {
    Message.find()
        .exec(function(err, docs){
            if(err){
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Found the message.',
                obj: docs
            });
        });
});

router.post('/', function (req,res,next) {
    var message = new Message({
        content: req.body.content
    });
    message.save(function (err, result) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved the message',
            obj: result
        });
    });
});


router.patch('/:id', function(req, res, next) {
   // Update content with patch not replace.
    Message.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred.',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'No message found.',
                error: {message: 'Message could not be found!'}
            });
        }
        doc.content = req.body.content;
        //Save to Db with Mongoose
        doc.save(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred.',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Message Updated!',
                obj: result
            });
        });
    });
});

router.delete('/:id', function (req,res,next) {
    // Update content with patch not replace.
    Message.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred.',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'No message found.',
                error: {message: 'Message could not be found!'}
            });
        }
        doc.content = req.body.content;
        //Remove Message from Db with Mongoose
        doc.remove(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred.',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Message Deleted!',
                obj: result
            });
        });
    });
});

module.exports = router;

