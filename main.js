const canvas = document.querySelector("#glcanvas");
const ctx = canvas.getContext("2d");

main();
function main() {
  window.requestAnimationFrame(loop);
}


function loop() {
  base();
  animation();

  window.requestAnimationFrame(loop);
}

const w = 900;
const h = 600;

//'#bc13fe'
const neno = 'rgba(188,19,254, 25)';
const black = '#000000';

function base() {
  ctx.fillStyle = black;
  ctx.fillRect(0, 0, w, h);
  drawLine(0, h / 2, w, h / 2);
  drawLine(w / 2, h / 2 - 10, w / 2, h / 2 + 10);
  ctx.fillStyle = neno;
  ctx.strokeStyle = neno;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  const px = w / 2;
  const py = h / 2;
  const step = w / 3;
  for (var i = -w * 4; i <= w * 8; i += step) {
    drawLine(px, py, i, h);
  }

  ctx.fillStyle = black;
  ctx.fillRect(0, h / 2, w, 30);
  drawLine(0, h / 2 + 30, w, 330);

  window.requestAnimationFrame(animation);
}

function horizonLine(x0, y0, x1, y1) {
  const ofs = ctx.fillStyle;
  const oss = ctx.stroke;

  const pivotX = (x1-x0)/2;
  const pivotY = y0;
  const endStep = (x1-x0) / 3;



  ctx.fillStyle = ofs;
  ctx.stroke = oss;
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
}

const fps = 90;
var cyc = 0;

function animation() {
  cyc = (cyc+1)%fps;

  let startY = h/2+30;
  let step = (h- startY) / 6;

  for (var i=startY; i<=h; i+=step) {
    let p = i+(step/fps)*cyc;
    drawLine(0, p, w, p);
  }
}

function bar(x0, y0, x1, y1, cnt) {
  const h0 = y1-y0;
  const w0 = x1-x0;
  const step = w0 / cnt;
  const hh = h0 / 5;
  let old = ctx.lineWidth;
  for (var i=x0; i<=x1; i+=step) {
    var hhh = (Math.random() * 10)
    ctx.fillRect(i, y1, step, hh * hhh);
  }
  ctx.lineWidth = old;
}

// https://towardsdatascience.com/creating-synthwave-with-matplotlib-ea7c9be59760