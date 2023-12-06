let player, groundSensor
let floorGroup 
let ground
let container
let horizontalOscFloor, verticalOscFloor
let attack1, attack2

const tilePositions = [
	[125, 350],
	[215, 305],
	[140, 215],
	[300, 200],
	[450, 270],
]

const hoverTilePositions = [
	[200, 270],
	[390, 153]
]

const verticalHoverTilePositions = [
	[568, 92],
	[55, 260]
]

//function mousePressed() {
//	let x = max(player.x - (width / 2), 0)
//	let p = createP(`X: ${x + mouseX}, Y: ${mouseY}`);
//	p.parent(container)
//}

function setup() {
	container = select("#game-container");
	let cnv = createCanvas(container.elt.clientWidth, 400);
	cnv.parent(container);

    world.gravity.y = 10;
	floorGroup = new Group();
	floorGroup.collider = "s";

	let smallFloor = new floorGroup.Group();
	smallFloor.w = 30;
	smallFloor.h = 10;
	smallFloor.debug = true;

	horizontalOscFloor = new floorGroup.Group();
	horizontalOscFloor.debug = true;
	horizontalOscFloor.w = 30;
	horizontalOscFloor.h = 10;

	verticalOscFloor = new floorGroup.Group();
	verticalOscFloor.debug = true;
	verticalOscFloor.w = 30;
	verticalOscFloor.h = 10;

	for (let pos of tilePositions) {
		const tile = new smallFloor.Sprite(pos[0], pos[1]);
	}

	for (let i = 0; i < hoverTilePositions.length; i++) {
		const pos = hoverTilePositions[i];
		const tile = new horizontalOscFloor.Sprite(pos[0], pos[1]);
		tile.myOffset = i * 100
	}

	for (let i = 0; i < verticalHoverTilePositions.length; i++) {
		const pos = verticalHoverTilePositions[i];
		const tile = new verticalOscFloor.Sprite(pos[0], pos[1]);
		tile.myOffset = i * 100
	}

	const defaultGroundHeight = 10;
	ground = new floorGroup.Sprite(width / 2, height - defaultGroundHeight / 2, width, defaultGroundHeight);

	player = new Sprite(width / 2, height / 2, 25, 45);
	player.addAni("idle", "img/Idle.png", { frameSize: [200, 200], frames: 8 });
	player.addAni("run", "img/Run.png", { frameSize: [200, 200], frames: 8 });
	player.addAni("jump", "img/Jump.png", { frameSize: [200, 200], frames: 2 });
	player.addAni("fall", "img/Fall.png", { frameSize: [200, 200], frames: 2 });
	player.addAni("attack1", "img/Attack1.png", { frameSize: [200, 200], frames: 6 });
	player.addAni("attack2", "img/Attack2.png", { frameSize: [200, 200], frames: 6 });
	player.changeAni('idle');
	player.rotationLock = true;
	player.bounciness = 0;
	player.friction = 0;
	groundSensor = new Sprite(player.x, player.y + player.height/2, player.width, 6, 'n');
	groundSensor.visible = true;
	groundSensor.mass = 0.01;
	groundSensor.debug = true;

	new GlueJoint(player, groundSensor);
	background(0);
}

function draw() {
	if (kb.pressing("q")) {
		background(100, 0, 0, 20);
		world.step(1 / 240);
	}
	else {
		background(0);
	}

	for (let floor of horizontalOscFloor) {
		floor.x += sin(frameCount + floor.myOffset)
	}
	for (let floor of verticalOscFloor) {
		floor.y += sin(frameCount + floor.myOffset)
	}

	if (player.x > width / 2) {
		camera.x = player.x;
	}

	if (kb.pressing(" ") && groundSensor.overlapping(floorGroup)) {
		player.bearing = -90;
		player.applyForce(150);
	}

	if (kb.pressing('right') && !attack1 && !attack2) {
		player.changeAni('run');
		player.vel.x = 2;
		player.mirror.x = false;
	}
	else if (kb.pressing('left') && !attack1 && !attack2) {
		player.changeAni('run');
		player.vel.x = -2;
		player.mirror.x = true;
	}
	else {
		player.changeAni('idle');
		player.vel.x = 0;
	}

	if (player.vel.y < 0 && !groundSensor.overlapping(floorGroup)) {
		player.changeAni('jump');
	}
	else if (player.vel.y > 0 && !groundSensor.overlapping(floorGroup)) {
		player.changeAni('fall');
	}

	if (kb.presses("1")) {
		attack1 = true;
	}
	else if (kb.presses("2")) {
		attack2 = true;
	}
	else if (kb.released("2")) {
		attack2 = false;
	}
	else if (kb.released("1")) {
		attack1 = false;
	}

	if (attack1) {
		player.changeAni("attack1");
	}
	else if (attack2) {
		player.changeAni("attack2");
	}

	player.ani.play();
}