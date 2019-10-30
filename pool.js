
const FPS = 24;

const main = document.getElementsByClassName("main")[0];

const table = new Image();
table.src = "/assets/pool_table.png";
table.className = "table";

const n10 = new Image();
n10.src = "/assets/pool_10.png";

const n12 = new Image();
n12.src = "/assets/pool_12.png";

n10.className = n12.className = "ball";

const stick = new Image();
stick.src = "/assets/pool_stick.png";
stick.className = "stick";
stick.style.left = "320px";
stick.style.top = "220px";

n10.style.left = "300px";
n10.style.top = "200px";

n12.style.left = "180px";
n12.style.top = "95px";

main.innerHTML = "";
main.style.position = "relative";
main.append(table, n10, n12, stick);

/**
 * interpolazione: inplementa la frazione di spostamento
 * @param {*} style
 * @param {*} leftOrigin
 * @param {*} topOrigin
 * @param {*} tLeft
 * @param {*} tTop
 * @param {*} progress
 */
const move = (style, leftOrigin, topOrigin, tLeft, tTop, progress) => {
  const left = parseFloat(leftOrigin);
  const top = parseFloat(topOrigin);
  style.left = `${left + (tLeft - left) * progress}px`;
  style.top = `${top + (tTop - top) * progress}px`;
};

const schedule = fn => setTimeout(fn, 1000 / FPS);
// const schedule = fn => requestAnimationFrame(fn);

/**
 * lancia l'animazione muovendo element dalla posizione
 * attuale a `targetLeft`:`targetTop` in `time`ms
 * @param {*} element
 * @param {*} time
 * @param {*} targetLeft
 * @param {*} targetTop
 * @returns Promise
 */
const animateTo = (element, time, targetLeft, targetTop) => {
  return new Promise((resolve, reject) => {
    const { style } = element;
    const start = Date.now();
    const leftOrigin = style.left;
    const topOrigin = style.top;
    console.log(`start move: ${leftOrigin}:${topOrigin}`);
    let count = 1;
    schedule(function fraction() {
      // calcolo il tempo trascorso dall'inizio dell'animazione
      const elapsed = Date.now() - start;
      // calcolo l'avanzamento dell'animazione (da 0 a 1)
      const progress = elapsed / time;

      console.log(`repaint ${count++} >> ${style.left}:${style.top}`);
      if (progress > 1) {
        move(style, leftOrigin, topOrigin, targetLeft, targetTop, 1);
        console.log(`end animation: ${style.left}:${style.top}`);
        resolve();
      } else {
        move(style, leftOrigin, topOrigin, targetLeft, targetTop, progress);
        schedule(fraction);
        // setTimeout(fraction, 1000 / FPS);
      }
    });
  });
};

const play = () => {
  animateTo(stick, 200, 300, 200).then(() => {
    animateTo(n10, 650, 200, 100).then(()=> {
      animateTo(n12, 700, 12, 15)
      animateTo(n10, 700, 280, 31).then(()=> {
        n12.style.opacity = 0
        animateTo(n10, 1200, 450, 110).then(()=> {
          animateTo(n10, 2700, 236, 250).then(()=> {
            n10.style.opacity = 0
          })
        })
      })
    });
  });
 };

table.onclick = play;

/**
 * - Manda in buca le due palline
 * - Quando le palline sono in buca,
 * falle sparire con un'animazione sull'opacity
 * - Le due palline hanno velocità diversa
 */
