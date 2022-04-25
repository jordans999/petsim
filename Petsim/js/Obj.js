class Obj{
     constructor(x,y,w,h){
          this.type = "none"
          this.pos = new Vector(x, y);
          this.vel =     new Vector();
          this.acc =     new Vector();
          this.size = {
               w: w,
               h: h,
          };

          this.color = rgb(0, 79, 255);
          this.grounded =        false;
          this.ground;
     }

     update(){

          this.acc.y += 0.9;

          this.vel.zero();
          this.vel.add(this.acc);
          if(this.pos.x + this.vel.x + this.size.w/2 + 2 > W){
               this.vel.x *= -1;
               this.pos.x = W - this.size.h/2 - 2;
          }
          if(this.ground){
               if(this.pos.y + this.vel.y + this.size.h/2 > this.ground.pos.y){
                    // this.vel.y *= -1;
                    this.jumpCool++;
                    this.vel.y = 0;
                    this.pos.y = this.ground.pos.y - this.size.h/2
                    this.grounded = true;
                    this.acc.x *= 0.8;
               }else{
                    this.grounded = false;
               }
          }

          this.pos.add(this.vel);
     }

     render(){
          fill(this.color);
          rect(this.pos.x - this.size.w/2,
               this.pos.y - this.size.h/2,
               this.size.w,
               this.size.h
          );
     }
}
