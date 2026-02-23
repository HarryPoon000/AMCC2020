let x, y, radius = 100, centX, centY, t = 0;

function setup() {
  createCanvas(800, 600);
  pixelDensity(4);
  // background(60, 75, 120);
  centX = width / 2;
  centY = height / 2;
  strokeWeight(3);
  stroke(0, 60);
  noFill();
  // circle(centX, centY, radius * 2) // reference only
}

function draw() {
  // circle(width/2, height/2, 400)
  // clear()
  background(255, 90)
  stroke(20, 50, 120);
  beginShape();
  let radius = 100;
  for (let angle = 0; angle <= 360 * 4; angle += 6) {
    radius += noise(t);
    let rad = radians(angle) + t * 5;
    r_noise = radius * (0.2 + noise(t + rad * 0.01, rad * 0.4) * 2)
    let x = centX + r_noise * cos(rad);
    let y = centY + r_noise * sin(rad);
    vertex(x, y);
    // vertex(centX, centY)
    t += map(mouseX, 0, width, 0.00005, 0.0002)
  }
  endShape();
}
