import Cue from "../Utils/Cue.js";
import {CONFIG,ctx,map} from "../globals.js"
import Player from "../Objects/Player.js";
import Obstacle from "../Objects/Obstacle.js"
import ObjectSpawner from "../Utils/ObjectSpawner.js"
import { checkCollisionBetween } from "../Utils/CollisionDetection.js";

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
                playerDiedFlag:false,
                objectSpawner:null
            },
            init(){

                this.player = new Player(
                    100,
                    750,
                    this.assets.playerImg.naturalWidth/2,
                    this.assets.playerImg.naturalHeight/2,
                    this.assets.playerImg
                )

                this.gameObjects.push(this.player)
                
                let objectSpawnerOptions = {
                    min: 1000,
                    max: 4000
                }

                this.objectSpawner = new ObjectSpawner(objectSpawnerOptions);

                this.spawnNewObstacle();

                /*
                setTimeout(()=> {
                    this.switchScene("SceneStart");
                },2000)
                */
            },
            update(timePassedSinceLastRender){
                let objToRemove = [];

                // update the states of all the game objects
                this.gameObjects.forEach((el) => {
                    if(el.y - el.height >= CONFIG.canvas.height){
                        console.log("Remove this item, spawn a new one")
                        // add to remove items array 
                        objToRemove.push(el);

                        // spawn new obstacle
                        this.spawnNewObstacle();
                    }

                    if(!(el instanceof Player) && checkCollisionBetween(el,this.player)){
                        console.log("Colliding")
                        // if not dead
                        if(this.player.health > 0)  this.player.health -= 1;
                        //if dead
                        else {
                            this.playerDiedFlag = true;
                        }
                    }
                    el.update(timePassedSinceLastRender);
                })

                objToRemove.forEach((el) => {
                    this.gameObjects.splice(this.gameObjects.indexOf(el),1)
                })

                // do something if the player died
                if(this.playerDiedFlag){
                    this.switchScene("SceneEnd");
                    console.log("switching")
                }



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
    
                this.gameObjects.forEach((el) => {
                    el.render();
                })

            },
            destroy(){
                this.gameObjects.length = 0;
                this.player.removeEventListeners();
            }, 
            methods:{
                spawnNewObstacle(){
                    this.objectSpawner.spawnAfterTime(()=>{
                        console.log("creating obstacle")
                        this.gameObjects.push(
                            new Obstacle(
                                map(Math.random(),0,1,0,CONFIG.canvas.width),
                                0,
                                100,
                                100,
                                null
                            )
                        )
                    })
                }
            }
        }
    )
}

export {SceneMain};