class Vectorfield {
  constructor(scl){
    cols = floor(width/scl);
    rows = floor(height/scl);
  }

  show() {
    beginShape();
    var yoff = 0;
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
        translate(x*scl, y*scl);
        rotate(angle);
        strokeWeight(1);
        line(0, 0, scl, 0);
        pop();
        xoff += inc;
        zoff += 0.00001;
      }
      yoff +=inc;
    }
  }
}
