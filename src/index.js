import CONFIG from "./Config.js"
import GameWorks from "./Services/GameWorks.js"

let gameWorks
let ctx 

window.onload = () => {
    console.log(CONFIG.height);

    let gameWorks = new GameWorks({
        setupProperties:{
            canvasHeight: CONFIG.height,
            canvasWidth: CONFIG.width,
            testVariable: "Hello World!"
        },
        init(){
            let canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
          
            canvas.setAttribute("width", this.canvasWidth);
            canvas.setAttribute("height", this.canvasHeight);

            this.logHelloWorld();
        },
        update(timePassedSinceLastRender){
        },
        render(){
        },
        methods:{
            logHelloWorld(){
                console.log(this.testVariable);
            }
        }
    })
}