let circles = []

function setup() {
    createCanvas(800, 600);

    for (i = 0; i < 150; i++) {
        circles.push(new BouncingCircle(random(width), random(height)))
    }
}

function draw() {
    background(22, 22, 33, 90);

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
        if (dist(this.x, this.y, this.targetX, this.targetY) < 10) {
            this.targetX = random(width)
            this.targetY = randomGaussian(this.y, height/6)
        }

        this.x = lerp(this.x, this.targetX, 0.02);
        this.y = lerp(this.y, this.targetY, 0.02);
        fill(255, 255, 90)
        circle(this.x, this.y, 5 * dist(this.x, this.y, this.targetX, this.targetY)/300);
    }
}