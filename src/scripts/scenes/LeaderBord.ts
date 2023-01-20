import Settings from "../data/Settings";
import LeaderItem from "../components/LeaderItem";
import btnLeader from "../../assets/images/btnLeader.png";
import btnRules from "../../assets/images/btnRules.png";
import Button from "../components/Button";
import {tanukiAPI} from "../libs/Api";
import User from "../data/User";

export default class LeaderBord extends Phaser.Scene {

    constructor() {
        super('LeaderBord');
    }

    private winners: any[];
    private array: any[];
    private number: number;
    private bg: Phaser.GameObjects.Sprite;
    private title: Phaser.GameObjects.Text;

    public async init() {
        await this.getWinners();
        const { centerX, centerY, width, height, x, y } = this.cameras.main;
        this.array = [];

        this.bg = this.add
            .sprite(centerX, centerY, 'bgRules')
            .setOrigin(0.5, 0.5).setScale(Settings.isMobile() ? 0.66 : 0.5);

        const btnRules = new Button(
            this,
            x + 50,
            y + 50, 'btnRules',
            false,
            (): void => {
                this.scene.stop();
                this.scene.start('Rules');
            }
        ).setScale(0.4);

        const btnLeader = new Button(
            this,
            btnRules.getBounds().width + 50,
            y + 50, 'btnLeader',
            false,
            (): void => {
            }
        ).setScale(0.4);

        this.title = this.add.text(
            centerX,
            height * 0.1,
            "ТАБЛИЦА ЛИДЕРОВ",
            {
                font: '38px LuckiestGuy',
                color: '#ffffff',
                align: 'center',
            }
        ).setOrigin(0.5, 0);

        const size = Settings.isMobile() ? 55 : 40;

        for(let i = 0; i < this.winners.length; i++) {
            let y = i == 0 ? this.title.getBounds().bottom + 60 : this.array[i - 1].getBounds().bottom + size;

            let leader = new LeaderItem(this, centerX, y, i + 1,
                this.winners[i].telegram_username, this.winners[i].points);

            this.array.push(leader);
        }

        if(this.number > 5) {
            let leader6 = new LeaderItem(this, centerX,
                this.array[this.array.length - 1].getBounds().bottom + size, this.number, User.getUsername(), User.getRecord(), true);
        }

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
