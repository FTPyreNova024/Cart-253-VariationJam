
const pFly = {
    x: 0,
    y: 0,
    fill: "black",
}

// const frogs = [];
// const numFrogs = 20;
// function getRandomBorderPosition() {
//     let position = {};
//     let side = floor(random(4));
//     switch (side) {
//         case 0: // Top
//             position.x = random(width);
//             position.y = 0;
//             break;
//         case 1: // Right
//             position.x = width;
//             position.y = random(height);
//             break;
//         case 2: // Bottom
//             position.x = random(width);
//             position.y = height;
//             break;
//         case 3: // Left
//             position.x = 0;
//             position.y = random(height);
//             break;
//     }
//     return position;
// }

function setup() {
    createCanvas(2000, 1000);
    // for (let i = 0; i < numFrogs; i++) {
    //     let frog = {
    //         x: 0,
    //         y: 0,
    //         fill: "green",
    //         tongue: {
    //             x: 0,
    //             y: 0,
    //             speed: 5,
    //             state: "idle",
    //             targetX: 0,
    //             targetY: 0,
    //         },
    //         shootProbability: 0.001,
    //         probabilityIncrement: 0.001,
    //     };
    //     let position = getRandomBorderPosition();
    //     frog.x = position.x;
    //     frog.y = position.y;
    //     frogs.push(frog);
    // }
}

// function draw() {
//     background(200);
//     pFly.x = mouseX;
//     pFly.y = mouseY;
//     drawPFly();
//     for (let frog of frogs) {
//         drawTongue(frog);
//         drawFrog(frog);
//         shootTongue(frog);
//     }
// }

// function drawPFly() {
//     push();
//     fill(pFly.fill);
//     ellipse(pFly.x, pFly.y, 50, 50);
//     pop();
// }

// function drawFrog(frog) {
//     push();
//     fill(frog.fill);
//     ellipse(frog.x, frog.y, 100, 100);
//     pop();
// }

// function drawTongue(frog) {
//     push();
//     strokeWeight(30);
//     stroke(255, 0, 0);
//     if (frog.tongue.state === "idle") {
//         fill(255, 0, 0);
//         ellipse(frog.x, frog.y, 30, 30);
//     } else {
//         line(frog.tongue.x, frog.tongue.y, frog.x, frog.y);
//     }
//     pop();
// }

// function shootTongue(frog) {
//     if (random(1) < frog.shootProbability && frog.tongue.state === "idle") {
//         frog.tongue.state = "shooting";
//         frog.tongue.targetX = constrain(pFly.x, 0, width);
//         frog.tongue.targetY = constrain(pFly.y, 0, height);
//         frog.shootProbability = 0.0001; // Reset probability after shooting
//     }

//     if (frog.tongue.state === "shooting") {
//         let dx = frog.tongue.targetX - frog.tongue.x;
//         let dy = frog.tongue.targetY - frog.tongue.y;
//         let distance = sqrt(dx * dx + dy * dy);

//         if (distance < frog.tongue.speed) {
//             frog.tongue.x = frog.tongue.targetX;
//             frog.tongue.y = frog.tongue.targetY;
//             frog.tongue.state = "retracting";
//         } else {
//             frog.tongue.x += dx / distance * frog.tongue.speed;
//             frog.tongue.y += dy / distance * frog.tongue.speed;
//         }
//     }

//     if (frog.tongue.state === "retracting") {
//         let dx = frog.x - frog.tongue.x;
//         let dy = frog.y - frog.tongue.y;
//         let distance = sqrt(dx * dx + dy * dy);

//         if (distance < frog.tongue.speed) {
//             frog.tongue.x = frog.x;
//             frog.tongue.y = frog.y;
//             frog.tongue.state = "idle";
//         } else {
//             frog.tongue.x += dx / distance * frog.tongue.speed;
//             frog.tongue.y += dy / distance * frog.tongue.speed;
//         }
//     }

//     // Increase the probability of shooting over time
//     if (frog.shootProbability < 0.02) {
//         frog.shootProbability += frog.probabilityIncrement;
//     }
// }
