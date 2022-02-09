import { map } from "../globals.js"

export default class ObjectSpawner{
    constructor(options = {min: 1000,max:5000}){
       this.options = options;
    }

    spawnAfterTime(callback){
        let randomTime = map(Math.random,0,1,this.options.min,this.options.max)
        setTimeout(callback,randomTime);
    }
}