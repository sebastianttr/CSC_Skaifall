import Cue from "../Utils/Cue.js";
import {CONFIG,ctx} from "../globals.js";
import Button from "../UIKit/Button.js";

let SceneEnd = function(props){
    console.log("Your score is ",props)
    return new Cue(
        {
            preloads:{
                backgroundImg:{
                    src:"./Assets/images/background_space.png",
                    type: Image
                }
            },
            setupProperties:{
                gameObjects:[],
                player: null,
                currentKeys:{},
                restartButton: null,
                backToMenuButton:null,
                restartGameFlag: false,
                backToMenuFlag: false,
                textOpacity: 1,
                highScore: null
            },
            init(){
                this.restartButton = new Button(
                    CONFIG.canvas.width/2,
                    CONFIG.canvas.height/2,
                    300,
                    80,
                    "Restart",
                    30,
                    () => {
                        this.restartGameFlag = true;
                    }
                );

                this.backToMenuButton = new Button(
                    CONFIG.canvas.width/2,
                    CONFIG.canvas.height/2 + 120,
                    300,
                    80,
                    "Back to Menu",
                    25,
                    () => {
                        this.backToMenuFlag = true;
                    }
                )

                this.highScore = Number(localStorage.getItem("highscore"));
                if(props > this.highScore){
                    localStorage.setItem("highscore",props);
                }

                this.setKeyEventListeners();
            },
            update(){
                if(this.restartGameFlag && !this.backToMenuFlag){
                    if(this.restartButton.opacity <= 0){
                        this.switchScene("SceneMain")
                    }
                    this.restartButton.opacity -= 0.01
                    this.backToMenuButton.opacity -= 0.01
                    this.textOpacity -= 0.01
                }
                else if(this.backToMenuFlag && !this.restartGameFlag){
                    if(this.restartButton.opacity <= 0){
                        this.switchScene("SceneStart")
                    }
                    this.restartButton.opacity -= 0.01
                    this.backToMenuButton.opacity -= 0.01
                    this.textOpacity -= 0.01
                }

                this.restartButton.update();
                this.backToMenuButton.update();
            },
            render(){
                //clear and reset canvas
                ctx.resetTransform();
                ctx.clearRect(0,0,CONFIG.canvas.width,CONFIG.canvas.height);

                //draw background
                ctx.drawImage(
                    this.assets.backgroundImg,
                    -CONFIG.canvas.width/2,
                    0,
                    this.assets.backgroundImg.naturalWidth * 0.68,
                    this.assets.backgroundImg.naturalHeight * 0.68
                )
    
                // draw text in the middle of the canvas
                ctx.save();

                ctx.fillStyle = "white"
                ctx.font = "40px Gamefont"
                ctx.textAlign = "center";

                ctx.globalAlpha = this.textOpacity;
    
                ctx.fillText(
                    "Oh well,",
                    CONFIG.canvas.width/2,
                    55
                )


                ctx.fillText(
                    "You lost.",
                    CONFIG.canvas.width/2,
                    100
                )

                ctx.font = "20px Gamefont"

                ctx.fillText(
                    "Your score:",
                    CONFIG.canvas.width/2,
                    200
                )

                ctx.fillStyle = "green"

                if(this.highScore < props){
                    ctx.fillText(
                        "! High Score !",
                        CONFIG.canvas.width/2,
                        310
                    )
                }


                ctx.restore();

                this.restartButton.render();
                this.backToMenuButton.render();

                ctx.fillStyle = `rgba(0, 0, 0, ${0})`
                ctx.fillRect(
                    0,
                    0,
                    CONFIG.canvas.width,
                    CONFIG.canvas.height
                )

                ctx.save();

                ctx.fillStyle = "white";
                ctx.font = "40px Gamefont";
                
                let amountOfDigits = this.getNumNDigits(props);
                
                ctx.beginPath();
                ctx.fillRect(
                    CONFIG.canvas.width/2 - (20 * amountOfDigits),
                    225,
                    (40 * amountOfDigits),
                    40
                )

                ctx.fillStyle = "black";
                ctx.textAlign = "center";

                ctx.fillText(
                    props,
                    CONFIG.canvas.width/2,
                    260,
                )

                ctx.restore();
            },
            destroy(){
                this.removeKeyEventListeners();
                this.restartButton.removeEventListeners();
                this.backToMenuButton.removeEventListeners();
            },  
            methods:{
                setKeyEventListeners(){
                    document.onkeydown = (ev) => {
                        ev.preventDefault();
                        console.log(`In SceneStart keydown ${ev.code}`)
                    }

                    document.onkeyup = (ev) => {
                        console.log(`In SceneStart keyup ${ev.code}`)
                    }
                },
                removeKeyEventListeners(){
                    document.onkeydown = null;
                    document.onkeyup = null;
                },
                getNumNDigits(num){
                    return num.toString().length;
                }
            }
        }
    )
}


export {SceneEnd};

