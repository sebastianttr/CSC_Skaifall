import Cue from "../Utils/Cue.js";
import {CONFIG,ctx} from "../globals.js";
import Button from "../UIKit/Button.js";

let SceneStart = function(){
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
                startButton: null,
                guideButton:null,
                nextSceneFlag:false,
                textOpacity: 1
            },
            init(){
                this.startButton = new Button(
                    CONFIG.canvas.width/2,
                    CONFIG.canvas.height/2,
                    300,
                    80,
                    "Play",
                    30,
                    () => {
                        this.nextSceneFlag = true;
                    }
                );

                this.guideButton = new Button(
                    CONFIG.canvas.width/2,
                    CONFIG.canvas.height/2 + 120,
                    300,
                    80,
                    "How to Play",
                    25,
                    () => {
                        console.log("Open dialog here!")
                    }
                )

                this.setKeyEventListeners();
            },
            update(){
                if(this.nextSceneFlag){
                    if(this.startButton.opacity <= 0){
                        this.switchScene("SceneMain")
                    }
                    this.startButton.opacity -= 0.01
                    this.guideButton.opacity -= 0.01
                    this.textOpacity -= 0.01
                }

                this.startButton.update();
                this.guideButton.update();
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
                ctx.font = "50px Gamefont"
                ctx.textAlign = "center";

                ctx.globalAlpha = this.textOpacity;
    
                ctx.fillText(
                    "Skai's",
                    CONFIG.canvas.width/2,
                    CONFIG.canvas.height/4
                )

                ctx.fillText(
                    "Venture",
                    CONFIG.canvas.width/2,
                    CONFIG.canvas.height/4 + 55
                )

                ctx.restore();

                this.startButton.render();
                this.guideButton.render();

                ctx.fillStyle = `rgba(0, 0, 0, ${0})`
                ctx.fillRect(
                    0,
                    0,
                    CONFIG.canvas.width,
                    CONFIG.canvas.height
                )

                
            },
            destroy(){
                this.removeKeyEventListeners();
                this.startButton.removeEventListeners();
                this.guideButton.removeEventListeners();
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
                }
            }
        }
    )
}


export {SceneStart};

