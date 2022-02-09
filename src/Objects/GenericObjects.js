import {CONFIG,ctx} from "../globals.js"

export default class GameObjects {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    init() {}
    update() {}

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

    getBoundingBox(){
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            w: this.width,
            h: this.height,
        };
    }
}