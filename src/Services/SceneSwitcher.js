import Cue from "../Utils/Cue.js"
import {canvas} from "../globals.js"


class SceneSwitcher {

    #scenes = [];
    #event;

    constructor(){

    }

    addScene(scene){

        scene.start();

        if(scene instanceof Cue)
            this.#scenes.push(scene);
        else throw new Error("Added Scene is not of type Cue.")

    }

    listenToSwitchEvents(){
        console.log("Listening to events from everywhere. ")

        canvas.addEventListener("switchScene",(sceneInfo) => {
            console.log(sceneInfo.data)
        })

    }

}

export default SceneSwitcher;

