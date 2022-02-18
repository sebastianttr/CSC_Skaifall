import GameObjects from "./GenericObjects.js";
import {ctx, CONFIG,map} from "../globals.js"
import Particles from "./Particles.js";

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
    constructor(x,y,width,height, img,particleImages,doneCb){
        super(x,y,width,height);
        this.img = img;

        this.playerVelocity = 1;
        this.velocity = 0.35;
        this.dx = 0;
        this.dy = 1;

        this.isHit = false;
        this.isStill = false;

        this.particleImages = particleImages;
        this.particles = [];

        this.doneCb = doneCb;

        this.particleImages.forEach(item => {
            this.particles.push(
                new Particles(
                    item.naturalWidth,
                    item.naturalHeight,
                    map(Math.random(),0,1,-10,30),
                    map(Math.random(),0,1,-10,30),
                    img.extras.rotation,
                    item
                )
            )
        })
 
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

        // if it is not hit : keep calculating the you
        if(!this.isHit && !this.isStill){
            this.y += this.dy * timePassedSinceLastRender * this.velocity * this.playerVelocity;
        }
        // if the obstacle is hit : update the particle. 
        else {
            //console.log("updating");
            let doneCondition = false;
            this.particles.forEach(el => {
                el.update(timePassedSinceLastRender);
                //console.log(doneCondition || el.done)
                doneCondition = el.done;
            })

            if(doneCondition){
                this.doneCb();
            }
        }
    }

    /**
     * render function
     */
    render(){
        // call the super method to render box
        super.render();
        ctx.translate(this.x, this.y); 
        ctx.rotate(Math.PI/2)


        if(!this.isHit){
            
            ctx.drawImage(
                this.img,
                -this.width/2,
                -this.height/2,
                this.width,
                this.height
            )
        }
        // if it is not hit
        else {           
            this.particles.forEach(el => {
                el.render();
            })
        }

        ctx.resetTransform();
        
    }
}

export default Obstacle;