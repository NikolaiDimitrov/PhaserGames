
BasicGame.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;



};

BasicGame.Preloader.prototype = {

  preload: function () {

  
    this.stage.backgroundColor = '#2d2d2d';

    this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
    this.add.text(this.game.width / 2, this.game.height / 2 - 30, "Loading...", { font: "32px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

   
    this.load.setPreloadSprite(this.preloadBar);

 
    this.load.image('titlepage', 'assets/titlepage2.png');
    this.game.load.image('space', 'assets/space.png');
    this.game.load.image('ship', 'assets/spaceship.png');
    this.game.load.image('penguins','assets/BadPenguins.png');
    this.game.load.image('bullet','assets/fireball.png');
    this.game.load.image('enemyBullet','assets/snowball.png');
    this.game.load.image('pause','assets/pause.png');
    this.game.load.image('heart', 'assets/heart.png');
    this.game.load.audio('Kaboom', 'assets/Kaboom.ogg');
    this.game.load.audio('Theme', 'assets/Theme.ogg');
   


  },

  create: function () {

   
    this.preloadBar.cropEnabled = false;
  /*
      var w = 800;
    var h = 600;
    var player;
    var platforms;
    var aliens;
    var fireButton; 
    var cursor;    
    var bullets;
    var bulletTime = 0;
    var score = 0;
    var scoreString = '';
    var scoreText;
    var enemyBullet;
    var firingTimer = 0;
    var stateText;
    var livingEnemies = [];
    var enemyShootingSpeed  = 200;
    var chickensOnRow = 13;
    var chickensColumns = 4;    
    var numberOfHearts = 3;
*/
  },

  update: function () {
      

      this.state.start('MainMenu');
   

  }

};
