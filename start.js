// PARAMÉTEREK:
SCREEN_W = 800;
SCREEN_H = 600;
NUM_OF_POPULATION = 100000;
CHANCE_OF_SICK = 5.00; // kezdeti beteg egyedek %-os aránya az össz populációban

var individuals = new Array(NUM_OF_POPULATION);

// --- INICIALIZÁLÁS ---
function setup() {
   frameRate(60);
   createCanvas(SCREEN_W, SCREEN_H);
   populationInit(NUM_OF_POPULATION);
}

// --- FŐPROGRAM ---
function draw() {
   background(10);
   

}

function populationInit(quantity) {
   for (let i = 0; i < quantity; i++) {
      let status = random();
      if (status < CHANCE_OF_SICK)
         status = 1;
      else
         status = 0;
      individuals[i] = new Person(status);
   } 
   
}
