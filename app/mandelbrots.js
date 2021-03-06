var express = require('express');
var router = express.Router();
var Mandelbrot = require('./models/Mandelbrot.js');
var mongoose = require('mongoose');

/* GET /mandelbrots listing. */
router.get('/', function(req, res, next) {
    Mandelbrot.find(function(err, mandelbrots) {
        if (err) {
            res.send(err);
        }
        res.json(mandelbrots);
    });
});

/* POST /mandelbrots */
router.post('/', function(req, res, next) {
  Mandelbrot.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /mandelbrots/id */
router.get('/:id', function(req, res, next) {
  Mandelbrot.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /mandelbrots/:id */
router.put('/:id', function(req, res, next) {
  Mandelbrot.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /mandelbrots/:id */
router.delete('/:id', function(req, res, next) {
  Mandelbrot.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// route to handle creating goes here (app.post)
// route to handle delete goes here (app.delete)

// frontend routes =========================================================
// route to handle all angular requests
/*app.get('*', function(req, res) {
    res.render('./public/views/pages/index.ejs'); 
});*/

module.exports = router;