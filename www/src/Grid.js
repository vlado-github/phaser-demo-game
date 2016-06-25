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
var map;
var score = 0;
var scoreText;
var timer;
var popup;
var isFinished = false;

Grid.Init = function (game) {};
Grid.Init.prototype = {
    create : function () {
        debugger;
        var isSuccess = this.generateRoute();
        // todo: handle error
        
        //Map
        var i,j;
        var gridLayer = this.add.group();
        for(i=0; i<Grid.COLUMNS; i++){
            for(j=0; j<Grid.ROWS; j++){
                if(j==0 && i == Grid.COLUMNS-1){
                    //Finish
                    gridLayer.create(i*Grid.TILE_WIDTH, j*Grid.TILE_HEIGHT+Grid.SCORE_BOARD_HEIGHT, 
                    'ice');
                } else {
                    gridLayer.create(i*Grid.TILE_WIDTH, j*Grid.TILE_HEIGHT+Grid.SCORE_BOARD_HEIGHT, 'ice_water'); 
                }
            }
        }
        
        //SafeRoute
//        var safeRoute = RouteController.getSafeRoute();
//        var n;
//        for(n=0; n<safeRoute.length; n++){
//            var tile = safeRoute[n];
//            map[tile.y][tile.x] = gridLayer.create(tile.y*Grid.TILE_WIDTH, tile.x*Grid.TILE_HEIGHT+Grid.SCORE_BOARD_HEIGHT, 'ice');
//        }
        
        // Hero
        var heroLayer = game.add.group();
        hero = heroLayer.create(0,height-Grid.HERO_HEIGHT,'hero');
        
        //Timer
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
    
    update : function () {
        var offset = 1;
        if(hero.x > width - Grid.TILE_WIDTH
           && hero.y < Grid.TILE_HEIGHT){
            this.finish();
        }
        
        //Handle input
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            if(hero.x - 1 >= 0){
                hero.x--;
                
            }
        }
        else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            if(hero.x + 1 <= (width - Grid.HERO_WIDTH)){
                hero.x++;
            }
        }

        if (this.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            if(hero.y - 1 >= Grid.SCORE_BOARD_HEIGHT){
                hero.y--;
            }
        }
        else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            if(hero.y + 1 <= (height - Grid.HERO_HEIGHT)){
                hero.y++;
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