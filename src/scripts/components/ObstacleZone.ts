import Game from '../scenes/Game';

class ObstacleZone extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Game, x: number, y: number) {
        super(scene, x, y, 'pixel');
        this.init();
    }

    public tween: Phaser.Tweens.Tween;

    private init(): void {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setPushable(false);
        this.setSize(10, this.scene.cameras.main.height);
        this.body.setOffset(0, -this.scene.cameras.main.height);
        this.move();
    }

    public getName(): string {
        return this.name;
    }

    private move(): void {
        this.tween = this.scene.add.tween({
            targets: this,
            x: '-=' + 1650, //Settings.getSpeed(),
            duration: 4500, //Settings.duration,
            onComplete: (): void => this.destroy(),
        });
    }

    public destroy(): void {
        super.destroy();
    }

    protected preUpdate(): void {
        this.setX(this.x);
    }
}

export default ObstacleZone;