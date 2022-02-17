import {SceneStart} from "./Scenes/SceneStart.js";

// configuration
const CONFIG = {
    debug: false,
    canvas: {
        height: 840,
        width: 420
    }
}

// declaration of canvas DOM and Canvas 2D Context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


/**
 * 
 * Extending the CanvasRenderingContext2D with the function getLines to allow for text wrapping
 * https://stackoverflow.com/a/3960916
 * 
 * @param  {CanvasRenderingContext2D} ctx
 * @param  {String} phrase
 * @param  {Number} maxPxLength
 * @param  {CanvasTextDrawingStyles} textStyle
 * 
 * @returns {Array} an array of all the line wrapped phrases
 */
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

/**
 * My universal mapping function to map a range of values into another range of values
 * 
 * @param  {Number} value the value the map
 * @param  {Number} min1 min of the range the value is currently in
 * @param  {Number} max1 max of the range the value is currently in
 * @param  {Number} min2 min of the range the value is mapped to
 * @param  {Number} max2 max of the range the value is mapped to
 * 
 * @returns {Number} a new mapped value
 * 
 */
const map = (value, min1, max1, min2, max2) => {
    return ((value - min1) * (max2 - min2)) / (max1 - min1) + min2;
}

export {CONFIG,canvas,ctx,map}
