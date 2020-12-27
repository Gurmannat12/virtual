var dog;
var dogImg,happyDogImg;
var foodS,foodStock;
var database;

function preload()
{
  dogImg = loadImage("dog.png");
  happyDogImg = loadImage("happy.png");
}

function setup() {
  database = firebase.database;
  createCanvas(500,500);
  
  dog = createSprite(250,250,40,60);
  dog.scale = 0.3;
  dog.addImage(dogImg);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
}


function draw() { 
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);

  }

  drawSprites();
  //add styles here
  textSize(20);
  text("Note: Press UP_ARROW Key To Feed Drago Milk",30,100);
  fill("white");
  stroke(1);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



