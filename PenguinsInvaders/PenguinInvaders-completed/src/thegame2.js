var theGame2 = function(game){
    spriteNumber = null;
	number = 0;
	workingButtons = true;
	higher = true;
	score = 0;
    w = 800;
    h = 600;
    //var player;
    //var platforms;
    //var aliens;
    //var fireButton;
    //var cursor;
//    var bullets;
    bulletTime = 0;
    score = 0;
    scoreString = '';
  //  var scoreText;
    //var enemyBullet;
    firingTimer = 0;
    //var stateText;
    livingEnemies = [];
    enemyShootingSpeed = 200;
    chickensOnRow = 13;
    chickensColumns = 4;
    numberOfHearts = 3;
    
 
}

theGame2.prototype = {
  	create: function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.sprite(0, 0, 'space');
        
        this.createAliens();
        this.setupBullet();
        this.setupText();
        this.setupButtons();
        this.setupPlayer();
        this.setupMusic();

       
        fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        cursors = this.game.input.keyboard.createCursorKeys();


      //  this.game.input.onDown.add(this.unpause, self);
       
    },
    	update: function () {
        player.body.velocity.x = 0;
        this.moving();
        this.game.physics.arcade.overlap(bullets, this.aliens, this.collisionHandler, null, this);
        this.game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);

    },

        collisionHandler: function (bullet, alien) {
        bullet.kill();
        alien.kill();

        score += 100;
        scoreText.text = scoreString + score;

        if (this.aliens.countLiving() == 0) {
            score += 1000;
            scoreText.text = scoreString + score;


            enemyBullets.callAll('kill', this);
            stateText.text = " You Won \n Click to restart";
            stateText.visible = true;
            enemyBullets.callAll('kill');


           // this.game.input.onTap.addOnce(this.restart, this);
        }

    },

    createAliens: function () {


        this.aliens = this.game.add.group();
        this.aliens.enableBody = true;


        for (var i = 0; i < chickensOnRow; i++) {
            for (var p = 0; p < chickensColumns; p++)
                sprite = this.aliens.create(80 + i * 50, 80 + p * 50, 'penguins');
        }

    },

    enemyHitsPlayer: function (player, bullet) {

        bullet.kill();
        var live = lives.getFirstAlive();
        if (live) {
            live.kill();
        }
        if (lives.countLiving() < 1) {
            enemyBullets.visible = false;
            this.game.sound.play('Kaboom');
            player.kill();
            enemyBullets.callAll('kill');
            this.game.state.start("GameOver",true,false,score)
            bullets.visible = false;
            this.game.input.onTap.addOnce(this.restart, this);
        }
    },
    enemyFires: function () {

        enemyBullet = enemyBullets.getFirstExists(false);
        livingEnemies.length = 0;
        this.aliens.forEachAlive(function (alien) {

            livingEnemies.push(alien);
        });
        if (enemyBullet && livingEnemies.length > 0) {

            var random =this.game.rnd.integerInRange(0, livingEnemies.length - 1);

            var shooter = livingEnemies[random];

            enemyBullet.reset(shooter.body.x, shooter.body.y);
            this.game.physics.arcade.moveToObject(enemyBullet, player, enemyShootingSpeed);
            firingTimer = this.game.time.now + 2000;
        }
    },
    restart: function () {
        lives.callAll('revive');
        aliens.removeAll();
        createAliens();
        bullets.callAll('kill');
        enemyBullets.callAll('kill');
        player.revive();
        stateText.visible = false;
        score = 0;
        scoreText.text = scoreString + 0;
        // bulletsCounter = 0;
        bullets.visible = true;


    },
    moving: function () {


        if (cursors.left.isDown) {
            player.body.velocity.x = -200;
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = 200;

        }
        if (fireButton.isDown) {
            this.fireBullet();
            //game.sound.play('playerfire')
        

        }
        if (this.game.time.now > firingTimer) {
           this.enemyFires();
        }


    },
    setupBullet: function (){
        
        bullets = this.game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

        enemyBullets = this.game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets.createMultiple(30, 'enemyBullet');
        enemyBullets.setAll('anchor.x', 0.5);
        enemyBullets.setAll('anchor.y', 1);
        enemyBullets.setAll('outOfBoundsKill', true);
        enemyBullets.setAll('checkWorldBounds', true);
    },
    
    setupText: function (){
        
        scoreString = 'Score : ';
        scoreText = this.game.add.text(10, 10, scoreString + score, {font: '34px Arial', fill: '#FF0000'});

       
        lives = this.game.add.group();
        this.game.add.text(this.game.world.width - 100, 525, 'Lives : ', {font: '34px Arial', fill: '#fff'});


        stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', {font: '34px Arial', fill: '#fff'});
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;

        for (var i = 0; i < numberOfHearts; i++) {
            heart = lives.create(this.game.world.width - 80 + (30 * i), 575, 'heart');
            heart.anchor.setTo(0.5, 0.5);
        }

        
    },
    setupButtons: function (){
        
        this.restartButton =this.game.add.text(w - 200, 20, 'Restart', {font: '24px Arial', fill: '#fff'});
        this.restartButton.inputEnabled = true;
        this.restartButton.events.onInputUp.add(this.restart);


        this.pause_label =this.game.add.text(w - 100, 20, 'Pause', {font: '24px Arial', fill: '#fff'});
        this.pause_label.inputEnabled = true;
        this.pause_label.events.onInputUp.add(this.pause);
        
        //this.game.input.onDown.add(this.unpause, self);
        
    },
    setupPlayer: function () {
        player =this.game.add.sprite(32,this.game.world.height, 'ship');
        
        this.game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;   
    },
    pause: function () {
        this.game.paused = true;
        menu =this.game.add.sprite(w / 2, h / 2, 'pause');
        menu.anchor.setTo(0.5, 0.5);

        choiseLabel =this.game.add.text(w / 2, h - 250, 'Click to continue', {font: '30px Arial', fill: '#fff'});
        choiseLabel.anchor.setTo(0.5, 0.5);
    },
    unpause: function  () {
        if(this.game.paused) {
                menu.destroy();
               this.game.paused = false;
                choiseLabel.destroy();
          }
    },
    setupMusic: function (){
        music = this.game.add.audio('Theme', 1, true);  // key, volume, loop
        music.play('', 0, 1, true);   
     },
    fireBullet: function () {
        if (this.game.time.now > bulletTime) {

            bullet = bullets.getFirstExists(false);
            if (bullet) {

                bullet.reset(player.x + 25, player.y + 8);
                bullet.body.velocity.y = -400;
                bulletTime =this.game.time.now + 200;

            }
        }
    }
}