class Planet {
  constructor(r, d, s, img) {

    this.radius = r;
    this.distance = d;
    this.angle = random(TWO_PI);
    // this.v = p5.Vector.random3D().mult(this.distance);
    this.v = createVector(random(-1, 1), 0, 0).normalize().mult(this.distance);
    this.planets = [];
    this.orbitspeed = s;
    this.img = img;
  }

  orbit() {
    this.angle += this.orbitspeed;
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].orbit();
    }
  }

  spawnMoons(total, level) {
    for (let i = 0; i < total; i++) {
      let r = this.radius / (level * 2) * random(0.4, 1);
      let d = random(75, 300) / (level ** 2);
      let s = random(0.001, 0.01) * 2 * level;
      let index = floor(random(0, jpgs.length));
      let moon = new Planet(r, d, s, jpgs[index]);
      this.planets.push(moon);
      if (level < 2) {
        let num = floor(random(0, 4));
        this.planets[i].spawnMoons(num, level + 1);
      }
    }
  }

  show() {

    noStroke();
    if (this.level == 1) {
      texture(sunjpg);
    } else {
      texture(this.img);
    }

    sphere(this.radius);
    for (let i = 0; i < this.planets.length; i++) {
      push();

      let v2 = createVector(0, 0, 1);
      let p = p5.Vector.cross(this.planets[i].v, v2);
      if (p.x != 0 || p.y != 0 || p.z != 0) {
        rotate(this.planets[i].angle, p);
        stroke(255);
        // line(0, 0, 0, this.planets[i].v.x, this.planets[i].v.y, this.planets[i].v.z);
        // line(0, 0, 0, p.x, p.y, p.z);
      }
      translate(this.planets[i].v.x, this.planets[i].v.y, this.planets[i].v.z);
      noStroke();
      fill(255);
      // ellipse(0, 0, this.radius * 2, this.radius * 2);
      this.planets[i].show();
      pop();
    }
  }
}
