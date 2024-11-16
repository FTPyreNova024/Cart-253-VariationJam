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
let score = 0;

//Title screen
let gameState = "title";

//Scoreboard
let singleScore = 0;

// Our Single frog
const singleFrog = {
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
    x: 1000,
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
    x: 1000,
    y: 200, // Will be random
    size: 25,
    speed: 1
};

const illFly = {
    x: 1000,
    y: 200, // Will be random
    size: 20,
    speed: 4
};

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(1000, 1000);

    // Give the fly its first random position
    resetFly();

    // One minute and a half timer
    setInterval(() => {
        if (gameState === "game") {
            decrementTimer();
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

    } else if (gameState === "rules") {
        //Display types of flies
        drawTypesOfFlies();

    } else if (gameState === "singleScores") {
        //Display the scoreboard
        drawScoreBoard();

    } else if (gameState === "game") {
        //Game screen
        drawGameScreen();
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
    text("Press ESCAPE to go back", width / 2, height / 2 + 50);
    pop();
}

//Single player game screen
function drawGameScreen() {
    background("#87ceeb");
    push();
    fill(0, 0, 0);
    textSize(20);
    text("Press ESCAPE to go back and pause", 320, 50);
    pop();

    moveBug();
    drawBug();
    moveFrog();
    moveTongue();
    drawFrog();
    tongueOverlap();
    drawScore();
    drawTimer();
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
    if (fly.x > width) {
        resetFly();
    }

    // Move the firefly
    firefly.y += random(-2, 2);
    firefly.x += firefly.speed;
    // Handle the firefly going off the canvas
    if (firefly.x > width) {
        resetFirefly();
    }

    // Move the spicey fly
    spiceyFly.y += random(-10, 10);
    spiceyFly.x += spiceyFly.speed;
    // Handle the spicey fly going off the canvas
    if (spiceyFly.x > width) {
        resetSpiceyFly();
    }

    // Move the toxic fly
    toxicFly.y += random(-1, 1);
    toxicFly.x -= toxicFly.speed;
    // Handle the toxic fly going off the canvas
    if (toxicFly.x < 0) {
        resetToxicFly();
    }

    // Move the mosquito
    mosquito.y += random(-7, 7);
    mosquito.x -= mosquito.speed;
    // Handle the mosquito going off the canvas
    if (mosquito.x < 0) {
        resetMosquito();
    }

    // Move the illFly
    illFly.y += random(-2, 2);
    illFly.x -= illFly.speed;
    // Handle the illFly going off the canvas
    if (illFly.x < 0) {
        resetIllFly();
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
    fly.x = 0;
    fly.y = random(100, 800);
    fly.size = 30;
    fly.speed = 3;

}

function resetFirefly() {
    // Spawn a firefly
    firefly.x = 0;
    firefly.y = random(100, 800);
    firefly.size = 20;
    firefly.speed = 4;
}

function resetSpiceyFly() {
    // Spawn a spicey fly
    spiceyFly.x = 0;
    spiceyFly.y = random(100, 800);
    spiceyFly.size = 15;
    spiceyFly.speed = 10;
}

function resetToxicFly() {
    // Spawn a toxic fly
    toxicFly.x = 1000;
    toxicFly.y = random(100, 800);
    toxicFly.size = 25;
    toxicFly.speed = 1;
}

function resetMosquito() {
    // Spawn a mosquito
    mosquito.x = 1000;
    mosquito.y = random(100, 800);
    mosquito.size = 10;
    mosquito.speed = 7;
}

function resetIllFly() {
    // Spawn a illFly
    illFly.x = 1000;
    illFly.y = random(100, 800);
    illFly.size = 20;
    illFly.speed = 4;
}

/**
 * Moves the frog with "A" and "D" on the x position
 */
function moveFrog() {
    if (keyIsDown(65)) { // 'A' key
        singleFrog.body.x = max(singleFrog.body.x - 10, 0);
    }
    if (keyIsDown(68)) { // 'D' key
        singleFrog.body.x = min(singleFrog.body.x + 10, width);
    }
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
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
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
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
 * Handles the tongue overlapping the bugs
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(singleFrog.tongue.x, singleFrog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < singleFrog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        singleFrog.tongue.state = "inbound";
        // Increment the score
        score++;
    }
}

function checkTongueFireflyOverlap() {
    // Get distance from tongue to firefly
    const d = dist(singleFrog.tongue.x, singleFrog.tongue.y, firefly.x, firefly.y);
    // Check if it's an overlap
    const eaten = (d < singleFrog.tongue.size / 2 + firefly.size / 2);
    if (eaten) {
        // Reset the firefly
        resetFirefly();
        // Bring back the tongue
        singleFrog.tongue.state = "inbound";
        // Decrease the score
        score--;
    }
}

function checkTongueSpiceyFlyOverlap() {
    // Get distance from tongue to spicey fly
    const d = dist(singleFrog.tongue.x, singleFrog.tongue.y, spiceyFly.x, spiceyFly.y);
    // Check if it's an overlap
    const eaten = (d < singleFrog.tongue.size / 2 + spiceyFly.size / 2);
    if (eaten) {
        // Reset the spicey fly
        resetSpiceyFly();
        // Bring back the tongue
        singleFrog.tongue.state = "inbound";
        // Increment the score
        score += 4;
    }
}

function checkTongueToxicFlyOverlap() {
    // Get distance from tongue to toxic fly
    const d = dist(singleFrog.tongue.x, singleFrog.tongue.y, toxicFly.x, toxicFly.y);
    // Check if it's an overlap
    const eaten = (d < singleFrog.tongue.size / 2 + toxicFly.size / 2);
    if (eaten) {
        // Reset the toxic fly
        resetToxicFly();
        // Bring back the tongue
        singleFrog.tongue.state = "inbound";
        // Decrease the score through time
        let decrementInterval = setInterval(() => {
            score--;
        }, 700);

        setTimeout(() => {
            clearInterval(decrementInterval);
        }, 7000);
    }
}

function checkTongueMosquitoOverlap() {
    // Get distance from tongue to mosquito
    const d = dist(singleFrog.tongue.x, singleFrog.tongue.y, mosquito.x, mosquito.y);
    // Check if it's an overlap
    const eaten = (d < singleFrog.tongue.size / 2 + mosquito.size / 2);
    if (eaten) {
        // Reset the mosquito
        resetMosquito();
        // Bring back the tongue
        singleFrog.tongue.state = "inbound";
        // Increase the score
        let incrementInterval = setInterval(() => {
            score++;
        }, 700);

        setTimeout(() => {
            clearInterval(incrementInterval);
        }, 7000);
    }
}

function checkTongueIllFlyOverlap() {
    // Get distance from tongue to illFly
    const d = dist(singleFrog.tongue.x, singleFrog.tongue.y, illFly.x, illFly.y);
    // Check if it's an overlap
    const eaten = (d < singleFrog.tongue.size / 2 + illFly.size / 2);
    if (eaten) {
        // Reset the illFly
        resetIllFly();
        // Bring back the tongue
        singleFrog.tongue.state = "inbound";
        // Decrease the score
        score -= 4;
    }
}

// draws the scoreboad on the top left corner
function drawScore() {
    push();
    fill("#000000");
    textSize(40);
    text("POINTS: " + score, 30, 70);
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
        score = 0;
    }
}

//draws the timer on the top right corner
function drawTimer() {
    push();
    fill("#000000");
    textSize(40);
    text("TIME LEFT: " + singleTimer, 700, 70);
    pop();
}

/**
 * Saves the score to local storage
 */
function saveSingleScore() {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
}

// Save the score when the timer reaches 0
if (singleTimer === 0) {
    saveSingleScore();
}

/**
 * handles the diferent key presses and screens, plus the tongue actions
 */
function keyPressed() {
    if (key === 'w' && singleFrog.tongue.state === "idle" && gameState === "game") {
        singleFrog.tongue.state = "outbound";
    } else if (keyCode === ENTER && gameState === "title") {
        gameState = "gamemodes";
    } else if (keyCode === ESCAPE && gameState === "gamemodes") {
        gameState = "title";

        //sets the gamemode to single player
    } else if (keyCode === 83 && gameState === "gamemodes") {
        gameState = "singleInstructions";
    } else if (keyCode === ENTER && gameState === "singleInstructions") {
        gameState = "rules";
    } else if (keyCode === ENTER && gameState === "rules") {
        gameState = "game";
    } else if (keyCode === ESCAPE && gameState === "game") {
        gameState = "title";

        //sets the gamemode to multiplayer
    } else if (keyCode === 77 && gameState === "gamemodes") {
        gameState = "multiInstructions";
    } else if (keyCode === ENTER && gameState === "multiInstructions") {
        gameState = "rules2";
    } else if (keyCode === ESCAPE && gameState === "rules2") {
        gameState = "game2";
    } else if (keyCode === ESCAPE && gameState === "game2") {
        gameState = "title";
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