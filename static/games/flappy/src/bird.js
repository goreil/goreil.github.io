import { assetsDPR } from './game.js'
export default class Bird extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // Initialize object
        super(scene, x, y);
        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Add sprite with physics
        this.setTexture('bird');
        this.setCollideWorldBounds(true);
        this.setScale(assetsDPR);
        
        // scale down hitbox
        this.body.setSize(this.body.width, this.body.height * 0.8);

        this.sound_effect = this.scene.sound.add('jump');


    }

    preUpdate() {
        // If mouse is clicked or pointer is pressed down

        var velocityY = this.body.velocity.y;
        this.scene.input.on('pointerdown', function(pointer){
            // Make bird jump
            this.setVelocityY(velocityY - 1000);
            this.sound_effect.play();
        }, this);

        // Rotate bird based on velocity
        this.setAngle(velocityY/40);

    }
}