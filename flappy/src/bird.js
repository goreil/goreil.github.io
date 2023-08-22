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


    }

    preUpdate() {
        // If mouse is clicked or pointer is pressed down
        // console.log(velocityY);

        var velocityY = this.body.velocity.y;
        this.scene.input.on('pointerdown', function(pointer){
            this.setVelocityY(velocityY - 600);
            // Make bird jump
        }, this);
    }
}