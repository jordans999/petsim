class Food extends Obj{
     constructor(x,y){
          super(x,y,20,20);
          this.type = "food";
          this.color = rgb(98, 88, 53);
     }

     render(){
          super.render();
     }

     update(){
          super.update();
     }
}
