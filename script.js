/* VARIABLES */
let player, walls;

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);
  background(255);

  //Create player sprite
  player = new Sprite(350, 50, 40, 40);

  //Create the maze
  walls = new Group();
  
  new walls.Sprite(160, 10, 300, 5,);
  new walls.Sprite(10, height/2, 5, height - 15);  
  new walls.Sprite(150, 60, 5, 100);
  new walls.Sprite(width/2 + 35, 390, 325, 5);
  new walls.Sprite(50, 300, 75, 5); 
  new walls.Sprite(340, 146, 110, 5);
  new walls.Sprite(340, 250, 110, 5);
  new walls.Sprite(285, 198, 5, 109);
  new walls.Sprite(185, 332, 5, 109);
  new walls.Sprite(190, 197, 185, 5);
  new walls.Sprite(395, 200, 5, 380);
}

/* DRAW LOOP REPEATS */
function draw() {
  background(255);

  //Move the player
  player.moveTowards(mouse);

  // Draw start and end text
  fill(0);
  textSize(20);
  text('Start', 330, 20);
  text('End', 22, 395);

  //Player cannot go above maze
  if (player.y < 20) {
    player.y = 20;
  }
  
  // Player wins
  //if () {
  //  fill(0);
  //  textSize(20);
  //  text('You Win!', 160, 170);
  //  player.vel.x = 0;
  //  player.vel.y = 0;
  //}
}




