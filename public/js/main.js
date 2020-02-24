$(function() {
var Q = window.Q = Quintus({audioSupported: ['mp3','ogg','wav']}) 
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, Audio, Game, GameControl, Objects, Utility, Animations, Viewport, Music")
        .setup("quintus", {development:true, width:$("#content-container").width(), height:$("#content-container").height() })
        .touch()
        .controls(true)
        .enableSound();

Q.input.drawButtons = function(){};
Q.setImageSmoothing(false);

//Since this is a top-down game, there's no gravity
Q.gravityY = 0;
//Astar functions used for pathfinding
Q.astar = astar;
//A necessary component of Astar
Q.Graph = Graph;

//All data files stored here
let GDATA = {};

require(['socket.io/socket.io.js']);
Q.socket = io.connect();

Q.user = {};

//Once the connection has been made
Q.socket.on('connected', function (connectionData) {
    Q.user.id = connectionData.id;
    console.log("Player " + Q.user.id + " connected.");
    Q.user.gameRoom = connectionData.gameRoom;
    //Load the files that need to be loaded (this is found out server side)
    Q.load(connectionData.loadFiles.join(","),function(){
        Q.AudioController = new Q.audioController();
        
        Q.OptionsController = new Q.optionsController();
        Q.OptionsController.options = {
            menuColor: "#111",
            textColor: "#EEE",
            musicEnabled: false,
            musicVolume: 0.1,
            soundEnabled: true,
            soundVolume: 1
        };//GDATA.saveFiles["save-file1.json"].options;
        
        
        Q.c = Q.assets["data/constants/data.json"];
        Q.setUpAnimations();
        Q.applyInputResult = function(data){
            console.log(data)
            let state = Q.GameState;
            state.currentId = data.id;
            let player = Q.GameController.getPlayer(state, data.id);
            if(!Array.isArray(data.response)) data.response = [data.response];
            //data.response is an array of functions along with arguments that should be run.
            data.response.forEach((r) => {
                let func = r.func;
                switch(func){
                    
                }
            });
        };
        Q.socket.on("inputResult", Q.applyInputResult);
        
        Q.socket.emit("readyToStartGame");
        Q.socket.on("allUsersReady", function(data){
            Q.stageScene("game", 1, {
                mapData: Q.assets["data/maps/"+data.map], 
                settings: data.settings, 
                host: data.host,
                users: data.users,
                turnOrder: data.turnOrder
            });
        });
        
    });
});
//Q.debug = true;
});