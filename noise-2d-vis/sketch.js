let tx = 0, ty = 0;

function setup() {
  createCanvas(400, 400);
  noLoop()
}

function draw() {
  background(0);
  for (let y = 0; y < height; y++) {
    tx = 0;
    for (let x = 0; x < width; x++) {
      let bright = noise(x * 0.01, y * 0.01) * 255;
      fill(bright);
      set(x, y, color(bright));
    }
  }
  updatePixels()
}
