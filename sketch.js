var PLAY=1;
var END=0;
var gameState=PLAY;

//var r;

var score = 0;
score.textsize = 20;

var enemyGroup,alien,alien_moving;
var gameOverImage;
var fruitGroup,fruit1,fruit2Image,fruit3Image,fruit4Image;
var knifeSwooshSound,gameoverSound;


var sword,swordImage;
function preload(){
  swordImage=loadAnimation("sword.png");
  gameOverImage=loadAnimation("gameover.png");
  fruit1Image=loadAnimation("fruit1.png");
  fruit2Image=loadAnimation("fruit2.png");
  fruit3Image=loadAnimation("fruit3.png");
  fruit4Image=loadAnimation("fruit4.png");
  alien_moving=loadAnimation("alien1.png","alien2.png");
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  gameoverSound=loadSound("gameover.mp3")
}
function setup() {
  createCanvas(600, 600);
  
  sword=createSprite(200,200,10,20);
  sword.addAnimation("sword",swordImage);
  sword.addAnimation("gameOver",gameOverImage)
  sword.scale=1;
  
  sword.setCollider("circle",10,-30,45);
  sword.debug = false;
    
  fruitGroup= new Group();
  enemyGroup = new Group();
}

function draw() {
  background("yellow");
  
text("score:" + score,340,30)
  
  if(gameState===PLAY){
    
     
    sword.y=World.mouseY;
  sword.x=World.mouseX;
    
    Fruit();
  Enemy();
 
 if(fruitGroup.isTouching(sword)){
      knifeSwooshSound.play();
    fruitGroup.destroyEach();
      score=score+1;
 }
   
    if(enemyGroup.isTouching(sword)){
      gameoverSound.play();
    gameState=END;
    
  }
  }
  
  if(gameState===END){
    sword.x=300;
    sword.y=300;
    sword.scale=2
    sword.changeAnimation("gameOver",gameOverImage);
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
  }
  
  
  
  
drawSprites();
}
 function Fruit(){
 if(World.frameCount%120===0){
   position=round(random(1,2))
   fruit = createSprite(600,200,20,20);
   fruit.scale=0.5;
   r=Math.round(random(1,4));
   if(r == 1){
     fruit.addAnimation("fruit1",fruit1Image);
   } else if(r == 2) {
      fruit.addAnimation("fruit2",fruit2Image);
   }  else if(r == 3) {
      fruit.addAnimation("fruit3",fruit3Image);
   }  else  {
      fruit.addAnimation("fruit4",fruit4Image);
   }
  fruit.y = Math.round(random(50,340));
   
   if(position==1)
   {
   fruit.x=400;
     fruit.velocityX=-(10+(score/4));
   }
   else
   {
     if(position==2){
       fruit.x=0;
       
       //Increase the velocity of fruit after score 4 or 10
       fruit.velocityX=(10+(score/4));
     }  
   }
  // fruit.velocityX=-7;
   fruit.setLifetime = 100;
   
   fruitGroup.add(fruit)
}
}

function Enemy(){
  if(World.frameCount % 80===0){
    alien=createSprite(600,200,20,20);
    position=round(random(1,2))
    alien.addAnimation("monster",alien_moving);
    alien.scal=0.5;
    alien.y=Math.round(random(500,300));
    alien.velocityX=-(10+(score/3));
    alien.setLifetime=50;
    
    
   if(position==1)
   {
   alien.x=400;
     alien.velocityX=-(10+(score/4));
   }
   else
   {
     if(position==2){
       alien.x=0;
       
       //Increase the velocity of fruit after score 4 or 10
       alien.velocityX=(10+(score/4));
     }  
   }
  // fruit.velocityX=-7;
   alien.setLifetime = 100;
   
    
    enemyGroup.add(alien);
  }
}