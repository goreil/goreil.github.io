export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({key: 'preloadScene'});
    }

    preload() {
        // Add a loading bar
        const progress = this.add.graphics();

        this.load.on('progress', function (value) {

            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(275, 270, 300 * value, 30);

        });

        this.load.on('complete', function () {

            progress.destroy();

        });

    }

    create() {

        // Add animations here

        // start level scene
        this.scene.start('MainScene');
    }

}