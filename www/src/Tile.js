function Tile (x,y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
    this.x1 = x*width;
    this.y1 = y*height;
    this.x2 = (x+1)*width;
    this.y2 = (y+1)*height;
    this.walkedDistance = 0;
    this.startedPointX = x;
    this.startedPointY = y;
    
   this.checkTileMovement = function(pointX, pointY) {
       if(this.isStartPoint(pointX, pointY)){
           this.setStartPoint(pointX, pointY);
       }
       
       if(this.isInsideTile(pointX, pointY)) {
           this.walkedDistance++;
           if(walkedDistance > Math.max(this.width, this.height)){
               debugger;
           }
       }
   };
   
   this.isStartPoint = function(startX, startY){
       if(startX >= this.x1 && startY == this.y1 && startX <= this.x2){
           return true;
       }
       
       if(startY >= this.y1 && startX == this.x2 && startY <= this.y2){
           return true;
       }
       
       if(startX >= this.x1 && startY == this.y2 && startX <= this.x2){
           return true;
       }
       
       if(startY >= this.y1 && startX == this.x1 && startY <= this.y2){
           return true;
       }
       return false;
   };
   
   this.isInsideTile = function(pointX, pointY){
       if(pointX >= this.x1 && pointX <= this.x2 && pointY >= this.y1 && pointY <= this.y2){
           return true;
       }
       return false;
   };
   
   this.setStartPoint = function(startX, startY) {
       this.walkedDistance = 0; 
       this.startedPointX = startX;
       this.startedPointY = startY;
   };
};