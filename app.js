console.log('object');

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
const ctx = canvas.getContext('2d');

const keys = {};

//player

class Ship {
  constructor() {
    this.w = 54;
    this.h = 44;
    this.position = {
      x: canvas.width / 2 - this.w / 2,
      y: canvas.height / 2 - this.h / 2
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.friction = 0.94;
    this.url = './public/nave2.svg';
    this.image = new Image();
    this.image.src = this.url;
    this.image.onload = this.draw;
  }

  update() {
    this.draw();
    this.move();
  }
  move() {
    if (keys["ArrowRight"]) {
      this.velocity.x++;
    }
    if (keys["ArrowLeft"]) {
      this.velocity.x--;
    }
    if (keys["ArrowDown"]) {
      this.velocity.y++;
    }
    if (keys["ArrowUp"]) {
      this.velocity.y--;
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.y *= this.friction;
    this.velocity.x *= this.friction;
    this.watchBorders();
  }
  watchBorders() {
    // if (this.position.x < 0) {
    //     this.position.x = 0
    //     this.velocity.x = 0
    // } else if (this.position.x > canvas.width - this.w) {
    //     this.position.x = canvas.width - this.w
    //     this.velocity.x = 0
    // }
    if (this.position.x < 0) {
      this.position.x = canvas.width - this.w;
      // this.velocity.x = 0
    } else if (this.position.x > canvas.width - this.w) {
      this.position.x = 0;
      // this.velocity.x = 0
    }
    if (this.position.y < 0) {
      this.position.y = canvas.height - this.h;
    } else if (this.position.y > canvas.height - this.h) {
      this.position.y = 0;
    }
  }
  draw() {
    if (!this.image) {
      return;
    }
    // rotation
    ctx.save();
    if (keys["ArrowLeft"]) {
      ctx.translate(this.position.x + this.w / 2, this.position.y + this.h / 2);
      ctx.rotate(-0.25);
      ctx.translate(
        -this.position.x - this.w / 2,
        -this.position.y - this.h / 2
      );
    } else if (keys["ArrowRight"]) {
      ctx.translate(this.position.x + this.w / 2, this.position.y + this.h / 2);
      ctx.rotate(0.25);
      ctx.translate(
        -this.position.x - this.w / 2,
        -this.position.y - this.h / 2
      );
    }
    ctx.drawImage(this.image, this.position.x, this.position.y, this.w, this.h);
    ctx.restore();
  }
}

//aux
const drawStars = (number = 1) => {
  for (let i = 0; i < number; i++) {
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, 1, 3);
    ctx.fillRect(--x + ++y, y, 3, 1);
  }
}

const drawBG = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '30px "Press Start 2P"';
  ctx.fillStyle = "gray";
  ctx.fillText("Press Start", 100, 100);
  drawStars(2);
}

//instances
const ship = new Ship();

//main
const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBG();
  ship.update();
  requestAnimationFrame(update);
}

//key listener
addEventListener("keydown", e => {
  keys[e.key] = true;
});
addEventListener("keyup", e => {
  delete keys[e.key];
});
update();