var express = require('express');
var router = express.Router();
var Mandelbrot = require('./models/Mandelbrot.js');

/* GET /mandelbrots listing. */
router.get('/m', function(req, res) {
    // use mongoose to get all nerds in the database
    Mandelbrot.find(function(err, mandelbrots) {
        if (err) {
            res.send(err);
        }
        console.log(JSON.stringify(mandelbrots));
        res.json(mandelbrots); // return all nerds in JSON format
    });
});

/* POST /mandelbrots */
router.post('/m', function(req, res, next) {
  Mandelbrot.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /mandelbrots/id */
router.get('/m/:id', function(req, res, next) {
  Mandelbrot.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /mandelbrots/:id */
router.put('/m/:id', function(req, res, next) {
  Mandelbrot.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /mandelbrots/:id */
router.delete('/m/:id', function(req, res, next) {
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