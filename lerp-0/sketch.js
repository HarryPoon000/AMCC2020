let x = 0, y = 0;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220, 90);

    x = lerp(x, mouseX, 0.1);
    y = lerp(y, mouseY, 0.1);
    ellipse(x, y, 30, 30);

}
