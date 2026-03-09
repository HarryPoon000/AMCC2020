// let osc, fft,
//     wType = ['sine', 'triangle', 'square', 'sawtooth'], wIndex = 1;
// function setup() {
//     createCanvas(400, 400);
//     osc = new p5.Oscillator(); // type: 'sine' (default), 'triangle', 'sawtooth' and 'square'
//     osc.start(); // default freq = 440 Hz (~the pitch of an 'A' note)
//     fft = new p5.FFT(0.8, 128);
// }
// function draw() {
//     background(220);
//     let f_start = 100, f_end =  ;
//     let f = constrain(map(mouseX, 0, width, f_start, f_end),
//         f_start, f_end);
//     let a = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
//     text("freq: " + f, 20, 20);
//     text("amp: " + a, 20, 40);
//     text("type: " + wType[wIndex], 20, 60);
//     // smooth the transitions by 0.1 seconds
//     osc.freq(f);
//     osc.amp(a);
//     fftVis();
// }

// function keyPressed() {
//     if (key >= '1' && key <= '4') {
//         let i = int(key);
//         wIndex = i - 1;
//         osc.setType(wType[wIndex]);
//     }
// }
// function fftVis() { // from Topic 4: Sound Art I
//     let spectrum = fft.analyze();
//     //noStroke();
//     fill(255, 0, 255);
//     for (let i = 0; i < spectrum.length; i++) {
//         let x = map(i, 0, spectrum.length, 0, width);
//         let h = map(spectrum[i], 0, 255, 0, height);
//         rect(x, height - h, width / spectrum.length, h);
//     }
// }


// Ref: https://p5js.org/reference/p5/midiToFreq/
let midiNotes = [60, 62, 64, 65, 67, 69, 71, 72];
let noteIndex = 0;
let midiVal, freq;
let osc;
function setup() {
    createCanvas(400, 400);
    osc = new p5.Oscillator();
}
function draw() {
    background(220);
    text('tap to play', 10, 20);
    if (midiVal) {
        text('MIDI: ' + midiVal, 10, 40);
        text('Freq: ' + freq, 10, 60);
    }
}
function mousePressed() {
    osc.start();
    midiVal = midiNotes[noteIndex % midiNotes.length];
    freq = midiToFreq(midiVal);
    // osc.amp(2)
    osc.freq(freq, 0.5);
    noteIndex++;
}
