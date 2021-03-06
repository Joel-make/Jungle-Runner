var man, man_running;
var jungle;
var snake, snake_image,snakeG;
var rock, rock_image,rockG;
var tiger,tiger_image,tigerG;
var invisible_g;
var invisible_h;
var bush,bush_image;
var f_screen,screen_image;
var play,play_image;
var gameover,gameover_image;
var reset,reset_image;
var board, board_image;
var upedge;
var distance=0;
var PLAY = 0;
var END = 1;
var START=2;
var gameState = START;

function preload() 
{
  man_running = loadImage("man running.gif");
  jungle = loadImage("jungle path.jpg");
  log_image = loadImage("log.png");
  snake_image = loadImage("snake-1.gif");
  rock_image=loadImage("rock.gif");
  tiger_image=loadImage("tiger.gif")
  bush_image=loadImage("bush.gif");
  gameover_image=loadImage("game over - jungle runner.gif");
  reset_image=loadImage("reset.gif");
  board_image=loadImage("board.png");
  screen_image=loadImage("front screen.jpg");
  play_image=loadImage("play button.jpg")
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  background = createSprite(width/2,height/2);
  background.addImage(jungle);
  background.scale = 0.8;
  background.velocityX = -3;

  f_screen = createSprite(width/2,height/2-70);
  f_screen.addImage(screen_image);
  f_screen.scale = 1.2;

  play = createSprite(width/2,height-100);
  play.addImage(play_image);
  play.scale = 1.5;

  man = createSprite(width-width+70, height-130);
  man.addImage(man_running);
  man.scale = 0.5;
  man.debug=false;
  man.setCollider("rectangle",0,0,200,300);
  
  bush = createSprite(width+800, height-130);
  bush.addImage(bush_image);
  bush.scale = 0.3;
  bush.debug=false;
  bush.setCollider("circle",0,0,170);
  
  board = createSprite(width-100, height-height+80);
  board.addImage(board_image);
  board.scale = 0.6;

  invisible_g = createSprite(width/2, height-10, width, 60);
  invisible_g.visible = false;
 
gameover=createSprite(width/2, height/2,700, 60);
gameover.addImage(gameover_image);
gameover.visible = false;
  
  reset=createSprite(width/2, height/2+100,700, 60);
reset.addImage(reset_image);
reset.visible = false;
  reset.scale=0.2;
  
  redge = createSprite(width-19,height/2, 30,height);
  redge.visible = false;
  
  invisible_h = createSprite(width-width+10, height-50, 20, height);
  invisible_h.visible = false;
  
 snakeG=new Group();
 rockG=new Group();
 tigerG=new Group(); 
}
function snakes()
{
  snake = createSprite(width-50, height-70, 10, 10);
    snake.addImage(snake_image);
  snake.velocityX=-5;
  snake.scale=0.63;
  snake.debug=false;
  snake.setCollider("circle",0,0,100);
  snake.lifetime=300;
  snakeG.add(snake);
}
function rocks()
{
  rock = createSprite(width-50, height-70, 10, 10);
  rock.addImage(rock_image);
  rock.velocityX=-5;
  rock.scale=0.63;
  rock.debug=false;
  rock.setCollider("circle",0,0,50);
  
  rock.lifetime=300;
  rockG.add(rock);
}
function tigers()
{
  tiger = createSprite(width-50, height-70, 10, 10);
  tiger.addImage(tiger_image);
  tiger.velocityX=-5;
  tiger.scale=0.78;
  tiger.debug=false;
  tiger.setCollider("rectangle",-50,0,200,100);
  tiger.lifetime=300;
  tigerG.add(tiger);
}
function draw() 
{
  //background("white");
if(windowWidth>700&&windowHeight>400)
{
  background.scale=2;
}
 else
 {
   background.scale=0.8;
 }
if(gameState===START)
{
  man.x=width+200;
  board.x=width+200;
  background.velocityX=0;
}
if(mousePressedOver(play))
{
  gameState=PLAY;
  man.x=width-width+70;
  board.x=width-100;
  f_screen.x=width+width;
  play.x=f_screen.x;
}
  if (gameState === PLAY)
  {
    if (background.x < width/2-60) 
  {
    background.x = width/2;

  }
    man.collide(invisible_g);
    man.collide(invisible_h);
    man.collide(redge);
    if (keyWentDown("space"))
    {
      man.velocityY = -12; 
      man.velocityX= 5 ;
    }
    if (man.y <height/2)
    {
      man.velocityY = man.velocityY + 5
    }
    if(man.x>width-width+105 && man.y<height && man.y>height-130) 
      {
        man.velocityX=-5;
      }
    if(keyWentDown("up"))
      {
        bush.x=man.x;
        man.scale=0.000001;
        background.velocityX=0;
        man.velocityX=0;
      }
        if(keyWentDown("down"))
      {
        bush.x=width+800;
        man.scale=0.5;
        background.velocityX=-3;
        man.velocityX=-3;
      }
    if(man.isTouching(snakeG))
      {
        gameState=END;
      
      }
    if(man.isTouching(rockG))
      {
        gameState=END;
        
      }
    if(man.isTouching(tigerG)&&bush.x===width+800)
      {
        gameState=END;
        
      }
    var select_danger=Math.round(random(1,3));
    if(frameCount%100===0)
      {
        if(select_danger===1)
          {
            snakes();
          }
        if(select_danger===2)
          {
            rocks();
          }
        if(select_danger===3)
          {
            tigers();
          }
         
      }
   
 console.log(man.x,bush.x,frameRate())
  }
  if(gameState===END)
    {
      snakeG.destroyEach();
        rockG.destroyEach();
        tigerG.destroyEach();
      gameover.visible=true;
      reset.visible=true;
      man.x=width+800;
      bush.x=width+800;
      background.velocityX=0;
    }
  if(mousePressedOver(reset))
    {
      gameState=PLAY;
      gameover.visible=false;
      reset.visible=false;
      man.x=70;
      background.velocityX=-3;
      bush.x=width+800;
    }
 
  drawSprites();
   text("Distance"+distance,50,650);
}