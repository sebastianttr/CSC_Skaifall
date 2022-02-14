import {CONFIG,ctx,canvas} from "./globals.js"
import SceneSwitcher from "./Services/SceneSwitcher.js";
import {SceneStart} from "./Scenes/SceneStart.js";
import {SceneMain} from "./Scenes/SceneMain.js";
import {SceneEnd} from "./Scenes/SceneEnd.js";

let sceneSwitcher;

let scenes = [
    {
        name:"SceneStart",
        scene: SceneStart,
    },
    {
        name:"SceneMain",
        scene: SceneMain,
    },
    {
        name:"SceneEnd",
        scene: SceneEnd,
    }
]

const app = () => {
    // set canvas size
    canvas.setAttribute("width",CONFIG.canvas.width);
    canvas.setAttribute("height",CONFIG.canvas.height);

    // also set the container because of the video
    document.getElementById("container").style.width = CONFIG.canvas.width + "px";
    document.getElementById("container").style.height = CONFIG.canvas.height  + "px";

    console.log(document.getElementById("container").style.width)



    sceneSwitcher = new SceneSwitcher();

    scenes.forEach((item,index) => {
        item.id = index;
        sceneSwitcher.addScene(item)
    })

    sceneSwitcher.setCurrentScene("SceneStart");
    sceneSwitcher.run();
    
}

window.addEventListener("load",() => {
    //run init after page load
    app();
})