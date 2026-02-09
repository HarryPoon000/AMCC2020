let x1, y1, x2, y2, t = 0;

function setup() {
    createCanvas(400, 400);

    x1 = noise(t) * width;
    y1 = noise(t + 100) * height;
}

function draw() {
    // x2 = x1 + random(-5, 5);
    // y2 = y1 + random(-5, 5);

    x2 = noise(t) * width;
    y2 = noise(t + 100) * height;

    strokeWeight(1)
    line(x1, y1, x2, y2);

    x1 = x2;
    y1 = y2;

    t += 0.01
}
