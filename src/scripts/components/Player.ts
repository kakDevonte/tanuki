import Game from '../scenes/Game';

const MAX_JUMP = 500; // максимальный счетчик нажатия прыжка

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Game) {
        super(
            scene,
            scene.cameras.main.centerX,
            scene.cameras.main.centerY,
            'player'
        );
        this.init();
    }

    public scene: Game;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private shieldEvent: Phaser.Time.TimerEvent;
    private text: Phaser.GameObjects.Text;
    private shield: Phaser.GameObjects.Sprite;
    private jumpCounter: number;
    private life: number;
    private seconds: number;
    private isShield: boolean;

    private init(): void {
        this.jumpCounter = 0;
        this.life = 3;
        this.seconds = 0;
        this.isShield = false;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.shield = this.scene.add.sprite(this.x + 20, this.y, 'shield').setScale(0.1).setVisible(this.isShield);

        this.setScale(0.15);
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers('player', {
                start: 0,
                end: 2,
            }),
            frameRate: 7,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers('player', {
                start: 3,
                end: 5,
            }),
            frameRate: 2,
            repeat: 0,
        });

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setGravityY(1400);
        this.setDepth(3);
        this.body.setSize(80);
        this.body.enable = true;
        this.createShieldEvent();
    }

    public takeBonus(value: number): void {
        const text = this.scene.add
            .text(this.x, this.y - 100, `+${value}`, {
                font: '42px LuckiestGuy',
                color: 'rgba(254, 222, 23, 1)',
                align: 'center',
            })
            .setOrigin(0.5, 0.5);

        this.scene.tweens.add({
            targets: text,
            y: '-=' + 110,
            alpha: 0,
            delay: 10,
            duration: 600,
            loop: -1,
            onComplete: () => {
                text.destroy();
            },
        });
    }

    public jump(): void {
        this.setVelocityY(-1000);
        const music = this.scene.sound.add('jumpMusic');
        music.play();
    }

    public takeDamage(): void {
        this.life -=1;

        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            yoyo: true,
            duration: 100,
            repeat: 3,
            onComplete: (): void => {
                this.alpha = 100
        }
        });
    }

    public takeBoost(): void {
        this.life +=1;
    }

    public takeShield(): void {
        this.isShield = true;
        this.shield.setVisible(this.isShield);
        this.seconds = 0;
    }

    public die(): void {
        this.play('crash', true);
    }

    public getLife(): number {
        return this.life;
    }

    public getIsShield(): boolean {
        return this.isShield;
    }

    public takeDamageShield(): void {
        this.isShield = false;
        this.shield.setVisible(this.isShield);
    }

    public destroyTimer(): void {
        this.shieldEvent.destroy();
    }

    private createShieldEvent(): void {
        this.shieldEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: (): void => {
                this.seconds++;
                if(this.seconds >= 10){
                    this.isShield = false;
                    this.shield.setVisible(this.isShield);
                    this.seconds = 0;
                }
            },
            loop: true,
        })
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        this.playAnimation();
        this.shield.setX(this.x + 20);
        this.shield.setY(this.y);
    }

    private playAnimation(): void {
        if (this.body.touching.down) {
            this.play('run', true);
        } else {
            this.play('jump', true);
        }
    }
}

export default Player;