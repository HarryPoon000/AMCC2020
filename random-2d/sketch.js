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
  clear()
  stroke(20, 50, 120);
  beginShape();
  let radius = 100;
  for (let angle = 0; angle <= 360 * 5; angle += 6) {
    radius += noise(t);
    let rad = radians(angle);
    r_noise = radius * (0.2 + noise(t + rad * 0.01, rad * 0.4) * 2)
    let x = centX + r_noise * cos(rad);
    let y = centY + r_noise * sin(rad);
    // strokeWeight(7);
    // point(x, y);
    // strokeWeight(3);
    vertex(x, y);
    t += 0.0001
  }
  endShape();
}
