var IcePlate = {
    HEGHT : 64,
    WIDTH : 64
}

IcePlate.Init = function(game){}
IcePlate.Init.prototype = {
     create : function () {
        this.game.state.start('Grid');
    }
}