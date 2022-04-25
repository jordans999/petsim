let version = "0.01a"
let _correctVersionLoaded = false;
console.log("Utilities.js successfully loaded.")
const validateVersion = (v) => {
     if(v === version){
          console.log(`correct version in path (${version}).`);
          _correctVersionLoaded = true;
     }else{
          console.warn(`Version mismatch!\nNeeded: ${v}\nLinked: ${version}`);
     }
}

//Creates a canvas and appends it to the parent element.
//Default is a 100 x 100 canvas appended to the body element.
//returns the canvas node to be referenced as needed.
//defines canvas context as ctx.
let canvasCounter = 0,
  W,
  H,
  ctx,
  FILL = true,
  STROKE = false,
  FALSE = true,
  DEFAULT = "#434d59";

function resize(el, w, h){
     if(el.tagName === "CANVAS"){
          W = w;
          H = h;
     }
     el.width = w;
     el.height = h;
}

function canvas(width = 100, height = 100, parent = document.body) {
  let c = document.createElement("canvas");
  c.setAttribute("id", `canvas${canvasCounter++}`);
  [c.width, c.height] = [width, height];
  [W, H] = [width, height];
  parent.appendChild(c);
  ctx = c.getContext("2d");
  return c;
};


function loadImage(url) {
     if(url === "help"){
          console.log("ex: loadImage(url).then(img => yourImg = img)")
     }
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

function clr(colorString = DEFAULT) {
  if (canvasCounter <= 0) return;
  fill(DEFAULT);
  rect(0, 0, W, H);
}

function undefWarn(name_){
     let _name = Object.keys({name_})[0];
     if(_name === "name_")return;
     return console.log(_name);
}


let TOGGLE = false,
  INTERVAL;
//when run() is ran, it creates an interval and runs it until it is called again, destroying the interval and waiting for another call to make a new one.
function run(callback, ms = 50) {
  if (!TOGGLE) {
    TOGGLE = true;
    INTERVAL = setInterval(callback, ms);
  } else {
    TOGGLE = false;
    clearInterval(INTERVAL);
  }
}

function font(type, size, align = "center") {
  ctx.font = `${size}px ${type}`;
  ctx.textAlign = align;
}

function text(str, x, y) {
  ctx.fillText(str, x, y);
}

//Fill and stroke for convenience
/*****************************************/

function rgb(r, g, b, a) {
  let argLen = arguments.length;
  if (argLen == 1) {
    return `rgb(${r}, ${r}, ${r})`;
  } else if (argLen == 2) {
    return `rgba(${r}, ${r}, ${r}, ${g})`
  } else if (argLen == 3) {
    return `rgb(${r}, ${g}, ${b})`
  } else if (argLen == 4) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
  } else return "rgba(255, 0, 255)";
}

function fill(hex = 0) {
  FILL = true;
  return ctx.fillStyle = hex
}

function noFill() {
  FILL = false;
}

function stroke(hex = 0) {
  STROKE = true;
  return ctx.strokeStyle = hex
}

function noStroke() {
  STROKE = false;
}

function strokeWeight(n = 0) {
  ctx.lineWidth = n;
}
/*****************************************/

//Drawin stuff
/*****************************************/
function line(x, y, a, b) {
  if (arguments.length !== 4) throw "Insufficient arguments. Check parameters. line(x, y, a, b).";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(a, b);
  ctx.closePath();
  ctx.stroke();
}

function point(x, y) {
  fill(ctx.strokeStyle)
  ellipse(x, y, ctx.lineWidth);
}

function rect(x, y, w, h) {
  if (arguments.length !== 4) throw "Insufficient arguments. Check parameters. line(x, y, a, b).";
  if(FILL){
       ctx.fillRect(x,y,w,h)
 }
  if(STROKE){
       ctx.strokeRect(x, y, w, h);
  }
}

function ellipse(x, y, r) {
     if(!r)throw "Insufficient arguments. r is not defined";
  ctx.beginPath();
  ctx.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
  if(STROKE)ctx.stroke();
  if(FILL)ctx.fill();

}

// function hex2rgb(hex){ !!!!!! work on this later
//   if(hex[0] === "#")hex.shift();
//   if(hex)
// }


/*****************************************/

//Math stuff
/*****************************************/

const Random = {
     float(){
          return Math.random();
     },


     range(min, max){
       return Math.random() * (max - min) + min;
     },

     int(min, max){
          return Math.floor(this.range(min, max));
     },

     bool(){
          if(Math.random() <= 0.5){
               return true;
          }return false;
     },
     chance(percent){
          if(Math.random() <= percent)return true;
          return false;
     },
     color(){
          return rgb(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256))
     }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function chance(percent){
     if(Math.random() <= percent)return true;
     return false;
}

function limit(n, min, max) {
  if (n >= min && n <= max) return n;
  if (n < min) return min;
  return max
}

function signum(n) {
  if (n > 0) return 1;
  if (n < 0) return -1;
  return 0;
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt(((y2 - y1) * (y2 - y1)) + ((x2 - x1) * (x2 - x1)));
}

function oDist(obj1, obj2) {
  return Math.sqrt(((obj2.y - obj1.y) * (obj2.y - obj1.y)) + ((obj2.x - obj1.x) * (obj2.x - obj1.x)));
}

function map(v, a1, a2, b1, b2) {
  return b1 + ((v - a1) * (b2 - b1) / (a2 - a1));
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let sqrt = Math.sqrt,
  floor = Math.floor;

  function inside(point, vs) {
      // ray-casting algorithm based on
      // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

      let x = point[0], y = point[1];

      let inside = false;
      for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          let xi = vs[i][0], yi = vs[i][1];
          let xj = vs[j][0], yj = vs[j][1];

          let intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }

      return inside;
  };

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.magnitude = sqrt((this.x * this.x) + (this.y * this.y));
    this.head = Math.atan2(this.y, this.x);
  }

  zero() {
    this.x = 0;
    this.y = 0;
  }

  add(other) {
    this.x += other.x;
    this.y += other.y;
  }

  static add(a, b){
    let x = a.x + b.x;
    let y = a.y + b.y;
    return new Vector(x, y);
  }

  sub(other) {
    this.x -= other.x;
    this.y -= other.y
  }

  static sub(a, b){
    let x = a.x - b.x;
    let y = a.y - b.y;
    return new Vector(x, y);
  }

  mag() {
    this.magnitude = sqrt((this.x * this.x) + (this.y * this.y));
    return this.magnitude;
  }

  heading() {
    this.head = Math.atan2(this.y, this.x);
    return this.head;
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  normalize() {
    this.magnitude = 1;
    let a = this.heading();
    this.x = Math.cos(a);
    this.y = Math.sin(a);
  }

  setMag(n) {
    this.magnitude = n;
    let a = this.heading();
    this.x = this.magnitude * Math.cos(a);
    this.y = this.magnitude * Math.sin(a);
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }

  dot(other) {
    return (this.x * other.x + this.y * other.y);
  }

  cross(other) {
    debugger;
  }

  div(other) {
    if (typeof other === "object") {
      if (other.x === 0 || other.y === 0){
        console.warn("Divide by 0 error");
        return this;
      };
      this.x /= other.x;
      this.y /= other.y;
    } else {
      if (other.x === 0){
        console.warn("Divide by 0 error");
        return this;
      };
      let m = this.mag();
      let a = this.heading();
      this.x = (m / other) * Math.cos(a);
      this.y = (m / other) * Math.sin(a);
      this.set(this.x, this.y);
    }
  }

  mult(a) {
    let m = this.mag();
    let angle = this.heading();
    if (typeof a === "object") {
      this.x *= a.x;
      this.y *= a.y;
    } else {
      this.x = (m * a) * Math.cos(angle);
      this.y = (m * a) * Math.sin(angle);
    }
    this.set(this.x, this.y);
  }

  copy(){
    return new Vector(this.x, this.y);
  }

  set(x, y){
    this.x = x;
    this.y = y;
    this.head = Math.atan2(y, x);
    this.magnitude = sqrt((this.x * this.x) + (this.y * this.y));
  }

  setPolar(r, theta){
    this.head = theta;
    this.magnitude = r;
    this.x = r * Math.cos(theta);
    this.y = r * Math.sin(theta);
    this.set(this.x, this.y);
  }

  rotate(r){
      let h = this.heading() + r;
      let m = this.mag();
      this.x = m * Math.cos(h);
      this.y = m * Math.sin(h);
 }

  static random(){
    let a = Math.random() * Math.PI * 2;
    let v = new Vector();
    v.x = Math.cos(a);
    v.y = Math.sin(a);
    return v;
  }

}

/*****************************************/
