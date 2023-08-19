import { assetsDPR } from './game.js'

export default class MainScene extends Phaser.Scene {
    score_p1 = 0;
    score_p2 = 0;
    started = false;


    constructor() {
        super({ key: 'MainScene' })
    }
    preload() {
        this.load.image('retroFont', 'assets/fonts/knighthawks-font-filled.png');
        this.load.atlas('assets', 'assets/atlas/breakout.png', 'assets/atlas/breakout.json');
        // Sounds
        this.load.audio('paddle_hit', 'assets/sounds/paddle_hit.wav');
        this.load.audio('score', 'assets/sounds/score.wav');
        this.load.audio('chill', 'assets/sounds/chill.mp3');
    }

    create() {


        // Activate key inputs
        this.cursors = this.input.keyboard.createCursorKeys();
        let { width, height } = this.cameras.main

        
        // Set Font
        var fontConfig = {
            image: 'retroFont',
            width: 31,
            height: 24,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 10,
            spacing: { x: 1, y: 1 },
        }
        this.cache.bitmapFont.add('RetroFont', Phaser.GameObjects.RetroFont.Parse(this, fontConfig));
        
        // Set inital text
        const screenCenterX = width / 2;
        const screenCenterY = height / 2;
        this.initialText = this.add.bitmapText(screenCenterX, screenCenterY * 7/8, 'RetroFont', 'PRESS UP OR DOWN', 32, 1).setOrigin(0.5);

        // Centered score text
        this.scoreText = this.add.bitmapText(screenCenterX, height/8, 'RetroFont', 'SCORE: 0 - 0').setOrigin(0.5);

        // Text to activate sound
        this.text = this.add.text(screenCenterX, height * 7/8, 'RetroFont').setOrigin(0.5);

        if (this.sound.locked)
        {
            this.text.setText('Click to unmute');
        }


        // Create paddle
        this.player1 = this.physics.add.image(width/8, screenCenterY, 'assets', 'paddle1').setImmovable();
        this.player2 = this.physics.add.image(width * 7/8, screenCenterY, 'assets', 'paddle1').setImmovable();
        // Update hitbox
        this.player1.setAngle(90);
        this.player2.setAngle(90);
        this.player1.body.setSize(28, 100, true);
        this.player2.body.setSize(28, 100, true);

        // Keep paddle within the game
        this.player1.setCollideWorldBounds(true);
        this.player2.setCollideWorldBounds(true);

        // Create small bounce for player1
        this.player1.setBounce(0.2);
        
        // -----------------
        // ** Create ball **
        // -----------------

        this.ball = this.physics.add.image(screenCenterX, screenCenterY, 'assets', 'ball1');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);

        // When ball hits player1, ball will bounce back
        this.physics.add.collider(this.ball, this.player1, () => {this.sound.play('paddle_hit')});
        this.physics.add.collider(this.ball, this.player2, () => {this.sound.play('paddle_hit')});
        // When ball hits player2, ball will bounce back and score will increase this.physics.add.collider(this.ball, this.player2, this.hitPlayer2, null, this);


        // ----------------------------------
        // ** create blue coins to collect **
        // ----------------------------------

        // Create invisible walls on the left and right side of the screen
        this.leftWall = this.physics.add.image(0, screenCenterY, 'assets', 'blue1').setImmovable();
        this.rightWall = this.physics.add.image(width, screenCenterY, 'assets', 'blue1').setImmovable();
        // Update hitbox
        this.leftWall.setAngle(90);
        this.rightWall.setAngle(90);
        this.leftWall.body.setSize(1, height, true);
        this.rightWall.body.setSize(1, height, true);
        // Make walls invisible
        this.leftWall.setAlpha(0);
        this.rightWall.setAlpha(0);

        // When ball hits leftWall, reset ball and decrease score
        this.physics.add.collider(this.ball, this.leftWall, this.hitLeftWall, null, this);
        // When ball hits rightWall, reset ball and increase score
        this.physics.add.collider(this.ball, this.rightWall, this.hitRightWall, null, this);

        // Loop background music
        this.sound.play('chill', {loop: true});


    }

    update() {
        if (!this.started) {
            if (this.cursors.up.isDown || this.cursors.down.isDown) {
                this.started = true;
                this.initialText.destroy();
                this.resetBall();
            }

        }
        if (! this.sound.locked){
            this.text.setText('');
        }
        // Get current player1 velocity

        // Player 1 movement (Up and Down)
        // Change velocity based on key press
        if (this.cursors.up.isDown) {
            this.player1.setAccelerationY(-1000);
        } 
        else if (this.cursors.down.isDown) {
            this.player1.setAccelerationY(1000);
        } 
        else { 
            this.player1.setAccelerationY(0); 
        }

        // Player 2 is an AI that follows the ball
        if (this.ball.y < this.player2.y - 10) {
            this.player2.setVelocityY(-200);
        } else if (this.ball.y > this.player2.y + 10) {
            this.player2.setVelocityY(200);
        } else {
            this.player2.setVelocityY(0);
        }

        // Normalize current ball velocity and apply it to acceleration
        const ballVelocity = this.ball.body.velocity;
        // nomalize velocity
        const normalizedVelocity = new Phaser.Math.Vector2(ballVelocity.x, ballVelocity.y).normalize();
        // apply normalized velocity to acceleration
        this.ball.setAcceleration(normalizedVelocity.x * 10, normalizedVelocity.y * 10);
    }

    hitLeftWall(ball, leftWall) {
        this.score_p2 += 1;
        this.hitWall();
    }

    hitRightWall(ball, rightWall) {
        this.score_p1 += 1;
        this.hitWall();
    }

    hitWall(){
        this.resetBall();
        this.scoreText.setText('SCORE: ' + this.score_p1 + ' - ' + this.score_p2);
        this.sound.play('score');

    }

    resetBall() {
        this.ball.setPosition(this.cameras.main.width/2, this.cameras.main.height/2);
        this.ball.setVelocity(200, Phaser.Math.Between(100, 200));
    }

}