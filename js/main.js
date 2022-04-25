const screen = canvas(850, 850);
const input = initializeInputHandler(screen);

let UIFontSize;
let UIFont;
let uiObjects;
let gameObjects;
let p;
let ground;
let gh;
let clouds;
let food;
let add;
let types;
let hasType;

function init(){
     resize(screen, window.innerWidth, window.innerHeight);


     gh = 200;
     ground = {
          pos: new Vector(0, H-gh),
          size: {
               w: W,
               h: gh,
          },
          render(){
               fill(rgb(87, 41, 25));
               rect(ground.pos.x, ground.pos.y, ground.size.w, ground.size.h);
               fill(rgb(54, 97, 45));
               rect(ground.pos.x, ground.pos.y, ground.size.w, ground.size.h*0.2);

          }
     };

     UIFontSize = 50;
     UIFont = `bold ${UIFontSize}px Tahoma`;

     uiObjects = [];
     gameObjects = [];

     types = ["food", "water", "toy"];

     isValidType = tpye => {
          // console.log(types.includes(tpye))
          if(types.includes(tpye))return true;
          return console.warn(`add(type, x, y) invoked with invalid type: ${tpye}. Try ${types.join(", ")}.`);
     }

     hasType = (arr, type) => {
          let res = false;
          console.log(isValidType(type));
          if(isValidType(type)){
               arr.forEach(item => {
                    if(item.type == type)res = true;
               });
          };
          return res;
     }

     food = (x, y) => {
          return new Item(x, y, 20, 20, "food", rgb(98, 88, 53));
     };

     toy = (x, y) => {
          return new Item(x, y, 30, 30, "toy", rgb(242, 84, 84));
     };

     water = (x, y) => {
          return new Item(x, y, 20, 20, "water", rgb(35, 188, 209));
     };

     add = (type) => {
          let item;
          if(isValidType(type) && !hasType(gameObjects, type)){
               if(type === "food"){
                    item = food(50,100);
               }else if(type === "water"){
                    item = water(W-100,100);
               }else if(type === "toy"){
                    item = toy(W/2,100);
               }

               item.ground = ground;
               gameObjects.push(item);

          }else return;
     };

     uiObjects.push(new UIObject(130, H - 20, "Give food", add, "food"));
     uiObjects.push(new UIObject(W/2, H - 20, "Give toy", add, "toy"));
     uiObjects.push(new UIObject(W - 180, H - 20, "Give water", add, "water"));

     p = new Pet(W/2, H/2, 100, 100);

     loadImage("img/petstill.png").then(img => {p.images.push({img: img,name: "still"})});
     loadImage("img/petjump.png").then(img => {p.images.push({img: img,name: "jump"})});
     loadImage("img/peteyesblink.png").then(img => {p.images.push({img: img, name: "blink"})});
     loadImage("img/peteyesopen.png").then(img => {p.images.push({img: img, name: "open"})});
     loadImage("img/ground.png").then(img => {
          ground.image = img;
          ground.render = () => {
               ctx.drawImage(ground.image, ground.pos.x, ground.pos.y);
               ctx.drawImage(ground.image, ground.pos.x + ground.image.width, ground.pos.y);
          }
     })


     p.ground = ground;
     gameObjects.push(p);
}

function main(){
     fill(rgb(134, 226, 226));
     rect(0,0,W,H);

     ground.render();

     gameObjects.forEach(go => {
          if(go === p){
               go.lookAt(input.mouse);
               // go.goTo(input.mouse);
               go.readObjects(gameObjects);
          }
          go.update();
          go.render();
     });

     uiObjects.forEach(uiel => {
          ctx.font = UIFont;
          uiel.render();
          uiel.interact(input.mouse, input.mousedown)
     });
}

startAnimation();
