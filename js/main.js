// var game = new Phaser.Game(800, 600, Phaser.AUTO, { preload: preload, create: create, update: update, render: render });
var game = new Phaser.Game(600,600, Phaser.CANVAS,'Bomb Man',{ preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.tilemap('map','asset/forest.csv',null,Phaser.Tilemap.csv);
    game.load.image('tiles','asset/testItems.png');

    game.load.image('bomb1', 'asset/bomb.png');

    // spritesheet player
    game.load.spritesheet('player','asset/bombman.png',16,16);
}

var map;
var layer;
var cursors;
var spaceKey;
var player;

function create() {
    game.stage.backgroundColor = "#4488AA";
    
    map = game.add.tilemap('map',20,20);
    // set collsion to trees
    map.setCollisionByIndex(9);
    // add Tile set
    map.addTilesetImage('tiles');
    
    layer = map.createLayer(0);

    // layer.scale.set(1.5);
    layer.resizeWorld();
    // game.scale.setGameSize(800, 600);


    // player
    player = game.add.sprite(380,240,'player',1);

    // player dynamic
    // frame 8,9 as actions
    player.animations.add('left', [8,9], 10, true);
    player.animations.add('right', [1,2], 10, true);
    player.animations.add('up', [11,12,13], 10, true);
    player.animations.add('down', [4,5,6], 10, true);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.setSize(10, 14, 2, 1);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR ]);


    var help = game.add.text(216, 16, 'Arrows to move', { font: '14px Arial', fill: '#ffffff' });
    help.fixedToCamera = true;



}

function update() {
    game.physics.arcade.collide(player, layer);
    player.body.collideWorldBounds = true;

    player.body.velocity.set(0);

    // movement
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -100;
        player.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 100;
        player.play('right');
    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -100;
        player.play('up');
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 100;
        player.play('down');
    }
    else
    {
        player.animations.stop();
    }

    // bomb operation
    // if(game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR))
    if(spaceKey.isDown){
        // set position of the bomb in a tile
        bomb_x = parseInt((player.position.x+10)/20)*20;  
        bomb_y = parseInt((player.position.y+12)/20)*20;
        game.add.image(bomb_x, bomb_y, 'bomb1');
    }



}

function render() {

}
