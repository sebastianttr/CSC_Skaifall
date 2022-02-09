import GameObjects from "./GenericObjects.js";
import {ctx, CONFIG} from "../globals.js"

class Obstacle extends GameObjects{

    constructor(x,y,width,height, img){
        super(x,y,width,height);
        this.img = img;

        this.velocity = 0.35;
        this.dx = 0;
        this.dy = 1;

        this.init();
    }

    init(){
        // do nothing
    }

    update(timePassedSinceLastRender){
        this.y += this.dy * timePassedSinceLastRender * this.velocity;
    }

    render(){
        // call the super method to render box
        super.render();

        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.fillStyle = "red";

        ctx.fillRect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        )

        /*
        ctx.drawImage(
            this.img,
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        )
        */

        ctx.restore();

        ctx.resetTransform();


    }



}

export default Obstacle;