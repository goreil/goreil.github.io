import { assetsDPR } from './game.js';
export default class TitleScreenScene extends Phaser.Scene {
    // Default title screen
    constructor() {
        super({ key: 'TitleScreenScene' });
    }


    create() {
        // Get width and height of the game screen
        let { width, height } = this.cameras.main
        // Add title text in center
        this.countdown_text = this.add.text(width / 2, height / 2, '', { fontFamily: '"flappy"', fontSize: 48 * assetsDPR, color: '#ffffff' }).setOrigin(0.5, 0.5);


        this.counter = 4;
        // Add Timer for counter
        this.time.addEvent({

            delay: 1000,
            callback: this.updateCounter,
            callbackScope: this,
            loop: true
        });

    }

    updateCounter() {
        if (this.counter > 1){
            this.counter -= 1;
            this.countdown_text.setText('Start in ' + this.counter);
            
        } else {
            this.scene.start('MainScene');
        }
    }
}