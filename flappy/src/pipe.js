import { assetsDPR } from './game.js';
// Pipe class that represents the infinite spawning pipes in the game

export default class Pipe extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, invert = false) {
        
        // y needs to be recalculated because of DPR and scaling
        y = y * assetsDPR/2;
        super(scene, x, y);
        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Add sprite with physics
        this.setTexture('pipe');
        this.setVelocityX(-400);
        this.setScale(assetsDPR);

        // Invert pipe if needed
        if (invert) {
            this.setAngle(180);
            this.y = this.y + this.height;
        }

        // Not affected by gravity
        this.body.allowGravity = false;

        // Correct hitbox to whole pipe
        this.body.setSize(this.width, this.height);
        this.body.setOffset(0, 0);

    }

    preUpdate() {
        // If pipe is out of bounds, destroy it
        // right side of pipe
        if (this.x < -this.width ) {
            this.destroy();
        }

    }

}
