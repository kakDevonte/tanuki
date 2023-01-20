export default class LeaderItem {
    private scene: Phaser.Scene;
    private progressBar: Phaser.GameObjects.TileSprite;
    private progressScreen: Phaser.GameObjects.Sprite;
    private textPosition: Phaser.GameObjects.Text;
    private textName: Phaser.GameObjects.Text;
    private textPoints: Phaser.GameObjects.Text;
    private bg: Phaser.GameObjects.Sprite;
    private color: string;

    constructor(scene, x, y, number: number, name: string, points: number, you: boolean = false) {
        this.scene = scene;
        const { centerX, centerY, width } = this.scene.cameras.main;

        this.bg = this.scene.add.sprite(x, y, you ? 'bgYouLeader' : 'bgLeader');
        this.bg.setDisplaySize(width * 0.8, number === 1 ? 75 : 70);

        switch (number) {
            case 1: {
                this.color = 'rgba(254, 222, 23, 1)';
                break;
            }
            case 2: {
                this.color = '#D1D1D1';
                break;
            }
            case 3: {
                this.color = 'rgba(255, 184, 129, 1)';
                break;
            }
            default: {
                this.color = '#ffffff';
                break;
            }
        }
        this.textPosition = this.scene.add
            .text(this.bg.getBounds().x + 55, this.bg.getBounds().centerY, `#${number}`, {
                fontSize: '34px',
                fontFamily: 'LuckiestGuy',
                //align: 'center',
            }).setColor(this.color).setFontStyle('bold').setOrigin(0.5);

        this.textName = this.scene.add
            .text(this.bg.getBounds().centerX, this.bg.getBounds().centerY, `${name.substring(0, 6)}...`, {
                fontSize: '34px',
                fontFamily: 'LuckiestGuy',
                //align: 'center',
            }).setColor(this.color).setFontStyle('bold').setOrigin(0.5);

        this.textPoints = this.scene.add
            .text(this.bg.getBounds().width, this.bg.getBounds().centerY, `${points}`, {
                fontSize: '34px',
                fontFamily: 'LuckiestGuy',
                //align: 'center',
            }).setColor(this.color).setFontStyle('bold').setOrigin(0.5);
    }

    public getBounds(): any {
        return this.bg.getBounds();
    }

}