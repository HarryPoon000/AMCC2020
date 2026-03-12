let bgDots = [], mainDots = [], thunderBG, thunderRain;
let noise1;


function setup() {
  createCanvas(800, 600);
  frameRate(60);

  // create random "dots"
  for (let i = 0; i < 800; i++) {
    bgDots.push(new BGDot({}))
  }
  // create random "dots"
  // red dot at lower right eighth (quarter of quarter, not sure if its called that but I digress)
  mainDots.push(new MainDot(random(width / 4) + 3 * width / 4, random(height / 4) + 3 * height / 4, color(255, 50, 0)))
  // blue dot at upper left eighth 
  mainDots.push(new MainDot(random(width / 4), random(height / 4), color(60, 0, 255)))

  thunderBG = new ThunderBackground(150, prob = 0.02);
  thunderRain = new ThunderRain(1000, 100, 100);

  // for rain noise
  noise1 = new p5.Noise('brown');
  noise1.amp(0.3)
  noise1.start();
}

// get the sign of a number
function sign(x) {
  if (x == 0) { 
    return x
  }
  return x / Math.abs(x)
}

function draw() {
  thunderBG.draw();
  thunderRain.draw();

  mainDots.forEach((mainDot) => {
    bgDots.forEach((bgDot) => {
      // https://p5js.org/reference/p5/dist/
      let distance = dist(bgDot.x, bgDot.y, mainDot.x, mainDot.y);
      if (distance < 40) {
        bgDot.x += int((bgDot.x - mainDot.x) / (distance ** 2) * 40)
        bgDot.y += int((bgDot.y - mainDot.y) / (distance ** 2) * 40)
      }

      // // mouse push bg dots (potentially useful?)
      // let distance_2 = dist(bgDot.x, bgDot.y, mouseX, mouseY);
      // if (distance_2 < 40) {
      //   bgDot.x += int((bgDot.x - mouseX) / (distance_2 ** 2) * 40)
      //   bgDot.y += int((bgDot.y - mouseY) / (distance_2 ** 2) * 40)
      // }
    })
  })

  if (dist(mainDots[0].x, mainDots[0].y, mainDots[1].x, mainDots[1].y) >= 10){
    mainDots[0].x = lerp(mainDots[0].x, mainDots[1].x, 0.0008)
    mainDots[0].y = lerp(mainDots[0].y, mainDots[1].y, 0.0008)
  
    mainDots[1].x = lerp(mainDots[1].x, mainDots[0].x, 0.0008)
    mainDots[1].y = lerp(mainDots[1].y, mainDots[0].y, 0.0008)
  }

  bgDots.forEach((bgDot) => {
    bgDot.draw();
  })

  mainDots.forEach((dot) => {
    dot.draw();
  })
}

class Dot {
  constructor({ x = int(random(width)), y = int(random(height)) }) {
    this.x = x
    this.y = y
    this.color = int(random(255))
  }

  draw() {
    push()
    translate(this.x, this.y)
    noStroke()
    fill(this.color)
    rect(-5, -5, 10, 10)
    pop()
  }
}

// background dot. doesn't follow a set path
class BGDot extends Dot {
  constructor() {
    super({})
    this.color = color(int(random(140)), 100)
    this.base_offset = random(1000)
  }

  draw() {
    // use noise to simulate random, small local movements
    this.x += int(map(noise(this.x + this.base_offset, Date.now() / 10 + this.base_offset), 0.3, 0.7, -1, 1.25))
    this.y += int(map(noise(this.y, Date.now() / 10 + this.base_offset + 20), 0.3, 0.7, -1, 1.25))
    if (this.x > width) {
      this.x %= width
    } else if (this.x < 0) {
      this.x += width
    }
    if (this.y > height) {
      this.y %= height
    } else if (this.y < 0) {
      this.y += height
    }
    super.draw()
  }
}

// background dot. doesn't follow a set path
class MainDot extends Dot {
  constructor(x, y, color) {
    super({})
    this.x = x
    this.y = y
    this.color = color
    this.base_offset = random(1000)
  }

  draw() {
    // this.x += int(map(noise(this.x + this.base_offset, Date.now()/10 + this.base_offset), 0.3, 0.7, -1, 1))
    // this.y += int(map(noise(this.y, Date.now()/10 + this.base_offset + 20), 0.3, 0.7, -1, 1))
    if (this.x > width) {
      this.x %= width
    } else if (this.x < 0) {
      this.x += width
    }
    if (this.y > height) {
      this.y %= height
    } else if (this.y < 0) {
      this.y += height
    }

    // draw the glow
    this.color.setAlpha(10)
    push()
    translate(this.x, this.y)
    noStroke()
    // https://p5js.org/reference/p5.Color/setAlpha/
    fill(this.color)
    for (let radius = 20; radius < 100; radius += 5) {
      circle(0, 0, radius)
    }
    pop()
    this.color.setAlpha(255)
    super.draw()
  }
}

class ThunderBackground{
  constructor(duration, prob) {
    this.duration = duration; // duration in millis
    this.prob = prob;
    this.timer = Date.now();

    // copied from lecture notes: T5 exercise 4
    this.noise = new p5.Noise('pink');
    this.noise.start();

    this.env = new p5.Envelope();
    this.env.setADSR(0.0, 0.5, 0.3, 0.4);
    this.env.setRange(0.5, 0.0);

    this.filt = new p5.Filter('lowpass');
    this.filt.freq(1000);

    this.noise.disconnect();
    this.noise.connect(this.filt);
    this.noise.amp(this.env);
  }

  draw() {
    if (this.timer > Date.now()) {
      setTimeout(() => this.env.play(), random(100) + 50) // play audio 50 to 150 milliseconds after flash
      background(255);
    } else {
      background(200);
      if (random() < this.prob) {
        this.timer = Date.now() + this.duration;
      }
    }
  }
}

class ThunderRain{
  constructor(amount, refresh_period, coolddown) {
    this.amount = amount; // number of particles
    this.dots = []
    for (let i = 0; i < this.amount; i++) {
      // 100 to 150 % of refresh period and cooldown
      this.dots.push(new _ThunderRainDot(int(refresh_period + random(refresh_period)/2), int(coolddown + random(coolddown)/2))) 
    }
  }

  draw() {
    for (let i = 0; i < this.amount; i++) {
      this.dots[i].draw()
    }
  }
}

class _ThunderRainDot {
  constructor(refresh_period, coolddown) {
    this.timer = Date.now() - random(1500); // 0 to 1500 millis difference in the 'phase' of a rain dot
    this.refresh_period = refresh_period;
    this.coolddown = coolddown;
    this.x = random(width)
    this.y = random(height)
  }

  draw(){
    if (this.timer < Date.now()) {
      do {
        this.x = random(width)
        this.y = random(height)
      } while(dist(this.x, this.y, mainDots[0].x, mainDots[0].y) < 40 || dist(this.x, this.y, mainDots[1].x, mainDots[1].y) < 40)
      this.timer += this.refresh_period + this.coolddown
    } 

    if (this.timer - this.refresh_period > Date.now()) {
      // dont draw within the cooldown period
      return
    }
    push()
    translate(this.x, this.y)
    noStroke()
    fill(20, 50)
    circle(0, 0, 5)
    pop()
  }
}

// Source - https://stackoverflow.com/a/42906936
// Modified to work with 2d arrays
function add2DArray(a, b) {
  return a.map((row, j) => {
    return row.map((elem, i) => {
      return elem + b[j][i]
    })
  });
}