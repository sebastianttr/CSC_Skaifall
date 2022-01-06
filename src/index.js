import CONFIG from "./Config.js"
import GameWorks from "./Services/GameWorks.js"
import Ground from "./Objects/Ground.js"
import Player from "./Objects/Player.js"

let ctx // our canvas context

window.onload = () => {

    let gameWorks = new GameWorks({
        setupProperties:{
            canvasHeight: CONFIG.height,
            canvasWidth: CONFIG.width,
            ground: null,
            player: null,
            gameObjects: []
        },
        preloads:{
            groundImg:{
                src:"./Assets/images/ground_full_800wide.png",
                type: Image
            },
            playerSpriteRun: {
                src:"./Assets/images/sprites_skai_run.png",
                type: Image,
                extras: {
                    frames: 12,
                    fps: 20,
                    frameSize: {
                        width: 140,
                        height: 310,
                    },
                }
            }
        },
        init(){
            let canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
          
            canvas.setAttribute("width", this.canvasWidth);
            canvas.setAttribute("height", this.canvasHeight);


            this.ground = new Ground(ctx,0,540,this.assets.groundImg);
            this.gameObjects.push(this.ground);

            this.player = 
                new Player(
                    ctx,
                    100,
                    100,
                    140,
                    310,
                    {
                        idle:null,
                        run:this.assets.playerSpriteRun,
                    }
                );
            this.gameObjects.push(this.player);
            

        },
        update(timePassedSinceLastRender){
            this.player.update(timePassedSinceLastRender);
        },
        render(){

            //clear canvas
            ctx.resetTransform();
            ctx.clearRect(0, 0, CONFIG.width, CONFIG.height);

            this.gameObjects.forEach(element => {
                element.render();
            });
        },
        methods:{
            
        }
    })
}