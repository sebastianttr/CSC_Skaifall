import { ctx,canvas } from "../globals.js";
import GenericObjects from "../Objects/GenericObjects.js"
import {checkCollisionBetween} from "../Utils/CollisionDetection.js"

/**
 * 
 * Button class to display a button with text and a callback
 * 
 * @extends GenericObjects
 * 
 */
class Button extends GenericObjects{

    isHovering = false;
    isClicked = false;
    #animationStep = 1;

    /**
     * 
     * Constructor sets up the propertiy and initialises the event handlers
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} w 
     * @param {Number} h 
     * @param {String} text 
     * @param {Number} fontSize 
     * @param {Function} callback 
     */
    constructor(x,y,w,h,text,fontSize,callback,assets){
        // call super constructor
        super(x,y,w,h)

        // set properties
        this.text = text;
        this.fontSize = fontSize;
        this.callback = callback;
        this.assets = assets;

        console.log(assets)

        // unreferenced copy would be very nice in this case
        this.hoverAudio = new Audio();
        this.hoverAudio.src = assets.hoverAudio.src;


        this.selectionAudio = new Audio();
        this.selectionAudio.src = assets.selectionAudio.src;


        // setting the animation properties, which keeps track of the animations
        this.borderAnimationOffset = {
            x: 0,
            y: 0
        }

        this.fillAnimationOffSet = {
            x: 0,
            y: 0
        }

        // the opacity. for animations and such
        this.opacity = 1;

        // call init
        this.init();
    }

    /**
     * Init function to initialise all the states
     */
    init(){
        // create a collision box for the mouse, which is simply a GenericObject
        this.mouseCollisionBox = new GenericObjects(0,0,1,1);
        // bind the current context, because we need to access some properties from this class
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseClickDown = this.handleMouseClickDown.bind(this);
        this.handleMouseClickUp = this.handleMouseClickUp.bind(this);
        this.setEventListeners();
    }

    /**
     * Update function to update all the states. 
     * @param  {Number} timePassedSinceLastRender
     */
    update(timePassedSinceLastRender){
        // check collision 
        if(checkCollisionBetween(this,this.mouseCollisionBox)){
            //is hovering is true
            this.isHovering = true;
            
            if(this.hoverAudio.currentTime >= 0){
                this.hoverAudio.currentTime = 0;
            }

            this.hoverAudio.play();
            

            // set animation condition
            if(this.borderAnimationOffset.x < 5 && this.borderAnimationOffset.y > -5){
                this.borderAnimationOffset.x += this.#animationStep;
                this.borderAnimationOffset.y -= this.#animationStep;
                this.fillAnimationOffSet.x += this.#animationStep;
                this.fillAnimationOffSet.y -= this.#animationStep;
            }

            // callback if the button has been clicked
            if(this.isClicked){
                if(this.selectionAudio.currentTime >= 0){
                    this.selectionAudio.currentTime = 0;
                }
    
                this.selectionAudio.play();
                this.callback();
            }
        }
        else {
            // reset the states
            this.isHovering = false;
            this.isClicked = false;

            // set animation condition
            if(this.borderAnimationOffset.x > 0 && this.borderAnimationOffset.y < 0){
                this.borderAnimationOffset.x -= this.#animationStep;
                this.borderAnimationOffset.y += this.#animationStep;
                this.fillAnimationOffSet.x -= this.#animationStep;
                this.fillAnimationOffSet.y += this.#animationStep;
            }
        }
    }

    /**
     * render function
     */
    render(){
        // call the super function to render the bounding box
        super.render();

        // move to desired location
        ctx.translate(this.x,this.y);

        // save the context in order to set the styling
        ctx.save();

        // set the opacity of the button
        ctx.globalAlpha = this.opacity

        // set styling 
        ctx.strokeStyle = "#0d4dfc";
        ctx.lineWidth =  5;
        ctx.lineJoin = 'round';

        ctx.shadowColor = '#3d4e7a';
        ctx.shadowBlur = 10;


        // draw the border
        ctx.beginPath();
        ctx.strokeRect(
            -this.width/2 - this.borderAnimationOffset.x, 
            -this.height/2 - this.borderAnimationOffset.y, 
            this.width, 
            this.height
        );

        // fill the button
        ctx.fillStyle = (this.isHovering)?"#dcdaf7":"#7d74e3";
        ctx.fillRect(
            -this.width/2 + this.fillAnimationOffSet.x, 
            -this.height/2 + this.fillAnimationOffSet.y, 
            this.width, 
            this.height
        )

        // set the font style
        ctx.font = `${this.fontSize}px Gamefont`;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";

        // draw text
        ctx.fillText(
            this.text,
            0 + this.fillAnimationOffSet.x, 
            15 + this.fillAnimationOffSet.y, 
        )

        //restore and reset any kind of transformation
        ctx.restore();
        ctx.resetTransform();
    }


    
    /**
     * 
     * Mouse move position event handler 
     * 
     * @param {MouseEvent} e event 
     */
    handleMouseMove(e){
        // get the absolute position of the mouse
        let clientRect = canvas.getBoundingClientRect();
        // calculate the correct mouse position inside the canvas
        this.mouseCollisionBox.x = Math.round(e.clientX - clientRect.left);
        this.mouseCollisionBox.y = Math.round(e.clientY - clientRect.top); 
    }

    /**
     * 
     * Mouse press down event handler
     * 
     * @param {MouseEvent} e handler
     */

    handleMouseClickDown(e){
        this.isClicked = true;
    }

     /**
     * 
     * Mouse press up event handler
     * 
     * @param {MouseEvent} e handler
     */
    handleMouseClickUp(e){
        this.isClicked = false;
    }


    /**
     * A function to set the event listener
     */
    setEventListeners(){
        canvas.addEventListener("mousemove",this.handleMouseMove,true);       
        canvas.addEventListener("mousedown",this.handleMouseClickDown,true);
        canvas.addEventListener("mouseup",this.handleMouseClickUp,true);

        canvas.addEventListener("touchstart",this.handleMouseClickDown,true)
        canvas.addEventListener("touchend",this.handleMouseClickUp,true)
    }

    /**
     * A function to reset the event listener -> usually called by the destroy() hook
     */
    removeEventListeners(){
        canvas.removeEventListener("mousemove",this.handleMouseMove,true);
        canvas.removeEventListener("mousedown",this.handleMouseClickDown,true);
        canvas.removeEventListener("mouseup",this.handleMouseClickUp,true);

        canvas.removeEventListener("touchstart",this.handleMouseClickDown,true)
        canvas.removeEventListener("touchend",this.handleMouseClickUp,true)
    }


}

export default Button;