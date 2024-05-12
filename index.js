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

    drawTexturedPlane(0,-10,0,20);

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