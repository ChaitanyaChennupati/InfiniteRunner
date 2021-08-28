var path,boy,coin,drink,bomb;
var pathImg,boyImg,coinImg,drinkImg,bombImg;
var Score = 0;
var coinG,drinkG,bombGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Jake1.png","Jake2.png", "jake3.png","jake4.PNG","jake5.png");
  coinImg = loadImage("coin.png");
  drinkImg = loadImage("energyDrink.png");
  bombImg = loadImage("bomb.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
createCanvas(windowWidth, windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 8;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.8;
  
  
coinG=new Group();
drinkG=new Group();
bombGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCoin();
    createDrink();
    createBomb();

    if (coinG.isTouching(boy)) {
      coinG.destroyEach();
      Score=Score+100;
    }
    else if (drinkG.isTouching(boy)) {
      drinkG.destroyEach();
      Score=Score+50;
      
    }else{
      if(bombGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=200;
        boy.y=300;
        boy.scale=0.6;
        
        coinG.destroyEach();
        drinkG.destroyEach();
        bombGroup.destroyEach();
        
        coinG.setVelocityYEach(0);
        drinkG.setVelocityYEach(0);
        bombGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Score: "+ Score,150,30);
  }

}

function createCoin() {
  if (World.frameCount % 200 == 0) {
  var coin = createSprite(Math.round(random(50, 350),40, 10, 10));
  coin.addImage(coinImg);
  coin.scale=0.5;
  coin.velocityY = 6;
  coin.lifetime = 170;
  coinG.add(coin);
  }
}

function createDrink() {
  if (World.frameCount % 320 == 0) {
  var drink = createSprite(Math.round(random(50, 350),40, 10, 10));
  drink.addImage(drinkImg);
  drink.scale=0.15;
  drink.velocityY = 6;
  drink.lifetime = 170;
  drinkG.add(drink);
  }
}

function createBomb(){
  if (World.frameCount % 530 == 0) {
  var bomb = createSprite(Math.round(random(50, 350),40, 10, 10));
  bomb.addImage(bombImg);
  bomb.scale=0.1;
  bomb.velocityY = 6;
  bomb.lifetime = 170;
  bombGroup.add(bomb);
  }
}