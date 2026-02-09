let radius = 200;

function setup() {
    createCanvas(500, 500);
    background(255);
    stroke(0);          // black
    strokeWeight(2);    // width
    noLoop(); // disables refresh
}

function draw() {
    for (let i = 0; i < 600; i++) {
        // choose a random point inside the circle
        let angle = random(TWO_PI);
        let r = radius * sqrt(random()); // more even distribution
        let x = width / 2 + r * cos(angle);
        let y = height / 2 + r * sin(angle);
        let len = random(-15, 15) * 100/abs(r+20)
        if (random(0, 1) > 0.5) {
            line(x, y, x + len, y)
        } else {
            line(x, y, x, y + len)
        }
        point(x, y);
    }
}
