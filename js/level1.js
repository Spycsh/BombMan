class Level1 extends Phaser.State {
    map;
    layer;
    cursors;
    spaceKey;

    player;

    // set the player to avoid all the damage
    GOD_MODE = false;
    // set the time that the player is invincible
    GOD_MODE_Time = 150;

    enemy;

    enemy_HP;

    enemy_speed = 100;

    HP_potions = [];

    power_potions = [];

    speed = 100;

    shoes = [];

    bombMan_HP = 1200;

    bomb_power = 500;

    preload() {
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
        game.load.spritesheet('player', 'asset/bombman.png', 20, 20);

        // enemy
        game.load.spritesheet('enemy', 'asset/enemy.png', 20, 20)
    }

    create() {
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
        player.animations.add('die', [14], 10, true);


        game.physics.enable(player, Phaser.Physics.ARCADE);

        // (10,14,2,1)
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
        HP_potions.push(game.add.sprite(20, 120, 'HP_potion'));
        HP_potions.push(game.add.sprite(300, 220, 'HP_potion'));
        for (var i = 0; i < HP_potions.length; i++) {
            game.physics.enable(HP_potions[i], Phaser.Physics.ARCADE);

        }

        power_potions.push(game.add.sprite(180, 120, 'power_potion'));
        power_potions.push(game.add.sprite(140, 220, 'power_potion'));
        for (var i = 0; i < power_potions.length; i++) {
            game.physics.enable(power_potions[i], Phaser.Physics.ARCADE);

        }

        shoes.push(game.add.sprite(340, 280, 'shoe'));
        shoes.push(game.add.sprite(340, 180, 'shoe'));
        for (var i = 0; i < shoes.length; i++) {
            game.physics.enable(shoes[i], Phaser.Physics.ARCADE);

        }

        // set the enemy
        enemySet();

    }

    update() {
        function update() {

            // reset the lists
            openList = [];
            closedList = [];
        
            GOD_MODE_check();
        
            touchEnemy();
        
            explosionOnPlayer();
        
            explosionOnEnemy();
        
            bombManAliveCheck();
        
        
            enemyPathFinding(
                mapStatus,
                parseInt((enemy.position.y + 10) / 20),
                parseInt((enemy.position.x + 10) / 20),
                parseInt((player.position.y + 10) / 20),
                parseInt((player.position.x + 10) / 20),
                [],
                [],
                []
        
            );
        
            if (enemy.alive) {
                // "whole body check"
                // only when the enemy is wholy in a grid, it will change its direction!
                if ((enemy.body.x / 20 % 1 === 0) && (enemy.body.y / 20 % 1 === 0)) {
        
                    // weight must be set to the integral of 0.3
                    // do not know exactly why
                    // may be it is related to frame rate per second(FPS) which is 30?
                    // if the speed(distance per second) be the integral of 30
                    // it will be good for the "whole body check"
                    var weight = 0.6;
        
        
                    var curPoint = pathAns[pathAns.length - 1];
        
                    var pathNext;
                    (pathAns[pathAns.length - 2] != undefined) ? (pathNext = pathAns[pathAns.length - 2]) : (pathNext = pathAns[0]);
                    if (pathNext != undefined) {
                        if (pathNext[1] - curPoint[1] > 0) {
                            enemy.body.velocity.x = enemy_speed * weight;
                        }
                        else if (pathNext[1] - curPoint[1] == 0) {
                            enemy.body.velocity.x = 0;
                        }
                        else if (pathNext[1] - curPoint[1] < 0) {
                            enemy.body.velocity.x = -enemy_speed * weight;
                        }
        
                        if (pathNext[0] - curPoint[0] < 0) {
                            enemy.body.velocity.y = -enemy_speed * weight;
                        }
                        else if (pathNext[0] - curPoint[0] == 0) {
                            enemy.body.velocity.y = 0;
                        }
                        else if (pathNext[0] - curPoint[0] > 0) {
                            enemy.body.velocity.y = enemy_speed * weight;
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
        
            if (enemy.alive) {
                game.physics.arcade.collide(enemy, layer);
                enemy.body.collideWorldBounds = true;
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
        
        
        
            }
        
            // this line must be written out the space key event block
            // do not know why
            for (var i = 0; i < b_spriteList.length; i++) {
                // if(b_spriteList[i].alive == true){
                game.physics.arcade.collide(player, b_spriteList[i]);
                game.physics.arcade.collide(enemy, b_spriteList[i]);
        
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