let x, y, radius = 100;

let arr = [];

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
  noStroke();
  smooth();

  arr.push(new dumbCircle(0, 0.005));
}

function mouseClicked(){
  arr.push(new dumbCircle(random(mouseX + mouseY + 10), 0.00001 + random(0.05)));
}
function draw() {
  background(255, 70);

  noFill()
  stroke(0)
  circle(width / 2, height / 2, radius * 2)
  
  arr.map((circ) => {
    circ.drawDumb()
  })

}

class dumbCircle {
  constructor(t = 0, delta = 0.02) {
    this.x = 0;
    this.y = 0;
    this.radius = 100;
    this.t = t;
    this.delta = delta;
  }

  drawDumb() {
    push()
    let radius_noise = radius + noise(this.t + 10) * 100 - 50; // radius + val (in (-50, 50))
    let rad = noise(this.t) * PI * 4; // update rotation angle
    this.x = width / 2 + radius_noise * cos(rad);
    this.y = height / 2 + radius_noise * sin(rad);

    noStroke()
    fill(noise(this.t + 20) * 255, noise(this.t + 30) * 255, noise(this.t + 40) * 255);
    translate(this.x, this.y)
    rotate(rad + noise(this.t + 50) * 50)
    rect(0, 0, 30, 30);
    pop()
    this.t += this.delta;
  }
}