var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "spike", "x": 1300, "y": groundY },
                { "type": "spike", "x": 2000, "y": groundY },
                { "type": "spike", "x": 500, "y": groundY },
                { "type": "enemy", "x": 900, "y": 500 },
                { "type": "enemy", "x": 700, "y": 500 },
                { "type": "enemy", "x": 600, "y": 500 },
            ]
        };
    
        for (var key = 0; key < levelData.gameItems.length; key++){
             var gameItemsObject = levelData.gameItems[key];
             if (gameItemsObject.type === 'spike'){
                 createSpike(gameItemsObject.x, gameItemsObject.y);
             } else {
                 createEnemy(gameItemsObject.x, gameItemsObject.y);
             }
        }


        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
      
        function createSpike(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var spikeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            spikeHitZone.x = x;
            spikeHitZone.y = y;

            game.addGameItem(spikeHitZone);

            var obstacleImage = draw.bitmap('img/Spike.png');
            spikeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            obstacleImage.scaleX = .4;
            obstacleImage.scaleY = .4;
        }
        
        function createEnemy(x, y){
            var enemy = game.createGameItem('enemy', 25);
            var redSquare = draw.rect(50, 50, 'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redsquare);

            enemy.x = 400;
            enemy.y = groundY - 50;
            game.addGameItem(enemy);

            enemy.velocityX = -1;

            enemy.onPlayerCollision = function (){
                game.cahngeIntegrity(-30);
                enemy.fadeOut();
            };
            
            enemy.onProjectileCollision = function (){
                game.increaseScore(50);
                enemy.fadeOut();
            };
        }
    }

};
        // DO NOT EDIT CODE BELOW HERE
    


// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01; 
}