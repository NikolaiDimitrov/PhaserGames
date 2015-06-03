var preload = function(game){}

preload.prototype = {
	preload: function(){ 
          var loadingBar = this.add.sprite(160,240,"loading");
          loadingBar.anchor.setTo(0.5,0.5);
          this.load.setPreloadSprite(loadingBar);
		this.game.load.image("gametitle","assets/Pictures/titlepage2.png");
		this.game.load.image("play","assets/Pictures/play.png");
		this.game.load.image("gameover","assets/Pictures/gameover.png");
        this.game.load.image('space', 'assets/Pictures/space_level1.png');
        this.game.load.image('ship', 'assets/Pictures/spaceship.png');
        this.game.load.image('penguins', 'assets/Pictures/BadPenguins.png');
        this.game.load.image('bullet', 'assets/Pictures/fireball.png');
        this.game.load.image('enemyBullet', 'assets/Pictures/snowball.png');
        this.game.load.image('pause', 'assets/Pictures/pause.png');
        this.game.load.image('heart', 'assets/Pictures/heart.png');
        this.game.load.audio('Kaboom', 'assets/sounds/Kaboom.ogg');
        this.game.load.audio('Theme', 'assets/sounds/Theme.ogg');
        this.game.load.audio('playerfire', 'assets/sounds/player-fire.ogg');

	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}