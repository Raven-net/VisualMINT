class Planet {
  constructor(r, d, s) {
    this.radius = r;
    this.distance = d;
    this.angle = random(TWO_PI);
    this.planets = [];
    this.orbitspeed = s;
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
      let d = random(100, 300) / (level ** 2);
      let s = random(0.001, 0.01) * 2 * level;
      let moon = new Planet(r, d, s);
      this.planets.push(moon);
      if (level < 2){
        let num = floor(random(0, 4));
        this.planets[i].spawnMoons(num, level + 1);
      }
    }
  }

  show() {
    fill(255, 150);
    ellipse(0, 0, this.radius * 2);
    for (let i = 0; i < this.planets.length; i++) {
      push();
      rotate(this.planets[i].angle);
      translate(this.planets[i].distance, 0);
      this.planets[i].show();
      pop();
    }
  }
}
