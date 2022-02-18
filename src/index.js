import {CONFIG,ctx,canvas} from "./globals.js"
import SceneSwitcher from "./Services/SceneSwitcher.js";
import {SceneStart} from "./Scenes/SceneStart.js";
import {SceneMain} from "./Scenes/SceneMain.js";
import {SceneEnd} from "./Scenes/SceneEnd.js";

let sceneSwitcher;

// a collection of scenes -> scene property is just a type so that the scenes can be reinstantiated -> deletes everything
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

    // setup scene switcher
    sceneSwitcher = new SceneSwitcher();

    //add the scenes to the sceneSwitcher 
    scenes.forEach((item,index) => {
        item.id = index;
        sceneSwitcher.addScene(item)
    })

    // set the scene and run.
    sceneSwitcher.setCurrentScene("SceneStart",0);
    sceneSwitcher.run();
}

window.addEventListener("load",() => {
    //run init after page load
    app();
})