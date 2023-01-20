import Button from '../components/Button';
import Settings from '../data/Settings';
import LeaderItem from "../components/LeaderItem";
import User from "../data/User";
import {tanukiAPI} from "../libs/Api";

class Result {
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.init();
    }

    readonly scene: Phaser.Scene;

    private winners: any[];
    private array: any[];
    private number: number;
    private bg: Phaser.GameObjects.Sprite;
    private logo: Phaser.GameObjects.Sprite;
    private close: Phaser.GameObjects.Sprite;
    private btnNext: Phaser.GameObjects.Sprite;
    private leader6: Phaser.GameObjects.Sprite;
    private textCheckpoint: Phaser.GameObjects.Text;
    private textDescription: Phaser.GameObjects.Text;
    private textScore: Phaser.GameObjects.Text;
    private textRules: Phaser.GameObjects.Text;
    private score: Phaser.GameObjects.Text;

    private async init() {
        const points = User.getScore();

        await this.updateUser();
        await this.getWinners();

        const { centerX, centerY, width, height } = this.scene.cameras.main;

        this.array = [];

        const bgOpacity = this.scene.add
            .sprite(centerX, centerY, 'bgOpacity')
            .setOrigin(0.5, 0.5);

        this.bg = this.scene.add
            .sprite(centerX, height * 0.10, points > 1500 ? 'bgPromo' : 'bgModal')
            .setOrigin(0.5, 0);

        this.bg.setDisplaySize(width * 0.8, Settings.isMobile() ? height * 0.2 : height * 0.29);

        this.logo = this.scene.add.sprite(this.bg.getBounds().centerX, this.bg.getBounds().y, 'logo').setScale(Settings.isMobile() ? 1 : 0.8);

        this.textCheckpoint = this.scene.add.text(
            this.bg.getBounds().centerX,
            this.logo.getBounds().bottom - 5,
            "ДОПРЫГАЛИСЬ...",
            {
                font: `${Settings.isMobile() ? 38 : 32}px LuckiestGuy`,
                color: '#ffffff',
                align: 'center',
            }
        )
            .setOrigin(0.5, 0);

        this.textDescription = this.scene.add.text(
            this.bg.getBounds().centerX,
            this.textCheckpoint.getBounds().bottom + 15,
            "В СЛЕДУЮЩИЙ РАЗ НУЖНО\nБЫТЬ ПРОВОРНЕЕ.",
            {
                font: `${Settings.isMobile() ? 18 : 16}px LuckiestGuy`,
                color: 'rgba(254, 222, 23, 1)',
                align: 'center',
            }
        ).setOrigin(0.5, 0);

        this.textRules = points > 1500 && this.scene.add.text(
            this.bg.getBounds().centerX,
            this.textDescription.getBounds().bottom + 15,
            "Отдохни, перекуси и возвращайся снова.\n" +
            "А для вкусного обеда я припас тебе промокод,\n" +
            "по которому при заказе от 990 рублей до 21\n" +
            "июля ты получишь в подарок «Ролл Дракон Лайт»\n" +
            "в приложении или на сайте tanukifamily.ru",
            {
                font: `${Settings.isMobile() ? 16 : 14}px Gilroy`,
                color: 'rgb(255,255,255)',
                align: 'center',
            }
        ).setOrigin(0.5, 0);

        const promo = points > 1500 && this.scene.add.text(
            this.bg.getBounds().centerX,
            this.textRules.getBounds().bottom + 15,
            "BEGI",
            {
                font: `${Settings.isMobile() ? 20 : 18}px LuckiestGuy`,
                color: 'rgb(255,255,255)',
                align: 'center',
            }
        ).setOrigin(0.5, 0);

        const size = Settings.isMobile() ? 55 : 40;

        for(let i = 0; i < this.winners.length; i++) {
            let y = i == 0 ? this.bg.getBounds().bottom + size : this.array[i - 1].getBounds().bottom + size;

            let leader = new LeaderItem(this.scene, centerX, y, i + 1,
                this.winners[i].telegram_username, this.winners[i].points);

            this.array.push(leader);
        }

        if(this.number > 5) {
            let leader6 = new LeaderItem(this.scene, centerX,
                this.array[this.array.length - 1].getBounds().bottom + size, this.number, User.getUsername(), User.getRecord(), true);
            this.array.push(leader6);
        }
        // const leader1 = new LeaderItem(this.scene, centerX, this.bg.getBounds().bottom + size, 1, 'Blabla', 5234);
        // const leader2 = new LeaderItem(this.scene, centerX, leader1.getBounds().bottom + size, 2, 'Bafdsa', 1234);
        // const leader3 = new LeaderItem(this.scene, centerX, leader2.getBounds().bottom + size, 3, 'asdfbla', 3234);
        // const leader4 = new LeaderItem(this.scene, centerX, leader3.getBounds().bottom + size, 4, 'Blabla', 4234);
        // const leader5 = new LeaderItem(this.scene, centerX, leader4.getBounds().bottom + size, 5, 'cxvbla', 534);


        this.close = new Button(
            this.scene,
            this.bg.getBounds().right - 50, this.bg.getBounds().top + 40, 'close',  true,(): void => {});

       const btnGame = new Button(
            this.scene,
            this.bg.getBounds().centerX, this.array[this.array.length - 1].getBounds().bottom + size, User.getTry() > 0 ? 'bgTryGame' : 'bgTryGameDisable', User.getTry() <= 0,
            (): void => {
                this.scene.scene.stop();
                this.scene.scene.start('Game');
            }
        ).setScale(0.35).setOrigin(0.5, 0);

        const btnRules = new Button(
            this.scene,
            this.scene.cameras.main.x + 50,
            this.scene.cameras.main.y + 50, 'btnRules',
            false,
            (): void => {
                this.scene.scene.stop();
                this.scene.scene.start('Rules');
            }
        ).setScale(0.4);

        const btnLeader = new Button(
            this.scene,
            btnRules.getBounds().width + 50,
            this.scene.cameras.main.y + 50, 'btnLeader',
            false,
            (): void => {
                this.scene.scene.stop();
                this.scene.scene.start('LeaderBord');
            }
        ).setScale(0.4);
    }

    private async updateUser(): Promise<void> {
        User.resetScore();

        await tanukiAPI.endGame();
        const {data} = await tanukiAPI.updateUser({
            telegram_id: User.getID(),
            telegram_username: User.getUsername(),
            points: User.getRecord(),
            tryCount: User.getTry() - 1,
            openApp: 1
        });

        User.setID(data.telegram_id);
        User.setUsername(data.telegram_username);
        User.setRecord(data.points);
        User.setTry(data.tryCount);
    }

    private async getWinners(): Promise<void> {
        const { data } = await tanukiAPI.getUsers();
        // this.winners = data;
        const sortedUsers = [...data.users].sort(function(a, b) {
            return b.points - a.points;
        });

        this.number = sortedUsers.findIndex(user => user.telegram_id === parseInt(User.getID()));
        this.winners = sortedUsers.slice(0, 5);
    }
}

export default Result;