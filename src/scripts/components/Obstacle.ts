import Game from '../scenes/Game';
import ObstacleZone from "./ObstacleZone";

class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Game, x: number, y: number, image: string) {
        super(scene, x, y, image);
        this.name = image;
        this.init();
    }

    public tween: Phaser.Tweens.Tween;

    private init(): void {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setPushable(false);
        this.setCurrScale(this.name);
        this.move();
    }

    public getName(): string {
        return this.name;
    }

    private setCurrScale(name: string): void {
        switch (name) {
            case 'barrier': {
                this.setSize(this.width * 0.65, this.height);
                this.body.setOffset(-20, 0);
                this.setY(this.y - 20);
                this.setScale(0.3);
                break;
            }
            case 'cone': {
                this.setY(this.y + 20);
                this.setScale(0.2);
                break;
            }
            case 'luke': {
                this.setY(this.y + 50);
                this.setScale(0.17);
                break;
            }
            case 'officer': {
                this.setY(this.y - 60);
                this.setScale(0.3);
                break;
            }
            case 'sign': {
                this.setSize(this.width * 0.5, this.height);
                this.body.setOffset(-40, 0);
                this.setScale(0.28);
                break;
            }
            default: {
                this.setScale(0.1);
                break
            }
        }
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

export default Obstacle;