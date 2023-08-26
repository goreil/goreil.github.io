export default class Boot extends Phaser.Scene {

    constructor(config) {
        super(config);
    }

    init ()
    {
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
        this.load.audio('jump', 'assets/sounds/jump.wav', {volume: 0.1});
        this.load.audio('marios_way', 'assets/sounds/marios_way.mp3');

    }

    create ()
    {

        WebFont.load({
            custom: {
                families: [ 'flappy' ]
            },
            active: () => {
                this.scene.start('TitleScreenScene');
            }
        });
        
    }



}