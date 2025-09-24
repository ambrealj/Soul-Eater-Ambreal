//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let backgroundImg, firstFallingObjectImg, catcher, firstFallingObject, secondFallingObject,secondFallingObjectImg;
let playButton, directionsButton, backButton;
let score = 0;
let fontRegular;
let screen = 0;
let level = 1;
let homeBackgroundImg;

/* PRELOAD LOADS FILES */
function preload() {
  backgroundImg = loadImage("assets/background.jpeg");
  firstFallingObjectImg = loadImage("assets/soul1.png");
  secondFallingObjectImg = loadImage("assets/soul3.png");
  fontRegular = loadFont("assets/SourceCodePro-SemiBold.ttf");
  homeBackgroundImg = loadImage("assets/background3.jpeg");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  textFont(fontRegular); 
  backgroundImg.resize(400, 400);
  homeBackgroundImg.resize(400, 400);
  firstFallingObjectImg.resize(60, 0);
  secondFallingObjectImg.resize(60, 0);
  homeScreen();
}


/* DRAW LOOP REPEATS */
function draw() {
  if (level == 1) {
    level1Assets();
  }

  if (level == 2) {
    level2Assets();
  }
  
  if (screen == 0) {
    if (directionsButton.mouse.presses()) {
      //screen 1 is directions screen
      screen = 1;
      directionsScreen();
    } else if (playButton.mouse.presses()) {
      //screen 2 is play screen 
      screen = 2;
      playScreenAssets();
    }
  } 

  if (screen == 1) {
    if (backButton.mouse.presses()) {
      //screen 0 is home screen
      screen = 0;
      homeScreen();
      backButton.pos = { x: -300, y: -300 };
    }
  }

  if (screen == 2) {
    background("#CCCCFF");
    strokeWeight(4);
    image(backgroundImg, 0, 0);
    firstFallingObject.rotationLock = true;
    secondFallingObject.rotationLock = true;
    
    
    // Draw directions to screen
    fill(255);
    textSize(12);
    text("Move the catcher \n with the left \n and right arrow \n keys to catch \n the blue souls \n and avoid the \n purple souls!", width-70, 20);
  
    // If firstFallingObject or secondFallingObject reaches bottom, move back to random position at top
    if (firstFallingObject.y >= height) {
      firstFallingObject.y = 0;
      firstFallingObject.x = random(width);
      firstFallingObject.vel.y = random(1,5);
      score = score - 1;
    } else if (secondFallingObject.y >= height) {
      secondFallingObject.y = 0;
      secondFallingObject.x = random(width);
      secondFallingObject.vel.y = random(1,5);
    
    }
  
    //Move catcher
    if (kb.pressing("left")) {
      catcher.vel.x = -3;
    } else if (kb.pressing("right")) {
      catcher.vel.x = 3;
    } else {
      catcher.vel.x = 0;
    }
  
    //Stop catcher at edges of screen
    if (catcher.x < 50) {
      catcher.x = 50;
    } else if (catcher.x > 350) {
      catcher.x = 350;
    } 
  
    // If firstFallingObject or secondFallingObject collides with catcher, move back to random position at top
    if (firstFallingObject.collides(catcher)) {
      firstFallingObject.y = 0;
      firstFallingObject.x = random(width);
      firstFallingObject.vel.y = random(1,5);
      firstFallingObject.direction = "down";
      score = score + 1;
    } else if (secondFallingObject.collides(catcher)) {
      secondFallingObject.y = 0;
      secondFallingObject.x = random(width);
      secondFallingObject.vel.y = random(1,5);
      secondFallingObject.direction = "down";
      score = score - 1;
    }
  
    if (firstFallingObject.collides(secondFallingObject)) {
      secondFallingObject.direction = "down";
      firstFallingObject.direction = "down";
    }
    
    // Draw the score to screen
    fill(255);
    textSize(20);
    text("Score = " + score, 60, 60);

    // Draw level to screen
    fill(255);
    textSize(20);
    text("Level = " + level, 60, 30);

    //Check if the player beat level 1
    if (level == 1 && score == 5) {
      level = 2;
      score = 0;
      level2Assets();
    }
  
    //Check if the player won
    if (level ==2 && score == 10) {
      youWin();
      if (mouseIsPressed) {
        restart();
      }
    }

  
    // allSprites.debug = mouse.pressing();
    if (score < 0) {
      background("#CCFFFF");
      
      //Draw sprites off of screen
      catcher.pos = { x: 600, y: -300 };
      firstFallingObject.pos = { x: -100, y: 0 };
      secondFallingObject.pos = { x: -100, y: 0 };
      
      //Draw end of game text
      textSize(20);
      image(backgroundImg, 0, 0);
      fill(255);
      text("You lose!", width/2, height/2 - 30); 
      textSize(12);
      text("Press Run to play again.", width/2, height/2);
    }
    
  }
  
}

function youWin() {
  background(255);
  image(backgroundImg, 0, 0);
  //Draw sprites off of screen
  catcher.pos = { x: 600, y: -300 };
  firstFallingObject.pos = { x: -100, y: 0 };
  secondFallingObject.pos = { x: -100, y: 0 };

  //Draw end of game text
  textSize(20);
  fill(255);
  text("You win!", width/2, height/2 - 30); 
  textSize(12);
  text("Click the mouse anywhere to play again.", width/2, height/2);
}

//Spicy 
function restart() {
  //Reset score
  score = 0;
  level = 1;

  //Reset sprites
  catcher.pos = { x: 200, y: 380 };
  firstFallingObject.y = 0;
  firstFallingObject.x = random(width);
  firstFallingObject.vel.y = random(1,5);
  firstFallingObject.direction = "down";

  secondFallingObject.y = 0;
  secondFallingObject.x = random(width);
  secondFallingObject.vel.y = random(1,5);
  secondFallingObject.direction = "down";
}

function homeScreen() {
  image(homeBackgroundImg, 0, 0);
  textAlign(CENTER);
  //Create title
  fill(255);
  textSize(35);
  
  text("Soul Collection \nGame", 200, 100);
  
  //Create play button
  playButton = new Sprite(300,330,130,50, 'k');
  playButton.color = "black";
  playButton.textColor = "white";
  playButton.textSize = 20;
  playButton.text = "Play";

  //Create directions button
  directionsButton = new Sprite(100,330,130,50, 'k');
  directionsButton.color = "black";
  directionsButton.textColor = "white";
  directionsButton.textSize = 20;
  directionsButton.text = "Directions";
  
}

function directionsScreen() {
  image(homeBackgroundImg, 0, 0);
  playButton.pos = { x: -200, y: -100 };
  directionsButton.pos = { x: -500, y: -100 };

  
  // Draw directions to screen
  fill(255);
  textSize(15);
  text("Move the catcher with the left and \n right arrow keys to catch the blue \n souls (+1 point) and avoid the \n purple souls (-1 point)! Collect \n 5 blue souls to beat level 1 and \n collect 10 blue souls to beat level 2!", 200, 50);
  
  //Create back button
  backButton = new Sprite(200,330,130,50, "k");
  backButton.color = "black";
  backButton.textColor = "white";
  backButton.textSize = 20;
  backButton.text = "Back";
}

function playScreenAssets() {
  background(209,237,242);
  playButton.pos = { x: -200, y: -100 };
  directionsButton.pos = { x: -500, y: -100 };
  

  //Create catcher 
  catcher = new Sprite(200,380,100,20, "k");
  catcher.color = color("#7F00FF");
  
  //Create falling object
  firstFallingObject = new Sprite(firstFallingObjectImg, 100,0);
  secondFallingObject = new Sprite(secondFallingObjectImg, 200, -100);
 
  firstFallingObject.vel.y = 2;
  secondFallingObject.vel.y = 2;
  firstFallingObject.rotationLock = true;
  secondFallingObject.rotationLock = true;
}

function level1Assets() {
  // Draw directions to screen
  fill(44,75,90);
  textSize(12);
  // text("Collect 5 falling cyber \ntips to move to \nthe next level.", width/2 + 50, 25);
}

function level2Assets() {
  // Draw directions to screen
  fill(44,75,90);
  textSize(12);
  // text("Collect 5 falling cyber \ntips to win the \ngame.", width/2 + 50, 25);
}