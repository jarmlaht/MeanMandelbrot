var ox = -0.75;
var oy = 0.0;
var radius = 2.5;
var width = 800;
var height = 600;
var xstart = 0;
var xend = 0;
var ystart = 0;
var yend = 0;
var radx = 0;
var rady = 0;
var xzoom = 0;
var yzoom = 0;
var zoom1 = 0.8;
var zoom2 = 0.5;
var zoom3 = 0.2;
var zoom = 1.0;
var maxIterations = 1000;
var r_values = new Array(255);
var g_values = new Array(255);
var b_values = new Array(255);
var rstart = 255;
var gstart = 0;
var bstart = 0;
var rend = 255;
var gend = 255;
var bend = 0;
var scrolledVal = 0;
var rx = 0;
var iy = 0;

resetValues(ox, oy, radius);
createPalette();
drawMandelbrotSet();

function getImageData(w, h) {
    console.log("Creating 4K image:\n xstart: " + xstart + "\nystart: " + ystart + "\nxend: " + xend + "\nyend: " + yend + "\nxzoom: " + xzoom + "\nyzoom: " + yzoom);
    drawPalette(255, 0, 0, 255, 255, 0);
    createPalette();
    maxIterations = document.getElementById("iteration_input").value;
    var canvas4k = document.getElementById("4Kcanvas").getContext("2d");
    var pic = canvas4k.createImageData(w, h);
    var pos = 0;
    for (y = 0; y < h; y++) {
        for (x = 0; x < w; x++) {
            rx = xstart + xzoom * x;
            iy = ystart + yzoom * y;
            c = getIterationCount(rx, iy); // color value
            pos = x + (w * y);
            if (c === 256) {
                pic.data[4*pos] = 0;
                pic.data[4*pos+1] = 0;
                pic.data[4*pos+2] = 0;
                pic.data[4*pos+3] = 255;
            }
            else {
                pic.data[4*pos] = r_values[c];
                pic.data[4*pos+1] = g_values[c];
                pic.data[4*pos+2] = b_values[c];
                pic.data[4*pos+3] = 255;
            }
        }
    }
    console.log("Creating 4K image: data ok");
    canvas4k.putImageData(pic, 0, 0);
    var dataURL = document.getElementById("4Kcanvas").toDataURL();
    document.getElementById('canvasImg').src = dataURL;
    console.log("4K image ready!");
}

function drawMandelbrotSet() {
    //console.log("drawMandelbrotSet(): rx = " + rx + ", iy = " + iy);
    //console.log("drawMandelbrotSet(): xstart: " + xstart + "\nystart: " + ystart + "\nxend: " + xend + "\nyend: " + yend + "\nxzoom: " + xzoom + "\nyzoom: " + yzoom);
    drawPalette(255, 0, 0, 255, 255, 0);	
    createPalette();
    maxIterations = document.getElementById("iteration_input").value;
    var canvas = document.getElementById("mandelbrotcanvas").getContext("2d");
    var pic = canvas.createImageData(width, height);
    var pos = 0;
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            rx = xstart + xzoom * x;
            iy = ystart + yzoom * y;
            c = getIterationCount(rx, iy); // color value
            pos = x + (width * y);
            if (c === 256) {
                pic.data[4*pos] = 0;
                pic.data[4*pos+1] = 0;
                pic.data[4*pos+2] = 0;
                pic.data[4*pos+3] = 255;
            }
            else {
                pic.data[4*pos] = r_values[c];
                pic.data[4*pos+1] = g_values[c];
                pic.data[4*pos+2] = b_values[c];
                pic.data[4*pos+3] = 255;
            }
        }
    }  
    canvas.putImageData(pic, 0, 0);
    var details = {        
        xstart: xstart,
        ystart: ystart,
        xend: xend,
        yend: yend,
        xzoom: xzoom,
        yzoom: yzoom,
        x: x,
        y: y,
        rx: rx,
        iy: iy,
        maxIterations: Number(maxIterations),
        rstart: rstart,
        gstart: gstart,
        bstart: bstart,
        rend: rend,
        gend: gend,
        bend: bend
    };
    saveDetailsToMongoDb(details);
    console.log("drawMandelbrotSet(): done!");
}

function saveDetailsToMongoDb(details) {
    console.log(JSON.stringify(details));
    // Create a todo in memory
    /*var m = new Mandelbrot({
        xstart: xstart,
        ystart: ystart,
        xend: xend,
        yend: yend,
        xzoom: xzoom,
        xzoom: xzoom,
        x: x,
        y: y,
        rx: rx,
        iy: iy
    });
    // Save it to database
    m.save(function(err){
    if(err)
        console.log(err);
    else
        console.log(todo);
    });*/
}

function getIterationCount(x, y) {
    var real = 0.0;
    var imag = 0.0;
    var mag = 0.0;
    var iterations = 0;
    while((iterations < maxIterations) && (mag < 4.0)) {
        mag = real * real - imag * imag;	    // squared magnitude
        imag = 2.0 * real * imag + y;      	    // iterated value, imaginary part
        real = mag + x;                         // iterated value, real part
        iterations++;
    }
    while (iterations > 255) {                  // If maximum iterations is more than 256,
        //iterations = iterations - 256;		// returned color value will be decreased by 256.
        return 256;
    }
    return iterations;
}

function resetValues(x, y, r) {
    console.log("resetValues(): x = " + x + ", y = " + y + ", r = " + r);
    radx = r;
    rady = (height/width) * r;
    xstart = x - radx;
    xend = x + radx;
    ystart = y + rady;
    yend = y - rady;
    xzoom = (xend - xstart) / width;
    yzoom = (yend - ystart) / height;
}

function getCoordinates(event) {
    //console.log("getCoordinates()");
    var canvas = document.getElementById('mandelbrotcanvas');
    var zoomlevel = document.getElementById('zoom_level');
    console.log("getCoordinates(): zoom = " + zoomlevel);
    var position = getPosition(canvas);
    //alert("The image is located at: " + position.x + ", " + position.y);
    //var x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - canvas.offsetLeft;
    //var y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - canvas.offsetTop;
    //var x = event.clientX - getOffset(document.getElementById('mandelbrotcanvas')).left;
    //var y = event.clientY - getOffset(document.getElementById('mandelbrotcanvas')).top;
    var x = event.clientX - position.x;
    //console.log("event.clientY: " + event.clientY + ", position.y: " + position.y);
    var y = event.clientY - position.y + scrolledVal;
    var rx = xstart + xzoom * x;
    var iy = ystart + yzoom * y;
    document.getElementById('coordinates').innerHTML = "xstart: " + xstart + "<br>ystart: " + ystart 
    	+ "<br>xend: " + xend + "<br>yend: " + yend + "<br>xzoom: " + xzoom + "<br>yzoom: " + yzoom 
        + "<br>x: " + x + ", y: " + y +  "<br>rx: " + rx + "<br>iy: " + iy;// + "<br>maxIterations: " + maxIterations;
        //+ "<br>rstart: " + rstart + "<br>gstart: " + gstart + "<br>bstart: " + bstart 
        //+ "<br>rend: " + rend + "<br>gend: " + gend + "<br>bend: " + bend;
    if (zoomlevel.value == 1) {
        zoomlevel.title = zoom1; 
        zoom = zoom * zoom1;    // * 0.2
    }
    else if (zoomlevel.value == 2) {
        zoomlevel.title = zoom2;
        zoom = zoom * zoom2;    // * 0.5
    }
    else if (zoomlevel.value == 3) {
        zoomlevel.title = zoom3;
        zoom = zoom * zoom3;    // * 0.8
    }
    else zoom = zoom1;
    resetValues(rx, iy, zoom);
    drawMandelbrotSet(rx, iy);
}

function getPosition(element) {
    // from: http://www.kirupa.com/html5/get_element_position_using_javascript.htm
    var xPosition = 0;
    var yPosition = 0;
    var offsetX = 0;
    var offsetY = 0;
    while(element) {
        offsetX = element.offsetLeft - element.scrollLeft + element.clientLeft;
        offsetY = element.offsetTop - element.scrollTop + element.clientTop;
        //console.log("element: " + element.toString() + ": X: " + offsetX + ", Y: " + offsetY);
        //console.log("offsetTop: " + element.offsetTop);
        //console.log("scrollTop: " + element.scrollTop);
        //console.log("clientTop: " + element.clientTop);
        //console.log("scrolledVal: " + scrolledVal);
        xPosition += offsetX;
        yPosition += offsetY;
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

//http://jqueryui.com/slider/#colorpicker
function createPalette() { //startColor, endColor) {
    //console.log("createPalette(): " + rstart + ", " + gstart + ", " + bstart);
    //console.log("createPalette(): " + rend + ", " + gend + ", " + bend);
    var r = rstart;
    var g = gstart;
    var b = bstart;
    var length = 255;
    for (i = 0; i < length; i++) {
        r = ((rend - rstart)/length)*i + rstart;
        g = ((gend - gstart)/length)*i + gstart;
        b = ((bend - bstart)/length)*i + bstart;
        r_values[i] = r;
        g_values[i] = g;
        b_values[i] = b;
    }
    drawPalette(rstart, gstart, bstart, rend, gend, bend);
}

function drawPalette(rs, gs, bs, re, ge, be) {
    //console.log("drawPalette(): " + rs + ", " + gs + ", " + bs + ", " + re + ", " + ge + ", " + be);
    //console.log("rs type: " + typeof rs);
    var gradientBox = document.getElementById("palette").getContext("2d"); 
    var gradient = gradientBox.createLinearGradient(0,0,200,50);
    var start = hexFromRGB(Number(rs), Number(gs), Number(bs));
    var end = hexFromRGB(Number(re), Number(ge), Number(be));
    gradient.addColorStop(0, "#" + start);
    gradient.addColorStop(1, "#" + end);
    gradientBox.fillStyle = gradient; 
    gradientBox.fillRect(10, 10, 180, 40); 
}

/*function getOffset(el) {
    var x = 0;
    var y = 0;
    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return {top: y, left: x};
}
//var x = getOffset( document.getElementById('yourElId') ).left; 
*/

function hexFromRGB(r, g, b) {
    var hex = [
        r.toString(16),
        g.toString(16),
        b.toString(16)
    ];
    $.each( hex, function( nr, val ) {
        if ( val.length === 1 ) {
            hex[ nr ] = "0" + val;
        }
    });
    return hex.join("").toUpperCase();
}

function refreshStartSwatch() {
    rstart = $("#redstart").slider("value");
    gstart = $("#greenstart").slider("value");
    bstart = $("#bluestart").slider("value");
    hexstart = hexFromRGB( rstart, gstart, bstart);
    $("#swatchstart").css("background-color", "#" + hexstart);
    drawPalette(rstart, gstart, bstart, rend, gend, bend);
}
$(function() {
    $("#redstart, #greenstart, #bluestart").slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 127,
        slide: refreshStartSwatch,
        change: refreshStartSwatch
    });
    $("#redstart").slider("value", 255);
    $("#greenstart").slider("value", 0);
    $("#bluestart").slider("value", 0);
    drawPalette(rstart, gstart, bstart, rend, gend, bend);
});

function refreshEndSwatch() {
    rend = $("#redend").slider("value");
    gend = $("#greenend").slider("value");
    bend = $("#blueend").slider("value");
    hexend = hexFromRGB( rend, gend, bend);
    $("#swatchend").css("background-color", "#" + hexend);
    drawPalette(rstart, gstart, bstart, rend, gend, bend);
}
$(function() {
    $("#redend, #greenend, #blueend").slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 127,
        slide: refreshEndSwatch,
        change: refreshEndSwatch
    });
    $("#redend").slider("value", 255);
    $("#greenend").slider("value", 255);
    $("#blueend").slider("value", 0);
});

$(window).scroll( function() { 
    scrolledVal = $(document).scrollTop().valueOf();
    //alert(scrolled_val+ ' = scroll value');
});
