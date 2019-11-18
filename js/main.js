// var game = new Phaser.Game(800, 600, Phaser.AUTO, { preload: preload, create: create, update: update, render: render });
var game = new Phaser.Game(600, 600, Phaser.CANVAS, 'Bomb Man', { preload: preload, create: create, update: update, render: render });


function preload() {
    game.load.tilemap('map', 'asset/forest.csv', null, Phaser.Tilemap.csv);
    game.load.image('tiles', 'asset/testItems.png');

    game.load.image('bomb1', 'asset/bomb.png');

    game.load.image('explode_center', 'asset/b_center.png');

    game.load.image('explode_left_right', 'asset/b_lr.png');

    game.load.image('explode_up_down', 'asset/b_ud.png');

    game.load.image('HP_potion', 'asset/HP_potion.png');

    game.load.image('power_potion', 'asset/power_potion.png');

    game.load.image('shoe', 'asset/shoe.png');


    // spritesheet player
    game.load.spritesheet('player', 'asset/bombman.png', 16, 16);
}

var map;
var layer;
var cursors;
var spaceKey;
var player;
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



// function bombExplode(){
//     // do not loop anymore
//     cur_bomb.timer.stop();
//     // // alert("aa");
//     // this.cur_bomb.image.destroy();
//     cur_bomb.image.destroy();
//     // alert(cur_bomb.bomb_x);


// }

// the bomb sprite list for collision
var b_spriteList = [];



function create() {


    game.stage.backgroundColor = "#4488AA";

    map = game.add.tilemap('map', 20, 20);
    // set collsion to trees
    map.setCollisionByIndex(9);
    // add Tile set
    map.addTilesetImage('tiles');

    layer = map.createLayer(0);

    // layer.scale.set(1.5);
    layer.resizeWorld();
    // game.scale.setGameSize(800, 600);


    // player
    player = game.add.sprite(380, 240, 'player', 1);

    // player dynamic
    // frame 8,9 as actions
    player.animations.add('left', [8, 9], 10, true);
    player.animations.add('right', [1, 2], 10, true);
    player.animations.add('up', [11, 12, 13], 10, true);
    player.animations.add('down', [4, 5, 6], 10, true);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.setSize(10, 14, 2, 1);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR ]);


    var help = game.add.text(216, 16, 'Arrows to move', { font: '14px Arial', fill: '#ffffff' });
    help.fixedToCamera = true;


    game.HPText = game.add.text(420, 50, 'player HP: 0', { fontSize: '16px', fill: '#000' });

    game.bomb_powerText = game.add.text(420, 80, 'bomb power : 0', { fontSize: '16px', fill: '#000' });

    game.speedText = game.add.text(420, 110, 'speed: 0', { fontSize: '16px', fill: '#000' });

    // add some potions
    HP_potions.push(game.add.sprite(20,120,'HP_potion'));
    HP_potions.push(game.add.sprite(300,220,'HP_potion'));
    for(var i=0;i<HP_potions.length;i++){
        game.physics.enable(HP_potions[i], Phaser.Physics.ARCADE);

    }
    
    power_potions.push(game.add.sprite(180,120,'power_potion'));
    power_potions.push(game.add.sprite(140,220,'power_potion'));
    for(var i=0;i<power_potions.length;i++){
        game.physics.enable(power_potions[i], Phaser.Physics.ARCADE);

    }

    shoes.push(game.add.sprite(340,280,'shoe'));
    shoes.push(game.add.sprite(340,180,'shoe'));
    for(var i=0;i<shoes.length;i++){
        game.physics.enable(shoes[i], Phaser.Physics.ARCADE);

    }
    


}

function collectHP_potion(HP_potion){
    HP_potion.destroy();

    bombMan_HP += 250;
    game.HPText.setText('player HP: ' + bombMan_HP);
}

function collectpower_potion(power_potion){
    power_potion.destroy();
    bomb_power += 250;
    game.bomb_powerText.setText('bomb power: ' + bomb_power);
}

function collectshoe_potion(shoe){
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

// temp_x = -1;
// temp_y = -1;

var bombList = [];
var iteration = 0;


// explosion damage to the player depended on the explosion extent
function explosionOnPlayer(){
    bombMan_HP -= bomb_power * statusArray[parseInt((player.position.y + 10) / 20)][parseInt((player.position.x + 10) / 20)];

    if(bombMan_HP<=0){
        alert("GG, Resurvive!");
        bombMan_HP = 1200;
        bomb_power = 500;
        speed = 100;
    }

    game.HPText.setText("player HP: "+bombMan_HP);
    game.bomb_powerText.setText("bomb power: "+bomb_power);
    game.speedText.setText("player speed: "+speed);


    

}

function update() {
    explosionOnPlayer();

    for(var i=0;i<HP_potions.length;i++){
        if(game.physics.arcade.overlap(player, HP_potions[i])){
            collectHP_potion(HP_potions[i]);
        }
    }

    for(var i=0;i<power_potions.length;i++){
        if(game.physics.arcade.overlap(player, power_potions[i])){
            collectpower_potion(power_potions[i]);
        }
    }

    for(var i=0;i<shoes.length;i++){
        if(game.physics.arcade.overlap(player, shoes[i])){
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
        bomb_y = parseInt((player.position.y + 12) / 20) * 20;
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



    }       

    // this line must be written out the space key event block
    // do not know why
    for(var i=0;i<b_spriteList.length;i++){
        // if(b_spriteList[i].alive == true){
            game.physics.arcade.collide(player, b_spriteList[i]);

        // }

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
                        statusArray[explosionPoints.horizontal[i].y / 20 ][explosionPoints.horizontal[i].x / 20 ] += 1;
                    };
                }
                for (var i = 0; i < explosionPoints.vertical.length; i++) {
                    if ((explosionPoints.vertical[i].y <= 280) && (explosionPoints.vertical[i].y >= 0)) {
                        statusArray[explosionPoints.vertical[i].y / 20 ][explosionPoints.vertical[i].x / 20 ] += 1;
                    };
                }
                for (var i = 0; i < explosionPoints.center.length; i++) {
                    statusArray[explosionPoints.center[i].y / 20 ][explosionPoints.center[i].x / 20 ] += 1;

                }
                // boss check
                // if boss is in the explosion area 
                // it will be killed based on the explosion extent


            }
        }
    }
}

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

function render() {

}
