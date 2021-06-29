var airplane,airplaneImage;
var clouds,cloudsImage;
var coins,coinsImage;
var birds,birdsImage;
var hotairballoon,hotairballoonImage;
var lives,livesImage;
var restartButton,restartImage;
var gameOver,gameOverImage;
var backgroundImage,bg;
var bullets,bulletsImage,bulletSound;
var gameState="play";
var life=3;
var score=0;

function preload(){

  airplaneImage=loadImage("airplane.png");
  cloudsImage=loadImage("clouds.png");
  birdsImage=loadImage("bird.png");
  coinsImage=loadImage("coin.png");
  backgroundImage=loadImage("background.jpg");
  bulletsImage=loadImage("bullets.png");
  bulletSound=loadSound("bullet sound.mp3")
  gameOverImage=loadImage("GameOver.png")
  hotairballoonImage=loadImage("HotAirBalloon.png")

}

function setup(){
createCanvas(windowWidth,windowHeight);

cloudsGroup = new Group();
birdsGroup = new Group();
coinsGroup = new Group();
bulletsGroup = new Group();
balloonsGroup = new Group();

bg=createSprite(windowWidth/2,windowHeight/2);
bg.addImage(backgroundImage);
bg.scale=3.2;


airplane=createSprite(windowWidth/2-550,windowHeight/2);
airplane.addImage(airplaneImage);
airplane.scale=0.8;




}

function draw(){

background("bg");

if(gameState==="play"){
  airplane.y=World.mouseY;

  spawnBirds();
  spawnCoins();
  spawnBullets();
  spawnBalloons();
 
if(bulletsGroup.isTouching(birdsGroup)){

  score=score+30;
 //bullets.destroyEach();
  birdsGroup.destroyEach();
  bulletsGroup.destroyEach();
  //bullets.setVelocityX=0;


}

if(coinsGroup.isTouching(airplane)){

  score=score+30;
  coinsGroup.destroyEach();


}



if(balloonsGroup.isTouching(airplane)){

  life=life-1;
  balloonsGroup.destroyEach();


}

if(bulletsGroup.isTouching(balloonsGroup)){

  score=score+30;
 //bullets.destroyEach();
  bulletsGroup.destroyEach();
  balloonsGroup.destroyEach();
  //bullets.setVelocityX=0;


}


if(life===0){

   gameState="end"


   }
  //gameOver.visible=true;

}

drawSprites();

text(mouseX+","+mouseY,mouseX,mouseY)

textSize(30);
text("life:"+life,1115,40,);
text("score:"+score,1115,70,);

}

if(gameState==="end"){

  gameOver=createSprite(windowWidth/2,windowHeight/2);
  gameOver.addImage(gameOverImage);
  birdsGroup.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0);
  balloonsGroup.setVelocityXEach(0);
  bulletsGroup.setVelocityXEach(0);

}
//bg.velocityX=-3;
//if(bg.x<0){
//bg.x=bg.Width/2;
//}




//bulletsGroup.debug=true;



function spawnBirds(){

 if(frameCount%100===0){
  birds = createSprite(windowWidth-30,windowHeight/2);
  birds.y=Math.round(random(30,550));
  birds.addImage(birdsImage);
  birds.scale=0.3;
  birds.velocityX=-3;
 birdsGroup.add(birds);
  birds.lifetime=600;

 }
}

function spawnCoins(){

  if(frameCount%150===0){
   coins = createSprite(windowWidth-30,windowHeight/2);
   coins.y=Math.round(random(30,550));
   coins.addImage(coinsImage);
   coins.scale=0.09;
   coins.depth=airplane.depth
   airplane.depth=airplane.depth+1;
   coins.velocityX=-3;
   coinsGroup.add(birds);
   coins.lifetime=600;
  
 
  }
 }


 function spawnBullets(){
 if(frameCount%20===0&&keyDown("space")) 
 {
  bullets=createSprite(280,300,20,20);
  bullets.addImage(bulletsImage);
  bulletSound.play();
  bullets.y = airplane.y;
  bullets.scale=0.1;
  bullets.velocityX=3;
  bulletsGroup.add(bullets);


}

 }

 function spawnBalloons(){

  if(frameCount%220===0) 
 {

  hotairballoon=createSprite(windowWidth-100,windowHeight/2);
  hotairballoon.y=Math.round(random(30,550));
  hotairballoon.addImage(hotairballoonImage);
  hotairballoon.scale=0.03;
  hotairballoon.velocityX=-3;
  balloonsGroup.add(hotairballoon);

  

 }
 }