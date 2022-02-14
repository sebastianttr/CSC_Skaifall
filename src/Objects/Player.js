import GameObjects from "./GenericObjects.js";
import {ctx,CONFIG,map, canvas} from "../globals.js";
import Sprite from "../Utils/Sprite.js";

class Player extends GameObjects{
    constructor(x,y,width,height,assets,flameSprite,options){
        super(x, y, width, height, null, CONFIG);

        this.dx = 0;
        this.dy = 0;
        this.velocity = 0.5;
        this.currentKeys = {};
        this.lastDirection = 1;
        this.gravity = 0.5
        this.velocityX = 0.5;
        this.velocityY = 0.5;
        this.flameSprite = flameSprite;
        this.sprite = new Sprite(
            this.flameSprite,
            this.flameSprite.extras.frames,
            this.flameSprite.extras.fps,
            this.flameSprite.extras.frameSize,
        )
        // tells if it should only work within a container (see update function)
        this.options = options

        this.assets = assets;
        this.translateState = "idle"

        this.handleMousePosition = this.handleMousePosition.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        this.health = 3;

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

        this.oldY = this.y

        // calculate the position X and Y respectively

        if(this.options.mouseInteraction){
            this.velocityX = (this.mousePosition.x) - this.x
            this.x += this.velocityX * timePassedSinceLastRender / 100
    
            //console.log(this.velocityX)
    
            this.velocityY = (this.mousePosition.y) - this.y
            this.y += timePassedSinceLastRender / 100 * this.velocityY;
        }

        // this is great for the difficulty of the game
        if(this.options.contain && (this.y < 600 || this.y > 750)){
            console.log("setting old y")
            this.y = this.oldY
        }
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
            this.width, // destination width
            this.height // destination height
        );
        
        // get frame for the flame
        let flameFrame = this.sprite.getSpriteFrame("up");

        // draw the sprite
        ctx.drawImage(
            this.flameSprite,
            flameFrame.sourceX,
            flameFrame.sourceY,
            flameFrame.sourceWidth,
            flameFrame.sourceHeight,
            -this.width / 1.75, // destination x
            this.height / 6, // destination y
            flameFrame.sourceWidth * 0.7,
            flameFrame.sourceHeight * 0.7, // destination height
        )

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
        canvas.addEventListener("touchmove",this.handleMousePosition,true);
    }

    removeEventListeners(){
        document.removeEventListener("keydown", this.handleKeyDown,true);
        document.removeEventListener("keyup", this.handleKeyUp,true);
        canvas.removeEventListener("mousemove",this.handleMousePosition,true);
        canvas.removeEventListener("touchmove",this.handleMousePosition,true);
    }
}

export default Player;