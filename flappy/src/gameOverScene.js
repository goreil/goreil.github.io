import { assetsDPR } from "./game.js";

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {    
        this.score = data.score;
    }

    create() {
        let { width, height } = this.cameras.main;

        // Add title text in center
        let gameover_text = this.add.text(width / 2, height / 2 - 50 * assetsDPR, 'Game Over', { fontFamily: '"flappy"', fontSize: 48 * assetsDPR, color: '#ffffff' }).setOrigin(0.5, 0.5);
        this.add.text(width / 2, height / 2 + 50 * assetsDPR, 'Retry', { fontFamily: '"flappy"', fontSize: 32 * assetsDPR, color: '#ffffff' }).setOrigin(0.5, 0.5);
        // Add score text
        var text = this.add.text(0, 0, 'Score:' + this.score, { fontFamily: '"flappy"', fontSize: 48 * assetsDPR, color: '#ffffff' }).setOrigin(0, 0);

    }

    update() {
        // On click, start game
        this.input.on('pointerdown', () => {
            this.scene.start('TitleScreenScene');
        });
    }

}