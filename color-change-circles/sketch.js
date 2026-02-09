let circles = []

function setup() {
    createCanvas(800, 600);

    for (i = 0; i < 20; i++) {
        circles.push(new MovingCircle())
    }
}

function draw() {
    background(220, 80);

    circles.forEach(c => {
        c.show()
    })
}

class MovingCircle {

    constructor(r = 50, step = 0.005, step_r = 0.003, step_rgb = 0.02) {
        this.t = random(1000);
        this.step = step
        this.x = noise(this.t) * width;
        this.y = noise(this.t + 100) * height;

        this.t_r = random(1000);
        this.step_r = step_r
        this.base_r = r

        this.t_rgb = random(1000);
        this.step_rgb = step_rgb
    }

    show() {
        this.x = noise(this.t) * width;
        this.y = noise(this.t + 100) * height;
        this.r = this.base_r * noise(this.t_r) + 20
        strokeWeight(0)
        fill(noise(this.t_rgb) * 255, noise(this.t_rgb + 100) * 255, noise(this.t_rgb + 200) * 255)
        circle(this.x, this.y, this.r);

        this.t += this.step
        this.t_r += this.step_r
        this.t_rgb += this.step_rgb
    }
}