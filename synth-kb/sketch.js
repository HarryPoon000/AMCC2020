// Ref: https://p5js.org/reference/p5/midiToFreq/
let midiNotes = [60, 62, 64, 65, 67, 69, 71, 72];
let noteIndex = 0;
let midiVal, freq;
let osc;
let keyboardNotes = 'awsedftgyhujk'.split("")

let synthKeys = []

function setup() {
    createCanvas(400, 400);
    osc = new p5.Oscillator();
    osc.setType("sawtooth")
    keyboardNotes.forEach((key, i) => {
        synthKeys.push(new SynthKey(key, midiVal = i + 60))
    })
}
function draw() {
    background(220);
    text('tap to play', 10, 20);
    if (midiVal) {
        text('MIDI: ' + midiVal, 10, 40);
        text('Freq: ' + freq, 10, 60);
    }
}


function keyPressed(){
    console.log("Pressed:", key)
    synthKeys.forEach((synthKey) => {
        synthKey.onPress(key)
    })

//     if (keyboardNotes.includes(key)) {
//         osc.start();
//         midiVal = keyboardNotes.indexOf(key) + 60
//         freq = midiToFreq(midiVal);
//         osc.freq(freq);
//     }
}

function keyReleased(){
    console.log("Released:", key)
    // if (keyboardNotes.includes(key)) {
    //     osc.stop()
    // }
    synthKeys.forEach((synthKey) => {
        synthKey.onRelease(key)
    })
}

class SynthKey{
    constructor(key, midiVal) {
        this.key = key;
        this.osc = new p5.Oscillator();
        this.freq = midiToFreq(midiVal);
        this.osc.setType("sawtooth")
        this.osc.freq(this.freq)
    }

    onPress(key) {
        if (key == this.key) {
            this.osc.start()
            // this.osc.amp(0.5)
            // this.osc.amp(0, 0.1, 1)
        }
    }

    onRelease(key) {
        if (key == this.key || !keyIsDown(this.key)) {
            this.osc.stop()
        }
    }
}