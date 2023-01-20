import Game from '../scenes/Game';

class Points {
    constructor(scene: Game) {
        this.scene = scene;
        this.init();
    }

    private points: number;
    private scene: Game;
    private text: Phaser.GameObjects.Text;

    private init(): void {
        this.points = 0;
        const image = this.scene.add.sprite(this.scene.cameras.main.width * 0.9, this.scene.cameras.main.height * 0.05, 'points').setScale(0.6);
        this.text = this.scene.add
            .text(image.getBounds().centerX, image.getBounds().centerY, String(this.points), {
                font: '28px LuckiestGuy',
                color: '#ffffff',
            }).setOrigin(0.5, 0.5);
    }

    public getPoints(): number {
        return this.points;
    }

    public scorePoints(value: number): void {
        this.text.setText(String(this.points));
        this.points = this.points + value;
    }
}

export default Points;