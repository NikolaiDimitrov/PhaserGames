var load_state = {  
    preload: function() { 
    this.game.load.image('space', 'assets/space.png');
    this.game.load.image('ship', 'assets/spaceship.png');
    this.game.load.image('penguins','assets/BadPenguins.png');
    this.game.load.image('bullet','assets/fireball.png');
    this.game.load.image('enemyBullet','assets/snowball.png');
    this.game.load.image('pause','assets/pause.png');
    this.game.load.image('heart', 'assets/heart.png');

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};