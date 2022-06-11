var gameWindow = document.querySelector("#GameArea");
var plane = document.querySelector("#Airplane");
var gameOver = false;
var planeDirection = 0;
var planeSpeed = 100; // so we can modificate planeSpeed in game;



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

function shooting(event) {
	if (event.keyCode == 32){ // press -space-
	var bullet = document.createElement("div");
	bullet.className = "bullet";
	gameWindow.appendChild(bullet);
		bullet.style.display = "block";
		bullet.style.left = plane.offsetLeft + 45 + "px";// y-coordinate of bullet = y-coord. of the player; 140 - to mutch gun coordinate;
		bullet.style.top = plane.offsetTop + "px";
		moveThing(bullet);
	}
}

function moveThing(thing){
	let moveID = setInterval(function() { // set timer ID;
		thing.style.top = thing.offsetTop - 10 + "px"; // plane direction
		if (thing.offsetTop < 0){
			clearInterval(moveID);
			thing.remove();
		}
	}, 100);
}