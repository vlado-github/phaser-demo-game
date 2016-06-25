var IcePlateEnitity  = {
    init : function (gridX, gridY, isSafeIce){
        this.gridX = gridX;
        this.gridY = gridY;
        this.isSafeIce = isSafeIce;
        this.startTile = false;
        this.finishTile = false;
        this.height = 64;
        this.width = 64;
        return this;
    },
    
    setStart : function() {
        this.startTile = true;
    },
    
    setFinish : function() {
        this.finishTile = true;
    }
}

var GridEntity = {
    init : function(){
        this.numRows = 7;
        this.numCols = 5;
        this.matrix = [];
        
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
        
        //Map
        // var i,j;
        // var gridLayer = this.add.group();
        // for(i=0; i<Grid.numRows; i++){
        //     matrix[i] = [];
        //     for(j=0; j<Grid.numRows; j++){
        //         if(j==0 && i == Grid.numCols-1){
        //             //Finish
        //             map[i][j] = IcePlate.init(i,j, true);
        //         } else {
        //             map[i][j] = IcePlate.init(i,j, false); 
        //             debugger;
        //         }
        //     }
        // }
        
        // //SafeRoute
        // var safeRoute = RouteController.getSafeRoute();
        // var n;
        // for(n=0; n<safeRoute.length; n++){
        //     var tile = safeRoute[n];
        //     matrix[tile.y][tile.x] = IcePlate.init(i,j, true);
        // }
        
        return this;
    },
    
    
}