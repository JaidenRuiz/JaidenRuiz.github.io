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
                { "type": "spike", "x": 400, "y": groundY },
                { "type": "spike", "x": 600, "y": groundY },
                { "type": "spike", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        function createSpikes(x, y){
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var spikesHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        spikesHitZone.x = 400;
        spikesHitZone.y = 375;

        game.addGameItem(spikesHitZone);

        var obstacleImage = draw.bitmap('img/spike.png');
        spikesHitZone.addChild(obstacleImage);
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        }

        for (var key = 0; key < levelData.gameItems.length; key++){
             var gameItemObject = levelData.gameItems[key];
             if (gameItemObject.type === 'spikes'){
                 craeteSpikes(gameItemsObject.x, gameItemObject.y);
             }
        }




        if (gameItemObject.type === 'spike'){
            createSpikes(gameItemObject.x, gameItemObject.y);
        }



        
        function createSpikes(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var spikeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            spikeHitZone.x = x;
            spikeHitZone.y = y;

            game.addGameItem(spikesHitZone);

            var obstacleImage = draw.bitmap('img/Spike.png');
            spikesHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            obstacleImage.scaleX = .4;
            obstacleImage.scaleY = .4;
        }
        
       function createEnemy(x, y){
        var enemy = game.craeteGameItem('enemy', 25);
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
        
        
        
        
        
        createSpikes(141, groundY);
    }


};
        // DO NOT EDIT CODE BELOW HERE
    


// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01; 
}