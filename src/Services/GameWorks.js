/**
 * 
 * This will be my game framework called GameWorks
 * 
 */

class GameWorks {

    #init;
    #update;
    #render;
    #methods;
    lastTickTimestamp;

    constructor(setup){
        // set all the properties
        this.setupProperties = setup.setupProperties;
        this.#destructureProperties();

        this.#init = setup.init;

        this.#update = setup.update;

        this.#render = setup.render;

        this.methods = setup.methods;
        this.#destructureMethods();

        this.#init();

        this.loop = this.loop.bind(this);
        this.lastTickTimestamp = performance.now();
        this.loop();
    }

    #destructureProperties(){
        for(let props in this.setupProperties){
            this[props] = this.setupProperties[props]
        }
    }
    
    #destructureMethods(){
        for(let methods in this.methods){
            this[methods] = this.methods[methods]
        }
    }

    loop(){
        //how much time has passed since the last tick
        let timePassedSinceLastRender = performance.now() - this.lastTickTimestamp;
        this.timePassedSinceLastRender = timePassedSinceLastRender;

        this.#update(timePassedSinceLastRender);
        this.#render();

        //set lastTickTimestamp to "now"
        this.lastTickTimestamp = performance.now();
        //call next iteration of the game loop
        requestAnimationFrame(this.loop);
    }
}

export default GameWorks;