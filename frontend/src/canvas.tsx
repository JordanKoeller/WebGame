import React, {useRef, useEffect} from 'react';

import { GameLoop } from './game-loop';

export const Canvas: React.FC<{gameLoop: GameLoop}> = ({gameLoop}) => {
    const canvasRef: React.MutableRefObject<null | HTMLCanvasElement> = useRef(null);
    let blRect = {color: 'black', cHoff: 0, rWoff: 50}

    const width = 800;
    const height = 800;


    useEffect(() => {
      const canvasElement = canvasRef.current;
      const context = canvasElement!.getContext('2d') as CanvasRenderingContext2D;
      // I configure the event listeners once before the animation starts.
      gameLoop.connectListeners();
      
      const renderer = () => {
        context.clearRect(0,0,width, height);
        gameLoop.render(context, height, width);
        window.requestAnimationFrame(renderer);
      }
      renderer();
    });
    
    return <canvas ref={canvasRef} id='myCanvas' width={width} height={height} style={{border:'1px solid #000', backgroundColor: '#fff'}} >  
    </canvas>
};


