const canvas = document.querySelector("#glcanvas");
const ctx = canvas.getContext("2d");

const width = 900;
const height = 600;
const neno = 'rgba(188,19,254, 25)';
const black = '#000000';
const fps = 90;

main();
function main() {
  const list = generateBuilding(0, width, height / 2, 20, 20, 5);
  const move = verticalMove(0, height / 2 + 20 * 4, width, height, 5);
  setInterval(loop(list, move), 1000/fps);
}

function loop(list, move) {
  return () => {
    ctx.fillStyle = black;
    ctx.fillRect(0, 0, width, height);
    horizonLine(0, height / 2, width, height);
    renderBuilding(list);
    move();
  }
}

function horizonLine(x0, y0, x1, y1) {
  const ofs = ctx.fillStyle;
  const oss = ctx.stroke;
  const lw = ctx.lineWidth;
  ctx.fillStyle = neno;
  ctx.strokeStyle = neno;
  ctx.lineWidth = 4;

  const w = x1 - x0;
  const pivotX = w / 2;
  const pivotY = y0;
  const endStep = w / 3;
  for (var i = -w * 4; i <= w * 8; i += endStep) {
    drawLine(pivotX, pivotY, i, y1);
  }

  ctx.fillStyle = ofs;
  ctx.stroke = oss;
  ctx.lineWidth = lw;
}

function generateBuilding(start, end, baseLine, blkW, blkH, blkMax) {
  const th = blkH * (blkMax - 1);
  let list = [{
    X: start, Y: baseLine,
    W: end - start, H: th,
  }];
  for (var i = start; i <= end; i += blkW) {
    var h = (parseInt(Math.random() * blkMax)) * blkH
    list.push({
      X: i, Y: baseLine + th,
      W: blkW, H: -h,
    });
  }
  return list;
}

function renderBuilding(list) {
  const os = ctx.fillStyle;
  const bg = list[0];
  var gradient = ctx.createLinearGradient(bg.X, bg.Y, bg.X, bg.Y + bg.H);
  gradient.addColorStop(0, 'black');
  gradient.addColorStop(1, neno);
  ctx.fillStyle = gradient;
  ctx.fillRect(bg.X, bg.Y, bg.W, bg.H);

  ctx.fillStyle = black;
  for (const i of list.slice(1)) {
    ctx.fillRect(i.X, i.Y, i.W, i.H);
  }
  ctx.fillStyle = os;
}


function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
}

function verticalMove(x0, y0, x1, y1, lineCnt = 6) {
  var frame = 0;
  const step = (y1 - y0) / lineCnt
  const w = x1 - x0;
  return () => {
    frame = (frame + 1) % fps;
    for (var i = y0; i <= y1; i += step) {
      var p = i + (step / fps) * frame;
      drawLine(0, p, w, p);
    }
  }
}

// https://towardsdatascience.com/creating-synthwave-with-matplotlib-ea7c9be59760