let x = 0, y = 0;
let targetX = 0, targetY = 0;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220, 90);

    if (dist(x, y, targetX, targetY) < 2) {
        targetX = random(width)
        targetY = random(height)
    }

    x = lerp(x, targetX, 0.1);
    y = lerp(y, targetY, 0.1);
    circle(x, y, 20);
}

