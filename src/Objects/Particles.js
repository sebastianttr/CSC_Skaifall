import { ctx } from "../globals.js";
import GameObjects from "./GenericObjects.js";


class Particles extends GameObjects{

    
    /**
     * 
     * Constructor initialises the class and all its properties
     * s
     * @param  {Number} x
     * @param  {Number} y
     * @param  {Number} width
     * @param  {Number} heigth
     * @param  {Array} particlesImg an array of all the loaded particle images
     */
    constructor(width,heigth,endX,endY,rotation,particlesImg){
        super(0,0,width,heigth);
        this.rotation = rotation;
        this.particlesImg = particlesImg;
        this.endX = endX;
        this.endY = endY;
        this.velocityX = 0;
        this.velocityY = 0;
        this.done = false;

        this.init();
    }

    /**
     * Init method
     */
    init(){

    }

    /**
     * update method
     * 
     * @param {Number} timePassedSinceLastRender 
     */
    update(timePassedSinceLastRender){
        this.velocityX =  Math.round(this.endX - this.x);
        this.x += this.velocityX * timePassedSinceLastRender / 1000
        
        this.velocityY = Math.round(this.endY - this.y);
        this.y += this.velocityY * timePassedSinceLastRender / 1000

        if(this.velocityX == 0 && this.velocityX == 0){
            this.done = true;
        }
    }   

    /**
     * render method
     */
    render(){
        super.render();

        ctx.rotate(this.rotation * (Math.PI/180));

        ctx.drawImage(
            this.particlesImg,
            this.particlesImg.extras.x + this.x,
            this.particlesImg.extras.y + this.y,
            this.width,
            this.height
        )
        
    }   
}

export default Particles;