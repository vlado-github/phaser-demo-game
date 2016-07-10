var Grid = {
    COLUMNS : 5,
    ROWS : 7,
    TILE_HEIGHT : 64,
    TILE_WIDTH : 64,
    HERO_HEIGHT : 40,
    HERO_WIDTH : 27,
    SCORE_BOARD_HEIGHT : 32
};

var hero;
var heroLayer;
var iceWaterLayer;
var safeRoute;
var safeRouteLayer;
var score = 0;
var scoreText;
var timer;
var popup;
var isFinished = false;

Grid.Init = function (game) {};
Grid.Init.prototype = {
    create : function () {
        var isSuccess = this.generateRoute();
        // todo: handle error
        
        // Safe Route
        safeRoute = RouteController.getSafeRoute();
        safeRouteLayer = this.add.group();

        // Map
        var i,j;
        var gridLayer = this.add.group();
        iceWaterLayer = this.add.physicsGroup();
        for(i=0; i<Grid.COLUMNS; i++){
            for(j=0; j<Grid.ROWS; j++){
                if(j==0 && i == Grid.COLUMNS-1){
                    //Finish
                    gridLayer.create(i*Grid.TILE_WIDTH, j*Grid.TILE_HEIGHT+Grid.SCORE_BOARD_HEIGHT, 'ice');
                } else if(RouteController.safeRouteContainsTile(i, j)){
                    safeRouteLayer.create(i*Grid.TILE_WIDTH, j*Grid.TILE_HEIGHT+Grid.SCORE_BOARD_HEIGHT, 'ice');
                } else {
                    var iceWater = iceWaterLayer.create(i*Grid.TILE_WIDTH, j*Grid.TILE_HEIGHT+Grid.SCORE_BOARD_HEIGHT, 'ice_water'); 
                    iceWater.body.mass = -100;
                }
            }
        }
        
        // Hero
        hero = game.add.sprite(0,height-Grid.HERO_HEIGHT,'hero');
        this.game.physics.arcade.enable(hero);
        
        // Score Board
        scoreText = game.add.text(0, 0, "Score: " + score, { fontSize: '32px', fill: '#ffffff' });        
        
    },
    
    finish : function () {
        //Finish popup dialog
        var text_options = { 
            font: '32px Arial',       
            fill: '#ffffff', 
            align: 'center'};
        var text = this.game.add.text(
            this.game.world.centerX, 
            this.game.world.centerY, 
            "Congrats! \nYou score: \n" + score + " points.", text_options);
        text.anchor.set(0.5);   
        isFinished = true;
    },

    processHandler : function (hero, tile) {
        return true;
    },

    collisionHandler : function (hero, tile) {
        this.game.time.events.add(Phaser.Timer.SECOND * 2, hero.kill(), this);
    },
    
    update : function () {
        var offset = 1;
        if (this.game.physics.arcade.collide(hero, iceWaterLayer, this.collisionHandler, this.processHandler, this))
        {
            console.log('boom');
        }

        hero.body.velocity.x = 0;
        hero.body.velocity.y = 0;

        if(hero.x > width - Grid.TILE_WIDTH
           && hero.y < Grid.TILE_HEIGHT){
            this.input.enabled = false;
            this.finish();
        }
        
        //Handle input
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            if(hero.x - 1 >= 0){
                hero.x--;
                hero.body.velocity.x = -20
            }
        }
        else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            if(hero.x + 1 <= (width - Grid.HERO_WIDTH)){
                hero.x++;
                hero.body.velocity.x = 20
            }
        }

        if (this.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            if(hero.y - 1 >= Grid.SCORE_BOARD_HEIGHT){
                hero.y--;
                hero.body.velocity.y = -20
            }
        }
        else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            if(hero.y + 1 <= (height - Grid.HERO_HEIGHT)){
                hero.y++;
                hero.body.velocity.y = 20
            }
        }
    },

    generateRoute : function() {      
        var status = false;
        while(status == false){
            var status = RouteController.create(
            Grid.ROWS,
            Grid.COLUMNS,
            Grid.ROWS - 1,
            0,
            0,
            Grid.COLUMNS - 1);
        }
        return status;
    }

};