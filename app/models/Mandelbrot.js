// grab the mongoose module
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
// define mandelbrot model
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
    updated_at: { type: Date, default: Date.now },
});
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Mandelbrot', MandelbrotSchema);