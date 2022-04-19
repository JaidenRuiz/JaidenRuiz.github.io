/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var BOARD_HEIGHT = $("#board").height();
  var BOARD_WIDTH = $("#board").width();
  var KEYCODE = {
    "UP": 38,
    "DOWN": 40,
    "LEFT": 37,
    "RIGHT": 39
  }

  var isUp = false;
  var isDown = false;
  var isLeft = false;
  var isRight = false;

  // Game Item Objects
  function GameItem(x, y, speedX, speedY, id){
    var gameItemInstance = {
      x: x,
      y: y,
      h: $(id).height(),
      w: $(id).width(),
      speedX: speedX,
      speedY: speedY,
      id: id,
    }
    return gameItemInstance;
  };  

  var snakeHead = GameItem(200, 200, 0, 0, "#snake-head");
  var snake = [snakeHead];
  var apple = {
    x: 20,
    y: 20,
    id: "#apple"
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  applePlace();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveSnake();
    moveSnakeHead();
    instantKill();
    drawObject(apple);
    wallCollision(snakeHead);
    eatApple();
  }
  

  function handleKeyDown(event) {

    if (event.which === KEYCODE.UP && isDown !== true) {
      snakeHead.speedY = -20;
      snakeHead.speedX = 0;
      isUp = true;
      isDown = false;
      isLeft = false;
      isRight = false;

    } if (event.which === KEYCODE.DOWN && isUp !== true) {
      snakeHead.speedY = 20;
      snakeHead.speedX = 0;
      isUp = false;
      isDown = true;
      isLeft = false;
      isRight = false;

    } if (event.which === KEYCODE.LEFT && isRight !== true) {
      snakeHead.speedX = -20;
      snakeHead.speedY = 0;
      isUp = false;
      isDown = false;
      isLeft = true;
      isRight = false;

    } if (event.which === KEYCODE.RIGHT && isLeft !== true) {
      snakeHead.speedX = 20;
      snakeHead.speedY = 0;
      isUp = false;
      isDown = false;
      isLeft = false;
      isRight = true;
    }
  }



  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function instantKill(){
    for(var i = snake.length - 1; i >= 1; i--){
      var snakePart = snake[i]; 
      if(snakeHead.x === snakePart.x && snakeHead.y === snakePart.y){
        endGame();
      }
    }
  }
 
  function wallCollision(obj){
    if (obj.y > BOARD_HEIGHT - obj.h){
      obj.y = BOARD_HEIGHT - obj.h;
    }
    if (obj.y < 0){
      obj.y = 0;
    }
    if (obj.x > BOARD_WIDTH - obj.w){
      obj.x = BOARD_WIDTH - obj.w;
    }
    if (obj.x < 0){
      obj.x = 0;
      endGame();
    }
  }

  function applePlace(){
    apple.x = Math.floor(Math.random() * 20) * 20;
    apple.y = Math.floor(Math.random() * 20) * 20;
    drawObject(apple);
  }

  function eatApple(){
    if(snakeHead.x === apple.x && snakeHead.y === apple.y){
      addSnakeHead();
      applePlace();
    }
  }

  function addSnakeHead(){
    var newID = "snake" + snake.length;

    $("<div>").addClass("snake").attr("id", newID).appendTo("#board");

    var tail = snake[snake.length-1];
    var newSegment = GameItem(tail.x, tail.y, 0, 0, "#" + newID);

    drawObject(newSegment);
    snake.push(newSegment);
  }

  function drawObject(thing){
    $(thing.id).css("left", thing.x)
    $(thing.id).css("top", thing.y)
  }

  function moveSnakeHead(){
    snakeHead.x += snakeHead.speedX;
    snakeHead.y += snakeHead.speedY;
    drawObject(snakeHead);
  }

  function moveSnake(){
    for(var i = snake.length - 1; i >= 1; i--){
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;
      drawObject(snake[i]);  
    }
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
