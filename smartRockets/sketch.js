let settings;
let population;
let lifespan = 500;
let lifeP;
let count = 0;
let target;
let maxforce = 0.2;
let mutationrate = 0.01;
let fitnesslevel = 0;

let rx = 250;
let ry = 300;
let rw = 300;
let rh = 10;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.position(0, 0);
  population = new Population();
  lifeP = createP();
  target = createVector(width / 2, 100);

  settings = QuickSettings.create(20, 20, "Smart Rockets");
  settings.setDraggable(true);
	settings.addRange("Mutationsrate", 0, 0.1, mutationrate, 0.001, function(value) { mutationrate = value; });
  settings.addHTML("Einstellungen", "<strong>Einstellungen</strong></br>Mutationsrate</br>Populationsgröße");
		settings.hideTitle("Einstellungen");
}

function draw() {
  background(0);
  population.run();
  lifeP.html(count);

  count++;
  if (count == lifespan) {
    population.evaluate();
    // population = new Population();
    fitnesslevel = 0;
    // for (let r of population.rockets) {
    for (let i = 0; i < population.rockets.length; i++) {
      fitnesslevel += population.rockets[i].fitness;
    }
    population.selection();
    count = 0;
  }

  rect(rx, ry, rw, rh);

  ellipse(target.x, target.y, 20, 20);

  textSize(14);
  fill(255);
  text(`Fitness: ${Math.round(fitnesslevel)}`, 700, 50);

}
