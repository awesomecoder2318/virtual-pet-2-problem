var dog, happydog, foodA, foodStock
var dogimg, happydogimg, database
var feed,addFood,fedTime,lastFed, foodObj
function preload()
{
  dogimg = loadImage("images/dogImg.png")
  happydogimg = loadImage("images/dogImg1.png")

}

function setup() {
  database = firebase.database();
	createCanvas(800, 500);

feed = createButton("Feed the dog");
feed.position(700,95)
feed.mousePressed(feedDog)

foodObj=createButton("Add Food")
foodObj.position(800,95)
foodObj.mousePressed(addFoods)

  dog = createSprite(250,250,10,10)
  dog.addImage(dogimg)
  dog.scale = 0.5

  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
  textSize(20)
}


function draw() { 
  background(46,139,87)
  foodObj.display
  feed.display


  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodA,170,200);
  textSize(13);
  text("Note: Press UP_ARROW To Feed Doggo Treats!",130,10,300,20);
  
  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
text("last Feed : "+ lastFed%12 + "PM",350,30)
  }else if(lastFed==0){
text("last Feed : 12AM",350,30)
  }else{
    text("last Feed : " +lastFed + "AM",350,30)
  }
}


function readStock(data){
foodA = data.val()
}
function writeStock(x){

if(x<=0){
x=0
}
else{
x = x-1
}

database.ref('/').update({
  Food:x
})

}

function feedDog(){
dog.addImage(happydogimg)
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  Feedtime:hour()
})
}
function addFoods(){
foodA++;
database.ref('/').update({
Food:foodA
})

}
