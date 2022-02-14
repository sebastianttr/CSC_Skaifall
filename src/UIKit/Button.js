import { ctx,canvas } from "../globals.js";
import GenericObjects from "../Objects/GenericObjects.js"
import {checkCollisionBetween} from "../Utils/CollisionDetection.js"


class Button extends GenericObjects{

    isHovering = false;
    isClicked = false;
    #animationStep = 1;

    constructor(x,y,w,h,text,fontSize,callback){
        super(x,y,w,h)
        this.text = text;
        this.fontSize = fontSize;
        this.callback = callback;

        this.mouseCollisionBox = new GenericObjects(0,0,1,1);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseClickDown = this.handleMouseClickDown.bind(this);
        this.handleMouseClickUp = this.handleMouseClickUp.bind(this);

        this.borderAnimationOffset = {
            x: 0,
            y: 0
        }

        this.fillAnimationOffSet = {
            x: 0,
            y: 0
        }

        this.opacity = 1;

        this.init();
    }

    init(){
        this.setEventListeners();
    }

    update(){
        // check collision 
        if(checkCollisionBetween(this,this.mouseCollisionBox)){
            //console.log("Hovering over!")
            this.isHovering = true;

            if(this.borderAnimationOffset.x < 5 && this.borderAnimationOffset.y > -5){
                this.borderAnimationOffset.x += this.#animationStep;
                this.borderAnimationOffset.y -= this.#animationStep;
                this.fillAnimationOffSet.x += this.#animationStep;
                this.fillAnimationOffSet.y -= this.#animationStep;
            }

            if(this.isClicked){
                this.callback();
            }
        }
        else {
            this.isHovering = false;
            this.isClicked = false;

            if(this.borderAnimationOffset.x > 0 && this.borderAnimationOffset.y < 0){
                this.borderAnimationOffset.x -= this.#animationStep;
                this.borderAnimationOffset.y += this.#animationStep;
                this.fillAnimationOffSet.x -= this.#animationStep;
                this.fillAnimationOffSet.y += this.#animationStep;
            }
        }
    }

    render(){
        super.render();

        ctx.translate(this.x,this.y);

        ctx.save();

        ctx.globalAlpha = this.opacity

        ctx.strokeStyle = "#0d4dfc";
        ctx.lineWidth =  5;
        ctx.lineJoin = 'round';

        ctx.shadowColor = '#3d4e7a';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.strokeRect(
            -this.width/2 - this.borderAnimationOffset.x, 
            -this.height/2 - this.borderAnimationOffset.y, 
            this.width, 
            this.height
        );

        ctx.fillStyle = (this.isHovering)?"#dcdaf7":"#7d74e3";
        ctx.fillRect(
            -this.width/2 + this.fillAnimationOffSet.x, 
            -this.height/2 + this.fillAnimationOffSet.y, 
            this.width, 
            this.height
        )

        ctx.font = `${this.fontSize}px Gamefont`;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";

        ctx.fillText(
            this.text,
            0 + this.fillAnimationOffSet.x, 
            15 + this.fillAnimationOffSet.y, 
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

    setEventListeners(){
        canvas.addEventListener("mousemove",this.handleMouseMove,true);       
        canvas.addEventListener("mousedown",this.handleMouseClickDown,true);
        canvas.addEventListener("mouseup",this.handleMouseClickUp,true);

        canvas.addEventListener("touchstart",this.handleMouseClickDown,true)
        canvas.addEventListener("touchend",this.handleMouseClickUp,true)

    }

    removeEventListeners(){
        //console.log("remove event listeners")
        canvas.removeEventListener("mousemove",this.handleMouseMove,true);
        canvas.removeEventListener("mousedown",this.handleMouseClickDown,true);
        canvas.removeEventListener("mouseup",this.handleMouseClickUp,true);

        canvas.removeEventListener("touchstart",this.handleMouseClickDown,true)
        canvas.removeEventListener("touchend",this.handleMouseClickUp,true)
    }


}

export default Button;