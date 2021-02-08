

const aArray = [
  [1, 1, 0, 1, 1, 1, 1,0,0,0,0,0],
  [0, 1, 0, 0, 0, 0, 0,0,0,0,0,0],
  [0, 1, 0, 1, 1, 0, 1,0,0,0,0,0],
  [0, 0, 0, 1, 0, 0, 1,0,0,0,0,0],
  [0, 1, 0, 1, 1, 1, 1,0,0,0,0,0],
  [0, 1, 0, 0, 0, 1, 0,0,0,0,0,0],
  [0, 0, 0, 1, 0, 1, 0,0,0,0,0,0],
];


export class GameLoop {
  // Typescript thing: I have to say what is available on `this` at the top of the class
  // I am defining my gamestate right here.
  wPressed: boolean;
  aPressed: boolean;
  sPressed: boolean;
  dPressed: boolean;
  // Equivalent of python's init function
  constructor() {
    this.wPressed = false;
    this.aPressed = false;
    this.sPressed = false;
    this.dPressed = false;
  }

  // Here we set up all of our event listeners
  connectListeners() {
    const onKeyDown = (event: any) => {
      if (event.code === 'KeyW') {
        this.wPressed = true;
      }
      if (event.code === 'KeyA') {
        this.aPressed = true;
      }
      if (event.code === 'KeyS') {
        this.sPressed = true;
      }
      if (event.code === 'KeyD') {
        this.dPressed = true;
      }
    }

    const onKeyUp = (event: any) => {
      if (event.code === 'KeyW') {
        this.wPressed = false;
      }
      if (event.code === 'KeyA') {
        this.aPressed = false;
      }
      if (event.code === 'KeyS') {
        this.sPressed = false;
      }
      if (event.code === 'KeyD') {
        this.dPressed = false;
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  }


  // Render is special in that it is called EVERY FRAME (60fps)
  // So anything that doesn't need to happen every frame should NOT go here.
  // You define a function in a class by just giving it a name, followed by
  // the arguments and then the body of the function in curly braces
  render(context: CanvasRenderingContext2D, height: number, width: number) {
    const heightInc = height/aArray.length
    const widthInc = width/aArray[0].length
    context.beginPath()
    context.stroke();
    for(let x = 0; x < aArray.length; x++) {
      for(let y = 0; y < aArray[x].length; y++) {
        if(aArray[x][y] === 1) {
            context.fillStyle ='blue';
            context.strokeRect(x*widthInc,y*heightInc,widthInc,heightInc);
        }
      }
    }
    context.fillStyle ='black';
    if (this.wPressed) context.fillStyle = 'yellow';
    if (this.aPressed) context.fillStyle = 'blue';
    if (this.sPressed) context.fillStyle = 'red';
    if (this.dPressed) context.fillStyle = 'green';
    context.fillRect(0,0,heightInc/8,width);
    context.fillRect(0,0,height,widthInc/8);
    context.fillRect(width,height,-heightInc/8,-width);
    context.fillRect(width,height,-height,-widthInc/8);
  }
}