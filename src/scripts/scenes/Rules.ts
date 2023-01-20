import Button from '../components/Button';
import Settings from '../data/Settings';
import User from "../data/User";

export default class Rules extends Phaser.Scene {
    constructor() {
        super('Rules');
    }

    private bg: Phaser.GameObjects.Sprite;
    private modal: Phaser.GameObjects.Sprite;
    private logo: Phaser.GameObjects.Sprite;
    private close: Phaser.GameObjects.Sprite;
    private btnGame: Phaser.GameObjects.Sprite;
    private rules: Phaser.GameObjects.Text;
    private textMyName: Phaser.GameObjects.Text;
    private textDescription: Phaser.GameObjects.Text;
    private textTry: Phaser.GameObjects.Text;
    private try: Phaser.GameObjects.Text;
    private textTable: Phaser.GameObjects.Sprite;

    private init(): void {
        const { centerX, centerY, width, height } = this.cameras.main;

        this.bg = this.add
            .sprite(centerX, centerY, 'bgRules')
            .setOrigin(0.5, 0.5).setScale(Settings.isMobile() ? 0.66 : 0.5);

        this.modal = this.add
            .sprite(centerX, centerY, 'rulesModal')
            .setOrigin(0.5, 0.5);

        this.modal.setDisplaySize(width * 0.8, Settings.isMobile() ? height * 0.4 : height * 0.65);

        this.logo = this.add.sprite(this.modal.getBounds().centerX, this.modal.getBounds().y, 'logo');

        this.rules = this.add.text(
            this.modal.getBounds().centerX,
            this.logo.getBounds().bottom - 15,
            "ПРАВИЛА",
            //"КАПЕЦ ЧЕ ПРОИСХОДИТ",
            {
                font: '38px LuckiestGuy',
                color: '#ffffff',
                align: 'center',
            }
        ).setOrigin(0.5, 0);

        this.textMyName = this.add.text(
            this.modal.getBounds().centerX,
            this.rules.getBounds().bottom + 25,
            "ДАВАЙ ЗНАКОМИТЬСЯ, Я - ТАНУК.",
            {
                font: '18px LuckiestGuy',
                color: 'rgba(254, 222, 23, 1)',
                align: 'center',
            }
        ).setOrigin(0.5, 0);

        this.textDescription = this.add.text(
            this.modal.getBounds().centerX,
            this.textMyName.getBounds().bottom + 25,
            "Кажется, мы слегка набедокурили и на нас\nобъявлена охота. Избегай препятствий тапом\n" +
            "по экрану, чтобы полиция нас не поймала.\n" +
            "Собирай бонусы, чтобы получить\nдополнительные очки и занять свое место среди\nлидеров. Не пропускай щит и бустер,\n" +
            "они тебе очень пригодятся!\n" +
            "Погнали?",
            {
                font: '16px Gilroy',
                color: 'rgb(255,255,255)',
                align: 'center',
            }
        ).setOrigin(0.5, 0);

        this.textTry = this.add.text(
            this.bg.getBounds().centerX - 15,
            this.textDescription.getBounds().bottom + 25,
            "ТВОИ ПОПЫТКИ:",
            {
                font: '18px LuckiestGuy',
                color: '#ffffff',
                align: 'center',
            }
        ).setOrigin(0.5, 0);

        this.try = this.add.text(
            this.bg.getBounds().centerX + 65,
            this.textDescription.getBounds().bottom + 25,
            User.getTry() + "",
            {
                font: '18px LuckiestGuy',
                color: 'rgba(254, 222, 23, 1)',
                align: 'center',
            }
        ).setOrigin(0.5, 0);

        this.close = new Button(
            this,
            this.modal.getBounds().right - 50, this.modal.getBounds().top + 50, 'close',
            User.getTry() <= 0,
            (): void => {
                this.scene.stop();
                this.scene.start('Game');
            }
        );

        this.btnGame = new Button(
            this,
            this.modal.getBounds().centerX, this.try.getBounds().bottom + 25, User.getTry() > 0 ? 'btnGame' : 'btnGameDisable',
            User.getTry() <= 0,
            (): void => {
                if(User.getTry() <= 0) return;
                this.scene.stop();
                this.scene.start('Game');
            }
        ).setScale(0.4).setOrigin(0.5, 0);

        this.textTable = new Button(
            this,
            this.modal.getBounds().centerX,
            this.btnGame.getBounds().bottom + 25, 'btnTable',
            false,
            (): void => {
                this.scene.stop();
                this.scene.start('LeaderBord');
            }
        ).setScale(0.75).setOrigin(0.5, 0);

        const btnRules = new Button(
            this,
            this.cameras.main.x + 50,
            this.cameras.main.y + 50, 'btnRules',
            false,
            (): void => {
            }
        ).setScale(0.4);

        const btnLeader = new Button(
            this,
            btnRules.getBounds().width + 50,
            this.cameras.main.y + 50, 'btnLeader',
            false,
            (): void => {
                this.scene.stop();
                this.scene.start('LeaderBord');
            }
        ).setScale(0.4);


       // this.modal.setDisplaySize(width * 0.8, height - this.textTable.getBounds().bottom);
       //  this.logo.setY(this.modal.getBounds().y);
       //  this.rules.setY(this.logo.getBounds().bottom + 25);
       //  this.textMyName.setY(this.rules.getBounds().bottom + 25);
       //  this.textDescription.setY(this.textMyName.getBounds().bottom + 25);
       //  this.textTry.setY(this.textDescription.getBounds().bottom + 25);
       //  this.try.setY(this.textDescription.getBounds().bottom + 25);
       //  this.close.setX(this.modal.getBounds().right - 50);
       //  this.close.setY(this.modal.getBounds().top + 50);
       //  this.btnGame.setY(this.textTry.getBounds().bottom + 25);
       //  this.textTable.setY(this.btnGame.getBounds().bottom + 25);

    }
}
