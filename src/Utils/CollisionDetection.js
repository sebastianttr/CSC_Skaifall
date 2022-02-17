import {CONFIG,ctx} from "../globals.js"


// simple Axis-Aligned collision detection
let checkCollisionBetween = (gameObjectA, gameObjectB) => {
    // get the bounding boxes of the objects
    let bbA = gameObjectA.getBoundingBox();
    let bbB = gameObjectB.getBoundingBox();
  
    // return the condition
    return (
      bbA.x < bbB.x + bbB.w &&
      bbA.x + bbA.w > bbB.x &&
      bbA.y < bbB.y + bbB.h &&
      bbA.y + bbA.h > bbB.y
    );
  };

export {checkCollisionBetween}