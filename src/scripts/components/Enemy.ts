import Game from '../scenes/Game';

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Game) {
        super(
            scene,
            scene.cameras.main.width * 0.15,
            scene.cameras.main.centerY,
            'enemy'
        );
        this.init();
    }

    private init(): void {
        this.setScale(0.2);
        this.scene.anims.create({
            key: 'runEnemy',
            frames: [{ key: 'enemy', frame: 0 },
                { key: 'enemy', frame: 1 },
                { key: 'enemy', frame: 2 },
                { key: 'enemy', frame: 3 },
                { key: 'enemy', frame: 4 },
                { key: 'enemy', frame: 3 },
                { key: 'enemy', frame: 2 },
                { key: 'enemy', frame: 1 },
                { key: 'enemy', frame: 0 },
            ],
            // frames: this.scene.anims.generateFrameNumbers('enemy', {
            //     start: 0,
            //     end: 4,
            // }),
            frameRate: 12,
            repeat: -1,
        });

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setDepth(3);
        this.setGravityY(2400);
        this.body.enable = true;
    }

    public setCurrPosition(position: number): void {
        switch (position) {
            case 3: {
                this.setX(this.scene.cameras.main.width * 0.15);
                break;
            }
            case 2: {
                this.setX(this.scene.cameras.main.width * 0.25);
                break;
            }
            case 1: {
                this.setX(this.scene.cameras.main.width * 0.35);
                break;
            }
        }
    }

    public die(): void {
        this.play('crash', true);
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        this.playAnimation();
    }

    private playAnimation(): void {
            this.play('runEnemy', true);
    }
}

export default Enemy;