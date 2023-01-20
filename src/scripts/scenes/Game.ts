import road from "../../assets/images/road.png";
import Settings from "../data/Settings";
import Player from "../components/Player";
import Utils from "../data/Utils";
import Bonus from "../components/Bonus";
import Obstacle from "../components/Obstacle";
import ObstacleZone from "../components/ObstacleZone";
import Points from "../components/Points";
import Enemy from "../components/Enemy";
import Checkpoint from "../components/Checkpoint";
import User from "../data/User";

export default class Game extends Phaser.Scene {
    private bg: Phaser.GameObjects.TileSprite;
    private cloud: Phaser.GameObjects.TileSprite;
    private road: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    private player: Player;
    private enemy: Enemy;
    private points: Points;

    public bonuses: Phaser.Physics.Arcade.Group;
    public obstacles: Phaser.Physics.Arcade.Group;
    public checkpoints: Phaser.Physics.Arcade.Group;
    public obstacleZones: Phaser.Physics.Arcade.Group;

    private bonusEvent: Phaser.Time.TimerEvent;
    private obstacleEvent: Phaser.Time.TimerEvent;
    private pointsEvent: Phaser.Time.TimerEvent;
    private checkpointEvent: Phaser.Time.TimerEvent;

    private timer: number;
    private checkpointCounter: number;
    private isPause: boolean;

    public collider: Phaser.Physics.Arcade.Collider;

    public currentVelocity: number = 300;
    private readonly minVelocity: number = 320;
    private readonly maxVelocity: number = 1000;

    constructor() {
        super('Game');
    }

    public create(): void {
        this.timer = 0;
        this.checkpointCounter = 0;
        this.isPause = false;

        this.cloud = this.add.tileSprite(0, 0, 1280, 404,'cloud').setOrigin(0, 0).setScale(Settings.isMobile() ? 1 : 0.7).setDepth(-2)//tScale(0.6).setOrigin(1, 1)//.setScale(0.4)//.setOrigin(0.5, 1);
        const earth = this.add.sprite(this.cameras.main.centerX, this.cameras.main.height, 'earth').setScale(0.2).setOrigin(0.5, 1);
        this.road = this.physics.add.image(this.cameras.main.centerX, earth.getBounds().top + 20, 'road').setScale(Settings.isMobile() ? 0.6 : 0.5).setOrigin(0.5, 1);
        this.road.setImmovable(true);
        this.road.setSize(road.width, 32);

        const music = this.sound.add('backgroundMusic', {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        music.play();
        //music.setLoop(true);

        this.bg = this.add.tileSprite(
            0,
            this.road.getBounds().top + 65,
            2477,
            859,
            'bg'
        ).setScale(Settings.isMobile() ? 0.8 : 0.6).setOrigin(0.5, 1).setDepth(-1);

        this.enemy = new Enemy(this);
        this.player = new Player(this);
        this.points = new Points(this);

        this.bonuses = this.physics.add.group();
        this.obstacles = this.physics.add.group();
        this.obstacleZones = this.physics.add.group();
        this.checkpoints = this.physics.add.group();


        this.physics.add.existing(this.road);
        this.collider = this.physics.add.collider(this.player, this.road);
        this.collider = this.physics.add.collider(this.enemy, this.road);

        this.events.on('resume', (scene: this, data) => {
            this.isPause = false;
            this.bonusEvent.paused = false;
            this.obstacleEvent.paused = false;
            this.pointsEvent.paused = false;
            this.checkpointEvent.paused = false;
        });

        this.createObstacleEvent();
        this.createBonusEvent();
        this.createPointsEvent();
        this.createCheckpointEvent();
        this.setCollisions();
        this.tapOnTheScreen();
    }

    public update(): void {
        if(this.isPause) return;

        if(this.player.getLife() === 0) this.youLose();

        let velocity = this.minVelocity;
        this.currentVelocity = Math.min(velocity, this.maxVelocity);
        this.bg.tilePositionX += (this.currentVelocity / this.minVelocity) * 4.2;
    }

    private setPause(): void {
        this.scene.pause();
        this.scene.launch('Modal');
        this.isPause = true;
        this.bonusEvent.paused = true;
        this.obstacleEvent.paused = true;
        this.pointsEvent.paused = true;
        this.checkpointEvent.paused = true;
    }

    private youLose(): void {
        this.scene.pause();
        this.scene.launch('ModalResult');
        this.isPause = true;
    }

    private tapOnTheScreen(): void {
        this.input.on('pointerdown', (): void => {
            if (this.player.anims.getName() === 'jump') return;
            this.player.jump();
        });
    }

    private createBonus(): void {
        if(this.bonuses.getLength() === 1) return;

        const bonusCounter = this.player.getLife() === 3 ? 2 : 3;
        const bonusImg = ['girl', 'shieldBonus', 'sushi', 'boost'];

        const bonus = new Bonus(this, this.cameras.main.width + 50, this.road.getBounds().y + 50, bonusImg[Utils.randomNumber(0, bonusCounter)]);
        this.bonuses.add(bonus);
    }

    private createBonusEvent(): void {
        this.bonusEvent = this.time.addEvent({
            delay: 950,
            callback: (): void => {
                this.createBonus();
            },
            loop: true,
        });
    }

    private createObstacle(): void {
        //if(this.bonuses.getLength() === 1) return;

        //const bonusCounter = this.player.getLife() === 3 ? 2 : 3;
        const obstacleImg = ['barrier', 'cone', 'luke', 'officer', 'sign'];

       const obstacle = new Obstacle(this, this.cameras.main.width + 50, this.road.getBounds().y + 50, obstacleImg[Utils.randomNumber(0, 4)]);
       const obstacleZone = new ObstacleZone(this, this.cameras.main.width + 50, this.road.getBounds().y - 250);
       this.obstacles.add(obstacle);
       this.obstacleZones.add(obstacleZone);
    }

    private createObstacleEvent(): void {
        this.obstacleEvent = this.time.addEvent({
            delay: 2750,
            callback: (): void => {
                this.createObstacle();
            },
            loop: true,
        });
    }

    private createPointsEvent(): void {
        this.pointsEvent = this.time.addEvent({
            delay: 1000,
            callback: (): void => {
                User.plusScore(1);
                User.getScore();
                this.points.scorePoints(1);
            },
            loop: true,
        });
    }

    private createCheckpointEvent(): void {
        this.checkpointEvent = this.time.addEvent({
            delay: 1000,
            callback: (): void => {
                this.timer++;
                console.log(this.timer);
                if(this.timer >= 60) {
                    const checkpoint = new Checkpoint(this, this.cameras.main.width + 50, this.road.getBounds().y);
                    this.checkpoints.add(checkpoint);
                    this.timer = 0;
                    this.checkpointCounter++;
                }
            },
            loop: true,
        });
    }

    private setCollisions(): void {
        this.physics.add.overlap(this.obstacleZones, this.player, (obj1: Player, obj2: ObstacleZone) => {
            this.points.scorePoints(3);
            this.player.takeBonus(3);
            obj2.destroy();
        });

        this.physics.add.overlap(this.checkpoints, this.player, (obj1: Player, obj2: Checkpoint) => {
            obj2.body.setSize(50, 50);
            obj2.body.setOffset(50, -5200);
            this.setPause();
            const music = this.sound.add('checkpointMusic');
            music.play();
        });

        this.physics.add.overlap(this.bonuses, this.player, (obj1: Player, obj2: Bonus) => {
                switch (obj2.getName()) {
                    case 'boost': {
                        this.player.takeBoost();
                        this.enemy.setCurrPosition(this.player.getLife());
                        const music = this.sound.add('shieldBoostMusic');
                        music.play();
                        break;
                    }
                    case 'girl': {
                        this.points.scorePoints(50);
                        User.plusScore(50);
                        this.player.takeBonus(50);
                        const music = this.sound.add('girlMusic');
                        music.play();
                        break;
                    }
                    case 'shieldBonus': {
                        this.player.takeShield();
                        const music = this.sound.add('shieldBoostMusic');
                        music.play();
                        break;
                    }
                    case 'sushi': {
                        this.points.scorePoints(20);
                        User.plusScore(20);
                        this.player.takeBonus(20);
                        const music = this.sound.add('sushiMusic');
                        music.play();
                        break;
                    }
                }
                obj2.destroy();
            }
        );

        this.physics.add.collider(this.obstacles, this.player, (obj1: Player, obj2: Obstacle) => {
            if(this.player.getIsShield()) {
                this.player.takeDamageShield();
            } else {
                this.player.takeDamage();
                this.enemy.setCurrPosition(this.player.getLife());
                const music = this.sound.add('damageMusic');
                music.play();
            }
            obj2.body.setOffset(0, 2200);
        });
    }

}