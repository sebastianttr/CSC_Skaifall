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
    sceneSwitcher.addScene(
        {
            name:"SceneStart",
            scene: new SceneStart(),
            id: 1
        }
    );

    scenes.forEach((item,index) => {
        item.id = index;
        sceneSwitcher.addScene(item)
    })

    sceneSwitcher.setCurrentScene("SceneStart");
    sceneSwitcher.run();
    
    /*
    setTimeout(()=> {
        
        let customEvent = new CustomEvent("switchScene")
        customEvent.data = "Hello World";
        canvas.dispatchEvent(customEvent)
    },2000)
    */
}

window.addEventListener("load",() => {
    //run init after page load
    init();
})