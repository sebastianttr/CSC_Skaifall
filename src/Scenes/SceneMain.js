import Cue from "../Utils/Cue.js";
import {CONFIG,ctx,map} from "../globals.js"
import Player from "../Objects/Player.js";
import Obstacle from "../Objects/Obstacle.js"
import ObjectSpawner from "../Utils/ObjectSpawner.js"
import { checkCollisionBetween } from "../Utils/CollisionDetection.js";

let SceneMain = function(props){
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
                obstacle1:{
                    src:"./Assets/images/obstacles/meteor_1.png",
                    type: Image,
                    extras: {
                        rotation: 90
                    }
                },
                obstacle2:{
                    src:"./Assets/images/obstacles/meteor_2.png",
                    type: Image,
                    extras: {
                        rotation: 135
                    }
                },
                obstacle3:{
                    src:"./Assets/images/obstacles/meteor_3.png",
                    type: Image,
                    extras: {
                        rotation: 180
                    }
                },
                obstacle4:{
                    src:"./Assets/images/obstacles/meteor_4.png",
                    type: Image,
                    extras: {
                        rotation: 225
                    }
                },
                obstacle5:{
                    src:"./Assets/images/obstacles/meteor_5.png",
                    type: Image,
                    extras: {
                        rotation: 270
                    }
                },
                obstacle6:{
                    src:"./Assets/images/obstacles/meteor_6.png",
                    type: Image,
                    extras: {
                        rotation: 315
                    }
                },
                obstacle7:{
                    src:"./Assets/images/obstacles/meteor_7.png",
                    type: Image,
                    extras: {
                        rotation: 360
                    }
                },
                obstacle8:{
                    src:"./Assets/images/obstacles/meteor_8.png",
                    type: Image,
                    extras: {
                        rotation: 45
                    }
                },
                particle1:{
                    src:"./Assets/images/obstacles/particles/p1.png",
                    type:Image,
                    extras:{
                        x:-15,
                        y:-35,          
                    }
                },
                particle2:{
                    src:"./Assets/images/obstacles/particles/p2.png",
                    type:Image,
                    extras:{
                        x:-29,
                        y:-30,          
                    }
                },
                particle3:{
                    src:"./Assets/images/obstacles/particles/p3.png",
                    type:Image,
                    extras:{
                        x:-33,
                        y:-11,          
                    }
                },
                particle4:{
                    src:"./Assets/images/obstacles/particles/p4.png",
                    type:Image,
                    extras:{
                        x:-32,
                        y:8,          
                    }
                },
                particle5:{
                    src:"./Assets/images/obstacles/particles/p5.png",
                    type:Image,
                    extras:{
                        x:-13,
                        y:11,          
                    }
                },
                particle6:{
                    src:"./Assets/images/obstacles/particles/p6.png",
                    type:Image,
                    extras:{
                        x:5,
                        y:0,          
                    }
                },
                particle7:{
                    src:"./Assets/images/obstacles/particles/p7.png",
                    type:Image,
                    extras:{
                        x:4,
                        y:-30,          
                    }
                },
                particle8:{
                    src:"./Assets/images/obstacles/particles/p8.png",
                    type:Image,
                    extras:{
                        x:-2,
                        y:-24,          
                    }
                },
                particle9:{
                    src:"./Assets/images/obstacles/particles/p9.png",
                    type:Image,
                    extras:{
                        x:-15,
                        y:0,          
                    }
                },
                particle10:{
                    src:"./Assets/images/obstacles/particles/p10.png",
                    type:Image,
                    extras:{
                        x:-15,
                        y:-26,          
                    }
                },
                selectionAudio:{
                    src:"./Assets/audio/selection.wav",
                    type: Audio
                },
                hoverAudio:{
                    src:"./Assets/audio/hover.wav",
                    type: Audio
                },
                rocketAudio:{
                    src:"./Assets/audio/rocket_turbine.wav",
                    type: Audio
                },
                explosionAudio:{
                    src:"./Assets/audio/explosion.wav",
                    type: Audio
                }
            },
            setupProperties:{
                gameObjects:[],
                obstacles:[],
                player: null,
                playerVelocity: 1,
                playerDiedFlag:false,
                objectSpawner:null,
                score:0,
                difficultyLevel:0,
                screenShake:{
                    setX:0,
                    setY:0,
                    x:0,
                    y:0,
                    dx:1,
                    dy:1
                }
            },
            init(){
                this.player = new Player(
                    100,
                    750,
                    this.assets.playerImg.naturalWidth/2,
                    this.assets.playerImg.naturalHeight/2,
                    this.assets.playerImg,
                    this.assets.flameSprite,
                    {
                        contain:true,
                        mouseInteraction:true,
                        audio: this.assets.rocketAudio
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

                        if(this.score % 5 == 0 && !this.playerDiedFlag){
                            this.objectSpawner.options.min *= 0.95;
                            this.objectSpawner.options.max *= 0.95;
                            this.playerVelocity *= 1.02;
                        }
                    }

                    if(!(el instanceof Player) && checkCollisionBetween(el,this.player)){
                        // if not dead
                        if(this.player.health > 0)  this.player.health -= 1;
                        //if dead
                        else {
                            el.isHit = true;
                            this.playerVelocity = 0.1;
                            this.playerDiedFlag = true;
                            this.player.removeEventListeners();

                            this.assets.explosionAudio.play();
                            
                            this.stopSpawning();
                        }
                    }
                    el.update(timePassedSinceLastRender);
                })

                objToRemove.forEach((el) => {
                    this.gameObjects.splice(this.gameObjects.indexOf(el),1)
                })


                if(this.playerDiedFlag){

                    // calculate velocity X
                    this.screenShake.dx = Math.round(this.screenShake.setX - this.screenShake.x);

                    // if velocityX is 0, new setX
                    if(this.screenShake.dx == 0){
                        this.screenShake.setX = Math.random() * 4
                    }

                    // calculate x
                    this.screenShake.x += this.screenShake.dx * timePassedSinceLastRender / 20

                    // calculate velocity X
                    this.screenShake.dy = Math.round(this.screenShake.setY - this.screenShake.y);

                    // if velocityX is 0, new setY
                    if(this.screenShake.dy == 0){
                        this.screenShake.setY = Math.random() * 4
                    }

                    // calculate y
                    this.screenShake.y += this.screenShake.dy * timePassedSinceLastRender / 20

                }

            },
            render(){
                //clear and reset canvas
                ctx.resetTransform();
                ctx.clearRect(0,0,CONFIG.canvas.width,CONFIG.canvas.height);

                ctx.translate(this.screenShake.x,this.screenShake.y);


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
                this.player.stop();
                this.gameObjects.length = 0;
                this.player.removeEventListeners();
                this.stopSpawning();
            }, 
            methods:{
                spawnNewObstacle(){
                    if(this.objectSpawner != null)
                        this.objectSpawner.spawnAfterTime(()=>{
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
                        this.assets[`obstacle${randomObstacleIndex}`],
                        this.getParticlesArray(),
                        ()=> {
                            this.switchSceneWithProps("SceneEnd",this.score);
                        }
                    )
                },
                getParticlesArray(){
                    let particlesArray = [];

                    Object.keys(this.assets).filter(el => el.startsWith("particle")).forEach((item)=>{
                        particlesArray.push(this.assets[item])
                    })

                    return particlesArray;
                },
                getNumNDigits(num){
                    return num.toString().length;
                }
            }
        }
    )
}

export {SceneMain};