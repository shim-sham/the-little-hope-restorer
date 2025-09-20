/* VARIABLES */
let player, playButton, directionsButton, backButton
let screen = 0;
let leaf; //task list
let leafCollected = false
let okButton
let taskListShow = false
let tasks = "clean up litter";
let shortTasks = "clean up litter"
let cap, wrapper;
let capCollected = false
let wrapperCollected = false
let berry,fly 
let flyHelped = false
let berryCollected = false;
let packet
let market = false
let packetPushed = false;
let playerPos , wrapperPos, packetPos,capPos,berryPos,flyPos,bug1Pos,bug2Pos, cricketPos, gumPos, flowerPos,taskPopupPos, dialogueBoxPos
let bug1,bug2
let houseBgBefore,houseBgAfter,marketBg,font,flyImg,bug1Img,bug2Img, capImg, cricketImg, gumImg, wrapperImg, leafImg, packetImg, berryImg, market2Bg, flowerImg, introBg
let cricket
let bug1Collected = false
let bug2Collected = false
let cricketHelped = false
let cricketHelped1 = false
let flowerCollected = false
let musicPlaying = false;
let fadeNumber = 0;
let fading = false;
let pop
let taskPopup
let dialogueBox
let dialogue
let caterpillarsRight=[];
let caterpillarsLeft=[];
let frame=0
let anim=1
let moves=0;
function preload(){
  houseBgBefore = loadImage('assets/houses0.png');
  houseBgAfter = loadImage('assets/houses1.png')
  marketBg = loadImage('assets/market.png')
  market2Bg = loadImage('assets/market2.png')
  font = loadFont('assets/Press_Start_2P/PressStart2P-Regular.ttf');
  flyImg = loadImage('assets/fly.png')
  bug1Img = loadImage('assets/bug1.png')
  bug2Img = loadImage('assets/bug2.png')
  capImg = loadImage('assets/cap.png')
  cricketImg = loadImage('assets/cricket.png')
  gumImg = loadImage('assets/gum.png')
  wrapperImg = loadImage('assets/wrapper.png')
  leafImg = loadImage('assets/leaf.png')
  packetImg = loadImage('assets/packet.png')
  berryImg = loadImage('assets/berry.png')
  flowerImg = loadImage('assets/flower.png')
  music = loadSound('assets/music.mp3');
  musicBefore = loadSound('assets/musicBefore.mp3')
  pop = loadSound("assets/pop.mp3")
  for (let i=1; i<=5; i++){
    let img = loadImage(`assets/caterpillar${i}.png`)
    caterpillarsRight.push(img);
    img = loadImage(`assets/left-caterpillar${i}.png`)
    caterpillarsLeft.push(img);
  }
  introBg = loadImage('assets/introBg.jpg')
  
}
/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);
  textFont(font);
  homeScreen()
  musicBefore.setVolume(0.5);
  musicBefore.loop()
}

/* DRAW LOOP REPEATS */
function draw() {
  //console.log(mouse.pos) //for placing things where i want them 
  /*if (kb.presses("g")){
    console.log(player.x)
  }*/
  if (screen ==0){
    if (directionsButton.mouse.presses()){
      screen =1
      directionsScreen()
    }else if(playButton.mouse.presses()){
      screen=2
      playScreenAssets();
    }
  }//directions page
  if (screen ==1){
    if (backButton.mouse.presses()){
      screen=0
      backButton.pos = { x:-300, y:-300 };
      homeScreen()
    }
  }//play
  if (screen==2){
    if (taskListShow) {
      taskList();
    }else{
      game()
    }
  }  
  if (screen == 3){
    endScreen();
  }
}
function game(){
  if (!flyHelped){
    background(houseBgBefore);
  } else if (!market){
    background(houseBgAfter)
  } else{
    if (!cricketHelped1){
      background(marketBg);
    }else {
      background(market2Bg)
    }
  }
  taskPopup.text = "To-do:\n"+shortTasks

  //Move the player
  if (kb. pressing("left")) {
    player.vel.x = -3;
    player.img = caterpillarsLeft[frame];
    moves+=1;
    if (moves%3==0){
      frame+=anim;
      if (frame>=4||frame<=0){
        anim*=-1;
      }
    }
    

  } else if (kb.pressing("right")) {
    player.vel.x = 3;
    player.img = caterpillarsRight[frame];
    moves+=1;
    if (moves%3==0){
      frame+=anim;
      if (frame>=4||frame<=0){
        anim*=-1;
      }
    }
    
  } else {
    player.vel.x = 0;
    player.vel.y = 0;
  }
  if (player.y!=375){
    player.y = 375
  }
  //leaf collecting
  if (Math.abs(player.x - leaf.x) <=50 && kb.pressing("space") && !leafCollected){
    console.log("collected")
    leafCollected = true;
    leaf.pos = { x:50, y:50 };
    taskPopup.pos = {x:250, y:50}
    pop.play()
  }
  //opening task list!
  if (leaf.mouse.presses()&& leafCollected){
    playerPos = {x:player.x,y:player.y}
    wrapperPos = {x:wrapper.x,y:wrapper.y}
    packetPos = {x:packet.x,y:packet.y}
    capPos = {x:cap.x,y:cap.y}
    if (berry){berryPos = {x:berry.x,y:berry.y}}
    flyPos = {x:fly.x,y:fly.y}
    bug1Pos = {x:bug1.x,y:bug1.y}
    bug2Pos = {x:bug2.x,y:bug2.y}
    cricketPos = {x:cricket.x,y:cricket.y}
    gumPos = {x:gum.x,y:gum.y}
    flowerPos = {x:flower.x,y:flower.y}
    taskPopupPos = {x:taskPopup.x,y:taskPopup.y}
    dialogueBoxPos = {x:dialogueBox.x,y:dialogueBox.y}
    taskListShow = true;
  }

  if (!market){
    cricket.pos = {x:-300,y:350}
    gum.pos = {x:-300,y:400}
    //collect cap
    if (player.collides(cap)){
      cap.pos = {x:0,y:550}
      capCollected = true
      pop.play()
    }
    //collect wrapper
    if (player.collides(wrapper)){
        wrapper.pos = {x:500,y:0}
        wrapperCollected = true
        pop.play()

    }//berry appears
    if (wrapperCollected && !berry){
      berryImg.resize(30,30)
      berry = new Sprite (berryImg,300,375)
      berry.collider = "static";
      berry.rotationLock = true;
    }
    if (!capCollected && !berryCollected){
      tasks = "pick up the remaining litter\ncollect the berry"
      shortTasks = "pick up the \nremaining litter\ncollect the berry"
    }else if (!flyHelped && berry && capCollected){
      fly.pos={x:50,y:350}
      dialogueBox.pos = {x:125, y:250}
      dialogueBox.text = "Fly:\nI’m thinking of\nhanging berries\naround. Might\nbrighten things\nup!"
      tasks = "pick up the berry and bring it to the fly!"
      shortTasks = "pick up the berry\nand bring it\nto the fly!"
    }
//berry collected
    if (berry && player.collides(berry) && !berryCollected) {
      berry.pos = { x: 100, y: 50 };
      berryCollected = true;
      pop.play()
    }
    if (berryCollected && Math.abs(player.x - fly.x) <=70 && kb.pressing("space") && !flyHelped){
      flyHelped=true
      berry.pos = { x:0, y:-300 }
      console.log('flyhelped')
      dialogue = "Fly:\nThis packet’s blocking\nthe way. Get some\nfriends, we’ll push it\ntogether"
      dialogueBox.width = 270
      dialogueBox.height = 75
      dialogueBox.text = dialogue
      dialogueBox.pos = {x:150, y:200}
      tasks = "knock on the doors and \nget everyone to push the crisp packet away"
      shortTasks = "knock on the doors\nand get everyone\nto push the\ncrisp packet away"
      fly.pos = {x:325,y:200}
    }
    if(flyHelped){
      if (player.x <=78 && player.x >=25 &&kb.pressing("space")&&!bug1Collected){
        bug1.pos = {x:320,y:250}
        bug1Collected=true
    } else if (player.x >=129 && player.x<=185&&kb.pressing("space")&&!bug2Collected){
        bug2.pos = {x:330,y:300}
        bug2Collected=true
      }
      //packet moved
      if (bug1Collected && bug2Collected && player.x>=298){
        tasks = "explore..."
        shortTasks = "explore..."
        packet.pos = { x:-100, y:0 }
        dialogueBox.pos = {x:-350, y:50}
      }else if (bug1Collected && bug2Collected){
        tasks = "move to the packet to push it away!"
        shortTasks = "move to the packet\nto push it away!"
      }
    }
    if (player.x>=400){
      player.x = 0
      market = true
      fly.pos = { x:0, y:-200 };
      bug1.pos = {x:100,y:500}
      bug2.pos = {x:100,y:-500}
    }else if (player.x<=20){
      player.x=20
    }
  }else{
    //MARKET AREA!!!
    if (player.x<=0){//if goes back
      player.x = 400
      market = false
      fly.pos = {x:100,y:350}
      bug1.pos = {x:175,y:350}
      bug2.pos = {x:250,y:350}
    }else if (player.x>=380){
      player.x=380
    }
    if (!cricketHelped){
      tasks = "get cricket a flower to cheer him up!"
      shortTasks = "get cricket a\nflower to cheer\nhim up!"
      dialogue = "Cricket:\nThanks :)\nthat was scary.\na flower might\nhelp me chirp\nagain"
      dialogueBox.text = dialogue
      dialogueBox.pos = {x:150, y:200}
      dialogueBox.width = 230
      dialogueBox.height = 100
      cricket.pos = {x:50,y:375}
      if (!cricketHelped1){
        cricket.pos = {x:270,y:375}
        gum.pos = {x:270,y:390}
        dialogueBox.pos = {x:230, y:250}
        dialogueBox.width = 230
        dialogueBox.height = 60
        dialogueBox.text = "Cricket:\nHelp!\nCan you get me out?"
        tasks = "help cricket get out of the chewing gum,and get him a flower \nto cheer him up.\nmaybe he'll start chirping again :)"
        shortTasks = "help cricket get\nout of the\nchewing gum."
        if (player.collides(cricket) && kb.pressing("space")){
          gum.pos = {x:-200,y:-100}
          cricketHelped1 = true
        }
      }else{//flower collect
        if (player.x>=270 && player.x<=318&& kb.pressing("space") &&!flowerCollected){
          flower.pos = {x:100,y:50}
          flowerCollected = true
          pop.play()
        }
      }
      if (flowerCollected && player.collides(cricket) && kb.pressing("space")){
        cricketHelped = true
        flower.pos = {x:300,y:500}
      }
    }
  }
  
  if (cricketHelped && !musicPlaying) {
    musicBefore.stop()
    music.setVolume(0.5);
    music.loop();
    musicPlaying = true;
  }
  if (cricketHelped && !fading) {
    fading = true;
    fadeNumber = 0;
  }
  if (fading){
    if (fadeNumber<255){
      fadeNumber+=3
    }
    endScreen()
  }
}
function taskList(){
  background(89, 201, 109); 
  textAlign(CENTER);
  text("To-do:", 20, 50, 360, 300);
  text (tasks,20,100,360,300)
  player.pos = { x:-300, y:-300 }
  leaf.pos = {x:450, y:450}
  wrapper.pos = {x:500,y:0}
  cap.pos = {x:0,y:550}
  packet.pos = { x:-100, y:0 }
  if (berry){
    berry.pos = { x:0, y:-300 }
  }
  fly.pos = { x:-0, y:-200 };
  bug1.pos = {x:100,y:500}
  bug2.pos = {x:100,y:-500}
  okButton.pos={x:200, y:300}
  cricket.pos = {x:200,y:500}
  gum.pos = {x:-200,y:-100}
  flower.pos = {x:300,y:500}
  taskPopup.pos = {x:-500,y:500}
  dialogueBox.pos = {x:-250,y:50}
  okButton.w = 100;
  okButton.h = 50;
  okButton.color = color(177, 224, 148);
  okButton.collider = "kinematic"
  okButton.text = "ok";
  if (okButton.mouse.presses()){
    taskListShow = false;
    okButton.pos = {x:500,y:500}
    leaf.pos = { x:50, y:50 };
    player.pos= playerPos
    wrapper.pos= wrapperPos 
    packet.pos = packetPos 
    cap.pos= capPos 
    if (berry){berry.pos = berryPos}
    fly.pos = flyPos  
    bug1.pos = bug1Pos
    bug2.pos = bug2Pos
    cricket.pos = cricketPos
    gum.pos = gumPos
    flower.pos = flowerPos
    taskPopup.pos = taskPopupPos
    dialogueBox.pos = dialogueBoxPos
  }
}
function playScreenAssets(){
  frame=0
  playButton.pos = { x:-100, y:-100 };
  directionsButton.pos = { x:-200, y:-200 };
  caterpillarsRight[0].resize(72, 20);
  caterpillarsLeft[0].resize(72, 20);
  caterpillarsRight[1].resize(68,21);
  caterpillarsLeft[1].resize(68,21);
  caterpillarsRight[2].resize(66,25);
  caterpillarsLeft[2].resize(66,25);
  caterpillarsRight[3].resize(65,30);
  caterpillarsLeft[3].resize(65,30);
  caterpillarsRight[4].resize(55,30);
  caterpillarsLeft[4].resize(55,30);
  player = new Sprite(200, 375,50,20);
  player.img = caterpillarsRight[frame];
  leafImg.resize(40,40)
  leaf = new Sprite (leafImg,100, 375)
  player.color = color(52, 235, 76)
  leaf.color = color (89, 201, 109)
  leaf.collider = "static"
  leaf.text = "to\ndo"
  player.rotationLock = true;
  leaf.rotationLock = true;
  okButton = new Sprite();
  okButton.pos = {x:500,y:500}
  capImg.resize(45,35)
  cap = new Sprite(capImg,20,375)
  cap.pos = {x:20,y:375}  
  cap.rotationLock = true;
  cap.collider = "static"
  wrapperImg.resize(75,75)
  wrapper = new Sprite (wrapperImg, 300,375)
  wrapper.pos = {x:300,y:375}
  wrapper.rotationLock = true;
  wrapper.collider = "static"
  flyImg.resize(74,52)
  fly = new Sprite(flyImg,50, 300);
  fly.pos = { x:-0, y:-200 };
  fly.collider = "static";
  fly.rotationLock = true;
  packetImg.resize(100,350)
  packet = new Sprite (packetImg, 375,200)
  packet.pos = { x:375, y:200 }
  packet.collider="static"
  packet.rotationLock=true;
  bug1Img.resize(75,75)
  bug1 = new Sprite (bug1Img,0,500)
  bug1.collider = "static"
  bug1.rotationLock = true;
  bug2Img.resize(75,75)
  bug2 = new Sprite (bug2Img,0,500)
  bug2.collider = "static"
  bug2.rotationLock = true;
  cricketImg.resize(100,75)
  cricket = new Sprite (cricketImg, 200,500)
  cricket.collider = "static"
  cricket.rotationLock = true;
  gumImg.resize(30,25)
  gum = new Sprite (gumImg, 200,-100)
  gum.collider = "static"
  gum.rotationLock = true;
  flowerImg.resize(30,30)
  flower = new Sprite (flowerImg, 200,500)
  flower.pos = {x:300,y:500}
  flower.collider = "static"
  flower.rotationLock = true;
  taskPopup = new Sprite ()
  taskPopup.pos = {x:-250, y:50}
  taskPopup.width = 230
  taskPopup.height = 75
  taskPopup.color = color(177, 224, 148)
  taskPopup.collider = "static"
  taskPopup.rotationLock = true;
  taskPopup.text = "To-do:\n"+shortTasks
  dialogueBox = new Sprite ()
  dialogueBox.pos = {x:-350, y:50}
  dialogueBox.width = 210
  dialogueBox.height = 100
  dialogueBox.color = color(181, 209, 255)
  dialogueBox.collider = "static"
  dialogueBox.rotationLock = true;
  dialogueBox.text = ""
}

function directionsScreen(){
  background(introBg);
  playButton.pos = { x:-100, y:-100 };
  directionsButton.pos = { x:-200, y:-200 };
  textAlign(CENTER);
  let instructions = 
  "You are a small caterpillar in a quiet, grey town inside a log.\n" +
  "Complete tasks to bring hope back to your world.\n\n" +
  "Controls:\n" +
  "- Move left/right by pressing arrow keys\n" +
  "- Interact or pick up items when near them by pressing the spacebar";
  text(instructions, 20, 40, 360, 300);
  backButton = new Sprite(width/2, 300);
  backButton.w = 100;
  backButton.h = 50;
  backButton.color = color(157, 116, 181);
  backButton.collider = "kinematic"
  backButton.text = "back";
}
function homeScreen(){
  background(introBg);
  textAlign(CENTER)
  fill(255, 255, 255)
  textSize(15)  
  text("the little hope restorer", 200,100)
  textSize(12)
  playButton = new Sprite(width/4,height/2);
  playButton.w = 100;
  playButton.h = 50;
  playButton.color = color(146, 150, 212);
  playButton.collider = "kinematic"
  playButton.text = "play";

  directionsButton = new Sprite(3*width/4,height/2);
  directionsButton.w = 150;
  directionsButton.h = 50;
  directionsButton.color = color(151, 230, 180);
  directionsButton.collider = "kinematic";
  directionsButton.text = "directions";
}

function endScreen(){
  background(introBg,fadeNumber);//replace with introBg?252, 248, 157
  fill(0, fadeNumber);
  textAlign(CENTER)
  fill(255,255,255)
  text("Well done :) You brought hope back to this lovely village\nCan you hear the cricket chirping?", 20, 100, 360, 300);
  player.pos = { x:-300, y:-300 }
  leaf.pos = {x:450, y:450}
  wrapper.pos = {x:500,y:0}
  cap.pos = {x:0,y:550}
  packet.pos = { x:-100, y:0 }
  berry.pos = { x:0, y:-300 }
  fly.pos = { x:0, y:-200 };
  bug1.pos = {x:100,y:500}
  bug2.pos = {x:100,y:-500}
  cricket.pos = {x:200,y:500}
  gum.pos = {x:-200,y:-100}
  flower.pos = {x:300,y:500}
  taskPopup.pos = {x:-250,y:50}
  dialogueBox.pos = {x:-350,y:50}
}