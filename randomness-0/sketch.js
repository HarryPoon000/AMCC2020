let radius = 200;

function setup() {
    createCanvas(500, 500);
    background(255);
    strokeWeight(2);    // width
    // noLoop(); // disables refresh
}

function draw() {
    background(255, 15);
    for (let i = 0; i < 600; i++) {
        // choose a random point inside the circle
        let angle = random(TWO_PI);
        let r = radius * sqrt(random()); // more even distribution
        let x = width / 2 + r * cos(angle);
        let y = height / 2 + r * sin(angle);
        let len = random(-15, 15)
        if (random() > 0.5) {
            line(x, y, x + len, y)
        } else {
            line(x, y, x, y + len)
        }
        stroke(random(255), random(255), random(255))
        point(x, y);
    }
}
