/**
 * 
 * This will be my game framework called Cue -> Vue but for Canvas :)
 * @class 
 */

class Cue {
    #init;
    #update;
    #render;
    #destroy;
    lastTickTimestamp;
    assets = {};
    #requestAnimationFrameID;
    #run = false;
    #setupPropertiesStart;

    /**
     * 
     * Constructor function takes care of all the lifecycle hooks, properties and methods
     * 
     * @param  {Object} setup
     */
    constructor(setup){
        // set all the properties
        this.#setupPropertiesStart = setup.setupProperties;

        // set all the lifecycle hooks
        this.#init = setup.init;

        this.#update = setup.update;

        this.#render = setup.render;

        this.#destroy = setup.destroy;

        // set methods and bind "this" context
        this.methods = setup.methods;
        this.preloads = setup.preloads;
    }

    /**
     * 
     * Start function to load the assets and to setup the environment for usability within the framework
     * 
     */
    start(){
        //preload objects - promise based -> afterwards, set the properties (data in vue) and methods 
        this.preloadAssets().then(() => {

            this.#destructureProperties();
            this.#destructureMethods();

            // saved image of the setup property is assigned to the setupProperties property
            this.setupProperties = this.#setupPropertiesStart;
            this.#init();

            // bind this context -> so we can access assets, setupProperties and methods
            this.loop = this.loop.bind(this);

            // set start timestamp 
            this.lastTickTimestamp = performance.now();
            // set private run state
            this.#run = true;

            // RUN
            this.loop();
        })
    }

    /**
     * 
     * Stop function. Set properties back
     * 
     */
    stop(){
        this.setupProperties = null;
        this.preloads = null;
        this.#run = false;
    }
    
    /**
     * 
     * Preloader function to load all the assets Promise based and to then resolve after all has loaded
     * 
     * @returns {Promise} promise 
     * 
     */
    preloadAssets(){
        return new Promise( async (resolve,reject) => {
            for(let item in this.preloads){
                let asset = await this.#loadAssets(this.preloads[item].type,this.preloads[item].src);
                this.assets[item] = asset;

                if("extras" in this.preloads[item])
                    this.assets[item].extras = this.preloads[item].extras
            }
            resolve();
        })
    }

    /**
     * Loads a single asset
     * 
     * @access private
     * 
     * @param {Object} type the type -> Image of Audio  (Video would be awesome, however, we would need a Video class to behave like Image and Audio)
     * @param {String} src 
     * @returns {Promise} a promise which passes an instance of a give type back with the resolve
     */
    #loadAssets(type,src){
        return new Promise((resolve,reject) => {
            try{
                let newAsset;
                if(type == Audio){
                    newAsset = new Audio();
                    newAsset.src = src;
                    newAsset.oncanplay = () => {
                        resolve(newAsset)
                    }
                }
                else if(type == Image){
                    newAsset = new Image();
                    newAsset.src = src;
                    newAsset.onload = () => {
                        resolve(newAsset)
                    }
                }
            }
            catch(e){
                console.error("Error: " + e)
                reject();
            }
        })
    }
    
    /**
     * 
     * Destructuring of all the properties to be accessible by the framework 
     * 
     * @access private
     */
    #destructureProperties(){
        // iterate thorugh all the properties and bind it to the current context
        for(let props in this.#setupPropertiesStart){
            this[props] = this.#setupPropertiesStart[props]
        }
    }
    
    /**
     * 
     * Destructuring of all the methods to be accessible by the framework
     * 
     * @access private
     */
    #destructureMethods(){
        // iterate thorugh all the methods and bind it to the current context
        for(let methods in this.methods){
            this[methods] = this.methods[methods]
        }
    }


    /**
     * 
     * Loop function. start the loop
     * 
     */
    loop(){
        // how much time has passed since the last tick
        let timePassedSinceLastRender = performance.now() - this.lastTickTimestamp;
        this.timePassedSinceLastRender = timePassedSinceLastRender;

        // if the private run property is true
        if(this.#run){
            this.#update(timePassedSinceLastRender);
            this.#render();
        }

        //set lastTickTimestamp to "now"
        this.lastTickTimestamp = performance.now();
        //call next iteration of the game loop
        this.#requestAnimationFrameID = requestAnimationFrame(this.loop);
    }

    /**
     * 
     * A integrated scene switcher which can switch between named scenes and passed properties.
     * This methods is based on the fact, that we have a event bus based on the global canvas variable.
     * The listener in SceneSwitcher.js takes care of the switching. 
     * This method works even if the SceneSwitcher.js does not exist, it can be used for switching between DOMs or Routes.
     * 
     * @param  {String} sceneName name of the scene
     * @param  {Object} props props which the constructor receives for the framework to use. 
     */
    switchSceneWithProps(sceneName,props){
        // run destroy hook to do something before the switching
        this.#destroy();
        // stop
        this.stop();

        // create the custom event ...
        let customEvent = new CustomEvent("switchScene")
        customEvent.data = {
            sceneName:sceneName,
            props:props
        }
        // ... then dispatch the event
        canvas.dispatchEvent(customEvent)
    }
    /**
     * 
     * Basically the same as switchSceneWithProps but without props.
     * 
     * @param  {String} sceneName name of the scene
     */
    switchScene(sceneName){
        // run destroy hook to do something before the switching
        this.#destroy();
        // stop
        this.stop();
        // create the custom event ...
        let customEvent = new CustomEvent("switchScene")
        customEvent.data = sceneName
        // ... then dispatch the event
        canvas.dispatchEvent(customEvent)
    }
}

export default Cue;