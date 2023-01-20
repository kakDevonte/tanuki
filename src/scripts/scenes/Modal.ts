import Checkpoint from '../screens/Checkpoint';
import Game from './Game';

class Modal extends Phaser.Scene {
    constructor() {
        super('Modal');
    }

    public create(): void {
        new Checkpoint(this, () => {
            const Game = this.game.scene.getScene('Game') as Game;
            this.scene.stop();
            Game.scene.resume();
        });
    }
}

export default Modal;
