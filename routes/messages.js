var express = require('express');
var router  = express.Router();
var jwt = require('jsonwebtoken');
var Message = require('../models/message');
var User = require('../models/user');

// Here we restrict populate to only fetch the firstname of the User.
// If we should not restrict the data, then all data in the User object will be populated.
router.get('/', function (req,res,next) {
    Message.find()
        .populate('user', 'firstName')
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

// Do something with the Http Request
// In this case check if the Token is valid
router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(404).json({
                title: 'routes/messages,js => Authentication failed!',
                error: err
            });
        }
        // Token passed about Validation, so go to next (continue)
        next();
    });
});

router.post('/', function(req,res,next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: doc
        });
        message.save(function(err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            // We add message to the message array of the user.
            doc.messages.push(result);
            doc.save();
            res.status(201).json({
                message: 'Saved the message',
                obj: result
            });
        });
    });
});


router.patch('/:id', function(req, res, next) {
   // Update content with patch not replace.
    var decoded = jwt.decode(req.query.token);
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
        // Remove this debugging code when go to production
        console.log(doc.user);
        console.log(decoded.user);
        if (doc.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authorized',
                error: {message: 'Message created by other user!'}
            });
        }
        doc.content = req.body.content;
        //Save to Db with Mongoose
        doc.save(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred.',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success message updated!',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req,res,next) {
    // Update content with patch not replace.
    var decoded = jwt.decode(req.query.token);
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
        if (doc.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authorized',
                error: {message: 'Message created by other user!'}
            });
        }
        // doc.content = req.body.content;
        //Remove Message from Db with Mongoose
        doc.remove(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred.',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success message deleted!',
                obj: result
            });
        });
    });
});

module.exports = router;

