var ball;
var database, position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    // puts the position of the ball in the ball/position database.
    ballPosition = database.ref('ball/position');
    ballPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }

    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }

    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }

    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }

    drawSprites();
}

// writes ball position into database.
function writePosition(x,y){
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    });
}

// shows position in database.
function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

// logs message if there is an error writing to database.
function showError(){
    console.log("error: writing to database");
}