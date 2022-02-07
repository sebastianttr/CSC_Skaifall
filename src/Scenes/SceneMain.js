import Cue from "../Utils/Cue.js";
import {CONFIG,ctx} from "../globals.js"

let SceneMain = function(){
    return new Cue(
        {
            preloads:{
    
            },
            setupProperties:{
                gameObjects:[],
                player: null,
            },
            init(){
                //console.log("Behold! You have initialised the main scene.")
                this.setKeyEventListeners();

                setTimeout(()=> {
                    this.switchScene("SceneStart");
                },2000)
            },
            update(){
    
            },
            render(){
                //clear and reset canvas
                ctx.resetTransform();
                ctx.clearRect(0,0,CONFIG.canvas.width,CONFIG.canvas.height);
    
                // draw text in the middle of the canvas
                ctx.fillStyle = "black"
                ctx.font = "30px Product Sans"
                ctx.textAlign = "center";
    
                ctx.fillText(
                    "Scene Main",
                    CONFIG.canvas.width/2,
                    CONFIG.canvas.height/2
                )
    
            },
            destroy(){
                this.removeKeyEventListeners();
            }, 
            methods:{
                setKeyEventListeners(){
                    document.onkeydown = (ev) => {
                        ev.preventDefault();

                        console.log(`In SceneMain keydown ${ev.code}`)
                    }

                    document.onkeyup = (ev) => {
                        console.log(`In SceneMain keyup ${ev.code}`)
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

export {SceneMain};