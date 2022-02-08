import {CONFIG,ctx,canvas} from "./globals.js"
import SceneSwitcher from "./Services/SceneSwitcher.js";
import {SceneStart} from "./Scenes/SceneStart.js";
import {SceneMain} from "./Scenes/SceneMain.js";

let sceneSwitcher;

let scenes = [
    {
        name:"SceneStart",
        scene: new SceneStart(),
    },
    {
        name:"SceneMain",
        scene: new SceneMain(),
    }
]

const init = () => {
    // set canvas size
    canvas.setAttribute("width",CONFIG.canvas.width);
    canvas.setAttribute("height",CONFIG.canvas.height);

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
    init();
})