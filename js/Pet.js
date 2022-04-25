function Attr(rate_, naem, color_){
     return {
          name: naem,
          rate: rate_,
          color: color_,
          value: 1,
          dec(){
               if(this.value - this.rate > 0.01){
                    this.value -= this.rate;
               }else {this.value = 0.01};
          },
     }
}

class Pet extends Obj{

     constructor(x, y, w, h){
          super(x,y,w,h);
          this.type = "pet";

          this.images = [];

          this.eye = {
               dir:   new Vector(0,0),
               w:  this.size.w * 0.08,
               h:   this.size.h * 0.2,
               color:   rgb(5, 13, 1),
               space:       w * 0.125,
               range:              10,
          }

          this.color = rgb(223, 20, 105);
          this.blink = {
               max:    10,
               actual: 10,
               b:   false,
               hold:    0,
          };
          this.state = "still";
          this.jumpCoolMax = 10;
          this.jumpCool     = 0;
          this.grounded = false;

          this.love   = new Attr(0.001, "love", rgb(240,77,184));
          this.mood   = new Attr(0.002, "mood", rgb(168,158,25));
          this.hunger = new Attr(0.003, "hunger", rgb(27,173,24));
          this.thirst = new Attr(0.0001, "thirst", rgb(54,107,196));
          this.attrs = [
               this.love, this.mood, this.hunger, this.thirst
          ];

          this.needs = [
               ...this.attrs
          ]

          this.criticalNeeds = [];
          this.objs = [];
     }

     readObjects(arr){
          this.objs = [];
          this.objs = arr;
     }

     update(){
          super.update();
          this.thirst.dec();
          if(this.blink.actual++ >= this.blink.max){
               this.blink.actual = 0;
               this.blink.max = Random.int(40,100);
               this.blink.b = true;
          }else{
               if(this.blink.hold++ > 10){
                    this.blink.b = false;
                    this.blink.hold = 0;
               }
          }

          //prioritize needs
          this.needs = this.needs.sort((a,b) => a.value - b.value)
          this.needs.forEach(need => {
               if(need.value < 0.25){
                    //critical need
                    if(!this.criticalNeeds.includes(need)){
                         this.criticalNeeds.push(need);
                    }
               }
          });

          this.criticalNeeds = this.criticalNeeds.sort((a,b) => a.value - b.value)
          for(let i = this.criticalNeeds.length-1; i >= 0; i--){
               if(this.criticalNeeds[i].value > 0.25)this.criticalNeeds.splice(i,1);
          }

          //process critical needs
          let needsList = this.needs;
          let ni = 0;
          if(this.criticalNeeds.length > 0){
               needsList = this.criticalNeeds;
          }
          let cn = needsList[ni];
          if(cn.value < 0.8){
               let goalObjType;
               if(cn.name === "hunger"){
                    goalObjType = "food";
               }else if(cn.name === "thirst"){
                    goalObjType = "water";
               }else if(cn.name === "mood"){
                    goalObjType = "toy";
               }if(cn.name === "love"){
                    goalObjType = "you";
               }
               let goalObj = this.objs.find(ite => ite.type === goalObjType);
               if(typeof goalObj === "undefined"){
                    if(ni < needsList.length-1)ni++;
                    console.log(`I need ${goalObjType} but don't have it :(`);
               }else{
                    this.goTo(goalObj.pos);
                    this.lookAt(goalObj.pos);
                    if(oDist(goalObj.pos, this.pos) < 100){
                         this.action(goalObj);
                    }
               }
          }else{
               this.goTo(input.mouse);
               this.lookAt(input.mouse);
          }
     }

     action(o){
          if(o.type === "food"){
               this.objs.splice(this.objs.indexOf(o), 1);
               this.hunger.value = 1;
          }else if(o.type === "water"){
               this.objs.splice(this.objs.indexOf(o), 1);
               this.thirst.value = 1;
          }else if(o.type === "toy"){

          }
     }

     lookAt(dest){
          let d = Vector.sub(dest, this.pos);
          this.eye.dir = d;
          if(this.eye.dir.mag() > this.eye.range){
               this.eye.dir.setMag(this.eye.range);
          }
     }

     goTo(dest){
          if(!this.grounded || this.jumpCool < this.jumpCoolMax)return;

          let xdist = Math.abs(this.pos.x - dest.x);
          if(xdist==0)xdist=1;
          if(xdist > this.size.w *0.75 && dest.y > H/2){
               let power = limit(xdist*10, 0, 15);
               if(xdist <= this.size.w*2){
                    power = 10;
               }else{
                    if(this.hunger.value - 0.01 > 0){
                         this.hunger.value -= 0.01;
                    }
                    if(this.hunger.value < 0.25)power = 5;
               }
               let a = -Math.PI * 0.38;
               let facing = signum(dest.x - this.pos.x);
               let jx = power * Math.cos(a) * facing;
               let jy = power * Math.sin(a);
               let j = new Vector(jx, jy);
               this.acc = j;

          }else{

          }
          this.jumpCool = 0;
     }

     render(){
          if(!this.grounded)this.state = "jump";
          if(this.grounded)this.state = "still";
          let currentTexture = this.images.find(im => im.name === this.state);
          ctx.globalAlpha = 1;
          ctx.drawImage(
               currentTexture.img,
               this.pos.x - currentTexture.img.width/2,
               this.pos.y - currentTexture.img.height/2)
          //draw eyes
          let eyeState = "open";
          if(this.blink.b){
               this.eye.h = 2;
               eyeState = "blink";
          }else{
               this.eye.h = this.size.h * 0.2;
          }
          currentTexture = this.images.find(im => im.name === eyeState);
          ctx.drawImage(
               currentTexture.img,
               this.pos.x - currentTexture.img.width/2 + this.eye.dir.x,
               this.pos.y - currentTexture.img.height/3 + this.eye.dir.y)
          this.renderBars();
     }

     renderBars(){
          let barThick = 10;
          let barLen = 150;
          let barSpace = 5;

          this.attrs.forEach((atr, i) => {
               fill(atr.color);
               rect(5, 5 +(2 * barSpace + barThick) * i, atr.value * barLen, barThick)
          });
     }

}
