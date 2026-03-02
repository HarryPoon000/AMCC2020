let mic;

function setup() {
    createCanvas(400, 400);

    mic = new p5.AudioIn();
    mic.start();
    // mic.connect();
}

function draw() {
    background(220);

    let micLevel = mic.getLevel();
    let size = map(micLevel, 0, 1, width / 16, width * 2);
    ellipse(width / 2, height / 2, size);
}
