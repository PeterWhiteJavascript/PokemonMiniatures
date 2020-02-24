Quintus.Objects=function(Q){
    
    Q.GameObject.extend("optionsController",{
        toggleBoolOpt:function(opt){
            if(this.options[opt]) this.options[opt] = false;
            else this.options[opt] = true;
            
            if(opt === "musicEnabled"){
                Q.audioController.checkMusicEnabled();
            }
        },
        adjustSound:function(){
            
        }
    });
};