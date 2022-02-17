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
    constructor(width,heigth,endX,endY,particlesImg){
        super(0,0,width,heigth);
        this.particlesImg = particlesImg;
        this.endX = endX;
        this.endY = endY;
        this.velocityX = 0;
        this.velocityY = 0;
        
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
        this.velocityX = this.endX - this.x;
        this.x += this.velocityX * timePassedSinceLastRender / 1000
        
        this.velocityY = this.endY - this.y;
        this.y += this.velocityY * timePassedSinceLastRender / 1000
        //this.velocityY = this.endY - this.y;
    }   

    /**
     * render method
     */
    render(){
        super.render();

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