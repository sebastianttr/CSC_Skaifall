import {SceneStart} from "./Scenes/SceneStart.js";

const CONFIG = {
    debug: false,
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

export {CONFIG,scenes,canvas,ctx}
