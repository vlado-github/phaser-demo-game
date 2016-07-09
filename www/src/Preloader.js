var Preloader = {}
//var layer;
//var map;

Preloader.Init = function(game){}
Preloader.Init.prototype = {
    preload : function() {
        this.load.tilemap('map', 'assets/tilemap-02.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('ice', 'assets/ice.png');
        this.load.image('hero', 'assets/temp.png');
        this.load.image('ice_water', 'assets/ice_water.png');
    },
    
    create : function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
        this.game.state.start('Grid');
    }
}