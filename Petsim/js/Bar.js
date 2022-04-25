class Bar{
     constructor(x, y, color){
          this.pos = new Vector(x, y);
     }

     update(n){
          fill(this.color);
          rect(this.pos.x, this.pos.y, 200 * n, 5);
     }
}
