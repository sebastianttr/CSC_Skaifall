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
        this.#scenes.push(scene);
    }

    listenToSwitchEvents(){
        //console.log("Listening to events from everywhere. ")
        canvas.addEventListener("switchScene",(sceneInfo) => {
            let sceneName;
            let sceneData = {};
            //console.log(typeof sceneInfo.data)
            if(typeof sceneInfo.data != "string"){
                //console.log("is Object")
                sceneName = sceneInfo.data.sceneName;
                sceneData = sceneInfo.data.props;
            }else{
                //console.log("Is just a string");
                sceneName = sceneInfo.data
            }

            let sceneAvailable = this.#scenes.find(el => el.name === sceneName)
            if(sceneAvailable != undefined || sceneAvailable != null){
                this.setCurrentScene(sceneName,sceneData)
                this.run();
            }
        })
    }

    get currenScene(){
        return this.#currentScene;
    }

    setCurrentScene(sceneName,props){
        console.log(sceneName,props)
        let selectedScene = this.#scenes.find(el => el.name === sceneName)
        this.#currentScene = new selectedScene.scene(props);
    }

    run(){
        this.#currentScene.start();
    }

}

export default SceneSwitcher;

