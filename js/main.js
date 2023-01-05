window.onload = function() {

	const config = {
		step: 0,
		maxStep: 6,
		sizeCell: 32,
		sizeBerry: 32 / 4
	};

	const snake = {
		x: 32,
		y: 32,
		dx: config.sizeCell,
		dy: 0,
		tails: [],
		maxTails: 3
	};

	let berry = {
		x: 0,
		y: 0,
		count: 0
	};

	let score = 0;

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

		drawScore();
	}
	requestAnimationFrame( gameLoop );

	function drawSnake() {	
		snake.x += snake.dx;
		snake.y += snake.dy;
		
		collisionBorder();
		snake.tails.unshift( { x: snake.x, y: snake.y } );

		if (snake.tails.length > snake.maxTails) {
			snake.tails.pop();
		}

		snake.tails.forEach(function(el, index){
			if (index == 0) {
				context.fillStyle = "#FA0556";
			} else {
				context.fillStyle = "#A00034";
			}
			context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);

			if (el.x === berry.x && el.y === berry.y) {
				snake.maxTails++;
				berry.count++;

				score++;
				
				// score_table.append(score_inner);

				if(berry.count % 7 == 0 && config.maxStep > 1) {
					config.maxStep--;
				}

				randomPositionBerry();
			}
			for(let i = index + 1; i < snake.tails.length; i++) {

				if (el.x == snake.tails[i].x && el.y == snake.tails[i].y) {
					refreshGame();
				}
			}
		});
	}
	

	function collisionBorder() {
		if(snake.x < 0) {
			refreshGame();
		} else if (snake.x > canvas.width) {
			refreshGame();
		}

		if(snake.y < 0) {
			refreshGame();
		} else if (snake.y > canvas.height) {
			refreshGame();
		}
	}

	function refreshGame() {
		snake.x = 32;
		snake.y = 32;
		snake.tails = [];
		snake.maxTails = 3;
		snake.dx = config.sizeCell;
		snake.dy = 0;

		berry.count = 0;
		config.maxStep = 6;
		
		randomPositionBerry();
	}

	function drawBerry() {
		context.beginPath();
		context.fillStyle = "#A00034";
		context.arc(berry.x + (config.sizeCell / 2), berry.y + (config.sizeCell / 2), config.sizeBerry, 0, 2 * Math.PI);
		context.fill();
	}

	function drawScore() {
		
	}

	function getRandomInt(min, max) {
		return Math.floor( Math.random() * (max - min) + min);
	}

	function randomPositionBerry() {
		berry.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
		berry.y = getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
	}

	document.addEventListener('keydown', function(e) {
		if (e.code == "KeyW" && snake.dy == 0) {
			snake.dy = -config.sizeCell;
			snake.dx = 0;
		} else if (e.code == "KeyA" && snake.dx == 0) {
			snake.dx = -config.sizeCell;
			snake.dy = 0;
		} else if (e.code == "KeyS" && snake.dy == 0) {
			snake.dy = config.sizeCell;
			snake.dx = 0;
		} else if (e.code == "KeyD" && snake.dx == 0) {
			snake.dx = config.sizeCell;
			snake.dy = 0;
		}	
	});

	const score_table = document.createElement('div');
	score_table.className = 'score';
	const score_inner = score_table.createElement('div');   // здесь ошибка

	document.body.querySelector('.cvs-wrapper').prepend(score_table);

};