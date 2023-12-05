let player
let floorGroup 
let ground 

function setup() {
    createCanvas(400, 400);
    world.gravity.y = 10;
	floorGroup = new Group();
	floorGroup.collider = "k";
	ground = new floorGroup.Sprite(width / 2, width - 10, width, 10);

	grass = new floorGroup.Group();
	grass.w = 100
	grass.h = 30
	grass.img = "img/Grass1.png";
	grass.amount = 1
	grass.debug = true

	stonepath = new floorGroup.Group();
	stonepath.w = 150
	stonepath.h = 30
	stonepath.y = 350
	stonepath.x = width/2
	stonepath.img = "img/Dirt_Stone_Path.png";
	stonepath.amount = 1
	stonepath.debug = true

	player = new Sprite(width / 2, height / 2, 25, 45);
	player.addAni("idle", "img/Idle.png", { frameSize: [200, 200], frames: 8 });
	player.addAni("run", "img/Run.png", { frameSize: [200, 200], frames: 8 });
	player.addAni("jump", "img/Jump.png", { frameSize: [200, 200], frames: 2 });
	player.addAni("fall", "img/Fall.png", { frameSize: [200, 200], frames: 2 });
	player.changeAni('idle');
	player.debug = true;
	player.rotationLock = true;
	player.bounciness = 0;
	background(0);
}

function draw() {
    clear();
	background(0);

	if (kb.released(" ") && player.vel.y === 0) {
		player.bearing = -90;
		player.applyForce(400);
	}

	if (kb.pressing('right')) {
		player.changeAni('run');
		player.vel.x = 2;
		player.mirror.x = false;
	}
	else if (kb.pressing('left')) {
		player.changeAni('run');
		player.vel.x = -2;
		player.mirror.x = true;
	}
	else {
		player.debug = true;
		player.changeAni('idle');
		player.vel.x = 0;
	}

	if (player.vel.y < 0 && !player.collides(floorGroup)) {
		player.changeAni('jump');
	}
	else if (player.vel.y > 0 && !player.collides(floorGroup)) {
		player.changeAni('fall');
	}

	player.ani.play();
}