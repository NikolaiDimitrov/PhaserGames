
BasicGame.MainMenu = function (game) {

  //this.music = null;
  //this.playButton = null;

};

BasicGame.MainMenu.prototype = {

  create: function () {

    //  We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //  Here all we're doing is playing some music and adding a picture and button
    //  Naturally I expect you to do something significantly better :)

    this.add.sprite(0, 0, 'titlepage');

    this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 80, "Press Z for easy!", { font: "20px monospace", fill: "#fff" });
    this.loadingText.anchor.setTo(0.5, 0.5);
    this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 100, "Press X for normal!", { font: "20px monospace", fill: "#fff" });
    this.loadingText.anchor.setTo(0.5, 0.5);
    this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 120, "Press C for hard!", { font: "20px monospace", fill: "#fff" });
    this.loadingText.anchor.setTo(0.5, 0.5);
    this.add.text(this.game.width / 2, this.game.height - 90, "image assets Copyright (c) ", { font: "12px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);
    this.add.text(this.game.width / 2, this.game.height - 75, "sound assets Copyright (c) ", { font: "12px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);

  },

  update: function () {

    if (this.input.keyboard.isDown(Phaser.Keyboard.Z)) {
      this.startGame();
    }
    else if (this.input.keyboard.isDown(Phaser.Keyboard.X)) {
      this.startGameNormal();
    }
     else if (this.input.keyboard.isDown(Phaser.Keyboard.C)) {
      this.startGameHard();
    }
  },

  startGame: function (pointer) {

    this.state.start('Game');
    

  }

};
