let settings;
let population;
let lifespan = 500;
let popsize = 50;
let lifeP;
let count = 0;
let target;
let finished = 0;
let maxforce = 0.2;
let mutationrate = 0.01;
let generation = 0;
let fitnesslevel = 0;
let maxfit = 0;
let factCompleted = 10;
let factCrashed = 0.1;
let factOut = 0.1;

let rx = 250;
let ry = 300;
let rw = 300;
let rh = 10;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.position(0, 0);
  population = new Population(popsize);
  lifeP = createP();
  target = createVector(width / 2, 100);

  settings = QuickSettings.create(820, 20, "Smart Rockets");
  settings.setDraggable(true);
  settings.addHTML("Einstellungen1", "<strong>Einstellungen Population</strong>");
    settings.hideTitle("Einstellungen1");
  settings.addRange("Populationsgröße", 0, 100, popsize, 5, function(value) { popsize = value; });
  settings.addRange("Mutationsrate", 0, 0.05, mutationrate, 0.001, function(value) { mutationrate = value; });
  settings.addRange("Lebenszeit", 300, 600, lifespan, 10, function(value) { lifespan = value; });
  settings.addHTML("Einstellungen2", "<strong>Einstellungen Fitness</strong>");
    settings.hideTitle("Einstellungen2");
  settings.addRange("FitnessFactor Completed", 1, 50, factCompleted, 1, function(value) { factCompleted = value; });
  settings.addRange("FitnessFactor Crashed", 0.02, 0.5, factCrashed, 0.01, function(value) { factCrashed = value; });
  settings.addButton("  Population neu initialisieren  ", function() { initPop(); });
}

function draw() {
  background(0);
  population.run();
  lifeP.html(count);

  count++;
  if (count >= lifespan) {
    population.evaluate();
    // population = new Population();
    fitnesslevel = 0;
    finished = 0;
    for (let i = 0; i < population.rockets.length; i++) {
      fitnesslevel += population.rockets[i].fitness * maxfit / population.rockets.length;
      if (population.rockets[i].completed) {
        finished += 1;
      }
    }
    population.selection();
    count = 0;
    generation += 1;
  }


  rect(rx, ry, rw, rh);

  ellipse(target.x, target.y, 20, 20);

  textSize(14);
  fill(255);
  text(`Generation: ${generation}`, 700, 30);
  text(`Fitness: ${Math.round(fitnesslevel)}`, 700, 50);
  text(`Im Ziel: ${finished}`, 700, 70);
  text(`Timer: ${count}`, 700, 90);
}

function initPop() {
  population = new Population(popsize);
  count = 0;
  generation = 0;
  finished = 0;
}
