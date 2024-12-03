/**
 * Frogfrogfrog
 * Daniel Munoz C
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// CountDown Timer
let singleTimer = 90; // 90 seconds
let multiTimer = 30; // 30 seconds
let pFlyTimer = 60; // 60 seconds
let scoreA = 0;
let scoreB = 0;

//Title screen
let gameState = "title";

//Scoreboard
let singleScore = 0;
//multiplayer victories
let victA = 0;
let victB = 0;

// Our Single frog
const singleFrog = {
    // The frog's body has a position and size
    body: {
        x: 1000,
        y: 1000,
        size: 300
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 1000,
        size: 40,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

//multiple frogs
// Frog A
const frogA = {
    // The frog's body has a position and size
    body: {
        x: 500,
        y: 1000,
        size: 300
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 1000,
        size: 40,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Frog B
const frogB = {
    // The frog's body has a position and size
    body: {
        x: 1500,
        y: 1000,
        size: 300
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 1000,
        size: 40,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our bugs
// Have a position, size, and speed of horizontal movement

const fly = {
    x: 0,
    y: 200, // Will be random
    size: 30,
    speed: 3
};

const spiceyFly = {
    x: 0,
    y: 200, // Will be random
    size: 15,
    speed: 10
};

const mosquito = {
    x: 2000,
    y: 200, // Will be random
    size: 10,
    speed: 7,
    color: [143, 98, 53]
};

const firefly = {
    x: 0,
    y: 200, // Will be random
    size: 20,
    speed: 4,
    color: [255, 200, 0]
};

const toxicFly = {
    x: 2000,
    y: 200, // Will be random
    size: 25,
    speed: 1
};

const illFly = {
    x: 2000,
    y: 200, // Will be random
    size: 20,
    speed: 4
};

/**
 * Creates the canvas and initializes the fly
 */

function setup() {
    createCanvas(2000, 1000);

    // Give the fly its first random position
    resetFly();

    // One minute and a half timer
    setInterval(() => {
        if (gameState === "game") {
            decrementTimer();
        } else if (gameState === "game2") {
            decrementMultiTimer();
        } else if (gameState === "game3") {
            decrementPFlyTimer();
        }
    }, 1000);
}

/**
 * Draws the game and title screen
 */
function draw() {
    if (gameState === "title") {
        //Title screen
        drawTitleScreen();

    } else if (gameState === "gamemodes") {
        //draws the gamemode selection screen
        drawGamemodes();

    } else if (gameState === "singleInstructions") {
        //Basic instructions of the game
        drawSingleInstructions();

    } else if (gameState === "multiInstructions") {
        //Basic instructions of the game
        drawMultiInstructions();

    } else if (gameState === "pFlyInstructions") {
        //Display the instrusctions for the player fly gamemode
        drawPFlyInstructions();

    } else if (gameState === "rules") {
        //Display types of flies
        drawTypesOfFlies();
    } else if (gameState === "rules2") {
        //Display types of flies
        drawTypesOfFlies();

    } else if (gameState === "singleScores") {
        //Display the scoreboard
        drawScoreBoard();

    } else if (gameState === "game") {
        //Game screen
        drawGameScreen();
    } else if (gameState === "game2") {
        //Game screen
        drawGame2Screen();
    } else if (gameState === "game3") {
        //Game screen
        drawGame3Screen();
    } else if (gameState === "game3Over") {
        //Game over screen
        drawGameOver();
    } else if (gameState === "congatulations") {
        //You win the game screen
        drawCongratulations();
    }
}

//Draws the gamemode selection screen
function drawGamemodes() {
    push();
    background(25, 120, 11);
    textAlign(CENTER, CENTER);
    textSize(50);
    fill("#000000");
    text("Choose a gamemode", width / 2, height / 2 - 200);
    textSize(30);
    text("Single player: Press 'S'", width / 2, height / 2 - 100);
    text("Multiplayer: Press 'M'", width / 2, height / 2 - 50);
    text("Fly: Press 'F'", width / 2, height / 2);
    text("Press ESCAPE to go back", width / 2, height / 2 + 50);
    pop();
}

//Single player game screen
function drawGameScreen() {

    background("#87ceeb");
    push();
    fill(0, 0, 0);
    textSize(20);
    text("Press ESCAPE to go back and pause", 820, 50);
    pop();

    moveBug();
    drawBug();
    moveSingleFrog();
    moveSingleTongue();
    drawSingleFrog();
    tongueOverlap();
    drawScore();
    drawTimer();

    drawSingleGameBorder();
}

//Hides the excess of the game screen
function drawSingleGameBorder() {
    push();
    fill(0, 100, 0);
    rect(0, 0, 500, 1000);
    rect(1500, 0, 500, 1000);
    pop();
}

//Multiplayer game screen
function drawGame2Screen() {
    background("#87ceeb");
    push();
    fill(0, 0, 0);
    textSize(20);
    text("Press ESCAPE to go back and pause", 800, 50);
    pop();

    moveBug();
    drawBug();
    moveMultiFrogA();
    moveMultiFrogB();
    moveMultiTongueA();
    moveMultiTongueB();
    drawMultiFrogA();
    drawMultiFrogB();
    tongueOverlap();
    drawScoreA();
    drawScoreB();
    drawMultiTimer();
    drawVictories();
    drawWhoWon();
}

//Player fly game screen
function drawGame3Screen() {
    background("#87ceeb");
    drawPFlyFrog();
    // checkTonguePFlyOverlap();
    drawPFlyTimer();
    drawPFly();

    push();
    fill(0, 0, 0);
    textSize(20);
    text("Press ESCAPE to go back and pause", 800, 50);
    pop();
}

//Draws the player fly
function drawPFly() {
    push();
    fill(0); // black color
    ellipse(mouseX, mouseY, 30, 30);
    pop();
}

//Title screen
function drawTitleScreen() {
    push();
    background(25, 120, 11);
    textAlign(CENTER, CENTER);
    textSize(50);
    fill("#000000");
    text("Frogfrogfrog", width / 2, height / 2 - 100);
    textSize(30);
    text("Press ENTER to choose gamemode", width / 2, height / 2);
    pop();
}

//Single player scoreboard screen
function drawScoreBoard() {
    push();
    background(25, 120, 11);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill("#000000");
    text("Press ESCAPE to go back", width / 2, 200);
    textSize(50);
    text("Scores", width / 2, height / 2 - 200);
    textSize(30);
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    let latestScore = scores[scores.length - 1]; // Get the latest score
    scores.sort((a, b) => b - a); // Sort scores in descending order
    for (let i = 0; i < Math.min(scores.length, 10); i++) {
        if (scores[i] === latestScore) {
            text("latest", width / 2 - 100, height / 2 - 100 + i * 40); // Display "latest" before the score
        }
        text(`${i + 1}. ${scores[i]}`, width / 2, height / 2 - 100 + i * 40);
    }
    pop();
}

//Single player instructions screen
function drawSingleInstructions() {
    push();
    background(25, 120, 11);
    textAlign(CENTER, CENTER);
    textSize(50);
    fill("#000000");
    text("Instructions", width / 2, height / 2 - 200);
    textSize(30);
    text("Move the frog with 'A' and 'D'", width / 2, height / 2 - 100);
    text("Catch the flies with your tongue by using 'W'", width / 2, height / 2 - 50);
    text("Press ENTER to continue", width / 2, height / 2 + 50);
    text("Press ESCAPE to go back", width / 2, height / 2 + 100);
    text("Press SHIFT to see the scoreboard", width / 2, height / 2 + 150);
    pop();
}

//Multiplayer instructions screen
function drawMultiInstructions() {
    push();
    background(25, 120, 11);
    textAlign(CENTER, CENTER);
    textSize(50);
    fill("#000000");
    text("Instructions", width / 2, height / 2 - 200);
    textSize(30);
    text("Move the red frog with 'A' and 'D'", width / 2, height / 2 - 150);
    text("Move the Blue frog with 'LArrow' and 'RArrow'", width / 2, height / 2 - 100);
    text("Red frog. catch the flies with your tongue by using 'W'", width / 2, height / 2 - 50);
    text("Blue frog. catch the flies with your tongue by using 'upArrow'", width / 2, height / 2);
    text("Press ENTER to continue", width / 2, height / 2 + 50);
    text("Press ESCAPE to go back", width / 2, height / 2 + 100);
    pop();
}

function drawPFlyInstructions() {
    push();
    background(25, 120, 11);
    textAlign(CENTER, CENTER);
    textSize(50);
    fill("#000000");
    text("Instructions", width / 2, height / 2 - 200);
    textSize(30);
    text("Move the fly with your mouse", width / 2, height / 2 - 100);
    text("Avoid the frog tongues and survive as long as you can", width / 2, height / 2 - 50);
    text("Press ENTER to continue", width / 2, height / 2 + 50);
    text("Press ESCAPE to go back", width / 2, height / 2 + 100);
    pop();
}

//Types of bugs screen
function drawTypesOfFlies() {
    push();
    background(25, 120, 11);
    textAlign(CENTER, CENTER);
    textSize(50);
    fill("#000000");
    text("Types of Flies", width / 2, height / 2 - 200);
    textSize(30);

    // Regular Fly
    text("Regular Fly: 1 point", width / 2, height / 2 - 100);
    push();
    noStroke();
    fill("#000000");
    ellipse(width / 2 - 150, height / 2 - 100, 30);
    pop();

    // Firefly
    text("Firefly: -1 point", width / 2, height / 2 - 50);
    push();
    noStroke();
    fill(firefly.color);
    ellipse(width / 2 - 120, height / 2 - 50, 20);
    pop();

    // Spicey Fly
    text("Spicey Fly: 4 points", width / 2, height / 2);
    push();
    noStroke();
    fill("#ff0000");
    ellipse(width / 2 - 150, height / 2, 15);
    pop();

    // Ill Fly
    text("Ill Fly: -4 points", width / 2, height / 2 + 50);
    push();
    noStroke();
    fill("#0000ff");
    ellipse(width / 2 - 130, height / 2 + 50, 20);
    pop();

    // Toxic Fly
    text("Toxic Fly: -1 point every 0.7 seconds", width / 2, height / 2 + 100);
    push();
    noStroke();
    fill(119, 255, 0);
    ellipse(width / 2 - 260, height / 2 + 100, 25);
    pop();

    // Mosquito
    text("Mosquito: +1 point every 0.7 seconds", width / 2, height / 2 + 150);
    push();
    noStroke();
    fill(mosquito.color);
    ellipse(width / 2 - 270, height / 2 + 150, 10);
    pop();

    text("Press ENTER to start the game", width / 2, height / 2 + 200);
    text("Press ESCAPE to go back", width / 2, height / 2 + 250);
    pop();
}
/**
 * Moves the bugs according to its speed
 * Resets the bugs if it gets all the way to the right or left
 */
function moveBug() {
    // Move the fly
    fly.y += random(-5, 5);
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (gameState === "game") {
        if (fly.x > 1500) {
            resetFly();
        }
    } else if (gameState === "game2") {
        if (fly.x > 2000) {
            resetFly();
        }
    }

    // Move the firefly
    firefly.y += random(-2, 2);
    firefly.x += firefly.speed;
    // Handle the firefly going off the canvas
    if (gameState === "game") {
        if (firefly.x > 1500) {
            resetFirefly();
        }
    } else if (gameState === "game2") {
        if (firefly.x > 2000) {
            resetFirefly();
        }
    }

    // Move the spicey fly
    spiceyFly.y += random(-10, 10);
    spiceyFly.x += spiceyFly.speed;
    // Handle the spicey fly going off the canvas
    if (gameState === "game") {
        if (spiceyFly.x > 1500) {
            resetSpiceyFly();
        }
    } else if (gameState === "game2") {
        if (spiceyFly.x > 2000) {
            resetSpiceyFly();
        }
    }

    // Move the toxic fly
    toxicFly.y += random(-1, 1);
    toxicFly.x -= toxicFly.speed;
    // Handle the toxic fly going off the canvas
    if (gameState === "game") {
        if (toxicFly.x < 500) {
            resetToxicFly();
        }
    } else if (gameState === "game2") {
        if (toxicFly.x < 0) {
            resetToxicFly();
        }
    }

    // Move the mosquito
    mosquito.y += random(-7, 7);
    mosquito.x -= mosquito.speed;
    // Handle the mosquito going off the canvas
    if (gameState === "game") {
        if (mosquito.x < 500) {
            resetMosquito();
        }
    } else if (gameState === "game2") {
        if (mosquito.x < 0) {
            resetMosquito();
        }
    }

    // Move the illFly
    illFly.y += random(-2, 2);
    illFly.x -= illFly.speed;
    // Handle the illFly going off the canvas
    if (gameState === "game") {
        if (illFly.x < 500) {
            resetIllFly();
        }
    } else if (gameState === "game2") {
        if (illFly.x < 0) {
            resetIllFly();
        }
    }
}

/**Check if the bugs are caught by the tongue */
function tongueOverlap() {
    checkTongueFlyOverlap();
    checkTongueFireflyOverlap();
    checkTongueSpiceyFlyOverlap();
    checkTongueToxicFlyOverlap();
    checkTongueMosquitoOverlap();
    checkTongueIllFlyOverlap();
}

/**draws either of the bugs**/
function drawBug() {

    drawFirefly();
    drawFly();
    drawSpiceyFly();
    drawToxicFly();
    drawMosquito();
    drawIllFly();
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}
//Draws the firefly as a yellow circle
function drawFirefly() {
    push();
    noStroke();
    fill(firefly.color);
    ellipse(firefly.x, firefly.y, firefly.size);
    pop();
}

//Draws the spicey fly as a red circle
function drawSpiceyFly() {
    push();
    noStroke();
    fill("#ff0000");
    ellipse(spiceyFly.x, spiceyFly.y, spiceyFly.size);
    pop();
}

//Draws the toxic fly as a green circle
function drawToxicFly() {
    push();
    noStroke();
    fill(119, 255, 0);
    ellipse(toxicFly.x, toxicFly.y, toxicFly.size);
    pop();
}

//Draws the mosquito as a brown circle
function drawMosquito() {
    push();
    noStroke();
    fill(mosquito.color);
    ellipse(mosquito.x, mosquito.y, mosquito.size);
    pop();
}

//draws the illFly as a blue circle
function drawIllFly() {
    push();
    noStroke();
    fill("#0000ff");
    ellipse(illFly.x, illFly.y, illFly.size);
    pop();
}

/**
 * Resets the bug to the left or right with a random y position
 */
function resetFly() {
    // Spawn a regular fly
    if (gameState === "game") {
        fly.x = 500; // margin for single player
    } else if (gameState === "game2") {
        fly.x = 0; // margin for multiplayer
    }
    fly.y = random(100, 800);
    fly.size = 30;
    fly.speed = 3;

}

function resetFirefly() {
    // Spawn a firefly
    if (gameState === "game") {
        firefly.x = 500; // margin for single player
    } else if (gameState === "game2") {
        firefly.x = 0; // margin for multiplayer
    }
    firefly.y = random(100, 800);
    firefly.size = 20;
    firefly.speed = 4;
}

function resetSpiceyFly() {
    // Spawn a spicey fly
    if (gameState === "game") {
        spiceyFly.x = 500; // margin for single player
    } else if (gameState === "game2") {
        spiceyFly.x = 0; // margin for multiplayer
    }
    spiceyFly.y = random(100, 800);
    spiceyFly.size = 15;
    spiceyFly.speed = 10;
}

function resetToxicFly() {
    // Spawn a toxic fly
    if (gameState === "game") {
        toxicFly.x = 1500; // margin for single player
    } else if (gameState === "game2") {
        toxicFly.x = 2000; // margin for multiplayer
    }
    toxicFly.y = random(100, 800);
    toxicFly.size = 25;
    toxicFly.speed = 1;
}

function resetMosquito() {
    // Spawn a mosquito
    if (gameState === "game") {
        mosquito.x = 1500; // margin for single player
    } else if (gameState === "game2") {
        mosquito.x = 2000; // margin for multiplayer
    }
    mosquito.y = random(100, 800);
    mosquito.size = 10;
    mosquito.speed = 7;
}

function resetIllFly() {
    // Spawn a illFly

    if (gameState === "game") {
        illFly.x = 1500; // margin for single player
    } else if (gameState === "game2") {
        illFly.x = 2000; // margin for multiplayer
    }
    illFly.y = random(100, 800);
    illFly.size = 20;
    illFly.speed = 4;
}

/**
 * Moves the frog with "A" and "D" on the x position
 */
function moveSingleFrog() {
    if (keyIsDown(65)) { // 'A' key
        singleFrog.body.x = Math.max(singleFrog.body.x - 10, 500);
    }
    if (keyIsDown(68)) { // 'D' key
        singleFrog.body.x = Math.min(singleFrog.body.x + 10, 1500);
    }
}
a
/**
 * Moves the frogA with "A" and "D" on the x position
 */
function moveMultiFrogA() {
    if (keyIsDown(65)) { // 'A' key
        frogA.body.x = max(frogA.body.x - 10, 0);
    }
    if (keyIsDown(68)) { // 'D' key
        frogA.body.x = min(frogA.body.x + 10, width);
    }
}

/*
 * Moves the frogB with "LeftArrow" and "RightArrow" on the x position
 */
function moveMultiFrogB() {
    if (keyIsDown(LEFT_ARROW)) { // 'LeftArrow' key
        frogB.body.x = max(frogB.body.x - 10, 0);
    }
    if (keyIsDown(RIGHT_ARROW)) { // 'RightArrow' key
        frogB.body.x = min(frogB.body.x + 10, width);
    }
}
/*
 * Handles moving the tongue based on its state
 */
function moveSingleTongue() {
    // Tongue matches the frog's x
    singleFrog.tongue.x = singleFrog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (singleFrog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (singleFrog.tongue.state === "outbound") {
        singleFrog.tongue.y += -singleFrog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (singleFrog.tongue.y <= 0) {
            singleFrog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (singleFrog.tongue.state === "inbound") {
        singleFrog.tongue.y += singleFrog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (singleFrog.tongue.y >= height) {
            singleFrog.tongue.state = "idle";
        }
    }
}

/**
 * Handles moving the tongue of frog A based on its state
 */
function moveMultiTongueA() {
    // Tongue matches the frog's x
    frogA.tongue.x = frogA.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frogA.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frogA.tongue.state === "outbound") {
        frogA.tongue.y += -frogA.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frogA.tongue.y <= 0) {
            frogA.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frogA.tongue.state === "inbound") {
        frogA.tongue.y += frogA.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frogA.tongue.y >= height) {
            frogA.tongue.state = "idle";
        }
    }
}
/**
 * Handles moving the tongue of frog B based on its state
 */
function moveMultiTongueB() {
    // Tongue matches the frog's x
    frogB.tongue.x = frogB.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frogB.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frogB.tongue.state === "outbound") {
        frogB.tongue.y += -frogB.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frogB.tongue.y <= 0) {
            frogB.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frogB.tongue.state === "inbound") {
        frogB.tongue.y += frogB.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frogB.tongue.y >= height) {
            frogB.tongue.state = "idle";
        }
    }
}
/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawSingleFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(singleFrog.tongue.x, singleFrog.tongue.y, singleFrog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(singleFrog.tongue.size);
    line(singleFrog.tongue.x, singleFrog.tongue.y, singleFrog.body.x, singleFrog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(singleFrog.body.x, singleFrog.body.y, singleFrog.body.size);
    pop();
}

/**
 * Draws the two multiplayer frogs
 */
function drawMultiFrogA() {
    // Draw the tongue tip
    push();
    fill(163, 21, 21);
    noStroke();
    ellipse(frogA.tongue.x, frogA.tongue.y, frogA.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frogA.tongue.size);
    line(frogA.tongue.x, frogA.tongue.y, frogA.body.x, frogA.body.y);
    pop();
    line(frogA.tongue.x, frogA.tongue.y, frogA.body.x, frogA.body.y);

    // Draw the frog's body
    push();
    fill("#8B0000");
    noStroke();
    ellipse(frogA.body.x, frogA.body.y, frogA.body.size);
    pop();
}

function drawMultiFrogB() {
    // Draw the tongue tip
    push();
    fill(23, 37, 156);
    noStroke();
    ellipse(frogB.tongue.x, frogB.tongue.y, frogB.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frogA.tongue.size);
    line(frogB.tongue.x, frogB.tongue.y, frogB.body.x, frogB.body.y);
    pop();
    line(frogB.tongue.x, frogB.tongue.y, frogB.body.x, frogB.body.y);
    // Draw the frog's body
    push();
    fill("#00008B");
    noStroke();
    ellipse(frogB.body.x, frogB.body.y, frogB.body.size);
    pop();
}

function drawPFlyFrog() {

    function drawBorderFrog(x, y) {
        push();
        fill("#14b32e");
        noStroke();
        ellipse(x, y, 300);
        pop();
    }

    function drawBorderFrogs() {
        // Top border
        for (let x = 0; x < width; x += 300) {
            drawBorderFrog(x, 0);
        }
        // Bottom border
        for (let x = 0; x < width; x += 300) {
            drawBorderFrog(x, height);
        }
        // Left border
        for (let y = 0; y < height; y += 300) {
            drawBorderFrog(0, y);
        }
        // Right border
        for (let y = 0; y < height; y += 300) {
            drawBorderFrog(width, y);
        }
    }

    drawBorderFrogs();
}

/**
 * Handles the tongue overlapping the bugs
 */
function checkTongueFlyOverlap() {
    // Check overlap for single frog
    let d = dist(singleFrog.tongue.x, singleFrog.tongue.y, fly.x, fly.y);
    let eaten = (d < singleFrog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        resetFly();
        singleFrog.tongue.state = "inbound";
        singleScore++;
    }

    // Check overlap for frog A
    d = dist(frogA.tongue.x, frogA.tongue.y, fly.x, fly.y);
    eaten = (d < frogA.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        resetFly();
        frogA.tongue.state = "inbound";
        scoreA++;
    }

    // Check overlap for frog B
    d = dist(frogB.tongue.x, frogB.tongue.y, fly.x, fly.y);
    eaten = (d < frogB.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        resetFly();
        frogB.tongue.state = "inbound";
        scoreB++;
    }
}

function checkTongueFireflyOverlap() {
    // Check overlap for single frog
    let d = dist(singleFrog.tongue.x, singleFrog.tongue.y, firefly.x, firefly.y);
    let eaten = (d < singleFrog.tongue.size / 2 + firefly.size / 2);
    if (eaten) {
        resetFirefly();
        singleFrog.tongue.state = "inbound";
        singleScore--;
    }

    // Check overlap for frog A
    d = dist(frogA.tongue.x, frogA.tongue.y, firefly.x, firefly.y);
    eaten = (d < frogA.tongue.size / 2 + firefly.size / 2);
    if (eaten) {
        resetFirefly();
        frogA.tongue.state = "inbound";
        scoreA--;
    }

    // Check overlap for frog B
    d = dist(frogB.tongue.x, frogB.tongue.y, firefly.x, firefly.y);
    eaten = (d < frogB.tongue.size / 2 + firefly.size / 2);
    if (eaten) {
        resetFirefly();
        frogB.tongue.state = "inbound";
        scoreB--;
    }
}

function checkTongueSpiceyFlyOverlap() {
    // Check overlap for single frog
    let d = dist(singleFrog.tongue.x, singleFrog.tongue.y, spiceyFly.x, spiceyFly.y);
    let eaten = (d < singleFrog.tongue.size / 2 + spiceyFly.size / 2);
    if (eaten) {
        resetSpiceyFly();
        singleFrog.tongue.state = "inbound";
        singleScore += 4;
    }

    // Check overlap for frog A
    d = dist(frogA.tongue.x, frogA.tongue.y, spiceyFly.x, spiceyFly.y);
    eaten = (d < frogA.tongue.size / 2 + spiceyFly.size / 2);
    if (eaten) {
        resetSpiceyFly();
        frogA.tongue.state = "inbound";
        scoreA += 4;
    }

    // Check overlap for frog B
    d = dist(frogB.tongue.x, frogB.tongue.y, spiceyFly.x, spiceyFly.y);
    eaten = (d < frogB.tongue.size / 2 + spiceyFly.size / 2);
    if (eaten) {
        resetSpiceyFly();
        frogB.tongue.state = "inbound";
        scoreB += 4;
    }
}

function checkTongueToxicFlyOverlap() {
    // Check overlap for single frog
    let d = dist(singleFrog.tongue.x, singleFrog.tongue.y, toxicFly.x, toxicFly.y);
    let eaten = (d < singleFrog.tongue.size / 2 + toxicFly.size / 2);
    if (eaten) {
        resetToxicFly();
        singleFrog.tongue.state = "inbound";
        let decrementInterval = setInterval(() => {
            singleScore--;
        }, 700);

        setTimeout(() => {
            clearInterval(decrementInterval);
        }, 7000);
    }

    // Check overlap for frog A
    d = dist(frogA.tongue.x, frogA.tongue.y, toxicFly.x, toxicFly.y);
    eaten = (d < frogA.tongue.size / 2 + toxicFly.size / 2);
    if (eaten) {
        resetToxicFly();
        frogA.tongue.state = "inbound";
        let decrementInterval = setInterval(() => {
            scoreA--;
        }, 700);

        setTimeout(() => {
            clearInterval(decrementInterval);
        }, 7000);
    }

    // Check overlap for frog B
    d = dist(frogB.tongue.x, frogB.tongue.y, toxicFly.x, toxicFly.y);
    eaten = (d < frogB.tongue.size / 2 + toxicFly.size / 2);
    if (eaten) {
        resetToxicFly();
        frogB.tongue.state = "inbound";
        let decrementInterval = setInterval(() => {
            scoreB--;
        }, 700);

        setTimeout(() => {
            clearInterval(decrementInterval);
        }, 7000);
    }
}

function checkTongueMosquitoOverlap() {
    // Check overlap for single frog
    let d = dist(singleFrog.tongue.x, singleFrog.tongue.y, mosquito.x, mosquito.y);
    let eaten = (d < singleFrog.tongue.size / 2 + mosquito.size / 2);
    if (eaten) {
        resetMosquito();
        singleFrog.tongue.state = "inbound";
        let incrementInterval = setInterval(() => {
            singleScore++;
        }, 700);

        setTimeout(() => {
            clearInterval(incrementInterval);
        }, 7000);
    }

    // Check overlap for frog A
    d = dist(frogA.tongue.x, frogA.tongue.y, mosquito.x, mosquito.y);
    eaten = (d < frogA.tongue.size / 2 + mosquito.size / 2);
    if (eaten) {
        resetMosquito();
        frogA.tongue.state = "inbound";
        let incrementInterval = setInterval(() => {
            scoreA++;
        }, 700);

        setTimeout(() => {
            clearInterval(incrementInterval);
        }, 7000);
    }

    // Check overlap for frog B
    d = dist(frogB.tongue.x, frogB.tongue.y, mosquito.x, mosquito.y);
    eaten = (d < frogB.tongue.size / 2 + mosquito.size / 2);
    if (eaten) {
        resetMosquito();
        frogB.tongue.state = "inbound";
        let incrementInterval = setInterval(() => {
            scoreB++;
        }, 700);

        setTimeout(() => {
            clearInterval(incrementInterval);
        }, 7000);
    }
}

function checkTongueIllFlyOverlap() {
    // Check overlap for single frog
    let d = dist(singleFrog.tongue.x, singleFrog.tongue.y, illFly.x, illFly.y);
    let eaten = (d < singleFrog.tongue.size / 2 + illFly.size / 2);
    if (eaten) {
        resetIllFly();
        singleFrog.tongue.state = "inbound";
        singleScore -= 4;
    }

    // Check overlap for frog A
    d = dist(frogA.tongue.x, frogA.tongue.y, illFly.x, illFly.y);
    eaten = (d < frogA.tongue.size / 2 + illFly.size / 2);
    if (eaten) {
        resetIllFly();
        frogA.tongue.state = "inbound";
        scoreA -= 4;
    }

    // Check overlap for frog B
    d = dist(frogB.tongue.x, frogB.tongue.y, illFly.x, illFly.y);
    eaten = (d < frogB.tongue.size / 2 + illFly.size / 2);
    if (eaten) {
        resetIllFly();
        frogB.tongue.state = "inbound";
        scoreB -= 4;
    }
}

function shootRandomTongue(frog) {
    if (frog.tongue.state === "idle" && random() < 0.01) { // 1% chance each frame
        frog.tongue.state = "outbound";
    }
}

function movePFlyFrogTongues() {
    moveSingleTongue();
    moveMultiTongueA();
    moveMultiTongueB();
}

function drawPFlyFrog() {
    function drawBorderFrog(x, y) {
        push();
        fill("#14b32e");
        noStroke();
        ellipse(x, y, 300);
        pop();
    }

    function drawBorderFrogs() {
        // Top border
        for (let x = 0; x < width; x += 300) {
            drawBorderFrog(x, 0);
        }
        // Bottom border
        for (let x = 0; x < width; x += 300) {
            drawBorderFrog(x, height);
        }
        // Left border
        for (let y = 0; y < height; y += 300) {
            drawBorderFrog(0, y);
        }
        // Right border
        for (let y = 0; y < height; y += 300) {
            drawBorderFrog(width, y);
        }
    }

    drawBorderFrogs();

    // Make frogs shoot tongues at random times
    shootRandomTongue(singleFrog);
    shootRandomTongue(frogA);
    shootRandomTongue(frogB);

    // Move tongues
    movePFlyFrogTongues();
}

// draws the score on the top left corner
function drawScore() {
    push();
    fill("#000000");
    textSize(40);
    text("POINTS: " + singleScore, 530, 70);
    pop();
}

//draws the scoreA on the top left corner
function drawScoreA() {
    push();
    fill("#8B0000");
    textSize(40);
    text("POINTS: " + scoreA, 30, 70);
    pop();
}

//draws the scoreB on the top left corner
function drawScoreB() {
    push();
    fill("#00008B");
    textSize(40);
    text("POINTS: " + scoreB, 30, 120);
    pop();
}

function drawVictories() {
    push();
    fill("#000000");
    textSize(40);
    text(": " + victA, 1900, 170);
    text(": " + victB, 1900, 220);
    pop();

    push();
    fill("#8B0000");
    ellipse(1870, 155, 30);
    pop();

    push();
    fill("#00008B");
    ellipse(1870, 205, 30);
    pop();
}

//CountDown Timer
function decrementTimer() {
    if (singleTimer > 0) {
        singleTimer--;
    } else {
        saveSingleScore();
        gameState = "singleScores";
        singleTimer = 90;
        singleScore = 0;
    }
}

//Countdown multitimer
function decrementMultiTimer() {
    if (multiTimer > 0) {
        multiTimer--;
    } else {
        if (scoreA > scoreB) {
            victA++;
        } else if (scoreB > scoreA) {
            victB++;
        }
        multiTimer = 30;
        scoreA = 0;
        scoreB = 0;
        drawWhoWon();
    }
}

//Countdown for the player fly
function decrementPFlyTimer() {
    if (pFlyTimer > 0) {
        pFlyTimer--;
    } else {
        gameState = "congratulations";
        pFlyTimer = 60;
    }
}

//draws the timer on the top right corner
function drawTimer() {
    push();
    fill("#000000");
    textSize(40);
    text("TIME LEFT: " + singleTimer, 1200, 70);
    pop();
}

//draws the multiplayer timer on the top right corner
function drawMultiTimer() {
    push();
    fill("#000000");
    textSize(40);
    text("TIME LEFT: " + multiTimer, 1700, 70);
    pop();
}

//draws the Player fly timer on the top right corner
function drawPFlyTimer() {
    push();
    fill("#000000");
    textSize(40);
    text("TIME LEFT: " + pFlyTimer, 1200, 70);
    pop();
}


//draws the winner of the game
function drawWhoWon() {
    if (victA === 3) {
        gameState = "redVictory";
        background(139, 0, 0);
        textSize(50);
        fill("#ffcccc");
        text("Red Frog Wins!", width / 2 - 200, height / 2);
        textSize(30);
        text("Press ESCAPE to go back", width / 2 - 200, 100);
    } else if (victB === 3) {
        gameState = "blueVictory";
        background(0, 0, 139);
        textSize(50);
        fill("#ADD8E6");
        text("Blue Frog Wins!", width / 2 - 200, height / 2);
        textSize(30);
        text("Press ESCAPE to go back", width / 2 - 200, 100);
    }
}

/**
 * Saves the score to local storage
 */

let scoreSaved = false;

function saveSingleScore() {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(singleScore);
    localStorage.setItem('scores', JSON.stringify(scores));
}

// Save the score when the timer reaches 0
if (singleTimer === 0 && !scoreSaved) {
    saveSingleScore();
    scoreSaved = true;
}

/**
 * handles the diferent key presses and screens, plus the tongue actions
 */
function keyPressed() {
    if (keyCode === 87 && singleFrog.tongue.state === "idle" && gameState === "game") {
        singleFrog.tongue.state = "outbound";
    } else if (keyCode === ENTER && gameState === "title") {
        gameState = "gamemodes";
    } else if (keyCode === ESCAPE && gameState === "gamemodes") {
        gameState = "title";

        //sets the gamemode to single player
    } else if (keyCode === 87 && frogA.tongue.state === "idle" && gameState === "game2") {
        frogA.tongue.state = "outbound";
    } else if (keyCode === 83 && gameState === "gamemodes") {
        gameState = "singleInstructions";
    } else if (keyCode === ENTER && gameState === "singleInstructions") {
        gameState = "rules";
    } else if (keyCode === ENTER && gameState === "rules") {
        gameState = "game";
    } else if (keyCode === ESCAPE && gameState === "game") {
        gameState = "title";
    }
    //sets the gamemode to multiplayer

    if (keyCode === UP_ARROW && frogB.tongue.state === "idle" && gameState === "game2") {
        frogB.tongue.state = "outbound";
    } else if (keyCode === 77 && gameState === "gamemodes") {
        gameState = "multiInstructions";
    } else if (keyCode === ENTER && gameState === "multiInstructions") {
        gameState = "rules2";
    } else if (keyCode === ENTER && gameState === "rules2") {
        gameState = "game2";
    } else if (keyCode === ESCAPE && gameState === "game2") {
        gameState = "title";
    } else if (keyCode === ESCAPE && gameState === "redVictory") {
        gameState = "gamemodes";
        frogA.body.x = 500;
        frogA.tongue.y = 1000;
        frogA.tongue.state = "idle";
        frogB.body.x = 1500;
        frogB.tongue.y = 1000;
        frogB.tongue.state = "idle";
        victA = 0;
        victB = 0;
    } else if (keyCode === ESCAPE && gameState === "blueVictory") {
        gameState = "gamemodes";
        frogA.body.x = 500;
        frogA.tongue.y = 1000;
        frogA.tongue.state = "idle";
        frogB.body.x = 1500;
        frogB.tongue.y = 1000;
        frogB.tongue.state = "idle";
        victA = 0;
        victB = 0;
    }

    if (keyCode === 70 && gameState === "gamemodes") {
        gameState = "pFlyInstructions";
    } else if (keyCode === ENTER && gameState === "pFlyInstructions") {
        gameState = "game3";
    } else if (keyCode === ESCAPE && gameState === "game3") {
        gameState = "gamemodes";
    } else if (keyCode === ESCAPE && gameState === "pFlyInstructions") {
        gameState = "gamemodes";
    } else if (keyCode === ESCAPE && gameState === "congratulations") {
        gameState = "gamemodes";
    } else if (lives === 0 && gameState === "game3") {
        gameState = "game3Over";
    } else if (pFlyTimer === 0 && gameState === "game3") {
        gameState = "congratulations";
    }


    //Navigate through the scores and instructions
    if (keyCode === SHIFT && gameState === "singleInstructions") {
        gameState = "singleScores";
    } else if (keyCode === ESCAPE && gameState === "singleScores") {
        gameState = "singleInstructions";
    } else if (keyCode === ESCAPE && gameState === "singleInstructions") {
        gameState = "gamemodes";
    } else if (keyCode === ESCAPE && gameState === "rules") {
        gameState = "singleInstructions";
    }
}