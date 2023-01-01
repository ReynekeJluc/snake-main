const config = {
	step: 0,
	maxStep: 1,
	sizeCell: 16,
	sizeBerry: 16/4
};

const snake = {
	x: 16,
	y: 16,
	dx: config.sizeCell,
	dy: 0,
	tails: [],
	maxTails: 3
};

let berry = {
	x: 0,
	y: 0
};

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

function gameLoop() {

	requestAnimationFrame( gameLoop );
	if (++config.step < config.maxStep) {
		return;
	}
	config.step = 0;

	context.clearRect(0, 0, canvas.width, canvas.height);

	drawBerry();
	drawSnake();
}
requestAnimationFrame( gameLoop );

function drawSnake() {	
	snake.x += snake.dx;
	snake.y += snake.dy;

	collisionBorder();
	snake.tails.unshift( { x: snake.x, y: snake.y } );

	if ( snake.tails.length > snake.maxTails ) {
		snake.tails.pop();
	}

	snake.tails.forEach(function(el, index){
		if (index == 0) {
			context.fillStyle = "#FA0556";
		} else {
			context.fillStyle = "#A00034";
		}
		context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);

		if ( el.x === berry.x && el.y === berry.y ) {
			snake.maxTails++;
			randomPositionBerry();
		}

		for( let i = index + 1; i < snake.tails.length; i++ ) {

			if (el.x == snake.tails[i].x && el.y == snake.tails[i].y) {
				refreshGame();
			}

		}

	});
}

function collisionBorder() {
	if(snake.x < 0) {
		snake.x = canvas.width - config.sizeCell;
	}else if (snake.x > canvas.width) {
		snake.x = 0;
	}

	if(snake.y < 0) {
		snake.y = canvas.height - config.sizeCell;
	}else if (snake.y > canvas.height) {
		snake.y = 0;
	}
}

function refreshGame() {
	snake.x = 16;
	snake.y = 16;
	snake.tails = [];
	snake.maxTails = 3;
	snake.dx = config.sizeCell;
	snake.dy = 0;

	randomPositionBerry();
}

function drawBerry() {
	context.beginPath();
	context.fillStyle = "#A00034";
	context.arc(berry.x + (config.sizeCell / 2), berry.y + (config.sizeCell / 2), config.sizeBerry, 0, 2 * Math.PI);
	context.fill();
}

function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max-min) + min);
}

function randomPositionBerry() {
	berry.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
	berry.y = getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
}

document.addEventListener('keydown', function(e) {
	switch (e.code) {
		case 'KeyW': 
			snake.dy = -config.sizeCell; 
			snake.dx = 0; 
			break;
		case 'KeyS': 
			snake.dy = config.sizeCell; 
			snake.dx = 0; 
			break;
		case 'KeyA': 
			snake.dx = -config.sizeCell; 
			snake.dy = 0; 
			break;
		case 'KeyD': 
			snake.dx = config.sizeCell; 
			snake.dy = 0; 
			break;
	}
});