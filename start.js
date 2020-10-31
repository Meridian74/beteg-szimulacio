// PARAMÉTEREK:
const SCREEN_W = 1120;
const SCREEN_H = 630;
const CHANCE_OF_SICK = 5.00;  // kezdeti beteg egyedek %-os aránya az össz populációban
const N = 500;                // populáció létszáma

var m = 1000;                 // M lépés szám

var beta = 10.00;
var gamma = 10.00;
var delta = 10.00;
var population = new Array();

// --- INICIALIZÁLÁS ---
function setup() {
   frameRate(60);
   createCanvas(SCREEN_W, SCREEN_H);
   populationInit();
}

// --- FŐPROGRAM ---
function draw() {
   background(10);
   drawAxes();

}

function populationInit() {
   for (let i = 0; i < N; i++) {
      let status = random(100);
      if (status < CHANCE_OF_SICK)
         population[i] = 1;
      else
         population[i] = 0;
   }
   console.log(population.length);
}

function drawAxes() {
   stroke(255, 234, 0);
   strokeWeight(3);
   line(60,70,60,590);
   line(50,70,60,70);
   line(50,320,60,320);
   line(40,570,1060,570);
   line(1060,570,1060,580);
   line(560,570,560,580);
}
