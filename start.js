// PARAMÉTEREK:
const SCREEN_W = 1120;
const SCREEN_H = 630;
const CHANCE_OF_SICK = 15.00; // kezdeti beteg egyedek %-os aránya az össz populációban
const NUM_OF_POP = 500;       // populáció létszáma

const X_AXIS = 1000;
const Y_AXIS = 500;
const MAX_STEP = 1000;        // összes vizsgálat száma

var mStep = 200;             // M lépés szám
var step = 0;                 // az éppen futó kalkuláció sorszáma
var sicks = new Array();      // "I" státusz
var avSicks = 0;
var sensitives = new Array(); // "S" státusz
var avSens = 0;
var recovereds = new Array(); // "R" státusz
var avRecos = 0;

var beta = 10.00;             // fertőződési esély % (0-99.99)
var gamma = 10.00;            // gyógyulási esély % (0-99.99)
var delta = 10.00;            // érzékennyé válási esély % (0-99.99)
var population = new Array();

// --- INICIALIZÁLÁS ---
function setup() {
   frameRate(1);
   createCanvas(SCREEN_W, SCREEN_H);
   background(10);
}

// --- FŐPROGRAM ---
function draw() {
   
   drawAxes();
   populationInit();

   while (step < 1000) {
      calculation();

      // eddigi eredmények átlagolása
      averageCalc();

      // eredmény megjelenítése a grafikonon
      let x = X_AXIS / MAX_STEP;
      let y = Y_AXIS / (avSicks + avSens + avRecos);
      strokeWeight(2);
      stroke(0, 255, 0);
      line(x * step + 62, 568, x * step + 62, 568 - y * (avSicks + avSens + avRecos));
      stroke(0, 0, 255);
      line(x * step + 62, 568, x * step + 62, 568 - y * (avSicks + avSens));
      stroke(255, 0, 0);
      line(x * step + 62, 568, x * step + 62, 568 - y * (avSicks));

      console.log(avSicks + avSens + avRecos);
      step++;
   }
   for (i = 0; i < 10000000; i++) {
      ;
   }

}

function populationInit() {
   for (let i = 0; i < NUM_OF_POP; i++) {
      let status = random(100);
      if (status < CHANCE_OF_SICK)
         population[i] = 1;
      else
         population[i] = 0;
   }
   console.log("populáció: " + population.length);
}

function calculation() {
   sicks[step] = 0;
   sensitives[step] = 0;
   recovereds[step] = 0;

   for (let i = 0; i < mStep; i++) {
      let r1 = parseInt(random(NUM_OF_POP));
      let r2 = parseInt(random(NUM_OF_POP));
      if (population[r1] == 1) {
         sicks[step]++;
         let r3 = random(100);
         if (r3 < gamma) {
            population[r1] = 0;     // gyógyulttá válik
         }
      }
      else if (population[r1] == 2) {
         sensitives[step]++;
         while (r1 == r2) {
            r2 = parseInt(random(NUM_OF_POP));
         }
         if (population[r2] == 1) {
            let r3 = random(100);
            if (r3 < beta) {
               population[r1] = 1;  // megbetegszik
            }
         }
      }
      else {
         recovereds[step]++;
         let r3 = random(100);
         if (r3 < delta) {
            population[r1] = 2;     // érzékennyé válik
         }
      }
   }
}

// koordináta tengelyek kirajzolása
function drawAxes() {
   stroke(255, 234, 0);
   strokeWeight(3);
   line(60, 70, 60, 590);
   line(50, 70, 60, 70);
   line(50, 320, 60, 320);
   line(40, 570, 1060, 570);
   line(1060, 570, 1060, 580);
   line(560, 570, 560, 580);
}

function averageCalc() {
   avSicks = 0;
   avSens = 0;
   avSens = 0;

   for (let k = 0; k < sicks.length; k++) {
      avSicks = avSicks + sicks[k];
      avSens = avSens + sensitives[k];
      avRecos = avRecos + recovereds[k];
   }

   avSicks = avSicks / (step + 1);
   avSens = avSens / (step + 1);
   avRecos = avRecos / (step + 1);

   console.log("AV-RE: " + avRecos);
   console.log("AV-SE: " + avSens);
   console.log("AV_SI: " + avSicks);

}
