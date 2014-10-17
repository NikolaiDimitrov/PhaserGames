var play_state = {

  create: function() { 

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'space');

    
    player = game.add.sprite(32, game.world.height, 'ship');
   
 
   
    
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#FF0000' });
    
    lives = game.add.group();
    game.add.text(game.world.width -100, 525, 'Lives : ', { font: '34px Arial', fill: '#fff' });
    
    
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '34px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

     
    for (var i = 0; i < numberOfHearts; i++) 
    {
        var heart = lives.create(game.world.width - 80 + (30 * i), 575, 'heart');
        heart.anchor.setTo(0.5, 0.5);
    }   
    
    
    createAliens() ;
    
    
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);



    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    cursors = game.input.keyboard.createCursorKeys();
    

    
    
    restartButton = game.add.text(w - 200, 20, 'Restart', { font: '24px Arial', fill: '#fff' });
    restartButton.inputEnabled = true;
    restartButton.events.onInputUp.add(restart);
  
   
    pause_label = game.add.text(w - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(pause);
    

    
    game.input.onDown.add(unpause, self);

    function unpause(){
        if(game.paused){
                menu.destroy();
                game.paused = false;
                choiseLabel.destroy();
        }
    };
}



function update() {
  

    player.body.velocity.x = 0;
   
    moving();
    game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
    game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
    
}
    
  function collisionHandler (bullet, alien) {
    bullet.kill();
    alien.kill();
   
    score += 100;
    scoreText.text = scoreString + score;  
    
    if (aliens.countLiving() == 0)
    {
        score += 1000;
        scoreText.text = scoreString + score;
        
        
        
        enemyBullets.callAll('kill',this);
        stateText.text = " You Won \n Click to restart";
        stateText.visible = true;
        enemyBullets.callAll('kill');
        
     
        game.input.onTap.addOnce(restart,this);
    }
      
  }
   
function createAliens() {
    
    
     aliens = game.add.group();
     aliens.enableBody = true;
    
    
    for (var i = 0; i < chickensOnRow ; i++)
    {
        for(var p = 0; p < chickensColumns ; p++)
            sprite = aliens.create(80 + i*50,80 + p*50, 'penguins');
           }
    
}
    
    function enemyHitsPlayer (player,bullet) {
    
    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }
    
  
    if (lives.countLiving() < 1)
    {
        player.kill();
        enemyBullets.callAll('kill');
        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;
        bullets.visible = false;

        
        
        game.input.onTap.addOnce(restart,this);
    }

}

function enemyFires () {

    
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length=0;

    aliens.forEachAlive(function(alien){

        
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

      
        var shooter=livingEnemies[random];
        
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,enemyShootingSpeed);
        firingTimer = game.time.now + 2000;
    }

}

    function restart () {

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
    
   
    
}
    function moving() {
        
        
      if (cursors.left.isDown)
    {
        player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 200;
 
    }
   if (fireButton.isDown)
   {
    fireBullet();
   // bulletsCounter++;
       
   }

    if (game.time.now > firingTimer)
    {
        
        enemyFires();
    }
       
        
        
        
        
    }
  function easy() {
            
    restart();
    enemyShootingSpeed = enemyShootingSpeed*2;   
        
        
   }

    
    function pause () {
    game.paused = true;
    menu = game.add.sprite(w/2, h/2, 'pause');
    menu.anchor.setTo(0.5, 0.5);
    
    choiseLabel = game.add.text(w/2, h-250, 'Click to continue', { font: '30px Arial', fill: '#fff' });
    choiseLabel.anchor.setTo(0.5, 0.5);

    }
    
 function fireBullet () {

    if (game.time.now > bulletTime)
    {
    
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            
            bullet.reset(player.x+25, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }




 };