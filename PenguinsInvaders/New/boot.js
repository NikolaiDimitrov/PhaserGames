var BasicGame = { 
w: 800,
h: 600,
bulletTime: 0,
score: 0,
firingTimer: 0,
enemyShootingSpeed: 200,
chickensOnRow: 13,
chickensColumns: 4,    
numberOfHearts: 3

    
    // player,
   //  platforms;
  /*   aliens;
     fireButton; 
     cursor;    
     bullets;
    scoreString = '';
     scoreText;
     enemyBullet;
     stateText;
     livingEnemies = [];*/
    
   
};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

  preload: function () {

    this.load.image('preloaderBar', 'assets/preloader-bar.png');

  },

  create: function () {

    
    this.state.start('Preloader');

  }

};
