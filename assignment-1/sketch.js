let bgDots = [];

function setup() {
  createCanvas(800, 600);
  frameRate(60);

  // create random "dots"
  for (let i = 0; i < 1000; i++) {
    bgDots.push(new BGDots({}))
  }
}

function draw() {
  background(240);

  // // docs for Array.prototype.reduce(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  // const totalForce = bgDots.map((dot) => dot.getForce()).reduce((accum, currentVal) => {
  //   return {
  //     horizontal: add2DArray(accum.horizontal, currentVal.horizontal),
  //     vertical: add2DArray(accum.vertical, currentVal.vertical),
  //   }
  // })

  // console.log(totalForce)

  bgDots.forEach((dot) => {
    // dot.applyForce(totalForce.horizontal, totalForce.vertical)
    dot.draw();
  })
}

// background dot. doesn't follow a set path
class BGDots {
  constructor({ x = int(random(width)), y = int(random(height)) }) {
    this.x = x
    this.y = y
    this.force_mult = 10
    this.color = int(random(100)) + 20
  }

  // "force" on other bgDots
  getForce() {
    let horizontal = [];
    let vertical = [];
    for (let i = 0; i < width; i++) {
      let row_h = [];
      let row_v = [];
      for (let j = 0; j < height; j++) {
        let force_h = (i - this.x) != 0 ? this.force_mult / (i - this.x) : 0 // no force applied to self or overlapping obj 
        let force_v = (j - this.y) != 0 ? this.force_mult / (j - this.y) : 0 // no force applied to self or overlapping obj 
        row_h.push(force_h)
        row_v.push(force_v)
      }
      horizontal.push(row_h)
      vertical.push(row_v)
    }
    return {
      horizontal,
      vertical
    }
  }

  // apply the total force
  applyForce(horizontal, vertical) {
    new_x = int(this.x + horizontal[this.y][this.x])
    new_y = int(this.y + vertical[this.y][this.x])
    this.x = new_x
    this.y = new_y
  }


  draw() {
    this.x += int(random(3)) - 1
    this.y += int(random(3)) - 1
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
    push()
    translate(this.x, this.y)
    noStroke()
    fill(this.color)
    rect(-2.5, -2.5, 5, 5)

    pop()
  }

}

// Source - https://stackoverflow.com/a/42906936
// Modified to work with 2d arrays

function add2DArray(a,b){
    return a.map((row,j) => {
      return row.map((elem, i) => {
        return elem + b[j][i]
      })
    });
}
