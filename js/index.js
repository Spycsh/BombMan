import Level1 from 'level1.js';
// import Preload from 'states/Preload';
// import GameTitle from 'states/GameTitle';
// import Main from 'states/Main';
// import GameOver from 'states/GameOver';

class Game extends Phaser.Game {

    constructor() {

        super(600, 600, Phaser.CANVAS, 'Bomb Man');

        this.state.add('Level1', Level1, false);
        // this.state.add('Preload', Preload, false);
        // this.state.add('GameTitle', GameTitle, false);
        // this.state.add('Main', Main, false);
        // this.state.add('GameOver', GameOver, false);

        this.state.start('Level1');
    }

    


    Bomb(x, y, sprite, iteration) {
    this.bomb_x = x;
    this.bomb_y = y;

    // this.timer = timer;

    this.sprite = sprite;
    this.iteration = iteration;
}

    explosionPoint(x, y) {
        this.x = x;
        this.y = y;
    }

    // the explosion area List
    explosionAreaList = [];

    // the current explosion area
    // ever time explosion happens
    // call explode function to add images
    // after several iterations
    // the images will be destroyed
    explosionPoints = {
        iteration: 0,
        horizontal: [],
        vertical: [],
        center: [],
        imageGroup: [],
    }


    // the bomb sprite list for collision
    b_spriteList = [];

    // destroy bomb image
// add image for the explosion area
function explode(curBomb) {
    explosionPoints.iteration = iteration;

    explosionAreaList.push(explosionPoints);


    // img = game.add.image(curBomb.bomb_x, curBomb.bomb_y, 'explode_center');

    // explosion center area
    aCenterPoint = new explosionPoint(curBomb.bomb_x, curBomb.bomb_y);
    explosionPoints.center.push(aCenterPoint);

    for (var i = -2; i <= 2; i++) {
        //center not added
        if (i != 0) {
            // explosion vertical area
            explosionPoints.vertical.push(new explosionPoint(curBomb.bomb_x, curBomb.bomb_y + 20 * i));
            // explosion horizontal area
            explosionPoints.horizontal.push(new explosionPoint(curBomb.bomb_x + 20 * i, curBomb.bomb_y));

        }
    }

    // if the bomb has been exploded by others
    // do not need to add image again
    // if(curBomb.image.alive == true){
    // alert("1");
    // add image to the explosion area
    for (var i = 0; i < explosionPoints.horizontal.length; i++) {
        var img = game.add.image(explosionPoints.horizontal[i].x, explosionPoints.horizontal[i].y, 'explode_left_right');
        explosionPoints.imageGroup.push(img);  // push the reference of images for delete
    }

    for (var i = 0; i < explosionPoints.vertical.length; i++) {
        var img = game.add.image(explosionPoints.vertical[i].x, explosionPoints.vertical[i].y, 'explode_up_down');
        explosionPoints.imageGroup.push(img);

    }

    for (var i = 0; i < explosionPoints.center.length; i++) {
        var img = game.add.image(explosionPoints.center[i].x, explosionPoints.center[i].y, 'explode_center');
        explosionPoints.imageGroup.push(img);

    }



    // }
    curBomb.sprite.destroy();



    // alert("0");
    // chain explosion
    // i-=1;
    // bombList.pop(i);
    bombChain(curBomb);



}

// potential problem how to pop out the elements 
// that has been used in a loop
// without influencing the list?
// may lead to a too large list
function bombChain(curBomb) {
    for (var j = 0; j < bombList.length; j++) {
        // if bomb has been destroyed, skip
        if (bombList[j].sprite.alive != false) {
            // the adjacent bomb will cause each other to die
            if (Math.abs(curBomb.bomb_x - bombList[j].bomb_x) <= 40 && (curBomb.bomb_y == bombList[j].bomb_y)) {
                // bombList[j].image.destroy();
                // game.add.image(bombList[j].bomb_x, bombList[j].bomb_y, 'explode_center');
                explode(bombList[j]);
                bombChain(bombList[j]);
            }
            if (Math.abs(curBomb.bomb_y - bombList[j].bomb_y) <= 40 && (curBomb.bomb_x == bombList[j].bomb_x)) {
                // bombList[j].image.destroy();
                // game.add.image(bombList[j].bomb_x, bombList[j].bomb_y, 'explode_center');
                explode(bombList[j]);

                bombChain(bombList[j]);
                // bombList.pop(j);
            }

        }

    }
    // already have all the bombs which are exploding in the list
    // explosion surrounding area
    // for(var i=0;i<bombList.length;i++){
    //     if(bombList[i].image.alive == false){
    //         explodeCenterArea.push(bomb[i])
    //     }
    // }

    return;

}

// set the enemy
function enemySet() {
    enemy = game.add.sprite(260, 260, 'enemy', 1);
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.body.setSize(20, 20, 0, 0);

    enemy_HP = 1500;


}

function collectHP_potion(HP_potion) {
    HP_potion.destroy();

    bombMan_HP += 250;
    game.HPText.setText('player HP: ' + bombMan_HP);
}

function collectpower_potion(power_potion) {
    power_potion.destroy();
    bomb_power += 250;
    game.bomb_powerText.setText('bomb power: ' + bomb_power);
}

function collectshoe_potion(shoe) {
    shoe.destroy();
    speed += 100;
    game.speedText.setText('player speed: ' + speed);
}

// to track the status of the points on the map
// explosion extent: 1~9
// tree: -1
// road: 0
var statusArray = new Array(15);
for (var i = 0; i < 15; i++) {
    statusArray[i] = new Array(20);
}

// init the array
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 20; j++) {
        statusArray[i][j] = 0;
    }
}

// the map status record whether the grids
// on the map can be traversed
var mapStatus = mapStatus1;


var bombList = [];
var iteration = 0;


// explosion damage to the player depended on the explosion extent
function explosionOnPlayer() {
    if (!GOD_MODE) {
        var explosionExtent = statusArray[parseInt((player.position.y + 10) / 20)][parseInt((player.position.x + 10) / 20)]
        bombMan_HP -= bomb_power * explosionExtent;
        // if bomb to harm player
        // player will be invincible for a while
        if (explosionExtent != 0) {
            GOD_MODE = true;
        }
    }


    game.HPText.setText("player HP: " + bombMan_HP);
    game.bomb_powerText.setText("bomb power: " + bomb_power);
    game.speedText.setText("player speed: " + speed);

}

// check if the player dies
function bombManAliveCheck() {
    if (bombMan_HP <= 0) {

        player.play('die');

        // alert("GG, Resurvive!");

        //reset position of player
        game.paused = true;

        if (1) {
            game.paused = false;
            bombMan_HP = 1200;
            bomb_power = 500;
            enemy_HP = 1500;
            speed = 100;
        }

        player.position.x = 380;
        player.position.y = 240;
    }



}

// explosion damage to the enemy depended on the explosion extent
function explosionOnEnemy() {
    var explosionExtent = statusArray[parseInt((enemy.position.y + 10) / 20)][parseInt((enemy.position.x + 10) / 20)];
    enemy_HP -= bomb_power * explosionExtent;

    if (enemy_HP <= 0) {
        enemy.destroy();
        // alert("enemy killed!");

    }
}

// if touch the enemy then the player will lose HP
function touchEnemy() {
    if (game.physics.arcade.overlap(player, enemy) && (!GOD_MODE)) {
        bombMan_HP -= 1000;
        GOD_MODE = true;
    }
}

function GOD_MODE_check() {
    // if the player is harmed he will be invincible at the moment
    // the duration of GOD_MODE will vanish after a while
    if (GOD_MODE) {
        // shine to show that the 
        player.tint = 0xf00000 + Math.random() * 0xfffff;
        GOD_MODE_Time -= 1;
    }

    if (GOD_MODE_Time == 0) {
        player.tint = 0xffffff;

        // alert("vanish");
        GOD_MODE = false;
        GOD_MODE_Time = 150;
    }

}


// path finding
function GridNode(x, y) {
    this.x = x;
    this.y = y;

    this.givenCost = 0;

    this.listOfNeighbors = [];
}

var SearchNode = function (node, parent, heuristic) {
    this.node = node;
    this.parent = parent;
    this.heuristic = heuristic;
}


// var openList = [];


// var closedList = [];

// var ans;

// var startNode = new SearchNode(grid[2][1], null);

// var goalNode = grid[9][1];

// var ansList = [];

// openList.push(startNode);

// mapStatus is defined whether the tiles on map can be traversed
// start_x, start_y are indexes in the array representing the enemy
// end_x, end_y represent the player

var grid = new Array(15);  // array of all grids
for (var i = 0; i < 15; i++) {
    grid[i] = new Array(20);
}


function enemyPathFinding(mapStatus, start_x, start_y, end_x, end_y, openList, closedList, ansList) {
    // alert(ans);
    // alert(start_x);


    // initialize the status(blocked or traversed) for gird nodes
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 20; j++) {
            grid[i][j] = new GridNode(i, j);
            grid[i][j].givenCost = mapStatus[i][j];
        }
    }

    // init the first node
    startNode = new SearchNode(grid[start_x][start_y], null);

    openList.push(startNode);

    // initialize the valid neighbors(can be traversed)
    for (var i = 1; i < 14; i++) {
        for (var j = 1; j < 19; j++) {
            if (mapStatus[i + 1][j] != 9) grid[i][j].listOfNeighbors.push(grid[i + 1][j]);
            if (mapStatus[i - 1][j] != 9) grid[i][j].listOfNeighbors.push(grid[i - 1][j]);
            // if (mapStatus[i - 1][j - 1] != 9) grid[i][j].listOfNeighbors.push(grid[i - 1][j - 1]);
            // if (mapStatus[i + 1][j + 1] != 9) grid[i][j].listOfNeighbors.push(grid[i + 1][j + 1]);
            // if (mapStatus[i + 1][j - 1] != 9) grid[i][j].listOfNeighbors.push(grid[i + 1][j - 1]);
            if (mapStatus[i][j + 1] != 9) grid[i][j].listOfNeighbors.push(grid[i][j + 1]);
            if (mapStatus[i][j - 1] != 9) grid[i][j].listOfNeighbors.push(grid[i][j - 1]);
            // if (mapStatus[i - 1][j + 1] != 9) grid[i][j].listOfNeighbors.push(grid[i - 1][j + 1]);
        }
    }

    goalNode = grid[end_x][end_y];

    findFlag = false;

    bfs(startNode, goalNode, openList, closedList, ansList);
    // alert(iteration);


}

var pathAns = [];

var findFlag = false;

function bfs(currentNode, goalNode, openList, closedList, ansList) {
    if (currentNode.node == goalNode) {

        findFlag = true;

        // ans = "(" + goalNode.x + "," + goalNode.y + ")";
        // alert("find");
        ansList.push([goalNode.x, goalNode.y]);
        while (currentNode.parent != null) {
            // ans = "(" + currentNode.parent.node.x + "," + currentNode.parent.node.y + ") -> " + ans;
            ansList.push([currentNode.parent.node.x, currentNode.parent.node.y]);
            currentNode = currentNode.parent;
        }

        // record the tile the enemy will go
        // in order to chase the player
        pathAns = ansList;

        return;
    }
    else {
        // alert("(" + currentNode.node.x + "," + currentNode.node.y + ")");
        closedList.push(currentNode);

        allList = openList.concat(closedList);
        li = [];
        for (var k = 0; k < allList.length; k++) {
            li.push(allList[k].node);


        }

        // check if in lists
        for (var i = 0; i < currentNode.node.listOfNeighbors.length; i++) {
            if (li.indexOf(currentNode.node.listOfNeighbors[i]) == -1) {
                // heuristic = Math.pow(Math.abs(currentNode.node.x - goalNode.x), 2) + Math.pow(Math.abs(currentNode.node.y - goalNode.y), 2);
                sNode = new SearchNode(currentNode.node.listOfNeighbors[i], currentNode, 0);
                openList.push(sNode);
            }
        }

        // openList.sort(function (a, b) {
        //     var nodeAHeuristic = a.heuristic;
        //     var nodeBHeuristic = b.heuristic;
        //     if (nodeAHeuristic < nodeBHeuristic) {
        //         return -1;
        //     }
        //     if (nodeAHeuristic > nodeBHeuristic) {
        //         return 1;
        //     }
        //     return 0;

        // });

    }

    if (openList == null) {
        alert("path not find!");
    }
    else if (findFlag == false) {
        var node = openList.shift();
        if (node == undefined) {
            // alert("chased!");
            return;
        }
        // alert(node.node)
        bfs(node, goalNode, openList, closedList, ansList);
    }
    return;
}

// always carefully check the recursive return statement!! 19/11/2019 Chen Sihan
}

new Game();