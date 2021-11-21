var inc = 0.1;
var scl = 20;
var cols;
var rows;
var zoff = 0;
var particles = [];
var flowField;

function setup() {
  createCanvas(600,600);
  cols = floor(width/scl);
  rows = floor(height/scl);
  flowField = new Array(cols*rows);//store all of the coordinates of the flowfield
  for(var i=0; i<100;i++){
    particles[i] = new Particle(random(width),random(height));//start object
  }
}

function draw() {
  background(255);
  beginShape();
  var yoff =0;
  for(var y=0; y<rows;y++){
    xoff =0;
    for(var x=0; x<cols;x++){
      var index = x+y*cols;//position of each field
      var angle = noise(xoff,yoff,zoff)* TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.1);//normalize this vector
      flowField[index] = v;//store all of the vectors calculated into flowField
      stroke(0);
      push();
      translate(x*scl,y*scl);
      rotate(angle);
      strokeWeight(1);
      line(0,0,scl,0);
      pop();
      xoff +=inc;
      zoff +=0.00001;
    }
    yoff +=inc;
  }
  //addParticles();
  for(let i=0; i < particles.length; i++){
    particles[i].follow(flowField)
    particles[i].show();
    particles[i].update();
    particles[i].edges();
  }
}
