import { ctx,canvas } from "../globals.js";
import GenericObjects from "../Objects/GenericObjects.js"
import {checkCollisionBetween} from "../Utils/CollisionDetection.js"


class Button extends GenericObjects{

    isHovering = false;
    isClicked = false;

    constructor(x,y,w,h,text,fontSize,callback){
        super(x,y,w,h)
        this.text = text;
        this.fontSize = fontSize;
        this.callback = callback;

        this.mouseCollisionBox = new GenericObjects(0,0,1,1);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseClickDown = this.handleMouseClickDown.bind(this);
        this.handleMouseClickUp = this.handleMouseClickUp.bind(this);

        this.init();
    }

    init(){
        this.#setEventListeners();
    }

    update(){
        // check collision 
        if(checkCollisionBetween(this,this.mouseCollisionBox)){
            //console.log("Hovering over!")
            this.isHovering = true;

            if(this.isClicked){
                this.callback();
            }
        }
        else {
            this.isHovering = false;
            this.isClicked = false;
        }
    }

    render(){
        super.render();

        ctx.translate(this.x,this.y);

        ctx.save();

        ctx.strokeStyle = "#0d4dfc";
        ctx.lineWidth =  5;
        ctx.lineJoin = 'round';

        ctx.shadowColor = '#3d4e7a';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.strokeRect(
            -this.width/2, 
            -this.height/2, 
            this.width, 
            this.height
        );

        ctx.fillStyle = (this.isHovering)?"#dcdaf7":"#7d74e3";
        ctx.fillRect(
            -this.width/2, 
            -this.height/2, 
            this.width, 
            this.height
        )

        ctx.font = `${this.fontSize}px Gamefont`;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";

        ctx.fillText(
            this.text,
            0, 
            15, 
        )

        ctx.restore();

        ctx.resetTransform();
    }

    handleMouseMove(e){
        let clientRect = canvas.getBoundingClientRect();
        this.mouseCollisionBox.x = Math.round(e.clientX - clientRect.left);
        this.mouseCollisionBox.y = Math.round(e.clientY - clientRect.top);  
    }

    handleMouseClickDown(e){
        this.isClicked = true;
    }

    handleMouseClickUp(e){
        this.isClicked = false;
    }

    #setEventListeners(){
        canvas.addEventListener("mousemove",this.handleMouseMove,true);       
        canvas.addEventListener("mousedown",this.handleMouseClickDown,true);
        canvas.addEventListener("mouseup",this.handleMouseClickUp,true);
    }

    removeEventListeners(){
        console.log("remove event listeners")
        canvas.removeEventListener("mousemove",this.handleMouseMove,true);
        canvas.removeEventListener("mousedown",this.handleMouseClickDown,true);
        canvas.removeEventListener("mouseup",this.handleMouseClickUp,true);


    }


}

export default Button;