
BasicGame.MainMenu = function (game) {


};

BasicGame.MainMenu.prototype = {

  create: function () {

 

    this.add.sprite(0, 0, 'titlepage');
    console.log("Stiga li do tuka ??");

    this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 80, "Press Z for easy!", { font: "20px monospace", fill: "#fff" });
    this.loadingText.anchor.setTo(0.5, 0.5);
    this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 100, "Press X for normal!", { font: "20px monospace", fill: "#fff" });
    this.loadingText.anchor.setTo(0.5, 0.5);
    this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 120, "Press C for hard!", { font: "20px monospace", fill: "#fff" });
    this.loadingText.anchor.setTo(0.5, 0.5);
     console.log("areradasdasdda");
      this.add.text(this.game.width / 2, this.game.height - 90, "image assets Copyright (c) ", { font: "12px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);
    this.add.text(this.game.width / 2, this.game.height - 75, "sound assets Copyright (c) ", { font: "12px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);
     console.log("Stiga li do tuka ??");
  },
  update: function () {
          console.log("Stiga li do tuka up to date ??");
    if (this.input.keyboard.isDown(Phaser.Keyboard.X)) {
        
      this.startGame();
    }
    
    else if (this.input.keyboard.isDown(Phaser.Keyboard.Z)|| this.input.activePointer.isDown) {
        console.log("cdsa");
        this.startGame();
        
    }
     else if (this.input.keyboard.isDown(Phaser.Keyboard.C)) {
      this.startGame();
    }
         
  },

  startGame: function (pointer) {

    this.state.start('Game2');
    

  }

};
