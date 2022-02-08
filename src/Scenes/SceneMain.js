import Cue from "../Utils/Cue.js";
import {CONFIG,ctx} from "../globals.js"
import Player from "../Objects/Player.js";

let SceneMain = function(){
    return new Cue(
        {
            preloads:{
                backgroundImg:{
                    src:"./Assets/images/background_space.png",
                    type: Image
                },
                playerImg:{
                    src:"./Assets/images/player.png",
                    type: Image
                }
            },
            setupProperties:{
                gameObjects:[],
                obstacles:[],
                player: null,
            },
            init(){

                this.player = new Player(
                    100,
                    750,
                    this.assets.playerImg.naturalWidth,
                    this.assets.playerImg.naturalHeight,
                    this.assets.playerImg
                )

                /*
                setTimeout(()=> {
                    this.switchScene("SceneStart");
                },2000)
                */
            },
            update(timePassedSinceLastRender){
                this.player.update(timePassedSinceLastRender);
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
                ctx.fillStyle = "white"
                ctx.font = "30px Product Sans"
                ctx.textAlign = "center";
    
                ctx.fillText(
                    `Scene Main`,
                    CONFIG.canvas.width/2,
                    CONFIG.canvas.height/2
                )

            
                this.player.render();
    
            },
            destroy(){
                this.player.removeEventListeners();
            }, 
            methods:{
                
            }
        }
    )
}

export {SceneMain};