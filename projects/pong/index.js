/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var BOARD_HEIGHT = $("#board").height();
  var BOARD_WIDTH = $("#board").width();
  var KEYCODE = {
    "UP": 38,
    "DOWN": 40,
    "W": 87,
    "S": 83
  }

 

  

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
  
  var leftPaddle = GameItem(20, 200, 0, 0, "#leftPaddle");
  var rightPaddle = GameItem(BOARD_WIDTH - 20 - $('#rightPaddle').width(), 200, 0, 0, "#rightPaddle");
  var ball = GameItem(BOARD_WIDTH/2, BOARD_HEIGHT/2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3), "#ball");
  var score1 = 0;
  var score2 = 0;

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); 

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(rightPaddle);
    moveObject(leftPaddle);
    moveObject(ball);
    wallCollision(leftPaddle);
    wallCollision(rightPaddle);
    topBottomHit(ball);
    ballHitPaddle();
    scores();
    ballCollision(ball);
    stopGame();
  }
  //This code makes a certain paddle move up or down when you press a certain button
  function handleKeyDown(event) {
    if (event.which === KEYCODE.UP) {
      rightPaddle.speedY = -5;
    } if (event.which === KEYCODE.DOWN) {
      rightPaddle.speedY = 5;
    } if (event.which === KEYCODE.W) {
      leftPaddle.speedY = -5;
    } if (event.which === KEYCODE.S) {
      leftPaddle.speedY = 5;
    }
  }
  //This code makes a certain paddle move up or down when you press a certain button
  function handleKeyUp(event) {
    if (event.which === KEYCODE.UP) {
      rightPaddle.speedY = 0;
    } if (event.which === KEYCODE.DOWN) {
      rightPaddle.speedY = 0;
    } if (event.which === KEYCODE.W) {
      leftPaddle.speedY = 0;
    } if (event.which === KEYCODE.S) {
      leftPaddle.speedY = 0;
    }
  }
 

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
//This makes the ball move
  function moveObject(obj) {
    obj.y += obj.speedY;
    obj.x += obj.speedX;
    $(obj.id).css("left", obj.x)
    $(obj.id).css("top", obj.y)
  }
// This makes the ball bounce back when the ball hits the walls
  function wallCollision(obj){
    if (obj.y > BOARD_HEIGHT - obj.h){
      obj.y = BOARD_HEIGHT - obj.h;
    }
    if (obj.y < 0){
      obj.y = 0;
    }
  }
  //This will reset the ball when it hits either one of the walls
  function startBall(){
    ball = GameItem(BOARD_WIDTH/2, BOARD_HEIGHT/2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3), "#ball");
  }
  //This will make the ball reset when it hits the left or right side of the borad and it will chnage the score by one whenever the ball hits the left or right side of the board
  function ballCollision(obj){
    if (obj.x > BOARD_WIDTH - obj.w){
      $("#score1").text(score1++)
      startBall();
    }
    if (obj.x < 0){
      $("#score2").text(score2++)
      startBall();
    }
  }
  //This will make the ball bounce off the top and bottom of the border
  function topBottomHit(obj){
    if (obj.y > BOARD_HEIGHT - obj.h){
      obj.speedY *= -1;
    }
    if (obj.y < 0){
      obj.speedY *= -1;
    }
  }
  //This sets the hit box of the paddles so when the ball hits either one of them the ball will bounce off of it
  function doCollide(obj1, obj2) {

    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.x + obj1.w;
    obj1.bottomY = obj1.y + obj1.h;


    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.x + obj2.w;
    obj2.bottomY = obj2.y + obj2.h;

    if (obj1.leftX < obj2.rightX &&
      obj1.rightX > obj2.leftX &&
      obj1.bottomY > obj2.topY &&
      obj1.topY < obj2.bottomY) {
      return true;
    }
    else {
      return false;
    }
  }
  //This will make the ball bounce off the paddles
  function ballHitPaddle(){
    if (doCollide(ball, leftPaddle)){
      ball.speedX *= -1;
      ballSpeedIncrease();
    }
    if (doCollide(ball, rightPaddle)){
      ball.speedX *= -1;
      ballSpeedIncrease();
    }
  }
  //This makes the ball move faster when it hits one of the paddles
  function ballSpeedIncrease(){
    if (ball.speedX > 0){
      ball.speedX += 0.5;
    }
    else {
      ball.speedX -= 0.5;
    }
    if (ball.speedY > 0){
      ball.speedY += 0.5;
    }
    else {
      ball.speedY -= 0.5;
    }
  }
  //This will add the scores and change them
  function scores(){
    $("#score1").text(score1);
    $("#score2").text(score2);
  }
//This will stop the game when a certain amount of points are scored
  function stopGame(){
    if (score1 == 20){
      endGame();
    }
    if (score2 == 20){
      endGame();
    }
  }

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}