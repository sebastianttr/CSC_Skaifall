import {CONFIG,ctx,map} from "../globals.js";
import GenericObjects from "../Objects/GenericObjects.js"

/**
 * 
 * Dialog class to be shown in a canvas
 * @extends GenericObjects
 * 
 */

class Dialog extends GenericObjects{
    /**
     * Constructor function
     * @param  {Number} x
     * @param  {Number} y
     * @param  {Number} width
     * @param  {Number} height
     * @param  {Number} title
     * @param  {Number} content
     * @param  {Number} actions
     */
    constructor(x,y,width,height,title,content,actions){
        super(x,y,width,height);
        this.setX = x;
        this.setY = y;

        this.y = this.setY + CONFIG.canvas.height + 1;
        this.calcY = 100;

        this.title = title;
        this.content = content;
        this.actions = actions;

        this.isVisible = false;

        this.init();
    }

    // open the dialog by setting the variable isVisible to true. 
    showDialog(){
        this.isVisible = true;
    }

    // close the dialog by setting the variable isVisible to true. 
    closeDialog(){
        this.isVisible = false;
    }
    
    /**
     * Init function to initialise all the states
     */
    init(){
    }

    /**
     * Update function to update all the states. 
     * @param  {Number} timePassedSinceLastRender
     */
    update(timePassedSinceLastRender){
        //console.log(this.calcY)

        // run the animation upwards when a certain condition is met
        if(this.isVisible && this.y >= this.setY + CONFIG.canvas.height/2 - 200){
            let mappedVal = map(1-Math.exp(-0.03*this.calcY+1),0,1,620,1280);
            this.y = Math.round(mappedVal);
            this.calcY -= 1;
        }// if the opposite is true -> should not be visible but it is visible -> run animation downwards
        else if(!this.isVisible && this.y <= this.setY + CONFIG.canvas.height){
            let mappedVal = map(1-Math.exp(-0.03*this.calcY-1),0,1,620,1280);
            this.y = Math.round(mappedVal);
            this.calcY += 0.5;
        } 
        
        // limiters -> to set the limits. 34 because the exp function does not go all the way down to 0 (yet)
        if(this.calcY >= 100){
            this.calcY = 100;
        }
        else if(this.calcY <= 34){
            this.calcY = 0;
        }

        // update the position of the button too -> translate does not work because the bounding box for click handler is somewhere else
        this.actions.forEach((el) => {
            el.y = this.y - 70
            el.x = this.x
            el.update();
        })
    }
    /**
     * render function
     */
    render(){
        // render black rectangle thingy
        super.render();

        // ctx.translate => not working all that well
        //ctx.translate(this.x, this.y);

        // save context to be able to reset the stroke/fill/text style
        ctx.save();

        ctx.strokeStyle = "#0d4dfc";
        ctx.lineWidth =  5;
        ctx.lineJoin = 'round';

        ctx.shadowColor = '#3d4e7a';
        ctx.shadowBlur = 10;

        // draw light blue rectangle
        ctx.beginPath();
        ctx.strokeRect(
            CONFIG.canvas.width/2-this.width/2,
            -this.height + this.y, 
            this.width, 
            this.height
        );

        // fill light blue rectangle
        ctx.fillStyle = "#7d74e3";
        ctx.fillRect(
            CONFIG.canvas.width/2-this.width/2, 
            -this.height + this.y, 
            this.width, 
            this.height
        )


        // set text styling
        ctx.font = `27px Gamefont`;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";

        // draw some text
        ctx.fillText(
            this.title,
            CONFIG.canvas.width/2,   
            40 + this.y - this.height, 
        )

        ctx.font = `15px Gamefont`;

        // draw the text with line wrapping by getting the amount of lines and the drawing a text for each lines
        const lines = ctx.getLines(ctx,this.content,this.width,"20px Gamefont");
        let lineOffset = 0;

        lines.forEach((element,index) => {
            lineOffset = 100 + (index*30) + this.y - this.height/2;
            ctx.fillText(
                element,
                CONFIG.canvas.width/2,  
                100 + (index*30) + this.y - this.height,
                this.width - 20
            )
        });

        // draw the button
        this.actions.forEach((el,index) => {
            el.render();
        })

        // restore context -> resets stroke/fill/text style
        ctx.restore();

        ctx.resetTransform();
    }
}

// export as module
export default Dialog;