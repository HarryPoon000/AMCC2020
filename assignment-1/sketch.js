let bgDots = [], mainDots = [];

function setup() {
  createCanvas(800, 600);
  frameRate(60);

  // create random "dots"
  for (let i = 0; i < 2000; i++) {
    bgDots.push(new BGDot({}))
  }
  // create random "dots"
  // red dot at lower right eighth (quarter of quarter, not sure if its called that but I digress)
  mainDots.push(new MainDot(random(width / 4) + 3 * width / 4, random(height / 4) + 3 * height / 4, color(255, 50, 0)))
  // blue dot at upper left eighth 
  mainDots.push(new MainDot(random(width / 4), random(height / 4), color(60, 0, 255)))

  // noLoop()
}

function draw() {
  background(240);

  mainDots.forEach((mainDot) => {
    bgDots.forEach((bgDot) => {
      if (Math.abs(bgDot.x - mainDot.x) < 70) {
        bgDot.x += int(((bgDot.x - mainDot.x)/800 + 0.4)**2)
      }
      if (Math.abs(bgDot.y - mainDot.y) < 70) {
        bgDot.y += int(((bgDot.y - mainDot.y)/800 + 0.4)**2)
      }
    })
  })

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
    this.x += int(map(noise(this.x + this.base_offset, Date.now() / 10 + this.base_offset), 0.3, 0.7, -1, 1.2))
    this.y += int(map(noise(this.y, Date.now() / 10 + this.base_offset + 20), 0.3, 0.7, -1, 1.2))
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

// Source - https://stackoverflow.com/a/42906936
// Modified to work with 2d arrays
function add2DArray(a, b) {
  return a.map((row, j) => {
    return row.map((elem, i) => {
      return elem + b[j][i]
    })
  });
}
