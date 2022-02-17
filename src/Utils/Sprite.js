/**
 * 
 * Sprite class which takes care of animation sprites
 * 
 */

class Sprite {
    /**
     * 
     * Constructor function which initializes the states of the object
     * 
     * @param  {Image} spritesheet
     * @param  {Number} nFrames
     * @param  {Number} fps
     * @param  {Number} frameSize
     * @param  {Object} options
     */
    constructor(spritesheet, nFrames, fps , frameSize,options){
        this.spritesheet = spritesheet;
        this.nFrames = nFrames;
        this.fps = fps;
        this.frameSize = frameSize;
        this.options = options;
        this.spriteRampDone = false;
        this.spriteFrameIndex = 0;
        
        this.currentTimeStamp = 0;
    }
    
    /**
     * 
     * Return a frame of a sprite -> not a cropped image, rather the crop data
     * 
     * @param {Boolean} isReverse no purpose ATM
     * @returns {Object} Object containing source positions and dimensions for the sprite image
     */
    getSpriteFrame(isReverse){

        /*
            current frame is depended on the time, so we can have a spritesheet that takes 
            the amount of frames and the fps into account
        */
        let currentFrame = Math.floor(
            ((performance.now() / 1000) * this.fps) % this.nFrames
        );
        
        // return spritesheet data
        return {
            sourceX: currentFrame * this.frameSize.width, 
            sourceY: 0,
            sourceWidth: this.frameSize.width,
            sourceHeight: this.frameSize.height,
          };
    }

    /**
     * 
     * Return frame data of a specific sprite image
     * 
     * @param {Number} n the index of the sprite data that shall be returned
     * @returns {Object} Object containing source positions and dimensions for the sprite image
     */
    getSpecificSpriteFrame(n){
        return {
            sourceX: n * this.frameSize.width, // TODO
            sourceY: 0,
            sourceWidth: this.frameSize.width,
            sourceHeight: this.frameSize.height,
        };
    }    
}

export default Sprite;