
let stop = false;
let frameCount = 0;
let fps = 50,
  fpsInterval, startTime, now, then, elapsed;
let mainCounter = 0;


// TODO: Make this a factory function or class to return a runtime manager object to have flexible control

//initialize timer variables and begin animation
const startAnimation = (fps = 50) => {
  fpsInterval = 1000 / fps;
  then = window.performance.now();
  startTime = then;
  if(typeof init === "undefined"){
    console.log("Non-error: Bypassing init call. Init is undefined;")
  }else{
    init();
  }
  if(typeof main === "undefined"){
    console.error("Please define the main function before calling startAnimation();");
  }else{
    animate();
  }

}

let Time = 0;
const animate = () => {

  //request another frame
  requestAnimationFrame(animate);

  //calculate elapsed time since last loop
  now = window.performance.now();
  elapsed = now - then;
  //if enough time elapsed, draw next frame
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    mainCounter++;
    if (!stop) { // pause function here !!!!!!!!
      Time++;
      main();
    }
  }
}

const pause = () => {
  stop = !stop;
}

//****************************************************************************
//********** END ANIMATION / MAIN LOOP
//****************************************************************************
