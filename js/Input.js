
function initializeInputHandler(target){
     this.mouse = new Vector();

     this.mousedown = false;

     this.activeKeys = [];
     for (let i = 0; i < 222; i++) {
       this.activeKeys.push(false);
     }

     this.dataCapture = false;
     this.target = target;
     if(typeof this.target !== "undefined"){
          this.target.addEventListener("mousemove", e => {
               let rect = this.target.getBoundingClientRect();
               this.mouse.x = e.clientX - rect.left;
               this.mouse.y = e.clientY - rect.top;
               if(this.dataCapture)console.log(this.mouse.x, this.mouse.y);
          }, false);

          this.target.addEventListener("mousedown", e => {
               let rect = this.target.getBoundingClientRect();
               this.mouse.x = e.clientX - rect.left;
               this.mouse.y = e.clientY - rect.top;
               this.mousedown = true;
               if(this.dataCapture)console.log(this.mouse.x, this.mouse.y, `mousedown ${mouse.down}`);
          }, false);

          this.target.addEventListener("mouseup", e => {
               let rect = this.target.getBoundingClientRect();
               this.mouse.x = e.clientX - rect.left;
               this.mouse.y = e.clientY - rect.top;
               this.mousedown = false;
               if(this.dataCapture)console.log(this.mouse.x, this.mouse.y, `mousedown ${mouse.down}`);
          }, false);
     }

  window.addEventListener("keydown", e => {
    this.activeKeys[e.keyCode] = true;
    if(this.dataCapture)console.log(`${e.key}, ${e.keyCode} pushed`)
  }, false);

  window.addEventListener("keyup", e => {
    this.activeKeys[e.keyCode] = false;
    if(this.dataCapture)console.log(`${e.key}, ${e.keyCode} released`)
  }, false)

  return this;
}


function cursor() {
  fill("rgb(255, 255, 255)")
  ctx.beginPath();
  ctx.moveTo(mouse.x, mouse.y);
  ctx.lineTo(mouse.x + 10, mouse.y);
  ctx.lineTo(mouse.x, mouse.y + 10);
  ctx.fill()
}
