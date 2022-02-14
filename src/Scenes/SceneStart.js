import Cue from "../Utils/Cue.js";
import {CONFIG,ctx} from "../globals.js";
import Button from "../UIKit/Button.js";
import Player from "../Objects/Player.js";
import Dialog from "../UIKit/Dialog.js";

let SceneStart = function(props){
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
                }
            },
            setupProperties:{
                gameObjects:[],
                player: null,
                playerReachedEndPos: false,
                startAnimationPercentage: 0,
                currentKeys:{},
                startButton: null,
                guideButton:null,
                howToPlayDialog:null,
                nextSceneFlag:false,
                textOpacity: 1,
                backgroundVideo:null,
                uiElements:[],
                highScore: null
            },
            init(){
                /*
                this.backgroundVideo = document.createElement("video"); // create a video element
                this.backgroundVideo.src = "./Assets/videos/star_meteor_shower.mp4";
                this.backgroundVideo.loop = true;
                this.backgroundVideo.autoplay = true;
                */
                //this.backgroundVideo.play();

                document.getElementsByTagName("video")[0].style.display = "block";

                this.player = new Player(
                    CONFIG.canvas.width/2,
                    780,
                    this.assets.playerImg.naturalWidth/2,
                    this.assets.playerImg.naturalHeight/2,
                    this.assets.playerImg,
                    this.assets.flameSprite,
                    {
                        contain:false,
                        mouseInteraction:false
                    }
                )

                this.player.yTick = this.player.y;

                this.startButton = new Button(
                    CONFIG.canvas.width/2,
                    CONFIG.canvas.height/2,
                    300,
                    80,
                    "Play",
                    30,
                    () => {
                        //console.log("next")
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
                        //console.log("Open dialog here!")
                        this.howToPlayDialog.showDialog();
                    }
                );

                this.howToPlayDialog = new Dialog(
                    CONFIG.canvas.width/2,
                    CONFIG.canvas.height/2,
                    CONFIG.canvas.width * 0.9,
                    CONFIG.canvas.height*0.5,
                    "How to Play",
                    "Use the mouse cursor to steer Skai and avoid the meteors. If you hit the meteor, you lose the game",
                    [
                        new Button(
                            0,
                            0,
                            330,
                            80,
                            "I Understand!",
                            25,
                            () => {
                                //console.log("I Understand pressed!")
                                this.howToPlayDialog.closeDialog();
                            }
                        )
                    ]
                )

                // push all these elements to render and update subsequently
                this.uiElements.push(this.startButton);
                this.uiElements.push(this.guideButton);
                this.uiElements.push(this.howToPlayDialog);
                

                this.highScore = Number(localStorage.getItem("highscore"));

                this.setKeyEventListeners();
            },
            update(){
                // next scene animation
                this.checkNextSceneAnimation();

                // check player position for the animation
                this.calculatePlayerAnimation();

                // update player position
                this.player.update();

                if(this.playerReachedEndPos){
                    this.startButton.opacity = this.textOpacity;
                    this.guideButton.opacity = this.textOpacity;
                }
                else {
                    this.startButton.opacity = 1 - this.startAnimationPercentage;
                    this.guideButton.opacity = 1 - this.startAnimationPercentage;
                }

                
                this.uiElements.forEach((el) => {
                    el.update();
                });
            },
            render(){
                //clear and reset canvas
                ctx.resetTransform();
                ctx.clearRect(0,0,CONFIG.canvas.width,CONFIG.canvas.height);

                //draw background
                //this.drawVideoFrame();

                // save context so we can change the context styles
                ctx.save();
    
                // draw the player
                this.player.render();

                // draw text in the middle of the canvas
                ctx.save();

                ctx.fillStyle = "white";
                ctx.font = "50px Gamefont";
                ctx.textAlign = "center";

                if(this.playerReachedEndPos)
                    ctx.globalAlpha = this.textOpacity;
                else ctx.globalAlpha = 1 - this.startAnimationPercentage;
    
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


                ctx.fillStyle = "green"
                ctx.font = "20px Gamefont";

                ctx.fillText(
                    "High Score ",
                    CONFIG.canvas.width/2,
                    CONFIG.canvas.height/2 + 300
                )


                ctx.save();

                ctx.fillStyle = "white";
                ctx.font = "40px Gamefont";
                
                let amountOfDigits = this.getNumNDigits(this.highScore);
                
                ctx.beginPath();
                ctx.fillRect(
                    CONFIG.canvas.width/2 - (20 * amountOfDigits),
                    CONFIG.canvas.height/2 + 320,
                    (40 * amountOfDigits),
                    40
                )

                ctx.fillStyle = "black";
                ctx.textAlign = "center";

                ctx.fillText(
                    this.highScore,
                    CONFIG.canvas.width/2,
                    CONFIG.canvas.height/2 + 355,
                )

                ctx.restore();
            
                // render uiElements
                this.uiElements.forEach((el) => {
                    el.render();
                });

                ctx.restore();

                ctx.fillStyle = `rgba(0, 0, 0, ${this.startAnimationPercentage - 0.3})`
                ctx.fillRect(
                    0,
                    0,
                    CONFIG.canvas.width,
                    CONFIG.canvas.height
                )
            },
            destroy(){
                document.getElementsByTagName("video")[0].style.display = "none";
                this.removeKeyEventListeners();
                this.startButton.removeEventListeners();
                this.guideButton.removeEventListeners();
            },  
            methods:{
                checkNextSceneAnimation(){
                    if(this.nextSceneFlag){
                        if(this.startButton.opacity <= 0){
                            this.switchScene("SceneMain")
                        }
                        this.startButton.opacity -= 0.01
                        this.guideButton.opacity -= 0.01
                        this.textOpacity -= 0.01
                    }
                },
                calculatePlayerAnimation(){
                    if(this.player.y >= 75){
                        this.player.yTick -= 5;
                        this.startAnimationPercentage = 1 - Math.exp(-0.0065 * this.player.yTick)
                        this.player.y = 780 * this.startAnimationPercentage;
                    }
                    else {
                        this.playerReachedEndPos = true;
                        if(this.player.floatAnimationSteps == undefined){
                            this.player.floatAnimationSteps = -0.05
                        }

                        if(this.player.y < 60 || this.player.y > 74){
                            this.player.floatAnimationSteps *= -1;
                        }   

                        this.player.y += this.player.floatAnimationSteps
                    }
                },
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
                async drawVideoFrame(){
                    ctx.save();

                    ctx.globalAlpha = 1 - this.startAnimationPercentage

                    ctx.fillRect(
                        0,0,CONFIG.canvas.width,CONFIG.canvas.height
                    )

                    ctx.globalAlpha = 1;

                    ctx.drawImage(
                        this.backgroundVideo,
                        -720+CONFIG.canvas.width/2,
                        0,
                        1280,
                        1280
                    )
                    ctx.restore();
                },
                getNumNDigits(num){
                    return num.toString().length;
                }
            }
        }
    )
}


export {SceneStart};

