let music, fft;

function preload() {
    music = loadSound("assets/beat.m4a");
}

function setup() {
    createCanvas(400, 400);
    // fft = new p5.FFT();
    fft = new p5.FFT(0.7, 256);
    // fft.setInput(music); // optional: a single p5.sound source only
    music.loop();
    music.stop();
}

function draw() {
    let spectrum = fft.analyze();

    background(
        (fft.getEnergy("lowMid"))/2, 
        fft.getEnergy("mid"), 
        fft.getEnergy("highMid")
    );

    //noStroke();
    fill(255, 0, 255);
    // print(fft.getEnergy("bass"));
    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = map(spectrum[i], 0, 255, 0, height);
        rect(x, height - h, width / spectrum.length, h);
    }

    let waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(20);
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, 0, height);
        vertex(x, y);
    }
    endShape();

}

function mousePressed() {
    if (!music.isPlaying()){
        music.play();        
    } else {
        music.stop();
    }
}