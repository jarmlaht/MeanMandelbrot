var mongoose = require('mongoose');

var MandelbrotSchema = new mongoose.Schema({
    xstart: String,
    ystart: String,
    xend: String,
    yend: String,
    xzoom: String,
    xzoom: String,
    maxIterations: String,
    rstart: String,
    gstart: String,
    bstart: String,
    rend: String,
    gend: String,
    bend: String,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mandelbrot', MandelbrotSchema);