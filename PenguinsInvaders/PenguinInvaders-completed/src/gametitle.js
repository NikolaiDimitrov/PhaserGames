var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
		var gameTitle = this.game.add.sprite(400,300,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(400,400,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
        this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 150, "Click play to start", { font: "20px monospace", fill: "#fff" });
        this.loadingText.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height - 90, "image assets Eleonora Asparuhova ", { font: "12px monospace", fill: "#fff", align:   "center"}).anchor.setTo(0.5, 0.5);
    this.add.text(this.game.width / 2, this.game.height - 75, "sound assets http://soundbible.com/ ", { font: "12px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}