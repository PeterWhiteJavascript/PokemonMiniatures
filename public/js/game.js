Quintus.Game=function(Q){
    Q.scene("game", function(stage){
        let mapData = Q.MapController.generateMap(stage.options.mapData, stage.options.settings)
        stage.mapWidth = stage.options.mapData.width;
        stage.mapHeight = stage.options.mapData.height;
        console.log(stage)
        let tileLayer = new Q.TileLayer({
            tiles: mapData.layers[0].grid,
            sheet: "tiles",
            z: 0,
            tileW: 16,
            tileH: 16
        });
        console.log(tileLayer)
        stage.insert(tileLayer);
        Q.addViewport(stage, {p: {loc:[stage.mapWidth / 2,  stage.mapHeight / 2]}});
    });
};