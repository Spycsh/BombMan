// var game = new Phaser.Game(800, 600, Phaser.AUTO, { preload: preload, create: create, update: update, render: render });
var game = new Phaser.Game(600, 600, Phaser.CANVAS, 'Bomb Man', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.tilemap('map', 'asset/forest.csv', null, Phaser.Tilemap.csv);
    game.load.image('tiles', 'asset/testItems.png');

    game.load.image('bomb1', 'asset/bomb.png');

    // spritesheet player
    game.load.spritesheet('player', 'asset/bombman.png', 16, 16);
}

var map;
var layer;
var cursors;
var spaceKey;
var player;

function Bomb(x, y, img, iteration) {
    this.bomb_x = x;
    this.bomb_y = y;

    // this.timer = timer;

    this.image = img;
    this.iteration = iteration;
}

// function bombExplode(){
//     // do not loop anymore
//     cur_bomb.timer.stop();
//     // // alert("aa");
//     // this.cur_bomb.image.destroy();
//     cur_bomb.image.destroy();
//     // alert(cur_bomb.bomb_x);


// }

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




}

var bombArray = new Array(15);
for (var i = 0; i < 15; i++) {
    bombArray[i] = new Array(20)
}


// temp_x = -1;
// temp_y = -1;

bombList = [];
iteration = 0;

function update() {
    iteration++;
    game.physics.arcade.collide(player, layer);
    player.body.collideWorldBounds = true;

    player.body.velocity.set(0);

    // movement
    if (cursors.left.isDown) {
        player.body.velocity.x = -100;
        player.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 100;
        player.play('right');
    }
    else if (cursors.up.isDown) {
        player.body.velocity.y = -100;
        player.play('up');
    }
    else if (cursors.down.isDown) {
        player.body.velocity.y = 100;
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
        img = game.add.image(bomb_x, bomb_y, 'bomb1');

        bomb = new Bomb(bomb_x, bomb_y, img, iteration);
        bombList.push(bomb);
        // setInterval(function(){cur_bomb.image.destroy()},1000);
        // bombArray[bomb_y/20][bomb_x/20] = cur_bomb;

        // timer
        // timer = game.time.create(true);
        // //  Set a TimerEvent to occur after 2 seconds


        // // 它需要在末尾使用this参数来指向该对象，因此我必须像这样将其放在末尾：
        // cur_bomb.timer.loop(2000, bombExplode, cur_bomb);  // 2000->2s , invoke bombExplode function, can oprate current bomb

        // //  Start the timer running - this is important!
        // //  It won't start automatically, allowing you to hook it to button events and the like.
        // cur_bomb.timer.start();
        // }



    }

    for (var i = 0; i < bombList.length; i++) {
        // after an interval a bomb may explode
        if ((iteration - bombList[i].iteration) == 100) {
            curBomb = bombList[i];
            curBomb.image.destroy();
            // alert("0");
            // chain explosion
            // i-=1;
            // bombList.pop(i);
            bombChain(curBomb);


        }
    }
}


// potential problem how to pop out the elements 
// that has been used in a loop
// without influencing the list?
// may lead to a too large list
function bombChain(curBomb) {
    for (var j = 0; j < bombList.length; j++) {
        // if image has been destroyed, skip
        if (bombList[j].image.alive != false) {
            // the adjacent bomb will cause each other to die
            if (Math.abs(curBomb.bomb_x - bombList[j].bomb_x) <= 20 && (curBomb.bomb_y == bombList[j].bomb_y)) {
                bombList[j].image.destroy();
                bombChain(bombList[j]);
            }
            if (Math.abs(curBomb.bomb_y - bombList[j].bomb_y) <= 20 && (curBomb.bomb_x == bombList[j].bomb_x)) {
                bombList[j].image.destroy();
                bombChain(bombList[j]);
                // bombList.pop(j);
            }

        }

    }
    return;

}

function render() {

}
