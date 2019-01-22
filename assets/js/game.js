
        var game = new Phaser.Game(800,600, Phaser.CANVAS, 'gameDiv'),
            spacefield,
            backgroundv,
            player,
            cursors,
            bullets,
            bulletTime = 0,
            fireButton,
            enemies,
            score = 0,
            txtPressStart,
            scoreText,
            winText,
            endText,
            audioBullet,
            counter = 0;

        var mainState = {

            preload:function(){
                game.load.image('spacefield', "img-js/spacefield.jpg");
                game.load.image('player', "img-js/player.png");
                game.load.image('bullet', "img-js/bullet.png");
                game.load.image('enemy',  "img-js/enemy.png");
                game.load.audio('stars', "audio-js/stars.ogg");
            },

            create:function(){
                spacefield = game.add.tileSprite(0, 0, 800, 600,'spacefield');
                backgroundv = 2;

                player = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'player');
                game.physics.enable(player, Phaser.Physics.ARCADE);

                cursors = game.input.keyboard.createCursorKeys();

                bullets = game.add.group();
                bullets.enableBody = true;
                bullets.physicsBodyType = Phaser.Physics.ARCADE;
                bullets.createMultiple(30, 'bullet');
                bullets.setAll('anchor.x', 0.5);
                bullets.setAll('anchor.y', 1);
                bullets.setAll('outOfBoundsKill', true);
                bullets.setAll('checkWorldBounds', true);
                //
                audioBullet = game.add.audio('stars');//criando objeto audio
                audioBullet.loop = true;
                audioBullet.volume = .5;
                audioBullet.play();//assim q for criado, vai começar a musica

                fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                enemies = game.add.group();
                enemies.enableBody = true;
                enemies.physicsBodyType = Phaser.Physics.ARCADE;

                createEnemies();
                scoreText = game.add.text(0,550,'Score: ',{font:'32px Arial',fill: '#fff'});    

                //text win game
                winText = game.add.text(game.world.centerX - 100, game.world.centerY, 'Congratulations!\nYou Win!',{font:'32px emulogic', fill: '#fff'});
                winText.visible = false;

                //text end game
                endText = game.add.text(game.world.centerX - 90, game.world.centerY - 50, 'You Lose!\nClick to restart', {font:'32px emulogic', fill: '#fff'});
                endText.visible = false;

            },

            update:function(){
                game.physics.arcade.overlap(bullets, enemies, collisionHandler,null,this);

                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                spacefield.tilePosition.y += backgroundv;

                if(cursors.left.isDown){
                    player.body.velocity.x -= 350;
                    
                }
                if(cursors.right.isDown){
                    player.body.velocity.x = 350;
                }


                if(fireButton.isDown){
                    fireBullet();
                }

                scoreText.text = 'Score: '+ score;

                if(score == 4000){
                    winText.visible = true;
                    scoreText.visible = false;
                    player.kill();
                    //contar
                    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
                }
            },
    }

function updateCounter() {
    counter++;
    if(counter == 15){
        restart();
    }
}
function fireBullet(){
    if(game.time.now > bulletTime){
        bullet = bullets.getFirstExists(false);

        if(bullet){
            bullet.reset(player.x + 14, player.y);
            bullet.body.velocity.y -= 400;
            bulletTime = game.time.now + 200;
        }
    }
}

function createEnemies(){
    for(var y = 0; y < 4; y++){
        for(var x = 0; x < 10; x++){
            var enemy = enemies.create(x*48, y*50, 'enemy');
            enemy.anchor.setTo(0.5,0.5);
        }
    }

    enemies.x = 100;
    enemies.y = 50;

    var tween = game.add.tween(enemies).to({x:200}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    tween.onLoop.add(descend, this);
}


function descend(){
    enemies.y += 10;
}

function collisionHandler(bullet, enemy){
    bullet.kill();
    enemy.kill();

    score += 100;
}

function restart () {
    score = 0;
    scoreText.visible = true;
    winText.visible = false;
    endText.visible = false;

    enemies.removeAll();
    createEnemies();
    player.revive();
}

    game.state.add('mainState', mainState);
    game.state.start('mainState');