// Class that represents a line for collision detection (invisible)
export default class CollisionLine extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, width, height) {
        super(scene, x, y);
        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Make invisible
        this.setAlpha(0);

        // Disable gravity
        this.body.allowGravity = false;

        // Set size
        this.body.setSize(width, height);
        

    }


}