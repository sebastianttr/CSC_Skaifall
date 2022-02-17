import {CONFIG,ctx} from "../globals.js"


/**
 * 
 * GameObjects class. This class has some properties which all other renderable game object 
 * 
 */

class GameObjects {
    
    /**
     * 
     * Constructor takes care of the initialisation of the properties 
     * 
     * @param  {Number} x
     * @param  {Number} y
     * @param  {Number} width
     * @param  {Number} height
     */
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // init and update are empty :/
    init() {}
    update() {}


    /**
     * render method. Renders the bounding box
     */
    render() {
        // draw bounding box rectangle
        if (CONFIG.debug) {
            ctx.save();
            let bb = this.getBoundingBox();
            ctx.strokeStyle = "red";
            ctx.translate(bb.x, bb.y);
            ctx.strokeRect(0, 0, bb.w, bb.h);
            ctx.restore();
            ctx.resetTransform();
        }
    }

    /**
     * 
     * getBoudingBox function which return the data of the bounding box
     * 
     * @returns {Object} object containing position data and dimension data.
     */
    getBoundingBox(){
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            w: this.width,
            h: this.height,
        };
    }
}

export default GameObjects;