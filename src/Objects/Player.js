import GameObjects from "./GenericObjects.js";
import {ctx,CONFIG} from "../globals.js"

class Player extends GameObjects{
    constructor(x,y,width,height,assets){
        super(x, y, width, height, null, CONFIG);

        this.dx = 0;
        this.dy = 0;
        this.velocity = 0.5;
        this.currentKeys = {};
        this.lastDirection = 1;
        this.gravity = 0.5
        this.velocityX = 1;

        this.assets = assets;
        this.translateState = "idle"

        this.handleMousePosition = this.handleMousePosition.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        //console.log(this.assets.run.extras);

        this.mousePosition = {
            x:0,
            y:0
        }

        this.init();
    }

    init(){
        // set key event listeners
        this.setEventListeners();
    }

    update(timePassedSinceLastRender){
        // set the value of dx (along the x axis)
        if (this.currentKeys["ArrowRight"] || this.currentKeys["KeyD"]) this.dx = 1;
        else if (this.currentKeys["ArrowLeft"] || this.currentKeys["KeyA"]) this.dx = -1;
        else this.dx = 0;

        // calculate the position X and Y respectively
        //this.velocityX *= this.gravity * timePassedSinceLastRender
        this.x = this.mousePosition.x;
        this.y += timePassedSinceLastRender * this.dy * this.velocity;

    }

    render(){
        //call the render() of GameObject.js
        super.render();

        //move canvas origin to x,0
        ctx.translate(this.x, this.y);

        // get the correct sprite

        //draw filled retangle
        ctx.drawImage(
            this.assets, // image
            -this.width / 2, // destination x
            -this.height / 2, // destination y
            this.width/2, // destination width
            this.height/2 // destination height
        );
  
        //reset the transform
        ctx.resetTransform();
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

    handleKeyDown(ev){
        if (ev.code.startsWith("Arrow") || ev.code === "Space") {
            ev.preventDefault();
        }
        this.currentKeys[ev.code] = true;
    }

    handleKeyUp(ev){
        this.currentKeys[ev.code] = false;
    }

    handleMousePosition(ev){
        let clientRect = canvas.getBoundingClientRect();
        this.mousePosition.x = Math.round(ev.clientX - clientRect.left);
        this.mousePosition.y = Math.round(ev.clientY - clientRect.top);  
    }

    setEventListeners(){
        document.addEventListener("keydown", this.handleKeyDown,true);
        document.addEventListener("keyup", this.handleKeyUp,true);
        canvas.addEventListener("mousemove",this.handleMousePosition,true);
    }

    removeEventListeners(){
        document.removeEventListener("keydown", this.handleKeyDown,true);
        document.removeEventListener("keyup", this.handleKeyUp,true);
        canvas.removeEventListener("mousemove",this.handleMousePosition,true);
    }
}

export default Player;