// var game = new Phaser.Game(800, 600, Phaser.AUTO, { preload: preload, create: create, update: update, render: render });
var game = new Phaser.Game(600, 400, Phaser.CANVAS, 'Bomb Man', { preload: preload, create: create, update: update });


function preload() {
    game.load.image('startup', 'asset/startup.png');
    game.load.image('bombman_text', 'asset/bombman_text.png');
    game.load.image('press_text', 'asset/press_text.png');


    game.load.tilemap('level1', 'asset/level1.csv', null, Phaser.Tilemap.csv);
    game.load.image('tiles1', 'asset/level1.png');

    game.load.image('gameOver', 'asset/gameOver.png');

    game.load.tilemap('level2', 'asset/level2.csv', null, Phaser.Tilemap.csv);
    game.load.image('tiles2', 'asset/level2.png');

    game.load.tilemap('level3', 'asset/level3.csv', null, Phaser.Tilemap.csv);
    game.load.image('tiles3', 'asset/level3.png');



    game.load.image('bomb1', 'asset/bomb.png');

    game.load.image('explode_center', 'asset/b_center.png');

    game.load.image('explode_left_right', 'asset/b_lr.png');

    game.load.image('explode_up_down', 'asset/b_ud.png');

    game.load.image('HP_potion', 'asset/HP_potion.png');

    game.load.image('power_potion', 'asset/power_potion.png');

    game.load.image('shoe', 'asset/shoe.png');

    game.load.image('door', 'asset/door.png');

    game.load.image('blood', 'asset/blood.png');
    game.load.image('HP_container', 'asset/HP_container.png');
    game.load.image('power', 'asset/power.png');
    game.load.image('power_container', 'asset/power_container.png');
    game.load.image('speed', 'asset/speed.png');
    game.load.image('speed_container', 'asset/speed_container.png');



    // spritesheet player
    game.load.spritesheet('player', 'asset/bombman.png', 20, 20);

    // enemy
    game.load.spritesheet('enemy', 'asset/enemy.png', 20, 20)

    // control buttons
    // game.load.spritesheet('startBtn','asset/start.png', 100,50);
    // game.load.spritesheet('pauseBtn', 'asset/pause.png', 120, 60);
    // game.load.spritesheet('restartBtn', 'asset/restart.png', 120, 60);
}

var map;
var layer;
var cursors;
var spaceKey;

var player;

var door;

// set the player to avoid all the damage
var GOD_MODE = false;
// set the time that the player is invincible
var GOD_MODE_Time = 150;

// var enemy;

// var enemy_HP;

// var enemy_speed = 100;

var enemyList = [];

// x,y: position
// HP,speed,power: the characteristic of the enemies
// type: 0, 1, 2 represent different kinds of enemies
function enemy(x, y, HP, power, speed, type, sprite) {
    this.x = x;
    this.y = y;
    this.HP = HP;
    this.power = power;
    this.speed = speed;
    this.type = type;
    this.sprite = sprite;

    this.path = [];
}

var HP_potions = [];

var power_potions = [];

var speed = 100;

var shoes = [];

var bombMan_HP = 1200;

var bomb_power = 500;

function Bomb(x, y, sprite, iteration) {
    this.bomb_x = x;
    this.bomb_y = y;

    // this.timer = timer;

    this.sprite = sprite;
    this.iteration = iteration;
}

function explosionPoint(x, y) {
    this.x = x;
    this.y = y;
}

// the explosion area List
var explosionAreaList = [];

// the current explosion area
// ever time explosion happens
// call explode function to add images
// after several iterations
// the images will be destroyed
var explosionPoints = {
    iteration: 0,
    horizontal: [],
    vertical: [],
    center: [],
    imageGroup: [],
}


// the bomb sprite list for collision
var b_spriteList = [];

// var pauseBtn;
var k;

function blink() {
    if (blinktext.alpha) {
        blinktext.alpha = 0;
    }
    else {
        blinktext.alpha = 1;
    }
}

var blinktext;

function create() {

    // this.add.sprite(122.0, 176.0, 'press-enter-text');

    var startup = game.add.sprite(0, 0, 'startup');
    var bombmanText = game.add.sprite(170, 20, 'bombman_text');
    blinktext = this.add.sprite(182, 340, 'press_text');
    // blinktext.alpha = 0;
    game.time.events.loop(700, blink, this);

    window.onkeydown = function (event) {
        // use p to pause or unpause the game
        if (event.keyCode == 80) { game.paused = !game.paused; }
        // use enter to restart the level
        if (event.keyCode == 13) {
            if (this.gameStartFlag == false) {
                startup.destroy();
                bombmanText.destroy();
                blinktext.destroy();
                this.panelData();
                this.changeLayer(this.curLayerID);
                this.gameStartFlag = true;
            }
        }
        // Press 'r'
        if (event.keyCode == 82) {
            this.game.paused = false;
            this.changeLayer(this.curLayerID);
        }
    }


    cursors = game.input.keyboard.createCursorKeys();

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR ]);

    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);






}

function panelData() {
    game.stage.backgroundColor = "#b4930c";

    // map = game.add.tilemap('level1', 20, 20);
    // set collsion to trees
    // map.setCollisionByIndex(0);
    // map.setCollisionByIndex(1);
    // add Tile set
    // map.addTilesetImage('tiles1');

    // layer = map.createLayer(0);

    // layer.scale.set(1.5);
    // layer.resizeWorld();
    // game.scale.setGameSize(800, 600);

    // initializePlayer(360, 260);


    game.add.image(420, 64, 'HP_container');

    game.add.image(420, 104, 'power_container');

    game.add.image(420, 144, 'speed_container');

    game.add.text(400, 306, 'TIPS:', { font: '10px Arial', fill: '#ffffff' });
    game.add.text(400, 316, 'press Arrows to move', { font: '10px Arial', fill: '#ffffff' });
    game.add.text(400, 326, 'press Space to set bombs', { font: '10px Arial', fill: '#ffffff' });
    game.add.text(400, 336, "press 'p' to pause/unpause ", { font: '10px Arial', fill: '#ffffff' });
    game.add.text(400, 346, "press 'r' to restart the level", { font: '10px Arial', fill: '#ffffff' });

    // help.fixedToCamera = true;


    // game.HPText = game.add.text(420, 50, 'player HP: 0', { fontSize: '16px', fill: '#000' });
    // initializeHPImage(1200);

    // game.bomb_powerText = game.add.text(420, 80, 'bomb power : 0', { fontSize: '16px', fill: '#000' });

    // game.speedText = game.add.text(420, 110, 'speed: 0', { fontSize: '16px', fill: '#000' });

    // game.enemy_HPText = game.add.text(420, 140, 'enemy HP: 0', { fontSize: '16px', fill: '#fff' });






    //     game.add.button(400,20,'btn',function(){
    //         startFlag = 1;
    // });

    // game.add.sprite(420, 250, 'restartBtn');

    // changeLayer(1);
    // setItemLevel1();
    // set the enemy
    // initializeEnemy(260, 260, 1);

    // initializeEnemy(200, 200, 1);

    // initialize the map status with the first map
    // arrayDeepCopy2D(mapStatus1);
}

// function setShoes
function setItemLevel1() {
    // add some potions
    HP_potions.push(game.add.sprite(20, 120, 'HP_potion'));
    // HP_potions.push(game.add.sprite(300, 220, 'HP_potion'));
    for (var i = 0; i < HP_potions.length; i++) {
        game.physics.enable(HP_potions[i], Phaser.Physics.ARCADE);

    }

    power_potions.push(game.add.sprite(180, 120, 'power_potion'));
    power_potions.push(game.add.sprite(140, 220, 'power_potion'));
    for (var i = 0; i < power_potions.length; i++) {
        game.physics.enable(power_potions[i], Phaser.Physics.ARCADE);

    }

    // shoes.push(game.add.sprite(340, 280, 'shoe'));
    shoes.push(game.add.sprite(340, 200, 'shoe'));
    for (var i = 0; i < shoes.length; i++) {
        game.physics.enable(shoes[i], Phaser.Physics.ARCADE);

    }

    // door to the next level
    // if the enemy is killed then player can go to next layer with the door
    door = game.add.sprite(320, 40, 'door');
    game.physics.enable(door, Phaser.Physics.ARCADE);


}


function setItemLevel2() {
    // door to the next level
    // if the enemy is killed then player can go to next layer with the door
    door = game.add.sprite(20, 200, 'door');
    game.physics.enable(door, Phaser.Physics.ARCADE);
}

function setItemLevel3() {
    // door to the next level
    // if the enemy is killed then player can go to next layer with the door
    door = game.add.sprite(200, 140, 'door');
    game.physics.enable(door, Phaser.Physics.ARCADE);
}

var hpImageList = [];
//each image - height:16px; width:1px = 20HP
function initializeHPImage(bombMan_HP) {
    for (var i = hpImageList.length - 1; i >= 0; i--) {
        hpImageList[i].destroy();
    }
    hpImageList = [];

    var imageNumber = Math.floor(bombMan_HP / 20);         //according to the HP show the corresponding number of image
    if (bombMan_HP > 0) {
        if (bombMan_HP > 1200) {
            for (var i = 0; i < 60; i++) {
                hpImageList[i] = game.add.sprite(420 + i, 80, 'blood');
            }
        } else {
            for (var i = 0; i < imageNumber; i++) {
                hpImageList[i] = game.add.sprite(420 + i, 80, 'blood');
            }
        }

    }

}

var powerImageList = [];
function initializePowerImage(power) {
    for (var i = powerImageList.length - 1; i >= 0; i--) {
        powerImageList[i].destroy();
    }
    powerImageList = [];

    var imageNumber = Math.floor(power / 20);
    for (var i = 0; i < imageNumber; i++)
        powerImageList[i] = game.add.sprite(420 + i, 120, 'power');
}

var speedList = [];
function initializeSpeedImage(speed) {
    for (var i = speedList.length - 1; i >= 0; i--) {
        speedList[i].destroy();
    }
    speedList = [];

    var imageNumber = Math.floor(speed / 20);
    for (var i = 0; i < imageNumber * 3; i++)  // scale is too small, one speed unit need to add length
        speedList[i] = game.add.sprite(420 + i, 160, 'speed');
}

function initializePlayer(x, y) {
    // player
    player = game.add.sprite(x, y, 'player', 1);


    // player dynamic
    // frame 8,9 as actions
    player.animations.add('left', [8, 9], 10, true);
    player.animations.add('right', [1, 2], 10, true);
    player.animations.add('up', [11, 12, 13], 10, true);
    player.animations.add('down', [4, 5, 6], 10, true);
    player.animations.add('die', [14], 10, true);


    game.physics.enable(player, Phaser.Physics.ARCADE);

    // (10,14,2,1)
    player.body.setSize(10, 14, 2, 1);

    game.camera.follow(player);
}

// set the enemy
function initializeEnemy(x, y, type) {
    if (type == 1) {
        var enemy_sprite = game.add.sprite(x, y, 'enemy', 1);
        game.physics.enable(enemy_sprite, Phaser.Physics.ARCADE);
        enemy_sprite.body.setSize(20, 20, 0, 0);

        var e = new enemy(x, y, 1500, 500, 100, 1, enemy_sprite);
        // enemy_HP = 1500;
        enemyList.push(e);
    }



}

var curLayerID = 1;

function goNextLevelCheck() {
    var nextLayerID;
    //last level
    if (curLayerID == 3) {
        nextLayerID = 1;
    } else {
        nextLayerID = curLayerID + 1;
    }
    // if the enemy is killed and the player get to the door 
    // then go to next layer
    var allDeadFlag = true;
    for (var i = 0; i < enemyList.length; i++) {
        if (enemyList[i].sprite.alive == true) {
            allDeadFlag = false;

        }
    }
    if (allDeadFlag == true) {
        if (game.physics.arcade.overlap(player, door)) {
            // changeLayer(2);
            // alert(curLayerID);
            curLayerID = nextLayerID;
            changeLayer(nextLayerID);
        }
    }


}

var gameStartFlag = false;
function update() {
    if (gameStartFlag == true) {
        if (enterKey.justDown) {
            changeLayer(curLayerID);
        }

        goNextLevelCheck();

        // reset the lists
        openList = [];
        closedList = [];

        GOD_MODE_check();

        touchEnemy();

        explosionOnPlayer();

        explosionOnEnemy();

        bombManAliveCheck();

        for (var i = 0; i < enemyList.length; i++) {
            if (enemyList[i].sprite.alive) {
                enemyPathFinding(
                    curLayerID,
                    mapStatus,
                    parseInt((enemyList[i].sprite.position.y + 10) / 20),
                    parseInt((enemyList[i].sprite.position.x + 10) / 20),
                    parseInt((player.position.y + 10) / 20),
                    parseInt((player.position.x + 10) / 20),
                    [],
                    [],
                    [],
                    enemyList[i]
                );
            }

        }

        for (var i = 0; i < enemyList.length; i++) {
            if (enemyList[i].sprite.alive) {
                // "whole body check"
                // only when the enemy is wholy in a grid, it will change its direction!
                if ((enemyList[i].sprite.body.x / 20 % 1 === 0) && (enemyList[i].sprite.body.y / 20 % 1 === 0)) {

                    // weight must be set to the integral of 0.3
                    // do not know exactly why
                    // may be it is related to frame rate per second(FPS) which is 30?
                    // if the speed(distance per second) be the integral of 30
                    // it will be good for the "whole body check"
                    var weight = 0.6;


                    var curPoint = enemyList[i].path[enemyList[i].path.length - 1];

                    var pathNext;
                    (enemyList[i].path[enemyList[i].path.length - 2] != undefined) ? (pathNext = enemyList[i].path[enemyList[i].path.length - 2]) : (pathNext = enemyList[i].path[0]);
                    if (pathNext != undefined) {
                        if (pathNext[1] - curPoint[1] > 0) {
                            enemyList[i].sprite.body.velocity.x = enemyList[i].speed * weight;
                        }
                        else if (pathNext[1] - curPoint[1] == 0) {
                            enemyList[i].sprite.body.velocity.x = 0;
                        }
                        else if (pathNext[1] - curPoint[1] < 0) {
                            enemyList[i].sprite.body.velocity.x = -enemyList[i].speed * weight;
                        }

                        if (pathNext[0] - curPoint[0] < 0) {
                            enemyList[i].sprite.body.velocity.y = -enemyList[i].speed * weight;
                        }
                        else if (pathNext[0] - curPoint[0] == 0) {
                            enemyList[i].sprite.body.velocity.y = 0;
                        }
                        else if (pathNext[0] - curPoint[0] > 0) {
                            enemyList[i].sprite.body.velocity.y = enemyList[i].speed * weight;
                        }
                    }

                    //ƒ (duration, distance, direction) {
                    //
                    //
                    //Modify
                    //

                    // current enemy position substract the postion that it want to go to
                    // to represent the current direction
                    // var direction_x = pathAns[pathAns.length - 2][1] - pathAns[pathAns.length - 1][1];
                    // var direction_y = pathAns[pathAns.length - 2][0] - pathAns[pathAns.length - 1][0];

                    // if (direction_x == 0 && direction_y == 0) {
                    //     alert("!");
                    // }
                    // else if (direction_x == 0) {


                    //     enemy.body.moveTo(500, 20, (direction_y > 0 ? 90 : 270));
                    // }
                    // else if (direction_y == 0) {

                    //     enemy.body.moveTo(500, 20, (direction_x > 0 ? 0 : 180));


                    // }

                }
            }
        }





        for (var i = 0; i < HP_potions.length; i++) {
            if (game.physics.arcade.overlap(player, HP_potions[i])) {
                collectHP_potion(HP_potions[i]);
            }
        }

        for (var i = 0; i < power_potions.length; i++) {
            if (game.physics.arcade.overlap(player, power_potions[i])) {
                collectpower_potion(power_potions[i]);

            }
        }


        for (var i = 0; i < shoes.length; i++) {
            if (game.physics.arcade.overlap(player, shoes[i])) {
                collectshoe_potion(shoes[i]);
            }
        }


        // initialize the new explosion points
        explosionPoints = {
            iteration: 0,
            horizontal: [],
            vertical: [],
            center: [],
            imageGroup: [],
        }

        // update the status array
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 20; j++) {
                statusArray[i][j] = 0;
            }
        }

        iteration++;
        for (var i = 0; i < explosionAreaList.length; i++) {
            if (iteration - explosionAreaList[i].iteration == 30) {
                for (var j = 0; j < explosionAreaList[i].imageGroup.length; j++) {
                    explosionAreaList[i].imageGroup[j].destroy();
                }
            }
        }

        game.physics.arcade.collide(player, layer);
        player.body.collideWorldBounds = true;

        player.body.velocity.set(0);

        for (var i = 0; i < enemyList.length; i++) {
            if (enemyList[i].sprite.alive) {
                game.physics.arcade.collide(enemyList[i].sprite, layer);
                enemyList[i].sprite.body.collideWorldBounds = true;
            }
        }




        // movement
        if (cursors.left.isDown) {
            // player.body.velocity.x = -100;
            player.body.velocity.x = -speed;
            player.play('left');
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = speed;
            player.play('right');
        }
        else if (cursors.up.isDown) {
            player.body.velocity.y = -speed;
            player.play('up');
        }
        else if (cursors.down.isDown) {
            player.body.velocity.y = speed;
            player.play('down');
        }
        else {
            player.animations.stop();
        }

        // bomb operation
        // if(game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR))
        if (spaceKey.justDown) {  //only press down once
            // set position of the bomb in a tile
            bomb_x = parseInt((player.position.x + 10) / 20) * 20;
            bomb_y = parseInt((player.position.y + 10) / 20) * 20;
            // if(temp_x != bomb_x||temp_y!=bomb_y){  // bomb not repeat!
            // alert("Bomb not repeat");
            // temp_x = bomb_x;
            // temp_y = bomb_y;

            // img = game.add.image(bomb_x, bomb_y, 'bomb1');

            // add a sprite of the bomb
            b_sprite = game.add.sprite(bomb_x, bomb_y, 'bomb1');
            game.physics.enable(b_sprite, Phaser.Physics.ARCADE);
            b_sprite.body.immovable = true;

            b_spriteList.push(b_sprite);

            // b_sprite.destroy();

            // sprite = game.add.physicsGroup();
            // aprite.create(bomb_x, bomb_y, 'bomb1');

            // game.physics.arcade.collide(player, platforms);

            bomb = new Bomb(bomb_x, bomb_y, b_sprite, iteration);
            bombList.push(bomb);

            // let the enemy evade the bombs intelligently
            mapStatus[bomb_y / 20][bomb_x / 20] = -1;


            // alert(2);
        }

        // this line must be written out the space key event block
        // do not know why
        // alert(b_spriteList.length);
        for (var i = 0; i < b_spriteList.length; i++) {
            if (b_spriteList[i].alive == true) {
                game.physics.arcade.collide(player, b_spriteList[i]);
                for (var j = 0; j < enemyList.length; j++) {
                    // alert("a");
                    game.physics.arcade.collide(enemyList[j].sprite, b_spriteList[i]);
                }
            }

        }



        for (var i = 0; i < bombList.length; i++) {


            // after a time interval the bomb may explode
            if ((iteration - bombList[i].iteration) == 140) {

                curBomb = bombList[i];
                // if the bomb has not been exploded
                if (curBomb.sprite.alive == true) {
                    explode(curBomb);
                    // change the explosion extent 
                    // depending on how many explosion points one map point has
                    for (var i = 0; i < explosionPoints.horizontal.length; i++) {
                        if ((explosionPoints.horizontal[i].x <= 380) && (explosionPoints.horizontal[i].x >= 0)) {
                            statusArray[explosionPoints.horizontal[i].y / 20][explosionPoints.horizontal[i].x / 20] += 1;
                        };
                    }
                    for (var i = 0; i < explosionPoints.vertical.length; i++) {
                        if ((explosionPoints.vertical[i].y <= 280) && (explosionPoints.vertical[i].y >= 0)) {
                            statusArray[explosionPoints.vertical[i].y / 20][explosionPoints.vertical[i].x / 20] += 1;
                        };
                    }
                    for (var i = 0; i < explosionPoints.center.length; i++) {
                        statusArray[explosionPoints.center[i].y / 20][explosionPoints.center[i].x / 20] += 1;

                    }
                    // boss check
                    // if boss is in the explosion area 
                    // it will be killed based on the explosion extent


                }
            }
        }
    }

}




// destroy bomb image
// add image for the explosion area
function explode(curBomb) {
    // cancel the bombs that impact the enemy to choose path
    mapStatus[curBomb.bomb_y / 20][curBomb.bomb_x / 20] = 999;

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



function collectHP_potion(HP_potion) {
    HP_potion.destroy();

    bombMan_HP += 250;
    // game.HPText.setText('player HP: ' + bombMan_HP);
    initializeHPImage(bombMan_HP);
}

function collectpower_potion(power_potion) {
    power_potion.destroy();
    bomb_power += 250;
    // game.bomb_powerText.setText('bomb power: ' + bomb_power);
    initializePowerImage(bomb_power);
}

function collectshoe_potion(shoe) {
    shoe.destroy();
    speed += 100;
    // game.speedText.setText('player speed: ' + speed);
    initializeSpeedImage(speed);

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
var mapStatus = new Array(15);
for (var i = 0; i < 15; i++) {
    mapStatus[i] = new Array(20);
}



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
            // alert("a");
            // game.HPText.setText("player HP: " + bombMan_HP);
            initializeHPImage(bombMan_HP);
            GOD_MODE = true;

        }
    }



    // game.bomb_powerText.setText("bomb power: " + bomb_power);
    // game.speedText.setText("player speed: " + speed);

}

// check if the player dies
function bombManAliveCheck() {
    if (bombMan_HP <= 0) {

        player.play('die');

        //clear the bombs
        bombList = [];

        // alert("GG, Resurvive!");

        game.add.sprite(0, 0, 'gameOver');
        //reset position of player
        // game.paused = true;

        // if (1) {
        // game.paused = false;
        // bombMan_HP = 1200;
        // bomb_power = 500;
        // enemy_HP = 1500;
        // speed = 100;
        // }

        // player.position.x = 360;
        // player.position.y = 260;
        game.paused = true;



        // game.input.onDown.add(function () {
        //     game.paused = false;
        //     alert("aac");
        //     changeLayer(1);
        // }, self);




    }



}

// explosion damage to the enemy depended on the explosion extent
function explosionOnEnemy() {
    for (var i = 0; i < enemyList.length; i++) {
        var explosionExtent = statusArray[parseInt((enemyList[i].sprite.position.y + 10) / 20)][parseInt((enemyList[i].sprite.position.x + 10) / 20)];


        enemyList[i].HP -= bomb_power * explosionExtent;

        // game.enemy_HPText.setText('enemy HP: ' + enemy_HP);
        if (enemyList[i].sprite.alive == true) {
            if (enemyList[i].HP <= 0) {
                // game.enemy_HPText.setText('enemy HP: ' + 'DEAD');
                // alert(enemyList[i].sprite)
                enemyList[i].sprite.destroy();

            }
        }

    }



}

// if touch the enemy then the player will lose HP
function touchEnemy() {
    for (var i = 0; i < enemyList.length; i++) {

        if (game.physics.arcade.overlap(player, enemyList[i].sprite) && (!GOD_MODE)) {
            bombMan_HP -= 1000;
            GOD_MODE = true;
            initializeHPImage(bombMan_HP);
        }
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



var grid = new Array(15);  // array of all grids
for (var i = 0; i < 15; i++) {
    grid[i] = new Array(20);
}


function enemyPathFinding(curLayerID, mapStatus, start_x, start_y, end_x, end_y, openList, closedList, ansList, enemy) {
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


    // initialize the valid neighbors(the area can be traversed)
    for (var i = 1; i < 14; i++) {
        for (var j = 1; j < 19; j++) {
            // set the neighbors for the valid tiles for each layer 
            if (curLayerID == 1) {
                if (mapStatus[i + 1][j] != 0 && mapStatus[i + 1][j] != -1) grid[i][j].listOfNeighbors.push(grid[i + 1][j]);
                if (mapStatus[i - 1][j] != 0 && mapStatus[i - 1][j] != -1) grid[i][j].listOfNeighbors.push(grid[i - 1][j]);
                // if (mapStatus[i - 1][j - 1] != 9) grid[i][j].listOfNeighbors.push(grid[i - 1][j - 1]);
                // if (mapStatus[i + 1][j + 1] != 9) grid[i][j].listOfNeighbors.push(grid[i + 1][j + 1]);
                // if (mapStatus[i + 1][j - 1] != 9) grid[i][j].listOfNeighbors.push(grid[i + 1][j - 1]);
                if (mapStatus[i][j + 1] != 0 && mapStatus[i][j + 1] != -1) grid[i][j].listOfNeighbors.push(grid[i][j + 1]);
                if (mapStatus[i][j - 1] != 0 && mapStatus[i][j - 1] != -1) grid[i][j].listOfNeighbors.push(grid[i][j - 1]);
                // if (mapStatus[i - 1][j + 1] != 9) grid[i][j].listOfNeighbors.push(grid[i - 1][j + 1]);
            }
            else if (curLayerID == 2) {
                if (mapStatus[i + 1][j] != 0 && mapStatus[i + 1][j] != -1 && mapStatus[i + 1][j] != 3) grid[i][j].listOfNeighbors.push(grid[i + 1][j]);
                if (mapStatus[i - 1][j] != 0 && mapStatus[i - 1][j] != -1 && mapStatus[i - 1][j] != 3) grid[i][j].listOfNeighbors.push(grid[i - 1][j]);
                if (mapStatus[i][j + 1] != 0 && mapStatus[i][j + 1] != -1 && mapStatus[i][j + 1] != 3) grid[i][j].listOfNeighbors.push(grid[i][j + 1]);
                if (mapStatus[i][j - 1] != 0 && mapStatus[i][j - 1] != -1 && mapStatus[i][j - 1] != 3) grid[i][j].listOfNeighbors.push(grid[i][j - 1]);

            }
            else if (curLayerID == 3) {
                if (mapStatus[i + 1][j] != 0 && mapStatus[i + 1][j] != -1 && mapStatus[i + 1][j] != 1 && mapStatus[i + 1][j] != 2) grid[i][j].listOfNeighbors.push(grid[i + 1][j]);
                if (mapStatus[i - 1][j] != 0 && mapStatus[i - 1][j] != -1 && mapStatus[i - 1][j] != 1 && mapStatus[i - 1][j] != 2) grid[i][j].listOfNeighbors.push(grid[i - 1][j]);
                if (mapStatus[i][j + 1] != 0 && mapStatus[i][j + 1] != -1 && mapStatus[i][j + 1] != 1 && mapStatus[i][j + 1] != 2) grid[i][j].listOfNeighbors.push(grid[i][j + 1]);
                if (mapStatus[i][j - 1] != 0 && mapStatus[i][j - 1] != -1 && mapStatus[i][j - 1] != 1 && mapStatus[i][j - 1] != 2) grid[i][j].listOfNeighbors.push(grid[i][j - 1]);

            }

        }
    }

    goalNode = grid[end_x][end_y];

    findFlag = false;

    bfs(startNode, goalNode, openList, closedList, ansList, enemy);
    // alert(iteration);


}

// var pathAns = [];

var findFlag = false;

function bfs(currentNode, goalNode, openList, closedList, ansList, enemy) {
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
        var pathAns = ansList;
        enemy.path = pathAns;
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
        bfs(node, goalNode, openList, closedList, ansList, enemy);
    }
    return;


}

// always carefully check the recursive return statement!! 19/11/2019 Chen Sihan



// change to the level you want to go
function changeLayer(layerID) {
    alert("level" + layerID);

    for (var i; i < bombList.length; i++) {
        bombList[i].sprite.destroy();
    }
    bombList = [];
    explosionAreaList = [];
    b_spriteList = [];

    if (door != undefined) door.destroy();
    //destroy current layer
    if (layer != undefined) layer.destroy();
    if (player != undefined) player.destroy();

    for (var i = 0; i < shoes.length; i++) {
        shoes[i].destroy();
    }

    for (var i = 0; i < HP_potions.length; i++) {
        HP_potions[i].destroy();
    }

    for (var i = 0; i < power_potions.length; i++) {
        power_potions[i].destroy();
    }

    initializeHPImage(1200);
    initializePowerImage(500);
    initializeSpeedImage(100);

    if (layerID == 1) {

        // mapStatus = mapStatus1;
        arrayDeepCopy2D(mapStatus1);
        curLayerID = 1;
        // 
        bombMan_HP = 1200;
        bomb_power = 500;
        speed = 100;

        // enemy_HP = 1500;

        map = game.add.tilemap('level1', 20, 20);
        map.setCollisionByIndex(0);
        layer = map.createLayer(0);
        // map.setCollisionByIndex(9);
        // add Tile set
        map.addTilesetImage('tiles1');

        // layer.scale.set(1.5);
        layer.resizeWorld();
        // game.scale.setGameSize(800, 600);

        setItemLevel1();


        initializePlayer(360, 260);

        b_spriteList = [];
        enemyList = [];
        initializeEnemy(260, 260, 1);
        initializeEnemy(200, 200, 1);
        alert(bombMan_HP);

    }


    if (layerID == 2) {
        arrayDeepCopy2D(mapStatus2);

        door.destroy();
        curLayerID = 2;

        bombMan_HP = 1200;
        bomb_power = 500;
        speed = 100;

        // enemy_HP = 1500;


        map = game.add.tilemap('level2', 20, 20);

        map.setCollisionByIndex(0);
        map.setCollisionByIndex(3);

        layer = map.createLayer(0);
        // map.setCollisionByIndex(9);
        // add Tile set
        map.addTilesetImage('tiles2');

        // layer.scale.set(1.5);
        layer.resizeWorld();
        // game.scale.setGameSize(800, 600);
        setItemLevel2();

        // alert("2");
        initializePlayer(360, 260);

        enemyList = [];

        initializeEnemy(260, 260, 1);
        initializeEnemy(300, 40, 1);
    }

    if (layerID == 3) {
        arrayDeepCopy2D(mapStatus3);
        door.destroy();
        curLayerID = 3;

        bombMan_HP = 1200;
        bomb_power = 500;
        speed = 100;

        // enemy_HP = 1500;


        map = game.add.tilemap('level3', 20, 20);

        map.setCollisionByIndex(0);
        map.setCollisionByIndex(1);
        map.setCollisionByIndex(2);

        layer = map.createLayer(0);
        // map.setCollisionByIndex(9);
        // add Tile set
        map.addTilesetImage('tiles3');

        // layer.scale.set(1.5);
        layer.resizeWorld();
        // game.scale.setGameSize(800, 600);

        setItemLevel3();

        // alert("2");
        initializePlayer(360, 260);

        enemyList = [];

        initializeEnemy(260, 260, 1);
        initializeEnemy(40, 40, 1);
        initializeEnemy(60, 60, 1);
        initializeEnemy(80, 80, 1);
        initializeEnemy(100, 100, 1);


    }


}

// copy a new mapStatus by value rather than reference
// mapStatus is the current map that need to be used
// mapStatusOriginal is the map that need to be copied
function arrayDeepCopy2D(mapStatusOriginal) {
    for (var i = 0; i < mapStatusOriginal.length; i++) {
        for (var j = 0; j < mapStatusOriginal[i].length; j++) {
            mapStatus[i][j] = mapStatusOriginal[i][j];
        }

    }
}