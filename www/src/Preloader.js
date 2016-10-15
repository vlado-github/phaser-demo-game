var Preloader = {}
//var layer;
//var map;

Preloader.Init = function(game){}
Preloader.Init.prototype = {
    preload : function() {
        this.load.image('ice', 'assets/ice.png');
        this.load.image('finish', 'assets/sand.png');
        //this.load.image('hero', 'assets/demo-hero/demo-hero.png');
        this.load.atlasJSONHash('hero', 'assets/demo-hero/demo-hero.png', 'assets/demo-hero/demo-hero.json');
        //this.load.atlasJSONHash('bot', 'assets/demo-hero/running_bot.png', 'assets/demo-hero/running_bot.json');
        this.load.image('ice_water', 'assets/ice_water.png');
    },
    
    create : function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
        this.game.state.start('Grid');
    }
}