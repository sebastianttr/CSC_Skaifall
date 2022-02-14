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

// https://stackoverflow.com/a/3960916
CanvasRenderingContext2D.prototype.getLines = (ctx,phrase,maxPxLength,textStyle) => {
    let wa=phrase.split(" "),
        phraseArray=[],
        lastPhrase=wa[0],
        measure=0,
        splitChar=" ";
    if (wa.length <= 1) {
        return wa
    }
    ctx.font = textStyle;
    for (let i=1;i<wa.length;i++) {
        let w=wa[i];
        measure=ctx.measureText(lastPhrase+splitChar+w).width;
        if (measure<maxPxLength) {
            lastPhrase+=(splitChar+w);
        } else {
            phraseArray.push(lastPhrase);
            lastPhrase=w;
        }
        if (i===wa.length-1) {
            phraseArray.push(lastPhrase);
            break;
        }
    }
    return phraseArray;
}


const map = (value, min1, max1, min2, max2) => {
    return ((value - min1) * (max2 - min2)) / (max1 - min1) + min2;
}

export {CONFIG,scenes,canvas,ctx,map}
