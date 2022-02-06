import GameObjects from "./GenericObjects.js";
import CONFIG from "../Config.js";

class Ground extends GameObjects{
    constructor(ctx,x,y,img){
        super(ctx, x, y, img.naturalWidth, img.naturalHeight, img, CONFIG);
        this.init();
    }

    init() {
        //console.log(`${this.width} x ${this.height}`)
    }

    render(){
        //call parent render method
        super.render();

        // move to position
        this.ctx.translate(this.x,this.y);

        //draw image
        this.ctx.drawImage(this.img,0,0);

        //reset the transform
        this.ctx.resetTransform();
    }

}

export default Ground;