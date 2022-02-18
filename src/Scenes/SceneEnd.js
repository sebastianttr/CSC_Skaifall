import Cue from "../Utils/Cue.js";
import {CONFIG,ctx} from "../globals.js";
import Button from "../UIKit/Button.js";
import Obstacle from "../Objects/Obstacle.js";

let SceneEnd = function(props){
    console.log("Your score is ",props)
    return new Cue(
        {
            preloads:{
                backgroundImg:{
                    src:"./Assets/images/background_space.png",
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
                highScore: null,
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
                    },
                    this.assets
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
                    },
                    this.assets
                )

                this.highScore = Number(localStorage.getItem("highscore"));
                if(props > this.highScore){
                    localStorage.setItem("highscore",props);
                }

            },
            update(timePassedSinceLastRender){
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
                this.restartButton.removeEventListeners();
                this.backToMenuButton.removeEventListeners();
            },  
            methods:{
                
                getNumNDigits(num){
                    return num.toString().length;
                },
                
            }
        }
    )
}


export {SceneEnd};

