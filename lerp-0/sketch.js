let circles = []

function setup() {
    createCanvas(400, 400);

    for (i = 0; i < 15; i++) {
        circles.push(new BouncingCircle())
    }
}

function draw() {
    background(220, 90);

    circles.forEach(c => {
        c.show()
    })
}

class BouncingCircle {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
    }

    show() {
        if (dist(this.x, this.y, this.targetX, this.targetY) < 1) {
            this.targetX = random(width)
            this.targetY = random(height)
        }

        this.x = lerp(this.x, this.targetX, 0.1);
        this.y = lerp(this.y, this.targetY, 0.1);
        circle(this.x, this.y, 20);
    }
}