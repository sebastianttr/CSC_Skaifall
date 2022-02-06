import CONFIG from "../Config.js"

export default class GameObjects {
    constructor(ctx, x, y, width, height, img){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img
    }

    init() {}
    update() {}

    render() {
        // draw bounding box rectangle
        if (CONFIG.debug) {
          let bb = this.getBoundingBox();
          this.ctx.translate(bb.x, bb.y);
          this.ctx.strokeRect(0, 0, bb.w, bb.h);
          this.ctx.resetTransform();
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