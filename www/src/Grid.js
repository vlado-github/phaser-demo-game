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
var heroSpeed = 5;
var heroBlinkAnimation = null;
var iceWaterLayer;
var safeRoute;
var safeRouteLayer;
var score = 0;
var scoreText;
var timer;
var popup;
var isFinished = false;
var iceWaterStartTime = null;
var iceWaterDelayTime = 2500;
var timer;

Grid.Init = function (game) {};
Grid.Init.prototype = {
    create : function () {
        var isSuccess = this.generateRoute();
        // todo: handle error
        
        // Safe Route
        safeRoute = RouteController.getSafeRoute();
        safeRouteLayer = this.add.physicsGroup();

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
                    // var iceWater = iceWaterLayer.create(i*Grid.TILE_WIDTH, j*Grid.TILE_HEIGHT+Grid.SCORE_BOARD_HEIGHT, 'ice'); 
                    iceWater.body.mass = -100;
                }
            }
        }

        // Hero
        hero = game.add.sprite(0,height-Grid.HERO_HEIGHT,'hero');
        this.game.physics.arcade.enable(hero);
        heroBlinkAnimation = this.game.add.tween(hero).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 100, true);
        heroBlinkAnimation.pause();
        
        // Score Board
        scoreText = game.add.text(0, 0, "Score: " + score, { fontSize: '32px', fill: '#ffffff' });        
    },
    
    finish : function () {
        // timer.stop();
        var totalTime = Math.round(this.game.time.totalElapsedSeconds());
        score = ScoringController.handleTimeLapsedInSec(totalTime);    
        scoreText.text = "Score: " + score;

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

    iceWaterProcessHandler : function (hero, iceWater) {
        if(iceWaterStartTime == null){
            iceWaterStartTime = this.game.time.now;
            heroBlinkAnimation.resume();
            return false;
        } else if(this.game.time.now - iceWaterStartTime > iceWaterDelayTime){
            iceWaterStartTime = null;
            return true;
        } 
        return false;
    },

    iceWaterOverlapHandler : function (hero, iceWater) {
        isFinished = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 1, hero.kill(), this);
        // Popup message dialog
        var text_options = { 
            font: '32px Arial',       
            fill: '#ffffff', 
            align: 'center'};
        var text = this.game.add.text(
            this.game.world.centerX, 
            this.game.world.centerY, 
            "D'OH! \nHit [F5] \nto start again.", text_options);
        text.anchor.set(0.5);
    },

    safeGroundOverlapHandler : function (hero, safeGround) {
        hero.alpha = 1;
        heroBlinkAnimation.pause();
        iceWaterStartTime = null;
    },
    
    update : function () {
        if(isFinished){
            hero.kill();
            return;
        }
        // Time
        var time = this.game.time.totalElapsedSeconds();
        scoreText.text = "Time: " + parseFloat(time).toPrecision(4);

        var offset = 1;
        if (this.game.physics.arcade.overlap(hero, iceWaterLayer, this.iceWaterOverlapHandler, this.iceWaterProcessHandler, this)){
            console.log('boom');
        } 

        if (this.game.physics.arcade.overlap(hero, safeRouteLayer, this.safeGroundOverlapHandler, null, this)){
            //console.log('safe');
        }

        hero.body.velocity.x = 0;
        hero.body.velocity.y = 0;

        //Game finished
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
                hero.body.velocity.x = -heroSpeed
            }
        }
        else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            if(hero.x + 1 <= (width - Grid.HERO_WIDTH)){
                hero.x++;
                hero.body.velocity.x = heroSpeed
            }
        }

        if (this.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            if(hero.y - 1 >= Grid.SCORE_BOARD_HEIGHT){
                hero.y--;
                hero.body.velocity.y = -heroSpeed
            }
        }
        else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            if(hero.y + 1 <= (height - Grid.HERO_HEIGHT)){
                hero.y++;
                hero.body.velocity.y = heroSpeed
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