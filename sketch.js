var player,bgImg;
var gameState = "start";
var bg0,bg1,bg2,balloonImg;
var medi;
var medGrp,enemGrp,starGrp;
var medicineCount = 2;
var arrowGrp;
var xSave;
var vid,btn_start;
var gunCount = 2;
var mes1 = "HOW TO PLAY"
var mes2 = "You can use arrow keys to play..Collect medicinal plants wherever possible..";
var mes3 ="You should have atleast 3 medicinal plants before the game ends..";
var mes4 = "Click on play button to watch the introductory video to know more about the game..\n  Click on Space to use weapons.. I guarantee you this will be an interesting game."
var mes5 = "Remeber to write your feedbacks.."
var mes6 = "Click on start journey button to start the game.."
var visiblity = 255;

function preload(){
  playerImg = loadImage("images/man.png")
  bg0 = loadImage("images/bgg.jpg")
  bg1 = loadImage("images/bg1.jpg")
  bg2 = loadImage("images/bggg.png")
  balloonImg = loadAnimation("images/balloon.png")
 medImg = loadImage("images/medplant1.png")
  enemImg1 = loadAnimation("images/eagle1.png","images/eagle2.png","images/eagle3.png",
  "images/eagle4.png","images/eagle5.png","images/eagle6.png","images/eagle7.png",
  "images/eagle8.png","images/eagle9.png","images/eagle10.png")
  starImg = loadAnimation("images/star.png","images/Black.png")
  arrowImg = loadImage("images/arrow.png")
  bahubaliImg = loadImage("images/bahu.png")
  craft = loadImage("images/craft.png")
  bgCorona = loadImage("images/bg_corona.webp")
  banner1 = loadImage("images/banner1.png")
  playBtn = loadImage("images/play.png")
  startBtn = loadImage("images/start.png")
  playAgainBtn = loadImage("images/playAg.png")
  devasena = loadImage("images/deva.png")
  gun = loadImage("images/gun.png")
  bgm = loadSound("images/bgm11.mp3")
  bulletImg = loadImage("images/bullet.png")
  gunBean = loadImage("images/beanShoot.png")
}

function setup() {
  createCanvas(1200,700);

  man = createSprite(-10,310,50,50);
  man.addImage(playerImg)
  man.scale = 0.17;
  man.visible =false;

  balloon = createSprite(-10,200,50,50);
  balloon.addAnimation("hi",balloonImg)
  balloon.scale=0.58;
  balloon.visible =false;

  mesBox = createSprite(490,210,100,100)
  mesBox.addImage(banner1)
 // mesBox.scale = 1.1;

 // if(gameState=="story"){
  vid = createVideo("images/NEWS.mp4");
  vid.position(275, 100);

  winner = createVideo("images/win.mp4")
  winner.position(50,0)
  winner.hide();

  losePlant = createVideo("images/loseplants.mp4") 
  losePlant.position(50,00)
  losePlant.hide();

  loseEnemy = createVideo("images/lose.mp4")
  loseEnemy.position(50,00)
  loseEnemy.hide();

  btn_play = createSprite(575,635)
  btn_play.addImage(startBtn)
  btn_play.scale = 0.7

  btn_again = createSprite(man.x+550,150)
  btn_again.addImage(playAgainBtn)
  btn_again.visible = false;

  btn_start = createSprite(675,350)
  btn_start.addImage(playBtn)
  btn_start.scale = 0.75

 medGrp = new Group();
 starGrp = new Group();
 enemGrp = new Group();
 arrowGrp = new Group();
 bulletGrp = new Group();
 gunGrp = new Group();
 bahuGrp = new Group();

}
   

function draw() {
  background(bgCorona);

  //LEVELLLSS ANDDD GAMESTATESS
  if(man.x >= 7000&& man.x<14000){
    gameState="level2"
  }

  if(man.x >= 14000 && man.x<21000){
    gameState="level3";
  }

  if(man.x >= 21000&&medicineCount>=3){
    gameState="win";
  }

  if(man.x >= 21000 &&medicineCount<=2){
    gameState="loseMed";
  }
  // LIFETIMEEEEE
  enemGrp.lifetime=1500;
  arrowGrp.lifetime = 1500;
  medGrp.lifetime = 1500;
  starGrp.lifetime = 1500;

  // TOUCHINGGGG
  if(man.isTouching(gunGrp)||balloon.isTouching(gunGrp)){
    gunCount = gunCount+1;
    gunGrp.destroyEach();
  }

  if(bulletGrp.isTouching(bahuGrp)||bulletGrp.isTouching(enemGrp)||
    bulletGrp.isTouching(arrowGrp)){
    bahuGrp.destroyEach();
    arrowGrp.destroyEach();
  }

  if(man.isTouching(enemGrp)||man.isTouching(arrowGrp)||
    balloon.isTouching(enemGrp)||balloon.isTouching(arrowGrp)){
    medicineCount = medicineCount-1
    enemGrp.destroyEach();
    arrowGrp.destroyEach();
      if(medicineCount<1){
        gameState="loseEnem"}
      } else if(man.isTouching(enemGrp)&&medicineCount>0){
              medicineCount= medicineCount-1
            }

  if(balloon.isTouching(medGrp)){
  medGrp.destroyEach();
  starGrp.destroyEach();
  medicineCount++
  }

  // BUTTOONNNSSSS
  if(mousePressedOver(btn_again)){
    if(gameState==="loseMed"||gameState==="loseEnem")
    btn_again.visible = false;
    bgm.loop();
    gameState="level1"
    balloon.x = 0;
    man.x = 0;
    man.y = 310;
    balloon.y = 200
    medicineCount = 1;
    gunCount = 1
    loseEnemy.hide();
    loseEnemy.stop();
    losePlant.stop();
    losePlant.hide();
    winner.hide();
  }

  if(mousePressedOver(btn_start)&&gameState==="start"){
    btn_start.destroy();
    mousePressed(); 
    gameState="story";
  };

   if(mousePressedOver(btn_play)&& gameState==="story"){
      gameState="level1"
      vid.remove();
      btn_play.destroy();
      bgm.loop();
}

  ///// MINI FUNCTIONSSS
 if(gameState==="level1"){
    image(bg0,displayWidth-1900,0,displayWidth*12,displayHeight)
    man.visible = true;
    balloon.visible = true;
    btn_again.visible = false;
  }

  if(gameState==="level2"){
    image(bg1,6000-700,0,displayWidth*12,displayHeight)
    medGrp.destroyEach();
    starGrp.destroyEach();
    enemGrp.destroyEach();
    bahu();
    man.visible = true;
    balloon.visible = true;
  }

  if(gameState==="level3"){
    image(bg2,13000-700,0,displayWidth*12,displayHeight)
    man.visible = true;
    balloon.visible = true;
  }

  if(man.isTouching(bahuGrp)){
    bahuGrp.destroyEach();
  }

    //VIDEOSSSS
   if(gameState==="story"){
      vid.show();
      btn_play.visible=true;
      mesBox.destroy();
    }else{
      vid.hide();
      btn_play.visible = false;
    }

    if(gameState==="level1"||gameState==='level3'){
       spawnEnem();
       spawnMed();
    }
  //CAMERAAAAAA
  camera.position.x = man.x+300;

    if(gameState==="win"){
      btn_again.x = man.x+150;
      man.visible = false;
      balloon.visible = false;
      enemGrp.destroyEach();
      medGrp.destroyEach();
      starGrp.destroyEach();
      arrowGrp.destroyEach();
      bulletGrp.destroyEach();
      gunGrp.destroyEach();
      bgm.stop();
      winner.show();
      winner.play();
      btn_again.visible = true;
    }

    if(gameState==="loseMed"){
      btn_again.x = man.x+550;
      man.visible = false;
      balloon.visible = false;
      enemGrp.destroyEach();
      medGrp.destroyEach();
      starGrp.destroyEach();
      arrowGrp.destroyEach();
      bulletGrp.destroyEach();
      gunGrp.destroyEach();
      bgm.stop();
      losePlant.show();
      losePlant.play();
      btn_again.visible = true;
    }

    if(gameState==="loseEnem"){
      btn_again.x = man.x+150;
      man.visible = false;
      balloon.visible = false;
      enemGrp.destroyEach();
      medGrp.destroyEach();
      starGrp.destroyEach();
      arrowGrp.destroyEach();
      bulletGrp.destroyEach();
      gunGrp.destroyEach();
      loseEnemy.show();
      bgm.stop();
      loseEnemy.play();
      btn_again.visible = true;
    }

    ///// MMMMOOOVVVEEMMMMEENNNNTTTTT
  if(gameState==="level1"||gameState==="level2"||gameState==="level3"){
    if(keyDown("Right_Arrow")){
      man.x = man.x+10
      balloon.x = balloon.x+10;
} else if(keyDown("Up_Arrow")&& man.y-40>0){
          man.y = man.y-10;
          balloon.y = balloon.y-10
} else if(keyDown("Down_Arrow")&&man.y+50<700){
          man.y = man.y+10;
          balloon.y = balloon.y+10
}

    if(keyWentDown('Space')&&gunCount>0){
      gunCount = gunCount-1;
      bullet = createSprite(man.x,man.y)
      bullet.addImage(bulletImg)
      bulletGrp.add(bullet);
      bullet.lifetime = 500
      bullet.velocityX = 20
      bullet.scale = 0.2
        }

  if(gameState==="story"){
      btn_play.visible=true;
    }

  if(gunCount>0){
    man.addImage(gunBean)
    }else{
    man.addImage(playerImg)
    }

}

  drawSprites();

  ////TEXT AND IMAGESSSS
  if(gameState==="level1"||gameState==="level2"||gameState==="level3"){
  image(banner1,man.x+500,30,250,125)
  image(medImg,man.x+515,60,50,50)
  image(gun,man.x+600,66,80,40)
  textSize(40)
  fill("Black")
  text(medicineCount,man.x+570,100)
  text(gunCount,man.x+685,95)
  }

  ///STARTTTT
  if(gameState==="start"){
    textSize(37)
    fill("White")
    text(mes1,400,80)
    textSize(20)
    fill("Black")
    text(mes2,125,150)
    text(mes3,125,175)
    text(mes4,125,200)
  }

  if(gameState==="level1"||gameState==="level2"||gameState==="level3"){
    textSize(15)
    fill("ash")
    text("A GAME BY AFRIN S ANISH",man.x+550,650)
  }

  ////// EEEENNNNNNNDDDDDD OOOOOFFFFFFF DDDRRRAAAAAWWWW
}

function spawnMed(){
  if(gameState==="level1"||gameState==="level3"){
    if(frameCount%200===0){
      medi = createSprite(man.x+700,625,30,30)
      medi.addImage("medical",medImg)
      medi.scale=0.5;
      medi.x = man.x+300
      medi.depth = man.depth;
      medi.depth = medi.depth-1
      medGrp.add(medi)

       var star = createSprite(medi.x-Math.round(random(-5,5)),medi.y+35,30,30);
       star.addAnimation("plink",starImg);
       star.scale = 0.1
       star.lifetime = 1000;
       starGrp.add(star)
        }

        if(frameCount%300===0){
          gun1 = createSprite(man.x+700,625,30,30)
          gun1.addImage("gun",gun)
          gun1.scale=0.1;
          gun1.velocityY = Math.round(random(1,5))*-1;
          gun1.velocityX=Math.round(random(-1,6))
          gun1.x = man.x+300
          gun1.depth = man.depth;
          gun1.depth = gun1.depth-1
          gun1.lifetime = 100;
          gunGrp.add(gun1)
      }
  }
}

function spawnEnem(){
  if(gameState==="level1"){
  if(frameCount%100===0){
   var enem = createSprite(man.x+700,450,30,30)
   enemGrp.add(enem);
   enem.lifetime = 800

  
     var scaleVal = Math.round(random(3,5));
     enem.scale=scaleVal/2;
     enem.y = Math.round(random(200,650))
     enem.velocityX = -5;
  
    if(gameState==="level1"){
      enem.addAnimation("fly",enemImg1)
    }
  }
}
if(gameState==='level3'){
  arrowGrp.destroyEach();
  if(frameCount%100===0){
   var enem = createSprite(man.x+700,450,30,30)
   enemGrp.add(enem);
var enemSca = Math.round(random(1,3))
     enem.scale=enemSca/10;
     enem.lifetime = 800
     enem.y = Math.round(random(200,650))
     enem.velocityX = Math.round(random(5,10))*-1;
      enem.addAnimation("fly",craft)
}
}
}

function bahu(){
  if(frameCount%150===0){
    arrow1=createSprite(man.x+700,500);
    arrow1.y=Math.round(random(100,500));
    arrow1.velocityX=Math.round(random(5,10))*-1;                                     
    arrow1.addImage(arrowImg);
    arrow1.scale=0.15;
    arrow1.lifetime=1000;
    arrowGrp.add(arrow1);
    xSave = arrow1.x-100;
    ySave = arrow1.y;
}

  if(frameCount%500===0){
      arrow=createSprite(man.x+700,500);
      arrow.y=man.y+100;
      arrow.velocityX=Math.round(random(5,10))*-1;                                     
      arrow.addImage(arrowImg);
      arrow.scale=0.15;
      arrow.lifetime=1000;
      arrowGrp.add(arrow);
      xSave1 = arrow.x-100
      ySave1 = arrow.y
}

  if(frameCount%150===0){
    bahub=createSprite(xSave,ySave);
    bahub.velocityY=Math.round(random(1,3))*-1;                                     
    bahub.addImage(bahubaliImg);
    bahub.scale=0.5;
   bahub.lifetime = 1000;
   bahuGrp.add(bahub)
}

if(frameCount%500===0){
  bahu1=createSprite(xSave1,ySave1);
  bahu1.velocityY=Math.round(random(1,3))*-1;                                     
  bahu1.addImage(devasena);
  bahuGrp.add(bahu1)
  bahu1.scale=0.4;
  bahu1.lifetime = 1000;
 // enemGrp.add(bahu1);
}
}

function mousePressed() {
  vid.play();
}