var gameOver = function(game){}

gameOver.prototype = {
	init: function(score){
		alert("You scored: "+score)
	},
  	create: function(){
  		var gameOverTitle = this.game.add.sprite(400,160,"gameover");
		gameOverTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(400,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}