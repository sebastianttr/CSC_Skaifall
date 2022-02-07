import Cue from "../Utils/Cue.js"
import {canvas} from "../globals.js"


class SceneSwitcher {

    #scenes = [];
    #event;
    #currentScene = null;

    constructor(){
        this.listenToSwitchEvents();
    }

    addScene(scene){

        //scene.start();

        if(scene.scene instanceof Cue)
            this.#scenes.push(scene);
        else throw new Error("Added Scene is not of type Cue.")
    }

    listenToSwitchEvents(){
        //console.log("Listening to events from everywhere. ")

        canvas.addEventListener("switchScene",(sceneInfo) => {
            let sceneAvailable = this.#scenes.find(el => el.name === sceneInfo.data)
            if(sceneAvailable != undefined || sceneAvailable != null){
                this.setCurrentScene(sceneInfo.data)
                this.run();
            }
        })
    }

    get currenScene(){
        return this.#currentScene;
    }

    setCurrentScene(sceneName){
        let selectedScene = this.#scenes.find(el => el.name === sceneName)
        this.#currentScene = selectedScene.scene;
    }

    run(){
        this.#currentScene.start();
    }

}

export default SceneSwitcher;

