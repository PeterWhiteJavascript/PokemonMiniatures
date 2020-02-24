var quintusGameControl = function(Quintus) {
"use strict";

Quintus.GameControl = function(Q) {
    //Functions used to set up the map.
    //Also checks moving around the map
    Q.GameObject.extend("mapController", {
        getTileAt: function(state, loc){
            if(loc[0] >= 0 && loc[1] >= 0) return state.map.grid[loc[1]][loc[0]];
        },
        addToGrid: function(x, y, w, h, arr, add){
            for(let i = 0; i < h; i++){
                for(let j = 0; j < w; j++){
                    arr[y + i][x + j] = add;
                }
            } 
        },
        //Pass the map data and return the fully generated map inside a tile w*h tile grid.
        generateMap: function(mapData, settings){
            let mapWidth = mapData.width;
            let mapHeight = mapData.height;
            let map = {
                data: mapData,
                layers:[],
                minX: 0,
                maxX: mapWidth,
                minY: 0,
                maxY:mapHeight
            };
            function generateLayer(data){
                let layer = {
                    name:data.name,
                    grid: Q.createArray(false, mapWidth, mapHeight)
                };
                for(let i = 0; i < mapHeight; i++){
                    for(let j = 0; j < mapWidth; j++){
                        layer.grid[i][j] = data.data[j + (i * mapWidth)] -1 ;
                    }
                }
                return layer;
            }
            function setCenterMinMax(map){
                map.centerX = (map.minX + map.maxX) / 2;
                map.centerY = (map.minY + map.maxY) / 2;
            }
            function addLayerToGame(layer){
                map.layers.push(layer);
            }
            //Generate the layers.
            for(let i = 0; i < mapData.layers.length; i++){
                addLayerToGame(generateLayer(mapData.layers[i]));
            }
            setCenterMinMax(map);
            //console.log(map.layers[0].grid)
            return map;
        }
    });
    
    //Functions that are run during gameplay.
    //Add/remove shop from player, stocks, etc...
    Q.GameObject.extend("gameController", {
        setUpPlayers: function(data, mainTile){
            let players = [];
            for(let i = 0; i < data.users.length; i++){
                let player = {
                    playerId: data.users[i].id,
                    name: "Player " + data.users[i].id,
                    color: data.users[i].color
                };
                players.push(player);
            }
            return players;
        },
        //When a game is started (all players connected, settings are set, about to load map)
        setUpGameState: function(data){
            let state = {};
            state.map = Q.MapController.generateMap(data.mapData, data.settings);
            state.players = Q.GameController.setUpPlayers(data, state.map.mainTile);
            state.menus = [];
            state.dice = [];
            //Only generate random numbers on the server.
            if(Q.isServer()){
                let randSeed = Math.random();
                state.random = new Math.seedrandom(randSeed);
                state.initialSeed = randSeed;
                state.turnOrder = state.players;//Q.shuffleArray(state.players);
            }
            return state;
        },
        startTurn: function(){
            
        }
    });
    
    Q.GameObject.extend("menuController", {
        
    });
    
    Q.MapController = new Q.mapController();
    Q.GameController = new Q.gameController();
    Q.MenuController = new Q.menuController();
};
};

if(typeof Quintus === 'undefined') {
  module.exports = quintusGameControl;
} else {
  quintusGameControl(Quintus);
}