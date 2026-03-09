// let osc, env;
// let attackTime = 0.01;
// let releaseTime = 0.01;
// function setup() {
//     createCanvas(400, 200);
//     osc = new p5.Oscillator('sine');
//     osc.start();
//     env = new p5.Envelope();
//     osc.amp(env); // envelope controls volume
// }
// function draw() {
//     background(20);
//     fill(255);
//     text('Click to play note', 10, 20);
//     text('attack time: ' + attackTime, 5, height - 20);
//     text('release time: ' + releaseTime, 5, height - 40);
//     attackTime = map(mouseX, 0, width, 0.0, 1.0);
//     releaseTime = map(mouseY, 0, height, 1.00, 0.0);

// }
// function mousePressed() {
//     env.setADSR(attackTime, 0.5, 0.3, releaseTime); // A, D, S, R
//     env.setRange(1, 0.0);
//     env.play();
// }

let noiseOsc, fft;
let filterType = 'none'; 
let cutoff = 1000;

function setup() {
    createCanvas(500, 500);
    textSize(14);
    // White noise source
    noiseOsc = new p5.Noise('pink');
    noiseOsc.start();
    noiseOsc.amp(0.3);

    fft = new p5.FFT(0.8, 256);
    filt = new p5.Filter();
}

function draw() {
    background(200);
    // text("Press w/p/b to switch the noise type", 20, 20);
    // text("Noise Type: " + noiseOsc.getType(), 20, 40);
    noiseOsc.pan(map(noise(Date.now() / 1000), 0, 1, -1, 1))
    noiseOsc.amp(noise(Date.now() / 1000 + 100))
    fftVis();
}

function keyPressed() {
    // if (key == 'w') noiseOsc.setType('white');
    // else if (key == 'p') noiseOsc.setType('pink');
    // else if (key == 'b') noiseOsc.setType('brown');
    noiseOsc.disconnect();
    if (key == 'l') {
        filterType = 'lowpass';
        filt.setType(filterType);
        noiseOsc.connect(filt);
    } else if (key == 'h') {
        filterType = 'highpass';
        filt.setType(filterType);
        noiseOsc.connect(filt);
    } else if (key == 'b') {
        filterType = 'bandpass';
        filt.setType(filterType);
        noiseOsc.connect(filt);
    } else if (key == 'n') {
        filterType = 'none';
        noiseOsc.connect();
    }
}

function fftVis() {
    let spectrum = fft.analyze();
    //noStroke();
    fill(255, 0, 255);
    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = map(spectrum[i], 0, 255, 0, height);
        rect(x, height - h, width / spectrum.length, h);
    }
}
