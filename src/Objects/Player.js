import GameObjects from "./GenericObjects.js";
import {ctx,CONFIG,map, canvas} from "../globals.js";
import Sprite from "../Utils/Sprite.js";

/**
 * 
 * Player class. Draws the player based on the mouse position with some physics
 * 
 * @extends
 * 
 */
class Player extends GameObjects{

    
    /**
     * 
     * Constructer set all the states. 
     * 
     * @param  {Number} x
     * @param  {Number} y
     * @param  {Number} width
     * @param  {Number} height
     * @param  {Object} assets
     * @param  {Image} flameSprite
     * @param  {Object} options
     */
    constructor(x,y,width,height,assets,flameSprite,options){
        super(x, y, width, height, null, CONFIG);

 
        this.velocity = 0.5;
        this.currentKeys = {};
        this.lastDirection = 1;
        this.gravity = 0.5
        this.velocityX = 0.5;
        this.velocityY = 0.5;
        this.flameSprite = flameSprite;
        this.options = options
        this.assets = assets;
        this.translateState = "idle"
        this.health = 1;
        this.mousePosition = {
            x:0,
            y:0
        }

        // create an new instance of Sprite to draw the flames
        this.sprite = new Sprite(
            this.flameSprite,
            this.flameSprite.extras.frames,
            this.flameSprite.extras.fps,
            this.flameSprite.extras.frameSize,
        )
        

      

    
        this.init();
    }

    init(){
        
        // bind the current context -> so we can access the properties within the callbacks
        this.handleMousePosition = this.handleMousePosition.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        // set key event listeners
        this.setEventListeners();
    }

    update(timePassedSinceLastRender){
        // save the old y. for the upper/lower boundary
        this.oldY = this.y

        // calculate the position X and Y respectively, check if it should move with the mouse
        if(this.options.mouseInteraction){
            this.velocityX = (this.mousePosition.x) - this.x
            this.x += this.velocityX * timePassedSinceLastRender / 100
    
            //console.log(this.velocityX)
    
            this.velocityY = (this.mousePosition.y) - this.y
            this.y += timePassedSinceLastRender / 100 * this.velocityY;
        }

        // boundaries. also check if it should be within a boundary. 
        if(this.options.contain && (this.y < 600 || this.y > 750)){
            //console.log("setting old y")
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

    /**
     * 
     * Mouse move position event handler 
     * 
     * @param {MouseEvent} e event 
     */
    handleMousePosition(ev){
        // get the absolute position of the mouse
        let clientRect = canvas.getBoundingClientRect();
        // calculate the correct mouse position inside the canvas
        this.mousePosition.x = Math.round(ev.clientX - clientRect.left);
        this.mousePosition.y = Math.round(ev.clientY - clientRect.top);  
    }

    /**
     * A function to set the event listener
     */
    setEventListeners(){
        canvas.addEventListener("mousemove",this.handleMousePosition,true);
        canvas.addEventListener("touchmove",this.handleMousePosition,true);
    }

    /**
     * A function to reset the event listener -> usually called by the destroy() hook
     */
    removeEventListeners(){
        canvas.removeEventListener("mousemove",this.handleMousePosition,true);
        canvas.removeEventListener("touchmove",this.handleMousePosition,true);
    }
}

export default Player;