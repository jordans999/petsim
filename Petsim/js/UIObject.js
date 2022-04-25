class UIObject{
     constructor(x, y, text, callback, cbArg){
          this.pos = new Vector(x, y);
          this.text = text;
          this.callback = callback;
          this.hovered = false;
          this.maxTimeOut = 25;
          this.timeOut = this.maxTimeOut;
          this.hoverAlpha = 0.0;
          this.maxHoverAlpha = 0.4;
          this.hoverAlphaRate = 0.05;
          this.cbArg = cbArg;
     }

     interact(m, click){//mouse object
          let bx = this.pos.x - this.textWidth/2 - this.abbd;
          let by = this.pos.y - UIFontSize;
          let bw = this.textWidth + this.abbd * 2;
          let bh = UIFontSize + this.abbd * 2;
          if(m.x > bx
          && m.x < bx + bw
          && m.y > by
          && m.y < by + bh){
               this.hovered = true;
          }else{
               this.hovered = false;
          }

          if(click && this.timeOut >= this.maxTimeOut && this.hovered){
               this.timeOut = 0;
               this.callback(this.cbArg);
          }

     }

     render(){
          this.metrics = ctx.measureText(this.text);
          this.textWidth = this.metrics.width
          // this.abbd = this.metrics.actualBoundingBoxDescent;
          this.abbd = this.textWidth * 0.02
          //get text size
          fill(rgb(139, 156, 180));
          rect(this.pos.x - this.textWidth/2 - this.abbd,
               this.pos.y - UIFontSize,
               this.textWidth + this.abbd * 2,
               UIFontSize + this.abbd * 2)

          fill(rgb(8, 14, 23));
          let oldTextalign = ctx.textAlign;
          ctx.textAlign = "center";
          ctx.fillText(this.text, this.pos.x, this.pos.y);
          ctx.textAlign = oldTextalign;
          if(this.hovered){
               if(this.hoverAlpha < this.maxHoverAlpha)this.hoverAlpha += this.hoverAlphaRate;
               ctx.globalAlpha = this.hoverAlpha;
               fill(rgb(18, 86, 119));
               rect(this.pos.x - this.textWidth/2 - this.abbd,
                    this.pos.y - UIFontSize,
                    this.textWidth + this.abbd * 2,
                    UIFontSize + this.abbd * 2);
               ctx.globalAlpha = 1;
          }

          if(this.timeOut <= this.maxTimeOut)this.timeOut++;
     }
}
