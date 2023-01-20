import Button from '../components/Button';
import Settings from '../data/Settings';
import User from "../data/User";

class Checkpoint {
    constructor(scene: Phaser.Scene, func: () => void) {
        this.scene = scene;
        this.func = func;
        this.init();
    }

    readonly scene: Phaser.Scene;
    private func: () => void;

    private bg: Phaser.GameObjects.Sprite;
    private logo: Phaser.GameObjects.Sprite;
    private close: Phaser.GameObjects.Sprite;
    private btnNext: Phaser.GameObjects.Sprite;
    private textCheckpoint: Phaser.GameObjects.Text;
    private textDescription: Phaser.GameObjects.Text;
    private textScore: Phaser.GameObjects.Text;
    private score: Phaser.GameObjects.Text;

    private init(): void {
        const { centerX, centerY, width, height } = this.scene.cameras.main;

        const bgOpacity = this.scene.add
            .sprite(centerX, centerY, 'bgOpacity')
            .setOrigin(0.5, 0.5);

        this.bg = this.scene.add
            .sprite(centerX, centerY, 'bgPoint')
            .setOrigin(0.5, 0.5);

        this.bg.setSize(width * 0.8, Settings.isMobile() ? height * 0.3 : height * 0.4);

        this.logo = this.scene.add.sprite(this.bg.getBounds().centerX, this.bg.getBounds().y, 'logo');

        this.textCheckpoint = this.scene.add.text(
                this.bg.getBounds().centerX,
                this.logo.getBounds().bottom + 25,
                "ЧЕКПОИНТ",
                {
                    font: '38px LuckiestGuy',
                    color: '#ffffff',
                    align: 'center',
                }
            )
            .setOrigin(0.5, 0);

        this.textDescription = this.scene.add.text(
                this.bg.getBounds().centerX,
                this.textCheckpoint.getBounds().bottom + 25,
                "МОЖНО ПРИТОРМОЗИТЬ, ОТОРВАЛИСЬ НА СЛАВУ.\nПЕРЕВЕДЕМ ДЫХАНИЕ И ПРОДОЛЖИМ?",
                {
                    font: '18px LuckiestGuy',
                    color: 'rgba(254, 222, 23, 1)',
                    align: 'center',
                }
            )
            .setOrigin(0.5, 0);

        this.textScore = this.scene.add.text(
                this.bg.getBounds().centerX - 25,
                this.textDescription.getBounds().bottom + 25,
                "ТВОЙ СЧЕТ:",
                {
                    font: '18px LuckiestGuy',
                    color: '#ffffff',
                    align: 'center',
                }
            )
            .setOrigin(0.5, 0);

        this.score = this.scene.add.text(
                this.bg.getBounds().centerX + 35,
                this.textDescription.getBounds().bottom + 25,
                User.getScore() + "",
                {
                    font: '18px LuckiestGuy',
                    color: 'rgba(254, 222, 23, 1)',
                    align: 'center',
                }
            )
            .setOrigin(0.5, 0);

        this.close = new Button(
            this.scene,
            this.bg.getBounds().right - 50, this.bg.getBounds().top + 50, 'close',
            false,
            (): void => {
                this.hide();
                this.func();
            }
        );

        this.btnNext = new Button(
            this.scene,
            this.bg.getBounds().centerX, this.score.getBounds().bottom + 25, 'btnNext',
            false,
            (): void => {
                this.hide();
                this.func();
            }
        ).setScale(0.45).setOrigin(0.5, 0);

    }

    private hide(): void {
        this.bg.destroy();
        this.logo.destroy();
        this.close.destroy();
        this.btnNext.destroy();
        this.textCheckpoint.destroy();
        this.textDescription.destroy();
        this.textScore.destroy();
        this.score.destroy();
    }
}

export default Checkpoint;