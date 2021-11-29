class LevelSelection extends Phaser.Scene {

    constructor() {

        super({ key: SCENES.NAME.levelSelection });
    }

    preload() {

        this.load.image("sceneBackground", "assets/images/select_lvl_scene.png");

        this.load.spritesheet("back_menu", 'assets/spritesheet/buttons/home_button.png', { frameWidth: 118.75, frameHeight: 114 });

        this.load.spritesheet("start_button", 'assets/spritesheet/buttons/play_button.png', { frameWidth: 118.75, frameHeight: 114 });

        this.loadLevelButtons();

    }

    create() {

        /* scene background */

        this.background = this.add.image(100, 100, "sceneBackground").setOrigin(0);
        this.background.displayWidth = 600;
        this.background.displayHeight = 400;


        /* BUTTONS */


        var back_menu_button = this.add.sprite(200, 470, "back_menu").setInteractive();

        back_menu_button.setScale(0.65);
        back_menu_button.setDataEnabled();
        back_menu_button.setData('frame', 0);


        var start_button = this.add.sprite(600, 470, "start_button").setInteractive();
        start_button.setScale(0.65);
        start_button.setDataEnabled();
        start_button.setData('frame', 0);



        levels = this.physics.add.group();
        levels.enableBody = true;
        this.createLevelsGroup();


        /* EVENTS */

        this.interactiveButton(back_menu_button);
        back_menu_button.on('pointerup', () => { this.scene.resume(SCENES.NAME.mainMenu); this.scene.stop(SCENES.NAME.levelSelection); });

        this.interactiveButton(start_button);
        start_button.on('pointerup', () => { this.scene.start(SCENES.NAME.firstLevel); this.scene.stop(SCENES.NAME.levelSelection); });

    }

    upload() {

    }

    interactiveButton(button) {

        button.on('pointerover', function () { button.setFrame(1); });
        button.on('pointerout', function () { button.setFrame(0); });
        button.on('pointerdown', function () { button.setFrame(2); });

    }

    loadLevelButtons() {

        var lvl = [];

        for (var i = 0; i < levels_number; i++)


            lvl[i] = this.load.spritesheet("number" + (i + 1) + "_button", " assets/spritesheet/buttons/number" + (i + 1) + "_button.png", {

                frameWidth: 121.25,
                frameHeight: 114
            });

        return lvl;

    }


    createLevelsGroup() {

        var level, frame = 0;

        for (let i = 0; i < levels_number; i++) {

            level = levels.create(200 + (i * 100), 250, "number" + (i + 1) + "_button", frame, true, true).setInteractive();

            level.setDataEnabled();
            level.setData('frame', frame);
            level.setData('selected', "false");
            level.body.immovable = true;
            level.setScale(0.8, 0.8);
            this.interactiveLevels(level);
            frame = 0;

        }

    }


}









