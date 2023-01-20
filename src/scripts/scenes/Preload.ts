import * as Webfont from '../libs/Webfonts.js';

import bg from '../../assets/images/bg.png';
import road from '../../assets/images/road.png';
import earth from '../../assets/images/earth.png';
import cloud from '../../assets/images/cloud.png';
import player from '../../assets/images/player.png';
import pixel from '../../assets/images/pixel.png';
import points from '../../assets/images/points.png';
import enemy from '../../assets/images/enemy.png';
import checkpoint from '../../assets/images/checkpoint.png';
import bgPoint from '../../assets/images/bgPoint.png';
import logo from '../../assets/images/logo.png';
import close from '../../assets/images/close.png';
import btnNext from '../../assets/images/btnNext.png';
import bgLoad from '../../assets/images/bgLoad.png';
import bgRules from '../../assets/images/bgRules.png';
import rulesModal from '../../assets/images/rulesModal.png';
import btnGame from '../../assets/images/btnGame.png';
import btnTable from '../../assets/images/btnTable.png';
import bgLeader from '../../assets/images/bgLeader.png';
import bgYouLeader from '../../assets/images/bgYouLeader.png';
import btnLeader from '../../assets/images/btnLeader.png';
import btnRules from '../../assets/images/btnRules.png';
import bgOpacity from '../../assets/images/bgOpacity.png';
import bgTryGame from '../../assets/images/bgTryGame.png';
import bgTryGameDisable from '../../assets/images/bgTryGameDisable.png';
import bgModal from '../../assets/images/bg/bgModal.png';
import bgPromo from '../../assets/images/bg/bgPromo.png';
import btnGameDisable from '../../assets/images/btnGameDisable.png';

import boost from '../../assets/images/bonuses/boost.png';
import girl from '../../assets/images/bonuses/girl.png';
import shieldBonus from '../../assets/images/bonuses/shieldBonus.png';
import shield from '../../assets/images/bonuses/shield.png';
import sushi from '../../assets/images/bonuses/sushi.png';
import bgBonus from '../../assets/images/bonuses/bgBonus.png';

import barrier from '../../assets/images/obstacles/barrier.png';
import cone from '../../assets/images/obstacles/cone.png';
import luke from '../../assets/images/obstacles/luke.png';
import officer from '../../assets/images/obstacles/officer.png';
import sign from '../../assets/images/obstacles/sign.png';

import backgroundMusic from '../../assets/music/background.mp3';
import checkpointMusic from '../../assets/music/checkpoint.mp3';
import damageMusic from '../../assets/music/damage.mp3';
import girlMusic from '../../assets/music/girl.mp3';
import jumpMusic from '../../assets/music/jump.mp3';
import shieldBoostMusic from '../../assets/music/shieldBoost.mp3';
import sushiMusic from '../../assets/music/sushi.mp3';
import Settings from '../data/Settings';
import LoadingBar from '../components/LoadingBar';
import User from '../data/User';
import {tanukiAPI} from "../libs/Api";

export default class Preload extends Phaser.Scene {
    private fontsReady: boolean;

    constructor() {
        super('Preload');
    }

    public init(): void {
        Webfont.load({
          custom: {
            families: [
              'LuckiestGuy',
                'Gilroy',
            ],
          },
          active: () => {
            this.fontsReady = true;
          },
        });
    }

    public preload(): void {
        this.add
            .sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'bgLoad')
            .setOrigin(0.5, 0.5).setScale(0.66);
        new LoadingBar(this);
        this.preloadAssets();
        this.checkUser();
    }

    public create(): void {
        this.scene.stop();
        this.scene.start('Rules');
        //this.scene.start('LeaderBord');
        //this.scene.launch('ModalResult');
    }

    private preloadAssets(): void {
        this.load.image('bgLoad', bgLoad);
        this.load.image('bg', bg);
        this.load.image('road', road);
        this.load.image('earth', earth);
        this.load.image('cloud', cloud);
        this.load.image('pixel', pixel);
        this.load.image('points', points);
        this.load.image('bgPoint', bgPoint);
        this.load.image('logo', logo);
        this.load.image('close', close);
        this.load.image('btnNext', btnNext);
        this.load.image('bgRules', bgRules);
        this.load.image('rulesModal', rulesModal);
        this.load.image('btnGame', btnGame);
        this.load.image('btnTable', btnTable);
        this.load.image('bgLeader', bgLeader);
        this.load.image('bgYouLeader', bgYouLeader);
        this.load.image('btnLeader', btnLeader);
        this.load.image('btnRules', btnRules);
        this.load.image('bgOpacity', bgOpacity);
        this.load.image('bgTryGame', bgTryGame);
        this.load.image('bgTryGameDisable', bgTryGameDisable);
        this.load.image('bgModal', bgModal);
        this.load.image('btnGameDisable', btnGameDisable);
        this.load.image('bgPromo', bgPromo);

        this.load.image('boost', boost);
        this.load.image('girl', girl);
        this.load.image('shieldBonus', shieldBonus);
        this.load.image('shield', shield);
        this.load.image('sushi', sushi);
        this.load.image('bgBonus', bgBonus);

        this.load.image('barrier', barrier);
        this.load.image('cone', cone);
        this.load.image('luke', luke);
        this.load.image('officer', officer);
        this.load.image('sign', sign);

        this.load.audio('backgroundMusic', backgroundMusic);
        this.load.audio('checkpointMusic', checkpointMusic);
        this.load.audio('damageMusic', damageMusic);
        this.load.audio('girlMusic', girlMusic);
        this.load.audio('jumpMusic', jumpMusic);
        this.load.audio('shieldBoostMusic', shieldBoostMusic);
        this.load.audio('sushiMusic', sushiMusic);

        this.load.plugin(
            'rexroundrectangleplugin',
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js',
            true
        );

        this.load.spritesheet('player', player, {
            frameWidth: 1846,
            frameHeight: 1541,
        });

        this.load.spritesheet('enemy', enemy, {
            frameWidth: 2610,
            frameHeight: 781,
        });

        this.load.spritesheet('checkpoint', checkpoint, {
            frameWidth: 2824,
            frameHeight: 2846,
        });
    }

    private async checkUser(): Promise<void> {
      const telegram = window['Telegram']['WebApp'];
      telegram.ready();
      telegram.expand();

      try {
        User.setID(telegram.initDataUnsafe.user.id);
      } catch (e) {
        User.setID('0');
      }

      try {
        User.setName(telegram.initDataUnsafe.user.first_name);
      } catch (e) {
        User.setName('Неизвестный игрок');
      }

      try {
        User.setUsername(telegram.initDataUnsafe.user.username);
      } catch (e) {
        User.setUsername('no_username');
      }

      const { data } = await tanukiAPI.getUser(User.getID());

      if (data) {
        User.setID(data.telegram_id);
        User.setUsername(data.telegram_username);
        User.setRecord(data.points);
        User.setTry(data.tryCount);

        await tanukiAPI.updateUser({
          telegram_id: User.getID(),
          telegram_username: User.getUsername(),
          points: User.getRecord(),
          tryCount: User.getTry(),
          openApp: 1
        });
      } else {
        await tanukiAPI.createUser({
          telegram_id: User.getID(),
          telegram_username: User.getUsername(),
          points: User.getScore(),
          tryCount: 5,
          openApp: 1
        });
      }
    }
}
