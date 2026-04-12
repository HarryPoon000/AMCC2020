let cam, prevFrame;
let mic, fft, _miclevel, micLevelLerp = 0;

function setup() {
  createCanvas(400, 300);
  pixelDensity(1);
  // Get video from the default webcam
  cam = createCapture(VIDEO, { flipped: true });
  cam.size(width, height); // optional: match canvas size
  cam.hide(); // hide the HTML <video>, we'll draw it on the canvas
  
  prevFrame = createImage(width, height)
  fft = new p5.FFT(0.5, 512);
  mic = new p5.AudioIn();
  mic.start();
  mic.connect();
  frameRate(30)
}


function draw() {
  background(255);
  // Draw the current camera frame into the canvas
  // image(cam, 0, 0, width, height);
  
  cam.loadPixels();
  // prevFrame.loadPixels();
  loadPixels();

  let micLevel = mic.getLevel();
  micLevelLerp = lerp(micLevel, micLevelLerp, 0.3)
  
  // minDist = 10000;
  // bboxL = width * 2
  // bboxR = -1
  // bboxT = height * 2
  // bboxB = -1
  
  // let avg_n = 0;
  let waveform = fft.waveform();

  
  for (let x = 0; x < width; x++) {
    // offset by some amount related to waveform
    let i = int(map(x, 0, width, 0, waveform.length));
    let y_offset = int(map(waveform[i], 0, 1, 0, height));
    for (let y = 0; y < height; y++) {
      let idx = (x + y * width) * 4;
      // get the R, G, B values
      let r = cam.pixels[idx + 0];
      let g = cam.pixels[idx + 1];
      let b = cam.pixels[idx + 2];

      // pixel brightness
      let brightnessVal = map(brightness(color(r, g, b)), 0, 100, 0.5, 1)

      let new_idx = (x + (y_offset + y) * width) * 4;

      // random noise added to mic volume
      pixels[new_idx + 0] = brightnessVal * r * map(noise(x / 10, y / 10, micLevelLerp * 100), 0, 1, 0.2, 1.5);
      pixels[new_idx + 1] = brightnessVal * g * map(noise(x / 10 + 10, y / 10 + 10, micLevelLerp * 100 + 100), 0, 1, 0.2, 1.5);
      pixels[new_idx + 2] = brightnessVal * b * map(noise(x / 10 + 20, y / 10 + 20, micLevelLerp * 100 + 200), 0, 1, 0.2, 1.5);
      pixels[new_idx + 3] = 255;
    }
  }

  updatePixels();

  noFill();
  strokeWeight(2)
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++) {
      let x = map(i, 0, waveform.length, 0, width);
      let y = map(waveform[i], -1, 1, 0, height);
      vertex(x, y);
  }
  endShape();
}