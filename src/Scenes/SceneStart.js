import Cue from "../Utils/Cue.js";
import {CONFIG,ctx} from "../globals.js";
import Button from "../UIKit/Button.js";

let SceneStart = function(){
    return new Cue(
        {
            preloads:{
                
            },
            setupProperties:{
                gameObjects:[],
                player: null,
                currentKeys:{},
                startButton: null,
                guideButton:null,
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
                        this.switchScene("SceneMain")
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

                /*
                setTimeout(()=> {
                    this.switchScene("SceneMain");
                },5000)
                */
            },
            update(){
                this.startButton.update();
                this.guideButton.update();
            },
            render(){
                //clear and reset canvas
                ctx.resetTransform();
                ctx.clearRect(0,0,CONFIG.canvas.width,CONFIG.canvas.height);
    
                // draw text in the middle of the canvas
                ctx.fillStyle = "black"
                ctx.font = "50px Product Sans"
                ctx.textAlign = "center";
    
                ctx.fillText(
                    "Scene Start",
                    CONFIG.canvas.width/2,
                    CONFIG.canvas.height/4
                )

                this.startButton.render();
                this.guideButton.render();
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

