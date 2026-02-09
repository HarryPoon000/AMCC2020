let t = 0; // time offset

function setup() {
    createCanvas(600, 300);
    stroke(0);
    noFill();
    frameRate(60)
}

function draw() {
    background(255);
    strokeWeight(1)
    stroke(150)
    beginShape();
    let inc = 0.005; // spatial step in noise space

    for (let x = 0; x < width; x += 5) {
        // add time offset t so the pattern moves sideways
        let n = noise(t + x * inc); // n in (0, 1)
        let y = map(n, 0, 1, 0, height);
        vertex(x, y);
    }
    endShape();
    stroke(0)
    strokeWeight(10)
    let px = width/2
    let py = map(noise(t + px * inc), 0, 1, 0, height)
    point(px, py)
    strokeWeight(1)
    line(0, py, width, py)

    // advance time a little each frame
    t += 1/60;
}
