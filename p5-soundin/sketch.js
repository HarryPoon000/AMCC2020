let mic, fft, _miclevel;

function setup() {
    createCanvas(400, 400);
    fft = new p5.FFT(0.01, 256);
    mic = new p5.AudioIn();
    mic.start();
    mic.connect();
}

function draw() {
    let spectrum = fft.analyze();
    colorMode(HSB)
    let micLevel = mic.getLevel();
    _miclevel = lerp(_miclevel, micLevel, 0.1)
    background(
        color(micLevel * 255, 100, 100),
        0.1
    );


    // let size = map(micLevel, 0, 1, width / 16, width * 2);
    // ellipse(width / 2, height / 2, size);


    let waveform = fft.waveform();

    push()
    noFill();
    beginShape();
    translate(width/2, height/2)
    stroke(20);
    strokeWeight(2)
    for (let i = 0; i < waveform.length; i++) {
        let radius = 50 + map(waveform[i], -1, 1, 0, 200);
        let rad = map(i, 0, waveform.length-1, 0, 2 * PI)
        let x = radius * Math.cos(rad);
        let y = radius * Math.sin(rad);
        vertex(x, y);
    }
    endShape();
    pop();
}
