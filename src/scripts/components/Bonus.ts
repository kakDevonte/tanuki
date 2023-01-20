import Game from '../scenes/Game';

class Bonus extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Game, x: number, y: number, image: string) {
        super(scene, x, y, image);
        this.name = image;
        this.init();
    }

    public tween: Phaser.Tweens.Tween;
    private bg:  Phaser.GameObjects.Sprite;

    private init(): void {
        this.setCurrScale(this.name);
        this.bg = this.scene.add.sprite(this.x, this.y, 'bgBonus').setScale(0.7).setVisible(this.name !== 'girl');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        //this.body.setSize(this.size - 10, 50);
        this.setPushable(false);
        this.build();
        this.move();
    }

    public getName(): string {
        return this.name;
    }

    private setCurrScale(name: string): void {
        switch (name) {
            case 'boost': {
                this.setScale(0.15);
                break;
            }
            case 'girl': {
                this.setScale(0.08);
                break;
            }
            case 'shieldBonus': {
                this.setScale(0.2);
                break;
            }
            case 'sushi': {
                this.setScale(0.15);
                break;
            }
            default: {
                this.setScale(0.1);
                break
            }
        }
    }

    private build(): void {
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
        this.bg?.destroy();
        super.destroy();
    }

    protected preUpdate(): void {
        this.setX(this.x);
        this.bg.setX(this.x - 5);
    }
}

export default Bonus;