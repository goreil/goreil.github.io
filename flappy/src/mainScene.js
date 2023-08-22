import { assetsDPR } from './game.js'
import Bird  from './bird.js';

export default class MainScene extends Phaser.Scene {

    init ()
    {
        // Add custom font
        const element = document.createElement('style');
        document.head.appendChild(element);
        element.sheet.insertRule('@font-face { font-family: "flappy"; src: url("assets/fonts/flappy.ttf") format("truetype"); }', 0);

    }

    preload ()
    {
        // Load custom font via Google Fonts API
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        // Load assets
        this.load.image('background', 'assets/images/background.png');
        this.load.image('bird', 'assets/images/bird.png');
        this.load.image('pipe', 'assets/images/pipe.png');
        this.load.image('ground', 'assets/images/ground.png');
        // Sounds
        this.load.audio('explosion', 'assets/sounds/explosion.wav');
        this.load.audio('hurt', 'assets/sounds/hurt.wav');
        this.load.audio('score', 'assets/sounds/score.wav');
        this.load.audio('jump', 'assets/sounds/jump.wav');
        this.load.audio('marios_way', 'assets/sounds/marios_way.mp3');

    }

    create ()
    {
        WebFont.load({
            custom: {
                families: [ 'flappy' ]
            },
            // active: this.startGame.bind(this)
        });
        // Get width and height of the game screen
        let { width, height } = this.cameras.main

        // Insert background
        this.background = this.add.tileSprite(0, 0, width, height * 3/4, 'background').setOrigin(0, 0);
        this.background.setScale(assetsDPR);

        // TODO -- Better tilesprite
        this.ground = this.add.tileSprite(0, height * 3/4, width, height, 'ground').setOrigin(0, 0);
        this.ground.setScale(assetsDPR * 2);

        // Loop background music
        this.sound.play('marios_way', {loop: true});

        // Add bird
        this.bird = new Bird(this, width / 4, height / 2);

        // Bird collision with ground
        this.physics.add.collider(this.bird, this.ground);
    }


    update () {
        // Move background
        this.background.tilePositionX += 1;
        this.ground.tilePositionX += 1;

    }
}