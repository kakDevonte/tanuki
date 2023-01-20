export default class LoadingBar {
    private scene: Phaser.Scene;
    private progressBar: Phaser.GameObjects.TileSprite;
    private progressScreen: Phaser.GameObjects.Sprite;
    private text: Phaser.GameObjects.Text;

    constructor(scene) {
        this.scene = scene;
        const { centerX, centerY } = this.scene.cameras.main;
        this.progressScreen = this.scene.add
            .sprite(centerX, centerY + 265, 'bgLoadingBar')
            .setOrigin(0.5, 0.5)
            .setScale(0.7)
            .setDisplaySize(this.scene.cameras.main.width * 0.8 + 20, 45);
        console.log(this.scene.cameras.main.width * 0.8);
        this.progressBar = this.scene.add
            .tileSprite(centerX * 0.2, centerY + 280, 0, 32, 'loadingBar')
            .setOrigin(0, 1);

        this.text = this.scene.add
            .text(centerX, centerY + 330, '0%', {
                fontSize: '46px',
                fontFamily: 'LuckiestGuy',
                //align: 'center',
            })
            .setColor('#ffffff')
            .setFontStyle('bold')
            .setOrigin(0.5);

        this.setEvents();
    }

    private setEvents(): void {
        this.scene.load.on('progress', this.showProgressBar, this);
        this.scene.load.on('fileprogress', this.onFileProgress, this);
        this.scene.load.on('complete', this.onLoadComplete, this);
    }

    private showProgressBar(value: number): void {
        this.progressBar.setDisplaySize(576 * value, 30);
        this.text.text = Math.round(value * 100) + '%';
    }

    private onFileProgress(file): void {}

    private onLoadComplete(): void {
        //this.progressBar.destroy();
    }
}