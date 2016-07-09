//function Tile (x,y) {
//    this.x = x;
//    this.y = y;
//};

var safeRoute = [];
var numRows;
var numColumns;

var RouteController = {  
    
    addToSafeRoute : function (nextTiles){
        var tile = nextTiles[Math.floor(Math.random()*nextTiles.length)];
        if(tile == 'undefined' || tile == null){
            throw new Exception("No more surounding tiles.");
        }
        if(safeRoute.every(elem => elem.x != tile.x || elem.y != tile.y)){
            safeRoute.push(tile);
            return tile;
        } else {
            var i = nextTiles.indexOf(tile);
            nextTiles.splice(i,1);
            return this.addToSafeRoute(nextTiles);
        }
    },
    
    getNextTiles : function (row, column) {
        var nextTiles = [];
        var i = 0;
        var possibleRowUp = row - 1;
        var possibleRowDown = row + 1;
        var possibleColumnRight = column +1;
        var possibleColumnLeft = column -1;
        var rowCurrent = row;
        var columnCurrent = column;
        
        if(possibleRowUp >= 0 && possibleRowUp < numRows) {
            if(possibleColumnRight >= 0 
               && possibleColumnRight < numColumns){
                var tile = new Tile(possibleRowUp, possibleColumnRight);
                nextTiles[i] = tile;
                i++;
            }
            if(possibleColumnLeft >= 0 
               && possibleColumnLeft < numColumns){
                var tile = new Tile(possibleRowUp, possibleColumnLeft);
                nextTiles[i] = tile;
                i++;
            }
            if(columnCurrent >= 0 && columnCurrent < numColumns){
                var tile = new Tile(possibleRowUp, columnCurrent);
                nextTiles[i] = tile;
                i++;
            }
        }
        
        if(possibleRowDown >= 0 && possibleRowDown < numRows) {
            if(possibleColumnRight >= 0 
               && possibleColumnRight < numColumns){
                var tile = new Tile(possibleRowDown, possibleColumnRight);
                nextTiles[i] = tile;
                i++;
            }
            if(possibleColumnLeft >= 0 
               && possibleColumnLeft < numColumns){
                var tile = new Tile(possibleRowDown, possibleColumnLeft);
                nextTiles[i] = tile;
                i++;
            }
            if(columnCurrent >= 0 && columnCurrent < numColumns){
                var tile = new Tile(possibleRowDown, columnCurrent);
                nextTiles[i] = tile;
                i++;
            }
        }
        
        if(rowCurrent >=0 && rowCurrent < numRows){
            if(possibleColumnRight >= 0 
               && possibleColumnRight < numColumns){
                var tile = new Tile(rowCurrent, possibleColumnRight);
                nextTiles[i] = tile;
                i++;
            }
            if(possibleColumnLeft >= 0 
               && possibleColumnLeft < numColumns){
                var tile = new Tile(rowCurrent, possibleColumnLeft);
                nextTiles[i] = tile;
                i++;
            }
        }
        return nextTiles;
    },
    
    getSafeRoute : function() {
        return safeRoute;
    },
    
    create : function (
        numOfRows, 
        numOfColumns,
        startRow, 
        startColumn, 
        endRow, 
        endColumn) {
            var startPoint = new Tile(startRow, startColumn);
            var endPoint = new Tile(endRow, endColumn);
            safeRoute.push(startPoint);
    
            numRows = numOfRows;
            numColumns = numOfColumns;
            
            try{
                var nextTiles = this.getNextTiles(startRow, startColumn);
                var addedTile = this.addToSafeRoute(nextTiles);
                while(addedTile.x != endRow || addedTile.y != endColumn){
                    nextTiles = this.getNextTiles(addedTile.x, addedTile.y);
                    if(nextTiles.some(elem => elem.x == endPoint.x 
                                      && elem.y == endPoint.y)){
                        safeRoute.push(endPoint);
                        break;
                    }
                    addedTile = this.addToSafeRoute(nextTiles);
                }
            }catch(e){
                safeRoute = []; 
                return false;
            }
            return true;
    }
}