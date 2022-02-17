import Cue from "../Utils/Cue.js"
import {canvas} from "../globals.js"


/**
 * 
 * SceneSwitch class. Takes care of all the scene switching -> using a sort of a "Global event bus"
 * I use the canvas, but i think you can use the window or document variable too. 
 * 
 */
class SceneSwitcher {

    // private properties are declared here
    #scenes = [];
    #event;
    #currentScene = null;

    /**
     * 
     * Constructor start the event listening
     * 
     */
    constructor(){
        this.listenToSwitchEvents();
    }
    /**
     * 
     * Push to the private scene property 
     * You need to push an object containing the follwing properties
     * 
     * @property {String} name the name of the scene
     * @property {Object} scene only the type of the scene, not an instance of the scene
     * 
     * @param {Object} scene 
     */
    addScene(scene){
        this.#scenes.push(scene);
    }

    /**
     * 
     * Start the listener which takes care of the "switchScene" event
     * Can work with or without props
     * 
     */
    listenToSwitchEvents(){
        // add the event listener
        canvas.addEventListener("switchScene",(sceneInfo) => {
            // declare scene name and scene data variables
            let sceneName;
            let sceneData = {};
            // if sceneInfo.data is not a string -> it has props that the Scene should use
            if(typeof sceneInfo.data != "string"){
                sceneName = sceneInfo.data.sceneName;
                sceneData = sceneInfo.data.props;
            }else{ // else it is just the name of the scene
                sceneName = sceneInfo.data
            }

            // find the scene with the given name
            let sceneAvailable = this.#scenes.find(el => el.name === sceneName)
            // if it could find it, set the new current scene and run it.
            if(sceneAvailable != undefined || sceneAvailable != null){
                this.setCurrentScene(sceneName,sceneData)
                this.run();
            }
        })
    }

    /**
     * 
     * A getter for the currentScene
     * 
     */
    get currenScene(){
        return this.#currentScene;
    }

    
    /**
     * @param  {String} sceneName the name of the scene to switch to
     * @param  {Object} props the props to pass to the new scene 
     */
    setCurrentScene(sceneName,props){
        // find the scene
        let selectedScene = this.#scenes.find(el => el.name === sceneName)
        /*
            create a new instance of the game. T
            his is very important, because if we do not delete create a new instance, 
            the instance of the old scene still exists.
        */
        this.#currentScene = new selectedScene.scene(props);
    }

    /**
     * The run function start the currennt scene
     */
    run(){
        this.#currentScene.start();
    }

}

export default SceneSwitcher;

