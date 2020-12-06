let local_frameRate = 60;
let settings;

let color = 100;
let rahmen = true;
let rectangulars = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  frameRate(local_frameRate);

	colorMode(HSB);

	  settings = QuickSettings.create(20, 20, "Empty Example");
	settings.setDraggable(true);
	settings.addRange("Farbe des nächsten Rechtecks", 0, 360, color, 1, function(value) { color = value; });
	settings.addButton("Rechteck erschaffen", function() { initRect(); });
		settings.overrideStyle("Rechteck erschaffen", "width", "100%");
	settings.addBoolean("Rahmen anzeigen", true, function(value) { rahmen = value; });
	settings.addHTML("Recheck Erstellung", "<strong>Neues Rechteck erstellen:</strong></br>Farbe auswählen, dann Button drücken.");
		settings.hideTitle("Recheck Erstellung");
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(250);
	rectMode(CENTER);

	for (let r of rectangulars) {
		if (rahmen) {
			stroke(0);
		} else {
			noStroke();
		}
		fill(r.color, 100, 100);
		rect(r.posX, r.posY, r.width, r.height);
	}

  // if (mouseIsPressed) {
	//
  // }
}

function initRect() {
	let x = random(0, windowWidth);
	let y = random(0, windowHeight);
	// let x = random(windowWidth, windowHeight);
	// let y = random(windowWidth, windowHeight);
	let w = random(10, 50);
	let h = random(10, 50);
	let r = {
		posX: x,
		posY: y,
		color: color,
		width: w,
		height: h,
	};
	rectangulars.push(r);
}
	//
  // //schiebe das gewählte Element an die gewünschte Position
  // function arrayMoveElement(arry, altIndex, neuIndex) {
  //     if (neuIndex >= arry.length) {
  //         var k = neuIndex - arry.length + 1;
  //         while (k--) {
  //             arry.push(undefined);
  //         }
  //     }
  //     arry.splice(neuIndex, 0, arry.splice(altIndex, 1)[0]);
  //     return arry;
  // }

// function gObjekt(m, ort) {
// 	this.masse = m;
// 	this.ort = ort;
// 	this.gKraftArray = [];
// 	this.resGKraft = createVector(0, 0);
// 	let randomIndex = Math.ceil(random(planetFarbPalette.length-1));
// 	this.farbe = planetFarbPalette[randomIndex];
// 	this.radius = Math.cbrt(this.masse);
//   this.verschieben = function(neueKoord) {
//     this.ort = neueKoord;
//   };
// }
//
// function gObjektDazu(m, ort) {
// 	let gObj = new gObjekt(m, ort);
// 	gObjektArray.push(gObj);
// }
