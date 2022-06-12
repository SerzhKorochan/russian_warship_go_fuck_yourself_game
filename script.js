// static objects
var gameWindow = document.querySelector("#GameArea");
var startWindow = document.querySelector("#StartGame");
var endWindow = document.querySelector("#EndGame");
var btnStart = document.querySelector("#StartButton");
var btnReload = document.querySelector("#GameReloadButton");

// dinamic objects
var plane = document.querySelector("#Airplane");
var ship = document.querySelector("#FuckingWarship");

// counters-indicators
var shipCounter = 999;
var shipCountIndicator = document.querySelector("#ShipsCounter");
var gameOver = false;

// var planeDirection = 0;
// var planeSpeed = 100; // so we can modificate planeSpeed in game;

// startGame
btnStart.onclick = function(){
	startWindow.style.display = "none"; // hide start window;
	gameWindow.style.display = "block"; // show game;
	// shipGo();
}


// driving the plane
document.onkeydown = function(event){ // pressing keys
	// console.dir(event);// to knew what key was pressed;
	movePlane(event);
	shooting(event); // arrow Space keyCode = 40
}

/**
 * 
 *  
 */

function movePlane(event){
	if (event.keyCode == 37 || event.keyCode == 39){
		if (event.keyCode == 37 && plane.offsetLeft > 14){ // correct game window border limit
			plane.style.left = plane.offsetLeft - 40 + "px";
		}
		if (event.keyCode == 39 && plane.offsetLeft < 734) { // same
			plane.style.left = plane.offsetLeft + 40 + "px";
		}
	}
}


/**
 * 
 * 
 */

var pause = false; // timeout for shooting;
function shooting(event) {
	if (event.keyCode == 32 && pause == false){ // press -space-
		bulletShoot("blue", 45, 45, 1);
		bulletShoot("yellow", 105, 45, 1);
		pause = true; // shooting timeout;
	} else {
		setTimeout(function() { // pausing;
			console.log("boom");
		}, 1000); // 1 sec.
		pause = false;
	}
}

/**
 * 
 * 
 */

function bulletShoot(color, centerPosition, topPosition, direction){
		var bullet = document.createElement("div"); // make bullet;
	bullet.className = "bullet"; // name bullet
	bullet.style.background = color; // styling bullet color;
	gameWindow.appendChild(bullet); // add bullet;
		bullet.style.display = "block"; // display bullet;
		bullet.style.left = plane.offsetLeft + direction * centerPosition + "px";// y-coordinate of bullet = y-coord. of the player; 140 - to mutch gun coordinate;
		bullet.style.top = plane.offsetTop + direction * topPosition + "px"; // top position of bullet;
		moveThing(bullet, 0, -1); // move bullet;
}

/**
 * 
 * 
 */

function moveThing(thing, topLimit, direction){
	var enemy = document.querySelector("#FuckingWarship"); // initialise enemy to distroy; need worck to more than one enemy
	let moveID = setInterval(function() { // set timer ID;
		thing.style.top = thing.offsetTop + direction * 10 + "px"; // plane direction
		if (thing.offsetTop < topLimit){ // if thing out of the game field;
			clearInterval(moveID); // stop timer;
			thing.remove(); // remove thing;
		}
		if (thing.offsetTop < enemy.offsetTop + enemy.clientHeight - 50 // if enemy coord. match bullet coord.
			&& thing.offsetLeft > enemy.offsetLeft 
			&& thing.offsetLeft < enemy.offsetLeft + enemy.clientWidth){
			thing.remove(); // remove bullet;
			enemy.remove(); // remove ship;
			shipCounter--; // update counter;
			console.log(shipCounter);
			console.dir(shipCountIndicator);
			shipCountIndicator.innerHTML = shipCounter + " SHIPS LEFT"; // update indicator;
		}
	}, 100);
}