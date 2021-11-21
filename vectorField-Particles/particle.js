class Particle{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.vel= createVector(0,0);
    this.acc= createVector(0,0);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);//Reset acceleration
    this.vel.limit(1);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    strokeWeight(4);
    stroke(2);
    point(this.pos.x,this.pos.y);//let's make some points
  }

  edges() {
    if(this.pos.x>width)this.pos.x = 0;
    if(this.pos.x<0)this.pos.x = width;
    if(this.pos.y<0)this.pos.y = height; if(this.pos.y>height)this.pos.y = 0;
  }//keep the particles inside the canvas

  follow(vectors) {
    var x = floor(this.pos.x/scl);//position in relationship to scale "vectr unit or grid"
    var y = floor(this.pos.y/scl);
    var index = x+y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
}
