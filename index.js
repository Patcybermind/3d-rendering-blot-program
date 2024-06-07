/*
@title: 3d_wire_frame_renderer
@author: Patcybermind, optimised by The456gamer
THIS IS WIP IM PORTING MY WIREFRAME ENGINE FOR SPRIG TO BLOT AND POSSIBLY ADDING TEXTURES OR SOMETHINGIDK YET
*/

// BLOT SETTINGS
const width = 160; // 160
const height = 128; // 128
setDocDimensions(width, height);
const finalLines = [];
const t = new bt.Turtle();

// PROGRAM SETTINGS
// initial translation values
let camX = -60;
let camY = 10; // vertical
let camZ = 70;
// rotation
let rotX = 0;
let rotY = -0.3; // extremely sensitive


// focal length
let focalLength = -50; // keep this negative or else everything will be upside down

// near plane
let nearPlane = 5;

// percentage
let percent = 0;

// cam speed
let camSpeedX = 5;
let camSpeedY = camSpeedX;
let cameraRotationSpeed = Math.PI / 16
// points
let x1 = 0;
let y1 = 0;
let z1 = 0;

let x2 = 0;
let y2 = 0;
let z2 = 0;


// cos and sin variables
let cosX = 1;
let sinX = 1;

let cosY = 1;
let sinY = 1;

// paste the stl between the ` `
const stl = `
solid Exported from Blender-4.1.1
facet normal 0.000000 -0.130675 0.991425
outer loop
vertex 1.631337 -1.165350 2.241816
vertex 0.000000 -1.165350 2.241816
vertex 0.000000 -3.000000 2.000000
endloop
endfacet
facet normal 0.000000 -0.130674 0.991425
outer loop
vertex 1.631337 -1.165350 2.241816
vertex 0.000000 -3.000000 2.000000
vertex 1.520153 -3.000000 2.000000
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 1.520153 -3.000000 1.826424
vertex 1.520153 -3.000000 2.000000
vertex 0.000000 -3.000000 2.000000
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 1.520153 -3.000000 1.826424
vertex 0.000000 -3.000000 2.000000
vertex 0.000000 -3.000000 1.826424
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 0.000000 1.000000 0.000000
vertex 1.652340 1.000000 0.000000
vertex 1.652340 -1.000000 0.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 0.000000 1.000000 0.000000
vertex 1.652340 -1.000000 0.000000
vertex 0.000000 -1.000000 0.000000
endloop
endfacet
facet normal 0.999855 -0.004476 0.016418
outer loop
vertex 1.652340 2.002940 1.826424
vertex 1.652340 2.639683 2.000000
vertex 1.631337 -1.165350 2.241816
endloop
endfacet
facet normal 0.998724 0.000000 0.050498
outer loop
vertex 1.652340 2.002940 1.826424
vertex 1.631337 -1.165350 2.241816
vertex 1.652340 -1.000000 1.826424
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 1.652340 2.989490 0.000000
vertex 0.000000 2.989490 0.000000
vertex 0.000000 3.553143 0.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 1.652340 2.989490 0.000000
vertex 0.000000 3.553143 0.000000
vertex 1.652340 3.553143 0.000000
endloop
endfacet
facet normal 0.000000 0.800389 -0.599481
outer loop
vertex 0.000000 3.553143 1.826424
vertex 0.000000 3.809692 2.168952
vertex 1.652340 3.809692 2.168952
endloop
endfacet
facet normal 0.000000 0.800389 -0.599481
outer loop
vertex 0.000000 3.553143 1.826424
vertex 1.652340 3.809692 2.168952
vertex 1.652340 3.553143 1.826424
endloop
endfacet
facet normal 0.997650 -0.063763 0.025062
outer loop
vertex 1.652340 -1.000000 1.826424
vertex 1.631337 -1.165350 2.241816
vertex 1.520153 -3.000000 2.000000
endloop
endfacet
facet normal 0.997823 -0.065950 0.000000
outer loop
vertex 1.652340 -1.000000 1.826424
vertex 1.520153 -3.000000 2.000000
vertex 1.520153 -3.000000 1.826424
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 0.000000 -1.000000 0.000000
vertex 1.652340 -1.000000 0.000000
vertex 1.520153 -3.000000 0.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 0.000000 -1.000000 0.000000
vertex 1.520153 -3.000000 0.000000
vertex 0.000000 -3.000000 0.000000
endloop
endfacet
facet normal 0.000000 0.617778 0.786353
outer loop
vertex 1.652340 2.639683 2.000000
vertex 0.000000 2.639683 2.000000
vertex 0.000000 1.188866 3.139796
endloop
endfacet
facet normal 0.000000 0.617778 0.786353
outer loop
vertex 1.652340 2.639683 2.000000
vertex 0.000000 1.188866 3.139796
vertex 1.487923 1.188866 3.139796
endloop
endfacet
facet normal 0.000000 -0.314092 0.949392
outer loop
vertex 0.000000 3.299007 2.000000
vertex 1.652340 3.299007 2.000000
vertex 1.652340 3.809692 2.168952
endloop
endfacet
facet normal 0.000000 -0.314092 0.949392
outer loop
vertex 0.000000 3.299007 2.000000
vertex 1.652340 3.809692 2.168952
vertex 0.000000 3.809692 2.168952
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 1.652340 3.272145 1.826424
vertex 1.652340 2.989490 0.000000
vertex 1.652340 3.553143 0.000000
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 1.652340 3.272145 1.826424
vertex 1.652340 3.553143 0.000000
vertex 1.652340 3.553143 1.826424
endloop
endfacet
facet normal 0.000000 0.139351 0.990243
outer loop
vertex 1.487923 1.188866 3.139796
vertex 0.000000 1.188866 3.139796
vertex 0.000000 -0.532381 3.382018
endloop
endfacet
facet normal 0.000000 0.139351 0.990243
outer loop
vertex 1.487923 1.188866 3.139796
vertex 0.000000 -0.532381 3.382018
vertex 1.487923 -0.532381 3.382018
endloop
endfacet
facet normal 0.989030 0.003925 0.147666
outer loop
vertex 1.631337 -1.165350 2.241816
vertex 1.652340 2.639683 2.000000
vertex 1.487923 1.188866 3.139796
endloop
endfacet
facet normal 0.993131 0.016305 0.115864
outer loop
vertex 1.631337 -1.165350 2.241816
vertex 1.487923 1.188866 3.139796
vertex 1.487923 -0.532381 3.382018
endloop
endfacet
facet normal 0.000000 -0.874313 0.485363
outer loop
vertex 0.000000 -1.165350 2.241816
vertex 1.631337 -1.165350 2.241816
vertex 1.487923 -0.532381 3.382018
endloop
endfacet
facet normal 0.000000 -0.874313 0.485363
outer loop
vertex 0.000000 -1.165350 2.241816
vertex 1.487923 -0.532381 3.382018
vertex 0.000000 -0.532381 3.382018
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 1.652340 3.299007 2.000000
vertex 1.652340 3.272145 1.826424
vertex 1.652340 3.553143 1.826424
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 1.652340 3.299007 2.000000
vertex 1.652340 3.553143 1.826424
vertex 1.652340 3.809692 2.168952
endloop
endfacet
facet normal 0.997823 -0.065950 0.000000
outer loop
vertex 1.652340 -1.000000 0.000000
vertex 1.652340 -1.000000 1.826424
vertex 1.520153 -3.000000 1.826424
endloop
endfacet
facet normal 0.997823 -0.065950 0.000000
outer loop
vertex 1.652340 -1.000000 0.000000
vertex 1.520153 -3.000000 1.826424
vertex 1.520153 -3.000000 0.000000
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 0.000000 3.553143 0.000000
vertex 0.000000 3.553143 1.826424
vertex 1.652340 3.553143 1.826424
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 0.000000 3.553143 0.000000
vertex 1.652340 3.553143 1.826424
vertex 1.652340 3.553143 0.000000
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 1.652340 1.000000 0.000000
vertex 1.652340 2.002940 1.826424
vertex 1.652340 -1.000000 1.826424
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 1.652340 1.000000 0.000000
vertex 1.652340 -1.000000 1.826424
vertex 1.652340 -1.000000 0.000000
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 1.520153 -3.000000 0.000000
vertex 1.520153 -3.000000 1.826424
vertex 0.000000 -3.000000 1.826424
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 1.520153 -3.000000 0.000000
vertex 0.000000 -3.000000 1.826424
vertex 0.000000 -3.000000 0.000000
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 1.652340 2.639683 2.000000
vertex 1.652340 2.002940 1.826424
vertex 1.652340 3.272145 1.826424
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 1.652340 2.639683 2.000000
vertex 1.652340 3.272145 1.826424
vertex 1.652340 3.299007 2.000000
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 1.652340 2.002940 1.826424
vertex 1.652340 1.000000 0.000000
vertex 1.652340 2.989490 0.000000
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 1.652340 2.002940 1.826424
vertex 1.652340 2.989490 0.000000
vertex 1.652340 3.272145 1.826424
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 2.639683 2.000000
vertex 1.652340 2.639683 2.000000
vertex 1.652340 3.299007 2.000000
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 2.639683 2.000000
vertex 1.652340 3.299007 2.000000
vertex 0.000000 3.299007 2.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 1.652340 1.000000 0.000000
vertex 0.000000 1.000000 0.000000
vertex 0.000000 2.989490 0.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 1.652340 1.000000 0.000000
vertex 0.000000 2.989490 0.000000
vertex 1.652340 2.989490 0.000000
endloop
endfacet
facet normal 0.000000 -0.130674 0.991425
outer loop
vertex -1.631337 -1.165350 2.241816
vertex -1.520153 -3.000000 2.000000
vertex 0.000000 -3.000000 2.000000
endloop
endfacet
facet normal 0.000000 -0.130675 0.991425
outer loop
vertex -1.631337 -1.165350 2.241816
vertex 0.000000 -3.000000 2.000000
vertex 0.000000 -1.165350 2.241816
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -1.520153 -3.000000 1.826424
vertex 0.000000 -3.000000 1.826424
vertex 0.000000 -3.000000 2.000000
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -1.520153 -3.000000 1.826424
vertex 0.000000 -3.000000 2.000000
vertex -1.520153 -3.000000 2.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 0.000000 1.000000 0.000000
vertex 0.000000 -1.000000 0.000000
vertex -1.652340 -1.000000 0.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 0.000000 1.000000 0.000000
vertex -1.652340 -1.000000 0.000000
vertex -1.652340 1.000000 0.000000
endloop
endfacet
facet normal -0.998724 0.000000 0.050498
outer loop
vertex -1.652340 2.002940 1.826424
vertex -1.652340 -1.000000 1.826424
vertex -1.631337 -1.165350 2.241816
endloop
endfacet
facet normal -0.999855 -0.004476 0.016418
outer loop
vertex -1.652340 2.002940 1.826424
vertex -1.631337 -1.165350 2.241816
vertex -1.652340 2.639683 2.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -1.652340 2.989490 0.000000
vertex -1.652340 3.553143 0.000000
vertex 0.000000 3.553143 0.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -1.652340 2.989490 0.000000
vertex 0.000000 3.553143 0.000000
vertex 0.000000 2.989490 0.000000
endloop
endfacet
facet normal 0.000000 0.800389 -0.599481
outer loop
vertex 0.000000 3.553143 1.826424
vertex -1.652340 3.553143 1.826424
vertex -1.652340 3.809692 2.168952
endloop
endfacet
facet normal 0.000000 0.800389 -0.599481
outer loop
vertex 0.000000 3.553143 1.826424
vertex -1.652340 3.809692 2.168952
vertex 0.000000 3.809692 2.168952
endloop
endfacet
facet normal -0.997823 -0.065950 0.000000
outer loop
vertex -1.652340 -1.000000 1.826424
vertex -1.520153 -3.000000 1.826424
vertex -1.520153 -3.000000 2.000000
endloop
endfacet
facet normal -0.997650 -0.063763 0.025062
outer loop
vertex -1.652340 -1.000000 1.826424
vertex -1.520153 -3.000000 2.000000
vertex -1.631337 -1.165350 2.241816
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 0.000000 -1.000000 0.000000
vertex 0.000000 -3.000000 0.000000
vertex -1.520153 -3.000000 0.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 0.000000 -1.000000 0.000000
vertex -1.520153 -3.000000 0.000000
vertex -1.652340 -1.000000 0.000000
endloop
endfacet
facet normal 0.000000 0.617778 0.786353
outer loop
vertex -1.652340 2.639683 2.000000
vertex -1.487923 1.188866 3.139796
vertex 0.000000 1.188866 3.139796
endloop
endfacet
facet normal 0.000000 0.617778 0.786353
outer loop
vertex -1.652340 2.639683 2.000000
vertex 0.000000 1.188866 3.139796
vertex 0.000000 2.639683 2.000000
endloop
endfacet
facet normal 0.000000 -0.314092 0.949392
outer loop
vertex 0.000000 3.299007 2.000000
vertex 0.000000 3.809692 2.168952
vertex -1.652340 3.809692 2.168952
endloop
endfacet
facet normal 0.000000 -0.314092 0.949392
outer loop
vertex 0.000000 3.299007 2.000000
vertex -1.652340 3.809692 2.168952
vertex -1.652340 3.299007 2.000000
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -1.652340 3.272145 1.826424
vertex -1.652340 3.553143 1.826424
vertex -1.652340 3.553143 0.000000
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -1.652340 3.272145 1.826424
vertex -1.652340 3.553143 0.000000
vertex -1.652340 2.989490 0.000000
endloop
endfacet
facet normal 0.000000 0.139351 0.990243
outer loop
vertex -1.487923 1.188866 3.139796
vertex -1.487923 -0.532381 3.382018
vertex 0.000000 -0.532381 3.382018
endloop
endfacet
facet normal 0.000000 0.139351 0.990243
outer loop
vertex -1.487923 1.188866 3.139796
vertex 0.000000 -0.532381 3.382018
vertex 0.000000 1.188866 3.139796
endloop
endfacet
facet normal -0.993131 0.016305 0.115864
outer loop
vertex -1.631337 -1.165350 2.241816
vertex -1.487923 -0.532381 3.382018
vertex -1.487923 1.188866 3.139796
endloop
endfacet
facet normal -0.989030 0.003925 0.147666
outer loop
vertex -1.631337 -1.165350 2.241816
vertex -1.487923 1.188866 3.139796
vertex -1.652340 2.639683 2.000000
endloop
endfacet
facet normal 0.000000 -0.874313 0.485363
outer loop
vertex 0.000000 -1.165350 2.241816
vertex 0.000000 -0.532381 3.382018
vertex -1.487923 -0.532381 3.382018
endloop
endfacet
facet normal 0.000000 -0.874313 0.485363
outer loop
vertex 0.000000 -1.165350 2.241816
vertex -1.487923 -0.532381 3.382018
vertex -1.631337 -1.165350 2.241816
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -1.652340 3.299007 2.000000
vertex -1.652340 3.809692 2.168952
vertex -1.652340 3.553143 1.826424
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -1.652340 3.299007 2.000000
vertex -1.652340 3.553143 1.826424
vertex -1.652340 3.272145 1.826424
endloop
endfacet
facet normal -0.997823 -0.065950 0.000000
outer loop
vertex -1.652340 -1.000000 0.000000
vertex -1.520153 -3.000000 0.000000
vertex -1.520153 -3.000000 1.826424
endloop
endfacet
facet normal -0.997823 -0.065950 0.000000
outer loop
vertex -1.652340 -1.000000 0.000000
vertex -1.520153 -3.000000 1.826424
vertex -1.652340 -1.000000 1.826424
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 0.000000 3.553143 0.000000
vertex -1.652340 3.553143 0.000000
vertex -1.652340 3.553143 1.826424
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 0.000000 3.553143 0.000000
vertex -1.652340 3.553143 1.826424
vertex 0.000000 3.553143 1.826424
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -1.652340 1.000000 0.000000
vertex -1.652340 -1.000000 0.000000
vertex -1.652340 -1.000000 1.826424
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -1.652340 1.000000 0.000000
vertex -1.652340 -1.000000 1.826424
vertex -1.652340 2.002940 1.826424
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -1.520153 -3.000000 0.000000
vertex 0.000000 -3.000000 0.000000
vertex 0.000000 -3.000000 1.826424
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -1.520153 -3.000000 0.000000
vertex 0.000000 -3.000000 1.826424
vertex -1.520153 -3.000000 1.826424
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -1.652340 2.639683 2.000000
vertex -1.652340 3.299007 2.000000
vertex -1.652340 3.272145 1.826424
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -1.652340 2.639683 2.000000
vertex -1.652340 3.272145 1.826424
vertex -1.652340 2.002940 1.826424
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -1.652340 2.002940 1.826424
vertex -1.652340 3.272145 1.826424
vertex -1.652340 2.989490 0.000000
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -1.652340 2.002940 1.826424
vertex -1.652340 2.989490 0.000000
vertex -1.652340 1.000000 0.000000
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 2.639683 2.000000
vertex 0.000000 3.299007 2.000000
vertex -1.652340 3.299007 2.000000
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 2.639683 2.000000
vertex -1.652340 3.299007 2.000000
vertex -1.652340 2.639683 2.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -1.652340 1.000000 0.000000
vertex -1.652340 2.989490 0.000000
vertex 0.000000 2.989490 0.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -1.652340 1.000000 0.000000
vertex 0.000000 2.989490 0.000000
vertex 0.000000 1.000000 0.000000
endloop
endfacet
endsolid Exported from Blender-4.1.1

`;

const scaling = 5;

function renderStl(stl){
    let lines = stl.split("\n");
    // only keep the ones that start with "vertex"
    let vertices = lines.filter(line => line.startsWith("vertex"));
    //console.log(vertices);
    for (let i = 0; i < vertices.length; i+=3){
        let vertex = vertices[i].split(" ");
        let x = parseFloat(vertex[1]) * scaling;
        let y = parseFloat(vertex[2]) * scaling;
        let z = parseFloat(vertex[3]) * scaling;
        //console.log(x, y, z);
        let vertex2 = vertices[i+1].split(" ");
        let x2 = parseFloat(vertex2[1]) * scaling;
        let y2 = parseFloat(vertex2[2]) * scaling;
        let z2 = parseFloat(vertex2[3]) * scaling;
        //console.log(x2, y2, z2);
        let vertex3 = vertices[i+2].split(" ");
        let x3 = parseFloat(vertex3[1]) * scaling;
        let y3 = parseFloat(vertex3[2]) * scaling;
        let z3 = parseFloat(vertex3[3]) * scaling;
        //console.log(x3, y3, z3);
        drawWireFrame(x, y, z, x2, y2, z2);
        drawWireFrame(x2, y2, z2, x3, y3, z3);
        drawWireFrame(x3, y3, z3, x, y, z);

    }
}

// define colors
const colours = {
    black: "0",
    light_grey: "1",
    white: "2",
    red: "3",
    light_green: "4",
    dark_blue: "5",
    yellow: "6",
    light_blue: "7",
    pink: "8",
    orange: "9",
    brown: "C",
    dark_green: "D",
    gold: "F",
    purple: "H",
    dark_grey: "L",
};
// textures
const textures = {
    missingTexture: [
        [colours.black, colours.purple, colours.black, colours.purple],
        [colours.purple, colours.black, colours.purple, colours.black],
        [colours.black, colours.purple, colours.black, colours.purple],
        [colours.purple, colours.black, colours.purple, colours.black]
    ]
}
// set up everything


// render is called after this definition

// things you want to render
function render() {
    calculateTriggerValues();
    renderStl(stl);
    // code goes here

    /*
      Notes
      the top is +y
      bottom is -y
      left is -x
      right is +x
      further is +z
      closer is -z
    */

    // Cube

    // front
    // front top
    drawWireFrame(-10, 10, 0, 10, 10, 0);
    // front bottom
    drawWireFrame(-10, -10, 0, 10, -10, 0);
    // front right
    drawWireFrame(10, -10, 0, 10, 10, 0);
    // front left
    drawWireFrame(-10, -10, 0, -10, 10, 0);

    // back, same as front but with z = 20
    // back top
    drawWireFrame(-10, 10, 20, 10, 10, 20);
    // back bottom
    drawWireFrame(-10, -10, 20, 10, -10, 20);
    // back right
    drawWireFrame(10, -10, 20, 10, 10, 20);
    // back left
    drawWireFrame(-10, -10, 20, -10, 10, 20);

    // links
    // top right
    drawWireFrame(10, 10, 0, 10, 10, 20);
    // top left
    drawWireFrame(-10, 10, 0, -10, 10, 20);
    // bottom right
    drawWireFrame(-10, -10, 0, -10, -10, 20);
    // bottom left
    drawWireFrame(10, -10, 0, 10, -10, 20);

    //Roof
    drawWireFrame(-10, 10, 20, 0, 20, 20); // fr
    drawWireFrame(10, 10, 20, 0, 20, 20); // fl
    drawWireFrame(-10, 10, 0, 0, 20, 0); // br
    drawWireFrame(10, 10, 0, 0, 20, 0); // bl
    drawWireFrame(0, 20, 20, 0, 20, 0) // link


    // Pyramid

    // front
    drawWireFrame(-60, -10, 0, -40, -10, 0, colours.red);
    // back
    drawWireFrame(-60, -10, 20, -40, -10, 20, colours.red);
    // right union
    drawWireFrame(-40, -10, 0, -40, -10, 20, colours.red);
    // left union
    drawWireFrame(-60, -10, 0, -60, -10, 20, colours.red);

    // center unions

    // front right
    drawWireFrame(-50, 10, 10, -40, -10, 0, colours.red);
    // front left
    drawWireFrame(-50, 10, 10, -60, -10, 0, colours.red);

    // back right
    drawWireFrame(-50, 10, 10, -40, -10, 20, colours.red);
    // back left
    drawWireFrame(-50, 10, 10, -60, -10, 20, colours.red);

   

}
render();

// functions

// draw functions
function drawTexturedPlane(x, y, z, size, texture = textures.missingTexture)
{
    // x, y, z are the center of the plane
    // size is the height and width of the plane
    let halfSize = size / 2;
    let points =
    {
        frontLeft: [x - halfSize, y, z - halfSize],
        frontRight: [x + halfSize, y, z - halfSize],
        backLeft: [x - halfSize, y, z + halfSize],
        backRight: [x + halfSize, y, z + halfSize]
    }
    let textureSize = texture.length;
    for (let pixelLine = 0; pixelLine < textureSize; pixelLine++)
    {
        for (let pixelInPixelLine = 0; pixelInPixelLine < textureSize; pixelInPixelLine++)
        {
            drawWireFrame(
                points.frontLeft[0] + pixelInPixelLine * (size / textureSize),
                points.frontLeft[1],
                points.frontLeft[2] + pixelLine * (size / textureSize),
                points.frontLeft[0] + (pixelInPixelLine + 1) * (size / textureSize),
                points.frontLeft[1],
                points.frontLeft[2] + (pixelLine) * (size / textureSize),
                texture[pixelLine][pixelInPixelLine]
            )
        }
    }
    drawWireFramePlane(x, y, z, size);
}
function drawWireFramePlane(x, y, z, size, colour = colours.black)
{
    // x, y, z are the center of the plane
    // size is the height and width of the plane
    let halfSize = size / 2;
    drawWireFrame(x - halfSize, y, z - halfSize, x + halfSize, y, z - halfSize, colour);
    drawWireFrame(x - halfSize, y, z - halfSize, x - halfSize, y, z + halfSize, colour);
    drawWireFrame(x + halfSize, y, z + halfSize, x - halfSize, y, z + halfSize, colour);
    drawWireFrame(x + halfSize, y, z + halfSize, x + halfSize, y, z - halfSize, colour);
}

function drawLine(x1, y1, x2, y2, colour = "5")
{
    // TODO: 
    t.jump([x1, y1]);
    t.goTo([x2, y2]);


}
function drawWireFrame(fx1, fy1, fz1, fx2, fy2, fz2, colour = "5")
{ // f stands for function

    // set initial points
    setPoint1((fx1 - camX), -(fy1 - camY), -(fz1 - camZ));
    setPoint2((fx2 - camX), -(fy2 - camY), -(fz2 - camZ));

    // rotation

    setPoint1((z1 * sinY) + (x1 * cosY), y1, (z1 * cosY) - (x1 * sinY));
    setPoint2((z2 * sinY) + (x2 * cosY), y2, (z2 * cosY) - (x2 * sinY));

    setPoint1(x1, (y1 * cosX) - (z1 * sinX), (y1 * sinX) + (z1 * cosX));
    setPoint2(x2, (y2 * cosX) - (z2 * sinX), (y2 * sinX) + (z2 * cosX));

    // rendering something the camera won't see is pointless

    if (!((z1 < nearPlane) && (z2 < nearPlane))) {

        zClipping();

        setScreenPoint1(focalLength * (x1 / z1), focalLength * (y1 / z1));
        setScreenPoint2(focalLength * (x2 / z2), focalLength * (y2 / z2));

        drawLine(80 + Math.round(x1), 64 + Math.round(y1), 80 + Math.round(x2), 64 + Math.round(y2), colour);

    }
}

// zClipping, xy clipping is taken care of while lines are drawn
function zClipping()
{
    if ((z1 < nearPlane) || (z2 < nearPlane)) {

        percent = (nearPlane - z1) / (z2 - z1);

        if (z1 < nearPlane) {

            setPoint1(x1 + (x2 - x1) * percent, y1 + (y2 - y1) * percent, nearPlane);

        } else if (z2 < nearPlane) {
            setPoint2(x1 + (x2 - x1) * percent, y1 + (y2 - y1) * percent, nearPlane);
        }
    }
}

// calculate cos and sin values
function calculateTriggerValues()
{
    // calculates cos and sin values so that the computer only calculates them once per frame
    cosX = Math.cos(rotX);
    sinX = Math.sin(rotX);

    cosY = Math.cos(rotY);
    sinY = Math.sin(rotY);
}

// set screen points
function setScreenPoint1(x, y)
{
    x1 = Math.round(x);
    y1 = Math.round(y);
}
function setScreenPoint2(x, y)
{
    x2 = Math.round(x);
    y2 = Math.round(y);
}
// set points
function setPoint1(x, y, z)
{
    x1 = Math.round(x);
    y1 = Math.round(y);
    z1 = Math.round(z);
}

function setPoint2(x, y, z)
{
    x2 = Math.round(x);
    y2 = Math.round(y);
    z2 = Math.round(z);
}

// BLOT RENDERING

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
//const cc = bt.bounds(finalLines).cc;
//bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);

