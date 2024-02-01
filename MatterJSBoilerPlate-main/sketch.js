
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var board1, board2;
var numberOfArrows = 10;
var predio
var canhao
var rocket
var predio2


function preload() {

}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);

	engine = Engine.create();
	world = engine.world;

	//playerBase = new PlayerBase(300, 500, 180, 150);
	//player = new Player(285, playerBase.body.position.y - 153, 50, 180);
	playerArcher = new PlayerCanhao(
		width - 300,
		300,
		300,
		300
	);

	board1 = new Board(340, 330, 200, 200);
}


function draw() {
	//background(backgroundImg);

	Engine.update(engine);

	//playerBase.display();
	//player.display();
	playerArcher.display();

	board1.display();

	for (var i = 0; i < playerArrows.length; i++) {
		if (playerArrows[i] !== undefined) {
			playerArrows[i].display();

			var board1Collision = Matter.SAT.collides(
				board1.body,
				playerArrows[i].body
			);

			

			/*if (board1Collision || board2Collision) {
			  score += 5;
			}*/

			if (board1Collision.collided && board2Collision.collided) {
				score += 5;
			}

			/*if (board1Collision.collided || board2Collision.collided) {
			  score += 5;
			}*/

			/*if (board1Collision.collided || board2Collision.collided) {
			  score = 5;
			}*/


			var posX = playerArrows[i].body.position.x;
			var posY = playerArrows[i].body.position.y;

			if (posX > width || posY > height) {
				if (!playerArrows[i].isRemoved) {
					playerArrows[i].remove(i);
				} else {
					playerArrows[i].trajectory = [];
				}
			}
		}
	}

	// // Título
	// fill("#FFFF");
	// textAlign("center");
	// textSize(40);
	// text("ARQUEIRO ÉPICO", width / 2, 100);

	// // Contagem de Flechas
	// fill("#FFFF");
	// textAlign("center");
	// textSize(30);
	// text("Flechas Restantes: " + numberOfArrows, 200, 100);

	// // Pontuação
	// fill("#FFFF");
	// textAlign("center");
	// textSize(30);
	// text("Pontuação: " + score, width - 200, 100);

	// /*if (numberOfArrows == 5) {
	//   gameOver();
	// }*/

	// if (numberOfArrows == 0) {
	// 	gameOver();
	// }

	/*if (numberOfArrows = 0) {
	  gameOver();
	}*/

	/*if (numberOfArrows == 0) {
	  gameOver;
	}*/
}


function keyPressed() {
	if (keyCode === 32) {
		if (numberOfArrows > 0) {
			var posX = playerArcher.body.position.x;
			var posY = playerArcher.body.position.y;
			var angle = playerArcher.body.angle;

			var arrow = new PlayerRocket(posX, posY, 100, 100, angle);

			arrow.trajectory = [];
			Matter.Body.setAngle(arrow.body, angle);
			playerArrows.push(arrow);
			numberOfArrows -= 1;
		}
	}
}

function keyReleased() {
	if (keyCode === 32) {
		if (playerArrows.length) {
			var angle = playerArcher.body.angle;
			playerArrows[playerArrows.length - 1].shoot(angle);
		}
	}
}

function gameOver() {
	swal(
		{
			title: `Fim de Jogo!!!`,
			text: "Obrigado por jogar!!",
			imageUrl:
				"https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
			imageSize: "150x150",
			confirmButtonText: "Jogar Novamente"
		},
		function (isConfirm) {
			if (isConfirm) {
				location.reload();
			}
		}
	);

}
