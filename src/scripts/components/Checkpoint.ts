import Game from '../scenes/Game';

class Checkpoint extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Game, x: number, y: number) {
        super(scene, x, y, 'checkpoint');
        this.init();
    }

    public tween: Phaser.Tweens.Tween;

    private init(): void {
        this.setScale(0.15);
        this.scene.anims.create({
            key: 'life',
            frames: this.scene.anims.generateFrameNumbers('checkpoint', {
                start: 0,
                end: 2,
            }),
            frameRate: 13,
            repeat: -1,
        });

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setDepth(2);
        //this.setGravityY(2400);
        this.body.setSize(500, 6000);
        //this.body.setOffset(1000, -6000);
        this.body.enable = true;
        this.move();
    }

    private move(): void {
        this.tween = this.scene.add.tween({
            targets: this,
            x: '-=' + 1650, //Settings.getSpeed(),
            duration: 4500, //Settings.duration,
            onComplete: (): void => this.destroy(),
        });
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        this.playAnimation();
    }

    private playAnimation(): void {
        this.play('life', true);
    }
}

export default Checkpoint;