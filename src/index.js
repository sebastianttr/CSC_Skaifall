import {CONFIG,ctx,canvas} from "./globals.js"
import SceneSwitcher from "./Services/SceneSwitcher.js";
import {SceneStart} from "./Scenes/SceneStart.js";

let sceneSwitcher;


const init = () => {
    // set canvas size
    canvas.setAttribute("width",CONFIG.canvas.width);
    canvas.setAttribute("height",CONFIG.canvas.height);

    sceneSwitcher = new SceneSwitcher();
    sceneSwitcher.addScene(
        SceneStart
    );

    sceneSwitcher.listenToSwitchEvents();

    setTimeout(()=> {
        let customEvent = new CustomEvent("switchScene")
        customEvent.data = "Hello World";
        canvas.dispatchEvent(customEvent)
    },2000)


}

window.addEventListener("load",() => {
    //run init after page load
    init();
})