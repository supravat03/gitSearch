const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = document.body.scrollWidth;
canvas.height = Math.max( document.body.scrollHeight, innerHeight);

let mouse = {
  x: document.body.scrollWidth / 2,
  y: document.body.scrollHeight / 2,
};

let colorsArray = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

const heightRate = 0.2;
const decreaseRate = 0.98;


addEventListener("resize",  ()=> {
  canvas.width = document.body.scrollWidth;
  canvas.height = Math.max( document.body.scrollHeight, innerHeight);
  createBall();
});

addEventListener("click", ()=> {
  createBall();
});

let randomNumber= (min, max)=> {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let randomColor= (colorsArray)=> {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
}

function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.update = () => {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * decreaseRate;
      this.dx = this.dx * decreaseRate;
    } else {
      this.dy += heightRate;
    }

    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx * decreaseRate;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI , false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  };
}

let ballArray = [];

let createBall=()=> {
  ballArray = [];

  for (let i = 0; i < 150; i++) {
    let radius = randomNumber(8, 20);
    let x = randomNumber(radius, canvas.width - radius);
    let y = randomNumber(0, canvas.height - radius);
    let dx = randomNumber(-3, 3);
    let dy = randomNumber(-2, 2);
    ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(colorsArray)));
  }
}

let animate= ()=> {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}

createBall();
animate();
