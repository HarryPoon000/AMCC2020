let tx = 0, ty = 0, t = 0, dens;
const beta = 0.01;
const period = 0.05;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  // noLoop()

  // Load the pixels array. from 
  // https://p5js.org/reference/p5/pixels/
  loadPixels(); 
  // Get the pixel density.
  dens = pixelDensity();
}

function draw() {
  background(0);
  const _mx = mouseX, _my = mouseY;
  for (let y = 0; y < height; y++) {
    tx = 0;
    for (let x = 0; x < width; x++) {
      let bright = noise(x * beta, y * beta, t) * 255;

      // fill(bright);
      // set(x, y, color(bright));
      
      // point to mouse dist (without using sqrt due to )
      let mouse_dist = (abs(x - _mx) ** 2 + abs(y - _my) ** 2) * beta


      // Set the pixel(s) at the appropriate location.
      // https://p5js.org/reference/p5/pixels/
      for (let i = 0; i < dens; i += 1) {
        for (let j = 0; j < dens; j += 1) {
          let index = 4 * ((y * dens + j) * width * dens + (x * dens + i));
          // Red.
          pixels[index] = red(bright);
          // Green.
          pixels[index + 1] = green(bright);
          // Blue.
          pixels[index + 2] = blue(bright);
          // Alpha.
          pixels[index + 3] = alpha(bright);
        }
      }
    }
  }


  updatePixels()
  t += period;
}
