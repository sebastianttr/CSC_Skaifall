import CONFIG from "../Config.js";
import GameObjects from "./GenericObjects.js";

class Player extends GameObjects{
    constructor(ctx,x,y,width,height,assets){
        super(ctx, x, y, width, height, null, CONFIG);

        this.dx = 0;
        this.dy = 0;
        this.velocity = 0.5;
        this.currentKeys = {};
        this.lastDirection = 1;

        this.assets = assets;
        this.translateState = "idle"

        //console.log(this.assets.run.extras);

        this.init();
    }

    init(){
        // set key event listeners
        // key down event handling -> prevent default
        document.addEventListener("keydown",(event) => {
            if (event.code.startsWith("Arrow") || event.code === "Space") {
                event.preventDefault();
              }
            this.currentKeys[event.code] = true;
        })

        // key up event handling
        document.addEventListener("keyup",(event) => {
            this.currentKeys[event.code] = false;
        })

    }

    update(timePassedSinceLastRender){
        // set the value of dx (along the x axis)
        if (this.currentKeys["ArrowRight"]) this.dx = 1;
        else if (this.currentKeys["ArrowLeft"]) this.dx = -1;
        else this.dx = 0;
    
        // set the value of dy (along the y axis)
        if (this.currentKeys["ArrowDown"]) this.dy = 1;
        else if (this.currentKeys["ArrowUp"]) this.dy = -1;
        else this.dy = 0;
    
        //store the last direction the player moved in
        if (this.dx != 0) this.lastDirection = this.dx;

        // calculate the position X and Y respectively
        this.x += timePassedSinceLastRender * this.dx * this.velocity;
        this.y += timePassedSinceLastRender * this.dy * this.velocity;

        this.translateState = this.dx === 0 && this.dy === 0 ? "idle" : "run";
    }

    render(){
        //call the render() of GameObject.js
        super.render();

        //move canvas origin to x,0
        this.ctx.translate(this.x, this.y);

        //mirroring
        this.ctx.scale(this.lastDirection*0.3, 0.3);

        // get the correct sprite
        let coords = this.getImageSpriteCoordinate(this.assets[this.translateState].extras);

        //draw filled retangle
        this.ctx.drawImage(
            this.assets[this.translateState], // image
            coords.sourceX, // source x
            coords.sourceY, // soruce y
            coords.sourceWidth, // source width
            coords.sourceHeight, // source height
            -this.width / 2, // destination x
            -this.height / 2, // destination y
            this.width, // destination width
            this.height // destination height
        );
  
        //reset the transform
        this.ctx.resetTransform();
    }

    getImageSpriteCoordinate(sprite) {
        let frameX = Math.floor(
          ((performance.now() / 1000) * sprite.fps) % sprite.frames
        );
    
        let coords = {
          sourceX: frameX * sprite.frameSize.width, // TODO
          sourceY: 0,
          sourceWidth: sprite.frameSize.width,
          sourceHeight: sprite.frameSize.height,
        };
    
        return coords;
      }
}

export default Player;