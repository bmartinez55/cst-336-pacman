var output;
var pacman;
var loopTimer;
var numLoops = 0;
var direction = 'right';
const PACMAN_SPEED = 10;
const GHOST_SPEED = 5;
var walls = new Array();
var upArrowDown = false;
var downArrowDown = false;
var leftArrowDown = false;
var rightArrowDown = false;
var redGhost;
var rgDirection;

function loadComplete(){
    output = document.getElementById('output');
    pacman = document.getElementById('pacman');
    pacman.style.left = '280px';
    pacman.style.top = '240px';
    pacman.style.width = '40px';
    pacman.style.height = '40px';
    
    redGhost = document.getElementById('redGhost');
    redGhost.style.left = '280px';
    redGhost.style.top = '240px';
    redGhost.style.width = '40px';
    redGhost.style.height = '40px';
    
    loopTimer = setInterval(loop,50);
    //Inside Walls
    createWall(200,280,200,40);
    //Top Wall
    createWall(-20,0,640,40);
    //Left side walls
    createWall(0,0,40,180);
    createWall(0,220,40,180);
    //right side walls
    createWall(560,0,40,180);
    createWall(560,220,40,180);
    //bottom wall
    createWall(-20,360,640,40);
}

function createWall(left,top,width,height){
    var wall = document.createElement('div');
    wall.className = 'wall';
    wall.style.left = left + 'px';
    wall.style.top = top + 'px';
    wall.style.width = width + 'px';
    wall.style.height = height + 'px';
    gameWindow.appendChild(wall);
    
   walls.push(wall);
    output.innerHTML = walls.length;
}

function loop(){
    numLoops++;
    tryToChangeDirection();
    
    var originalLeft = pacman.style.left;
    var originalTop = pacman.style.top;
    
    if(direction=='up'){
        var pacmanY = parseInt(pacman.style.top)- PACMAN_SPEED;
        if(pacmanY < -30){pacmanY = 390;}
        pacman.style.top = pacmanY + 'px';
    }
    if(direction=='down'){
        var pacmanY = parseInt(pacman.style.top)+PACMAN_SPEED;
        if(pacmanY > 390){pacmanY = -30;}
        pacman.style.top = pacmanY + 'px';
    }
    if(direction=='left'){
        var pacmanX = parseInt(pacman.style.left)-PACMAN_SPEED;
        if(pacmanX < -30){pacmanX = 590;}
        pacman.style.top = pacmanX + 'px';
    }
    if(direction=='right'){
        var pacmanX = parseInt(pacman.style.left)+PACMAN_SPEED;
        if(pacmanX > 590){pacmanX = -30;}
        pacman.style.top = pacmanX + 'px';
    }
    
    if(hitWall()){
        pacman.style.left = originalLeft;
        pacman.style.top = originalTop;
    }
    
    //Move Red Ghost
    var rgX = parseInt(redGhost.style.left);
    if(rgX>590){rgX = -30;}
    redGhost.style.left = rgX + GHOST_SPEED + 'px';
    
    if(hitWall(redGhost)){redGhost.style.left = rgX + 'px';}
    if(hittest(pacman,redGhost)){clearInterval(loopTimer);}
}

function hitWall(element){
    var hit = false;
    for(var i=0;i<walls.length;i++){
        if(hittest(walls[i],element)){hit = true;}
    }
    return hit;
}

function tryToChangeDirection(){
    var originalLeft = pacman.style.left;
    var originalTop = pacman.style.top;
    
    if(leftArrowDown){
        pacman.style.left = parseInt(pacman.style.left) - PACMAN_SPEED + 'px';
        if(!hitWall(pacman)){
            direction = 'left';
            pacman.className = "flip-horizontal";
        }
    }
    if(upArrowDown){
        pacman.style.top = parseInt(pacman.style.top) - PACMAN_SPEED + 'px';
        if(!hitWall(pacman)){
            direction = 'up';
            pacman.className = "rotate270";
        }
    }
    if(rightArrowDown){
        pacman.style.left = parseInt(pacman.style.left) + PACMAN_SPEED + 'px';
        if(!hitWall(pacman)){
            direction = 'right';
            pacman.className = "";
        }
    }
    if(downArrowDown){
        pacman.style.top = parseInt(pacman.style.top) + PACMAN_SPEED + 'px';
        if(!hitWall(pacman)){
            direction = 'down';
            pacman.className = "rotate90";
        }
    }
    
    pacman.style.left = originalLeft;
    pacman.style.top = originalTop;
}

document.addEventListener('keydown',function(event){
    if(event.keyCode == 37){leftArrowDown = true;}
    if(event.keyCode == 38){upArrowDown = true;}
    if(event.keyCode == 39){rightArrowDown = true;}
    if(event.keyCode == 40){downArrowDown = true;}
});

document.addEventListener('keyup',function(event){
    if(event.keyCode == 37){leftArrowDown = false;}
    if(event.keyCode == 38){upArrowDown = false;}
    if(event.keyCode == 39){rightArrowDown = false;}
    if(event.keyCode == 40){downArrowDown = false;}
});