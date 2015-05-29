var BasicGame = {
  
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
