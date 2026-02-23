let t = 0, dx = 0, dy = 0;
const sep = 5;
const shapesize = 20;
const beta = 0.01;
function setup() {
  createCanvas(600, 600);
}
function draw() {
  background(255)
  for (let y = 0; y < height; y += sep) {
    for (let x = 0; x < width; x += sep) {
      let noiseFactor = noise(x * 0.01 + dx, y * 0.01 + dy, t);
      // set(x, y, color(bright));
      push();
      translate(x, y);
      rotate(radians(noiseFactor*540))
      // line(0, 0, shapesize, 0);
      noStroke()
      fill(50+noiseFactor*255, 255)
      ellipse(0, 0, shapesize, shapesize/2)
      pop();
    }
  }
  // updatePixels();
  t += 0.05;
  dx += 0.01;
  dy += 0.01;
}