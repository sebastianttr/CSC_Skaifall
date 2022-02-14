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
                },
                flameSprite:{
                    src:"./Assets/images/sprites/flames_sprite.png",
                    type: Image,
                    extras:{
                        frames: 6,
                        fps: 24,
                        frameSize:{
                            height: 90,
                            width: 72
                        }
                    }
                },
                obstacle1:{
                    src:"./Assets/images/obstacles/meteor_1.png",
                    type: Image
                },
                obstacle2:{
                    src:"./Assets/images/obstacles/meteor_2.png",
                    type: Image
                },
                obstacle3:{
                    src:"./Assets/images/obstacles/meteor_3.png",
                    type: Image
                },
                obstacle4:{
                    src:"./Assets/images/obstacles/meteor_4.png",
                    type: Image
                },
                obstacle5:{
                    src:"./Assets/images/obstacles/meteor_5.png",
                    type: Image
                },
                obstacle6:{
                    src:"./Assets/images/obstacles/meteor_6.png",
                    type: Image
                },
                obstacle7:{
                    src:"./Assets/images/obstacles/meteor_7.png",
                    type: Image
                },
                obstacle8:{
                    src:"./Assets/images/obstacles/meteor_8.png",
                    type: Image
                },
            },
            setupProperties:{
                gameObjects:[],
                obstacles:[],
                player: null,
                playerVelocity: 1,
                playerDiedFlag:false,
                objectSpawner:null,
                score:0,
                difficultyLevel:0
            },
            init(){
                console.log(this.setupProperties)


                this.player = new Player(
                    100,
                    750,
                    this.assets.playerImg.naturalWidth/2,
                    this.assets.playerImg.naturalHeight/2,
                    this.assets.playerImg,
                    this.assets.flameSprite,
                    {
                        contain:true,
                        mouseInteraction:true
                    }
                )

                this.gameObjects.push(this.player)
                
                let objectSpawnerOptions = {
                    min: 400,
                    max: 1000
                }

                this.objectSpawner = new ObjectSpawner(objectSpawnerOptions);

                this.spawnNewObstacle();
            },
            update(timePassedSinceLastRender){
                let objToRemove = [];

                // update the states of all the game objects
                this.gameObjects.forEach((el) => {
                    el.playerVelocity = this.playerVelocity;

                    if(el.y - el.height >= CONFIG.canvas.height){
                        // add to remove items array 
                        objToRemove.push(el);

                        this.score++;

                        if(this.score % 5 == 0){
                            //console.log("Increasing difficulty")
                            this.objectSpawner.options.min *= 0.95;
                            this.objectSpawner.options.max *= 0.95;
                            this.playerVelocity *= 1.02;
                        }
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


                ctx.save();

                ctx.fillStyle = "white";
                ctx.font = "40px Gamefont";
                
                let amountOfDigits = this.getNumNDigits(this.score);

                
                ctx.beginPath();
                ctx.fillRect(
                    CONFIG.canvas.width/2 - (20 * amountOfDigits),
                    20,
                    (40 * amountOfDigits),
                    40
                )

                ctx.fillStyle = "black";
                ctx.textAlign = "center";

                ctx.fillText(
                    this.score,
                    CONFIG.canvas.width/2,
                    55,
                )

                ctx.restore();
            },
            destroy(){
                console.log("stopping spawn")
                this.gameObjects.length = 0;
                this.player.removeEventListeners();
                this.stopSpawning();
            }, 
            methods:{
                spawnNewObstacle(){
                    if(this.objectSpawner != null)
                        this.objectSpawner.spawnAfterTime(()=>{
                            console.log("creating obstacle")
                            this.gameObjects.push(this.getRandomObstacle())
                            this.spawnNewObstacle();
                        })
                },
                stopSpawning(){
                    this.objectSpawner = null;
                },
                getRandomObstacle(){
                    let randomObstacleIndex = Math.round(map(Math.random(),0,1,1,8));

                    return new Obstacle(
                        map(Math.random(),0,1,0,CONFIG.canvas.width),
                        0,
                        this.assets[`obstacle${randomObstacleIndex}`].naturalWidth,
                        this.assets[`obstacle${randomObstacleIndex}`].naturalHeight,
                        this.assets[`obstacle${randomObstacleIndex}`]
                    )
                },
                getNumNDigits(num){
                    return num.toString().length;
                }
            }
        }
    )
}

export {SceneMain};