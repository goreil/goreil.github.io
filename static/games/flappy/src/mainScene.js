import { assetsDPR } from './game.js'
import Bird  from './bird.js';
import Pipe from './pipe.js';
import CollisionLine from './collision_line.js';

export default class MainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'MainScene' });
    }

    create ()
    {
        let {width, height} = this.cameras.main;

        // Add bird

        // Add pipes
        this.time.addEvent({
            delay: 2000,
            callback: this.addPipe,
            callbackScope: this,
            loop: true
        });



        // Insert background
        this.background = this.add.tileSprite(0, 0, width, height * 3/4, 'background').setOrigin(0, 0);
        this.background.setScale(assetsDPR);

        // Insert ground
        this.ground = this.add.tileSprite(0, height * 3/4, width, height, 'ground').setOrigin(0, 0);
        this.ground.setScale(assetsDPR * 2);
        // Collision line for ground
        this.ground_line = new CollisionLine(this, 0, this.ground.y, width, 0).setOrigin(0, 0);
        // Add collision between bird and ground

        this.music = this.sound.add('marios_way');
        this.music.play();

        this.bird = new Bird(this, width / 4, height / 2);
        this.score = 0;
        this.scoreText = this.add.text(0, 0, "Score:0", { fontFamily: '"flappy"', fontSize: 48 * assetsDPR, color: '#ffffff' }).setOrigin(0, 0);
        // console.log("Another bird");
        this.physics.add.collider(this.bird, this.ground_line, this.displayGameOver, null, this);

    }
    update() {
        // Scroll background
        this.background.tilePositionX += 1;
        this.ground.tilePositionX += 2;
    }

    addPipe() {
        // Get width and height of the game screen
        let { width, height } = this.cameras.main
        
        // Get random y position for pipe
        let y = Phaser.Math.Between(height * 3/4, height * 1/2);

        // Add pipe to scene
        let pipe = new Pipe(this, width * 5/4, y);
        // Add inverted pipe
        let invertedPipe = new Pipe(this, width * 5/4, y - 1 * (pipe.height  * assetsDPR), true);
        // Add score collision line
        let scoreLine = new CollisionLine(this, pipe.x + pipe.width, 0, 0, height).setOrigin(0, 0);
        scoreLine.body.setVelocityX(-400);

        this.physics.add.collider(this.bird, pipe, this.displayGameOver, null, this);
        this.physics.add.collider(this.bird, invertedPipe, this.displayGameOver, null, this);

        // Add score collision
        this.physics.add.overlap(this.bird, scoreLine, this.addScore, null, this);

    }

    displayGameOver() {
        // Sound
        // End sound
        this.music.stop();
        this.sound.play('hurt');
        this.scene.start('GameOverScene', {score: this.score});

    }

    addScore(bird, scoreLine) {
        // Remove scoreLine
        scoreLine.destroy();
        this.score += 1;
        // Add score text
        this.scoreText.setText("Score:" + this.score);

        // Play sound
        this.sound.play('score');
    }
}