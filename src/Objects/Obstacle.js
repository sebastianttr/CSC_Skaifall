import GameObjects from "./GenericObjects.js";
import {ctx, CONFIG} from "../globals.js"


/**
 * 
 * Obstacle class. A class which draws a falling obstacle.
 * 
 * @extends GameObjects
 * 
 */
class Obstacle extends GameObjects{

    
    /**
     * 
     * Constructor initializes the properties and calls the init method
     * 
     * @param  {Number} x
     * @param  {Number} y
     * @param  {Number} width
     * @param  {Number} height
     * @param  {Number} img
     */
    constructor(x,y,width,height, img){
        super(x,y,width,height);
        this.img = img;

        this.playerVelocity = 1;
        this.velocity = 0.35;
        this.dx = 0;
        this.dy = 1;

        this.init();
    }

    /**
     * Init function to initialise all the states
     */
    init(){
        // do nothing ._.
    }

    /**
     * Update function to update all the states. 
     * @param  {Number} timePassedSinceLastRender
     */
    update(timePassedSinceLastRender){
        this.y += this.dy * timePassedSinceLastRender * this.velocity * this.playerVelocity;
    }

    /**
     * render function
     */
    render(){
        // call the super method to render box
        super.render();

        ctx.translate(this.x, this.y); 
        ctx.drawImage(
            this.img,
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        )

        ctx.resetTransform();
    }
}

export default Obstacle;