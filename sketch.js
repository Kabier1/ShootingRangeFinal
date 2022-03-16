
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;


var engine, world;
var canvas;
var balloon, balloon2, balloon3
var gun;
var backgroundImg;
var playerBullet;
var playerBullet = [];
var score = 0;
numberOfBullets = 15; 


function preload() {
  balloon = loadImage("./assets/Balloon3.png")

  backgroundImg = loadImage("./assets/bg.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  
    gun = new Gun(
    200,
    300,
    120,
    90
  );

  balloon = new Balloon(
    width - 700, 400, 75, 100
  )
  balloon2 = new Balloon(
    width - 45, 50, 75, 100
  )
  balloon3 = new Balloon(
    width - 450, 125, 75, 100
  )
}

function draw() {
  background(backgroundImg );
  Engine.update(engine);
  
  gun.display();

  balloon.display()
  balloon2.display()
  balloon3.display()
  
  for (var i = 0; i < playerBullet.length; i++) {
    if (playerBullet[i] !== undefined) {
      playerBullet[i].display();

      //with distance formula
      // d1 = dist(playerBullet[i].body.position.x,playerBullet[i].body.position.y, board1.body.position.x,board1.body.position.y)
      //if(d1<=100)
    // {
     //   console.log("collision");
     // }

     var balloonCollision = Matter.SAT.collides(
      balloon.body,
      playerBullet[i].body
    );

    var balloon2Collision = Matter.SAT.collides(
      balloon2.body,
      playerBullet[i].body
    );

    var balloon3Collision = Matter.SAT.collides(
      balloon3.body,
      playerBullet[i].body
    );



    if (balloonCollision.collided) {
      console.log("yes");
      score += 1
    }

    if (balloon2Collision.collided) {
      console.log("yes");
      score += 10
    }

    if (balloon3Collision.collided) {
      console.log("yes");
      score += 5
    }
    }
  }

  if (numberOfBullets == 0) {
    gameOver();
  }

  // Title
  fill("#000000");
  textAlign("center");
  textSize(40);
  text("SHOOTING RANGE", width / 2, 100);

  // BulletCount
  fill("#000000");
  textAlign("center");
  textSize(30);
  text("Bullets left in Gun : " + numberOfBullets, 200, 80);

  // Score
  fill("#000000");
  textAlign("center");
  textSize(30);
  text("Score: "+ score, 110, 120);

  if (numberOfBullets == 0) {
    console.log("magzine is empty")
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfBullets > 0) {
      var posX = gun.body.position.x;
      var posY = gun.body.position.y;
      var angle = gun.body.angle;
  
     var bullet = new PlayerBullet(posX, posY - 25, 50, 50, angle);
  
      bullet.trajectory = [];
      Matter.Body.setAngle(bullet.body, angle);
      playerBullet.push(bullet);
      numberOfBullets -= 1
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerBullet.length) {
      var angle = gun.body.angle;
      playerBullet[playerBullet.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  swal({
    title: "Game Over!!",
    text: "Score: "+ score,
    confirmButtonText: "Play Again"

  },
  function(isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  }
  
);
}