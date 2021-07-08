const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var score = 0;
var flySound;
var birds = []
var gameState = "onSling";

function preload() {
    
    getTime();
    flySound = loadSound("sounds_bird_flying.mp3");
}

function setup(){
    var canvas = createCanvas(displayWidth,displayHeight);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(displayWidth/2,displayHeight,displayWidth,20);
    platform = new Ground(150, displayHeight-100, 300, 200);

    box1 = new Box(displayWidth/2+300,displayHeight-100,70,70);
    box2 = new Box(displayWidth/2+500,displayHeight-100,70,70);
    box6 = new Box(displayWidth/2+700,displayHeight-100,70,70);
    pig1 = new Pig(displayWidth/2+400, displayHeight-100);
    pig2 = new Pig(displayWidth/2+600, displayHeight-100);
    log1 = new Log(displayWidth/2+500,displayHeight-140,500, PI/2);

    box3 = new Box(displayWidth/2+300,displayHeight-160,70,70);
    box4 = new Box(displayWidth/2+500,displayHeight-160,70,70);
    box7 = new Box(displayWidth/2+700,displayHeight-160,70,70);
    pig3 = new Pig(displayWidth/2+400, displayHeight-160);
    pig4 = new Pig(displayWidth/2+600, displayHeight-160);

    log3 =  new Log(displayWidth/2+500,displayHeight-200,500, PI/2);

    box5 = new Box(displayWidth/2+400,displayHeight-220,70,70);
    log4 = new Log(displayWidth/2+352,displayHeight-220,150, PI/7);
    log5 = new Log(displayWidth/2+448,displayHeight-220,150, -PI/7);

    box8 = new Box(displayWidth/2+600,displayHeight-220,70,70);
    log6 = new Log(displayWidth/2+552,displayHeight-220,150, PI/7);
    log7 = new Log(displayWidth/2+648,displayHeight-220,150, -PI/7);

    bird = new Bird(200,displayHeight-380);
    bird2 = new Bird(150,displayHeight-260);
    bird3 = new Bird(100,displayHeight-260);
    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:displayHeight-380});
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);
    noStroke();
    textSize(25);
    fill("blue");
    text("score"+ score,width-200,50);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    box6.display();
    ground.display();
    pig1.display();
    pig1.score();
    pig2.display();
    pig2.score();
    pig3.score();
    pig4.display();
    pig4.score();
    log1.display();

    box3.display();
    box4.display();
    box7.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    box8.display();
    log6.display();
    log7.display();

    bird.displayBlue();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    flySound.play();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body,{x:200, y:50})
        slingshot.attach(bird.body);
        gameState = "onSling";
    }
}

async function getTime(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/America/Detroit");
    var respJSON = await response.json();
    var dt = respJSON.datetime;
    console.log(dt);
    var hr = dt.slice(11,13);
   // if(hr>=06&&hr<=18){
        backgroundImg = loadImage("sprites/bg.png");
}