import {CONFIG,ctx,map} from "../globals.js";
import GenericObjects from "../Objects/GenericObjects.js"


class Dialog extends GenericObjects{
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

    showDialog(){
        this.isVisible = true;
    }

    closeDialog(){
        this.isVisible = false;
    }

    init(){
    }

    update(timePassedSinceLastRender){
        //console.log(this.calcY)

        if(this.isVisible && this.y >= this.setY + CONFIG.canvas.height/2 - 200){
            let mappedVal = map(1-Math.exp(-0.03*this.calcY+1),0,1,620,1280);
            this.y = Math.round(mappedVal);
            this.calcY -= 1;
        }// if the opposite is true -> should not be visible but it is visible
        else if(!this.isVisible && this.y <= this.setY + CONFIG.canvas.height){
            let mappedVal = map(1-Math.exp(-0.03*this.calcY-1),0,1,620,1280);

            this.y = Math.round(mappedVal);
            this.calcY += 0.5;
            
            //console.log("animating down");
        }
        else {
            if(this.calcY >= 100){
                this.calcY = 100;
            }
            else if(this.calcY <= 34){
                this.calcY = 0;
            }
        }
        
        if(this.calcY >= 100){
            this.calcY = 100;
        }
        else if(this.calcY <= 0){
            this.calcY = 0;
        }
        

        this.actions.forEach((el,index) => {
            el.y = this.y - 70
            el.x = this.x
            el.update();
        })
    }

    render(){
        // render black rectangle thingy
        super.render();

        // ctx.translate => terminal cancer
        //ctx.translate(this.x, this.y);

        ctx.save();

        ctx.strokeStyle = "#0d4dfc";
        ctx.lineWidth =  5;
        ctx.lineJoin = 'round';

        ctx.shadowColor = '#3d4e7a';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.strokeRect(
            CONFIG.canvas.width/2-this.width/2,
            -this.height + this.y, 
            this.width, 
            this.height
        );

        ctx.fillStyle = "#7d74e3";
        ctx.fillRect(
            CONFIG.canvas.width/2-this.width/2, 
            -this.height + this.y, 
            this.width, 
            this.height
        )

        ctx.font = `27px Gamefont`;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";

        ctx.fillText(
            this.title,
            CONFIG.canvas.width/2,   
            40 + this.y - this.height, 
        )

        ctx.font = `15px Gamefont`;

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

        this.actions.forEach((el,index) => {
            el.render();
        })

        ctx.restore();

        ctx.resetTransform();
    }
}

export default Dialog;