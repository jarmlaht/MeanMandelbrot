// grab the mongoose module
var mongoose = require('mongoose');
//require('mongoose-double')(mongoose);
//var SchemaTypes = mongoose.Schema.Types;
// define mandelbrot model
var MandelbrotSchema = new mongoose.Schema({
    xstart: String,
    ystart: String,
    xend: String,
    yend: String,
    xzoom: String,
    xzoom: String,
    x: String,
    y: String,
    rx: String,
    iy: String,
    maxIterations: String,
    rstart: String,
    gstart: String,
    bstart: String,
    rend: String,
    gend: String,
    bend: String,
    updated_at: { type: Date, default: Date.now },
});
/*
var MandelbrotSchema = new mongoose.Schema({
    xstart: { type: SchemaTypes.Decimal128 },
    ystart: { type: SchemaTypes.Decimal128 },
    xend: { type: SchemaTypes.Decimal128 },
    yend: { type: SchemaTypes.Decimal128 },
    xzoom: { type: SchemaTypes.Decimal128 },
    xzoom: { type: SchemaTypes.Decimal128 },
    x: { type: SchemaTypes.Number },
    y: { type: SchemaTypes.Number },
    rx: { type: SchemaTypes.Decimal128 },
    iy: { type: SchemaTypes.Decimal128 },
    maxIterations: { type: SchemaTypes.Number },
    rstart: { type: SchemaTypes.Number },
    gstart: { type: SchemaTypes.Number },
    bstart: { type: SchemaTypes.Number },
    rend: { type: SchemaTypes.Number },
    gend: { type: SchemaTypes.Number },
    bend: { type: SchemaTypes.Number },
    updated_at: { type: Date, default: Date.now },
});
*/
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Mandelbrot', MandelbrotSchema);