// static objects
var gameWindow = document.querySelector("#GameArea");
var startWindow = document.querySelector("#StartGame");
var endWindow = document.querySelector("#EndGame");
var btnStart = document.querySelector("#StartButton");
var btnReload = document.querySelector("#GameReloadButton");

// dinamic objects
var plane = document.querySelector("#Airplane");
var gameOver = false;

// counters-indicators
var shipCounter = 999;

// var planeDirection = 0;
// var planeSpeed = 100; // so we can modificate planeSpeed in game;

// startGame
startWindow.style = "block";
btnStart.onclick = function(){
	startWindow.style = "none";
	gameWindow.style = "block";
}


// driving the plane
document.onkeydown = function(event){ // pressing keys
	// console.dir(event);// to knew what key was pressed;
	movePlane(event);
	shooting(event); // arrow Space keyCode = 40
}

// <done-
/**
 * direction	- + 1 if turn right, -1 if turn left;
 * keyCode		- keyCode of pressed key (left - 37, right - 39);  
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
var pause = false; // timout for shooting;
function shooting(event) {
	if (event.keyCode == 32 && pause == false){ // press -space-
		bulletShoot("blue", 45, 45, 1);
		bulletShoot("yellow", 105, 45, 1);
		pause = true;
	} else {
		setTimeout(function() {
			console.log("boom");
		}, 1000);
		pause = false;
	}
}

/**
 * 
 * 
 */

function bulletShoot(color, centerPosition, topPosition, direction){
		var bullet = document.createElement("div");
	bullet.className = "bullet";
	bullet.style.background = color;
	gameWindow.appendChild(bullet);
		bullet.style.display = "block";
		bullet.style.left = plane.offsetLeft + direction * centerPosition + "px";// y-coordinate of bullet = y-coord. of the player; 140 - to mutch gun coordinate;
		bullet.style.top = plane.offsetTop + direction * topPosition + "px";
		moveThing(bullet, 0);
}

/**
 * 
 * 
 */

function moveThing(thing, topLimit){
	let moveID = setInterval(function() { // set timer ID;
		thing.style.top = thing.offsetTop - 10 + "px"; // plane direction
		if (thing.offsetTop < topLimit){
			clearInterval(moveID);
			thing.remove();
		}
	}, 100);
}