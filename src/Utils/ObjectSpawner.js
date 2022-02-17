import { map } from "../globals.js"

/**
 * 
 * A class which takes care of the timed spawning of the objects.
 * 
 */

export default class ObjectSpawner{
    
    /**
     * @param  {Number} [options = {min:1000,max:5000}] options
     * 
     */
    constructor(options = {min: 1000,max:5000}){
        // set options
       this.options = options;
    }


    spawnAfterTime(callback){
        // get a random time using the map function
        let randomTime = map(Math.random(),0,1,this.options.min,this.options.max)
        // run callback after timeout
        setTimeout(callback,randomTime);
    }
}