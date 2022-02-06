import {SceneStart} from "./Scenes/SceneStart.js";

const CONFIG = {
    debug: false,
    canvas: {
        height: 720,
        width: 360
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
