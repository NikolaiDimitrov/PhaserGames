// Initialize Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, '')
// Our 'score' global variable
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

// Define all the states
game.state.add('load', load_state);  
game.state.add('menu', menu_state);  
game.state.add('play', play_state);  

// Start with the 'load' state
game.state.start('load');  