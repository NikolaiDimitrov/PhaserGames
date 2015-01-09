
BasicGame.Game = function (game) {
   console.log("stiga li do tuka ? ")
};

BasicGame.Game.prototype = {

  create: function () {
  
      console.log("niggaa")
    this.sea = this.add.tileSprite(0, 0, 800, 600, 'space');
    
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.add.sprite(0, 0, 'space');
    
    this.player = game.add.sprite(32, game.world.height, 'ship');
   
 
   
    
    this.scoreString = 'Score : ';
    this.scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#FF0000' });
    
    this.lives = game.add.group();
    this.game.add.text(game.world.width -100, 525, 'Lives : ', { font: '34px Arial', fill: '#fff' });
    
    
    this.stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '34px Arial', fill: '#fff' });
    this.stateText.anchor.setTo(0.5, 0.5);
    this.stateText.visible = false;
     
    for (var i = 0; i < numberOfHearts; i++) 
    {
        var heart = lives.create(game.world.width - 80 + (30 * i), 575, 'heart');
        this.heart.anchor.setTo(0.5, 0.5);
    }   
    
    
    this.music = game.add.audio('Theme',1,true);  // key, volume, loop
    this.music.play('',0,1,true);
    
    this.createAliens() ;
    
    
    
    this.game.physics.arcade.enable(player);
    this.player.body.collideWorldBounds = true;
    
    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    
    this.enemyBullets = game.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullets.createMultiple(30, 'enemyBullet');
    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 1);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);
    this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.cursors = game.input.keyboard.createCursorKeys();
    
    
    
    this.restartButton = game.add.text(w - 200, 20, 'Restart', { font: '24px Arial', fill: '#fff' });
    this.restartButton.inputEnabled = true;
    this.restartButton.events.onInputUp.add(restart);
  
   
    this.pause_label = game.add.text(w - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
    this.pause_label.inputEnabled = true;
    this.pause_label.events.onInputUp.add(pause);
    
    
   // game.input.onDown.add(unpause, self); 

  },

    
  update: function () {
   this.player.body.velocity.x = 0;
   
    this.moving();
    this.game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
    this.game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
  }
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
    this.scoreText.text = scoreString + score;  
    
    if (this.aliens.countLiving() == 0)
    {
        this.score += 1000;
        this.scoreText.text = scoreString + score;
        
        
        
        this.enemyBullets.callAll('kill',this);
        this.stateText.text = " You Won \n Click to restart";
        this.stateText.visible = true;
        this.enemyBullets.callAll('kill');
        
     
        this.game.input.onTap.addOnce(restart,this);
    }
      
  }
    
  createAliens: function() {
    
    
     this.aliens = game.add.group();
     this.aliens.enableBody = true;
    
    
    for (var i = 0; i < chickensOnRow ; i++)
    {
        for(var p = 0; p < chickensColumns ; p++)
            this.sprite = aliens.create(80 + i*50,80 + p*50, 'penguins');
           }
    
}  
    
    enemyHitsPlayer: function(player,bullet) {
    
    this.bullet.kill();
    this.live = lives.getFirstAlive();
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
        
        
        this.game.input.onTap.addOnce(restart,this);
    }
}
    
  enemyFires: function() {
    
    this.enemyBullet = enemyBullets.getFirstExists(false);
    this.livingEnemies.length=0;
    this.aliens.forEachAlive(function(alien){
        
        this.livingEnemies.push(alien);
    });
    if (this.enemyBullet && this.livingEnemies.length > 0)
    {
        
        var random=this.game.rnd.integerInRange(0,livingEnemies.length-1);
      
        var shooter=this.livingEnemies[random];
        
        this.enemyBullet.reset(shooter.body.x, shooter.body.y);
        this.game.physics.arcade.moveToObject(enemyBullet,player,enemyShootingSpeed);
        this.firingTimer = game.time.now + 2000;
    }
} 
    
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
    }
    
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
 }
    
    pause: function () {
        this.game.paused = true;
        this.menu = game.add.sprite(w/2, h/2, 'pause');
        this.menu.anchor.setTo(0.5, 0.5);

        this.choiseLabel = game.add.text(w/2, h-250, 'Click to continue', { font: '30px Arial', fill: '#fff' });
        this.choiseLabel.anchor.setTo(0.5, 0.5);
    } 
    
    firebullet: function () {
    if (this.game.time.now > this.bulletTime)
    {
    
        this.bullet = bullets.getFirstExists(false);
        if (this.bullet)
        {
            
            this.bullet.reset(player.x+25, player.y + 8);
            this.bullet.body.velocity.y = -400;
            this.bulletTime = game.time.now + 200;
           
        }
    }
 }  
    
    quitGame: function (pointer) {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    this.state.start('MainMenu');

  }

};
