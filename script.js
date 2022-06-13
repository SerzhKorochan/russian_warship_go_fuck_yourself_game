//# ::VARIABLES::
//# static objects
var gameWindow = document.querySelector("#GameArea");
var startWindow = document.querySelector("#StartGame");
var endWindow = document.querySelector("#EndGame");
var btnStart = document.querySelector("#StartButton");
var btnReload = document.querySelector("#GameReloadButton");
var intervalWarship = null;

//# dinamic objects
var plane = document.querySelector("#Airplane");
var ship = document.querySelector("#FuckingWarship");

//# counters-indicators
var shipCounter = 999;
var shipCountIndicator = document.querySelector("#ShipsCounter");
var gameOver = false;

//CONSTANTS
const ALLOWED_SHIPS_QUANTITY = 999;

// var planeDirection = 0;
// var planeSpeed = 100; // so we can modificate planeSpeed in game;

var explosion = document.querySelector("#explosion");
var audioplayer = document.querySelector("audio");

//# = START GAME =
btnStart.onclick = function () {
    startWindow.style.display = "none"; // hide start window;
    gameWindow.style.display = "block"; // show game;
    CreateWarship();
};

//# plane controls
document.onkeydown = function (event) {
    // pressing keys
    // console.dir(event);// to knew what key was pressed;
    movePlane(event);
    shooting(event); // Space keyCode = 40
};

//# = END GAME PAGE =
btnReload.onclick = function () {
    document.location.reload();
};

//# ::FUNCTIONS::

/**
 * control plane move function. If apropriate keys is pressed than move plane left or right.
 * # event - keyCode.
 * TODO сделать так, что бы границы перемещения самолета по горизонтали определялись динамически в зависимости от размера игрового поля +++ done
 */

function movePlane(event) {
    if (event.keyCode == 37 || event.keyCode == 39) {
        let step = 10;
        let leftBorder = 5;
        let rightBorder = gameWindow.clientWidth - plane.clientWidth - 6;

        if (event.keyCode == 37 && plane.offsetLeft >= leftBorder) {
            // correct game window border limit
            plane.style.left = plane.offsetLeft - step + "px";
        }
        if (event.keyCode == 39 && plane.offsetLeft < rightBorder) {
            // same
            plane.style.left = plane.offsetLeft + step + "px";
        }
    }
}

/**
 * Plane shoting function. Create and move blue and yellow bullets if apropriate key pressed;
 * # event - keyCode;
 */

var pause = false; // timeout for shooting;
function shooting(event) {
    if (event.keyCode == 32 && pause == false) {
        // press -space-
        bulletShoot("blue", 33, 30, -1);
        bulletShoot("yellow", 82, 30, -1);
        pause = true; // shooting timeout;
    } else {
        setTimeout(function () {}, 1000); // pausing for  1 sec.
        pause = false;
    }
}

/**
 * create and move bullet function;
 * # color - color of bullet;
 * # centerPosition - starting X-coord. of bullet;
 * # topPosition - starting Y -coord. of bullet;
 * # direction - direction of the move (+1 - top2down; -1 - down2top)
 */

function bulletShoot(color, centerPosition, topPosition, direction) {
    var bullet = document.createElement("div"); // make bullet;
    bullet.className = "bullet"; // name bullet
    bullet.style.background = color; // styling bullet color;
    gameWindow.appendChild(bullet); // add bullet;
    bullet.style.display = "block"; // display bullet;
    bullet.style.left = plane.offsetLeft + centerPosition + "px"; // y-coordinate of bullet = y-coord. of the player; 140 - to mutch gun coordinate;
    bullet.style.top = plane.offsetTop + topPosition + "px"; // top position of bullet;
    moveThing(bullet, 0, direction); // move bullet;
}

/**
 * anything move function. move an object (top2down or reverce)
 * # thing - object to move;
 * # topLimit - game window border limit (to remove thing);
 * # direction - direction of the move (+1 - top2down; -1 - down2top)
 */

function moveThing(thing, topLimit, direction) {
    var enemy = document.querySelector("#FuckingWarship"); // initialise enemy to distroy; need worck to more than one enemy
    let moveID = setInterval(function () {
        // set timer ID;
        thing.style.top = thing.offsetTop + direction * 10 + "px"; // plane direction
        if (thing.offsetTop < topLimit) {
            // if thing out of the game field;
            clearInterval(moveID); // stop animation timer;
            thing.remove(); // remove thing;
        }

        //# target missing
        if (thing.className == "ship") {
            //TODO code if ship reach out of game field (do not remove ship, it is done in base code)
        }

        //# target destroing
        if (thing.className == "bullet") {
            if (
                thing.offsetTop < enemy.offsetTop + enemy.clientHeight - 50 && // if enemy coord. match bullet coord.
                thing.offsetLeft > enemy.offsetLeft &&
                thing.offsetLeft < enemy.offsetLeft + enemy.clientWidth
            ) {
                thing.remove(); // remove bullet;
                enemy.remove(); // remove ship;
                //TODO  add new ship (random)
                shipCounter--; // update counter;
                console.log(shipCounter);
                console.dir(shipCountIndicator);
                shipCountIndicator.innerHTML = shipCounter + " SHIPS LEFT"; // update indicator;

                //# = END GAME =
                if (shipCounter == 0) {
                    endWindow.style.display = "block";
                    gameWindow.style.display = "none";
                }
            }
        }
    }, 100);
}

/**
 * Func which returns random num in range from min to max
 */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// creating a new enemy
function CreateWarship() {
    intervalWarship = setInterval(function () {
        let enemy = document.createElement("div");
        enemy.id = "FuckingWarship";

        let enemyWidth = 100;
        let leftBorder = 5;
        let rightBorder = gameWindow.clientWidth - enemyWidth;
        let position = randomNumber(leftBorder, rightBorder);

        enemy.style.left = position + "px";
        gameWindow.appendChild(enemy);
        moveWarship(enemy);
    }, 4000);
}

// enemy movement
function moveWarship(enemy) {
    setInterval(function () {
        enemy.style.top = enemy.offsetTop + 1 + "px";
        if (enemy.offsetTop > gameWindow.clientHeight - enemy.clientHeight) {
            // the enemy has come down
            enemy.remove();
            audioplayer.play();
            explosion.style.left = plane.style.left;
            explosion.style.display = "block";
            endWindow.style.display = "block";
            gameWindow.style.display = "none";
            plane.style.display = "none";
            clearInterval(intervalWarship);

            let destroyedShipsCnt =
                document.querySelector("#DestroyedShipsCnt");
            destroyedShipsCnt.innerText = ALLOWED_SHIPS_QUANTITY - shipCounter;
        }
    }, 10);
}
