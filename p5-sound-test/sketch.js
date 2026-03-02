// let music;

// function preload() {
//     music = loadSound("assets/beat.m4a");
// }

// function setup() {
//     createCanvas(400, 400);
// }
// ""
// function draw() {
//     background(220);
//     music.setVolume(mouseY / height)
//     music.rate(exp(mouseX/height)/2)
// }

// function mousePressed() {
//     if (!music.isPlaying()){
//         music.play();        
//     } else {
//         music.stop();
//     }
// }

let music, amp;
let ampLevelLerp = 0;

function preload() {
    music = loadSound("assets/guitar.wav");
}

function setup() {
    createCanvas(400, 400);
    amp = new p5.Amplitude();
    // amp.setInput(music); // optional: a single p5.sound source only 
    music.loop();
    music.stop();
}

function draw() {
    let a = amp.getLevel();
    background(255, 70);
    ampLevelLerp = lerp(a, ampLevelLerp, 0.7)

    push()
    let radius_amp = 100 // + ampLevelLerp * 100 - 50; // radius + val (in (-50, 50))
    let rad = - ampLevelLerp * PI * 8; // update rotation angle
    x = width / 2 + radius_amp * cos(rad);
    y = height / 2 + radius_amp * sin(rad);

    noStroke()
    fill(a * 255, a * 255, a * 255);
    translate(x, y)
    rotate(rad)
    rect(0, 0, 30, 30);
    pop()

    // if (a < 0.2) background(255);
    // else background(0);
}

function mousePressed() {
    if (!music.isPlaying()){
        music.play();        
    } else {
        music.stop();
    }
}