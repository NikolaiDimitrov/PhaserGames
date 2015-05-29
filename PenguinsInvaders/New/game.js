BasicGame.Gamedd = function (game) {

};

BasicGame.Game.prototype = {

create: function () {
this.setupBackground();
this.setupPlayer();
this.setupEnemies();
this.setupText();


 this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 this.cursors = game.input.keyboard.createCursorKeys();
},

update: function(){
	this.collisionHandler;
},

 setupBackground: function () {
    this.sea = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'sea');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },
  setupPlayer: function() {
 	this.player = this.add.sprite(32, game.world.height, 'ship');
 	this.game.physics.arcade.enable(player);
    this.player.body.collideWorldBounds = true;
  },
  setupEnemies: function(){
  	this.aliens = this.add.group();
    this.aliens.enableBody = true;
    
    
    for (var i = 0; i < 13 ; i++)
    {
        for(var p = 0; p < 4 ; p++)
        {
            this.sprite = aliens.create(80 + i*50,80 + p*50, 'penguins');
        }
    
	}  
  },
  setupBullets: function(){
 	this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    
    this.enemyBullets = this.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullets.createMultiple(30, 'enemyBullet');
    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 1);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);
  },
  setupText: function() {
  	this.restartButton = this.add.text(w - 200, 20, 'Restart', { font: '24px Arial', fill: '#fff' });
    this.restartButton.inputEnabled = true;
    this.restartButton.events.onInputUp.add(restart);
  
   
    this.pause_label = this.add.text(w - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
    this.pause_label.inputEnabled = true;
    this.pause_label.events.onInputUp.add(pause);

    this.scoreString = 'Score : ';
    this.scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#FF0000' });
    
    this.lives = game.add.group();
    this.game.add.text(game.world.width -100, 525, 'Lives : ', { font: '34px Arial', fill: '#fff' });
    
    
    this.stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '34px Arial', fill: '#fff' });
    this.stateText.anchor.setTo(0.5, 0.5);
    this.stateText.visible = false;
     
    for (var i = 0; i < this.numberOfHearts; i++) 
    {
        var heart = lives.create(game.world.width - 80 + (30 * i), 575, 'heart');
        this.heart.anchor.setTo(0.5, 0.5);
    }   
    },
    chekCollisions: function() {
    this.game.physics.arcade.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);
    this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);

    },
 	enemyHitsPlayer: function(player,bullet) {
    
    this.bullet.kill();
    this.live = this.lives.getFirstAlive();
    if (this.live)
    {
        this.live.kill();
    }
    
  
    if (this.lives.countLiving() < 1)
    {
        this.game.sound.play('Kaboom'); 
        this.player.kill();
        this.enemyBullets.callAll('kill');
        this.stateText.text=" GAME OVER \n Click to restart";
        this.stateText.visible = true;
        this.bullets.visible = false;
        
        
        this.input.onTap.addOnce(restart,this);
    }
},

enemyFires: function() {
    
    this.enemyBullet = this.enemyBullets.getFirstExists(false);
    this.livingEnemies.length=0;
    this.aliens.forEachAlive(function(alien){
        
        this.livingEnemies.push(alien);
    });
    if (this.enemyBullet && this.livingEnemies.length > 0)
    {
        
        var random=this.rnd.integerInRange(0,livingEnemies.length-1);
      
        var shooter=this.livingEnemies[random];
        
        this.enemyBullet.reset(shooter.body.x, shooter.body.y);
        this.game.physics.arcade.moveToObject(this.enemyBullet,this.player,this.enemyShootingSpeed);
        this.firingTimer = game.time.now + 2000;
    }
},
   restat: function () {
        this.lives.callAll('revive');
        this.aliens.removeAll();
        this.createAliens();
        this.bullets.callAll('kill');
        this.enemyBullets.callAll('kill');
        this.player.revive();
        this.stateText.visible = false;
        this.score = 0;
        this.scoreText.text = scoreString + 0;
       // bulletsCounter = 0;    
       this.bullets.visible = true;
    },
    
    moving: function () {
        
        
      if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -200;
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 200;
 
    }
   if (this.fireButton.isDown)
   {
    this.fireBullet();
       // bulletsCounter++;
       
   }
    if (this.game.time.now > this.firingTimer)
    {
        
        this.enemyFires();
    }
 },

 unpause: function(){
        if(this.game.paused){
                this.menu.destroy();
                this.game.paused = false;
                this.choiseLabel.destroy();
        }
    };
    
      
  collisionHandler: function(bullet, alien) {
    this.bullet.kill();
    this.alien.kill();
   
    this.score += 100;
    this.scoreText.text = this.scoreString + this.score;  
    
    if (this.aliens.countLiving() == 0)
    {
        this.score += 1000;
        this.scoreText.text = this.scoreString + this.score;
        
        
        
        this.enemyBullets.callAll('kill',this);
        this.stateText.text = " You Won \n Click to restart";
        this.stateText.visible = true;
        this.enemyBullets.callAll('kill');
        
     
        this.game.input.onTap.addOnce(restart,this);
    }
      
  }
};