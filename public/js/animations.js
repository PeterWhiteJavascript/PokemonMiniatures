var quintusAnimations = function(Quintus) {
"use strict";

Quintus.Animations = function(Q) {
    Q.setUpAnimations = function(){
        Q.sheet("tiles",
            "images/objects/tileset-pokemon_dawn.png",
            {
               tilew:16,
               tileh:16,
               sx:0,
               sy:0,
               w:1504,
               h:2519
        });
        /*
        let standRate = 1/3;
        let walkRate = 1/6;
        Q.animations("Character", {
            standingdown:{ frames: [0,1], rate:standRate},
            walkingdown:{ frames: [0,1], rate:walkRate},
            standingleft:{ frames: [2,3], rate:standRate},
            walkingleft:{ frames: [2,3], rate:walkRate},
            standingup:{ frames: [4,5], rate:standRate},
            walkingup:{ frames: [4,5], rate:walkRate},
            standingright:{ frames: [6,7], rate:standRate},
            walkingright:{ frames: [6,7], rate:walkRate}
        });*/
    }
};
};

if(typeof Quintus === 'undefined') {
    module.exports = quintusAnimations;
} else {
    quintusAnimations(Quintus);
}