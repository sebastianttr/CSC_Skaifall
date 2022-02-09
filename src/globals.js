import {SceneStart} from "./Scenes/SceneStart.js";

const CONFIG = {
    debug: true,
    canvas: {
        height: 840,
        width: 420
    }
}

const scenes = {
    sceneStart:{
        instance: SceneStart
    }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const map = (value, min1, max1, min2, max2) => {
    return ((value - min1) * (max2 - min2)) / (max1 - min1) + min2;
}

export {CONFIG,scenes,canvas,ctx,map}
