
var monkey , monkey_running
var banana ,bananaImage, obstacle, blockImage
var FoodGroup, blockGroup

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  blockImage = loadImage("obstacle.png");
  stop = loadImage("sprite_4.png")
 
}



function setup() {
  monkey = createSprite(50,350,20,50);
    monkey.addAnimation("running", monkey_running);
    monkey.scale=0.1
  
   banana = createSprite(600,350,20,50);
    banana.addImage(bananaImage);
    banana.scale=0.1
  
  obstracle = createSprite(600,350,20,50);
    obstracle.addImage(blockImage);
    obstracle.scale=0.2
  
  


  
   //creating invisible ground 
    invisibleGround = createSprite(200,386,400,10);
    invisibleGround.visible = true;
  
  
  score=0
FoodGroup=new Group();
blockGroup=new Group();
  
monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
monkey.debug = false

}


function draw() {
 background("lightBlue");
  if(gameState===PLAY){
   //jump when the space key is pressed
      if(keyDown("space")&& monkey.y >= 100) {
          monkey.velocityY = -12;
        
      }
    score = score + Math.round(getFrameRate()/60);
    
     
  if (FoodGroup.isTouching(monkey)) {
 FoodGroup.destroyEach();
}
    
  bananas();
  blocks();

      //add gravity
      monkey.velocityY = monkey.velocityY + 0.8

   
  
  monkey.collide(invisibleGround)
    
    if(monkey.isTouching(blockGroup)){
      gameState=END;
       
     
    }
  }
   else if(gameState===END){
      
     
       monkey.velocityX=0;
     monkey.velocityY=0;
     
      blockGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
     
     
   
      blockGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
   }
 drawSprites();
  text("survival time: "+score,100,10)
}

function bananas() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    var fruit = createSprite(500,100,40,10);
    fruit.y = Math.round(random(100,200));
    fruit.addImage(bananaImage);
    fruit.scale = 0.1;
    fruit.velocityX = -3;
    
     //assign lifetime to the variable
    fruit.lifetime = 200;
    
    //adjust the depth
    fruit.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
   FoodGroup.add(fruit)
  }
}

function blocks() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,350,40,10);
    obstacle.x = Math.round(random(600,350));
    obstacle.addImage(blockImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.width = monkey.width;
    monkey.width = monkey.width + 1;
    
    //add each cloud to the group
    blockGroup.add(obstacle);
  }
}


