class MainMenu extends Phaser.Scene {

    constructor() {
        super({ key: SCENES.NAME.mainMenu });
    }

    preload() {



        this.load.image("menuBackground", "assets/images/bg.png");

        this.load.image("title", "assets/images/title3.png");

        this.load.spritesheet("play_button", 'assets/spritesheet/buttons/play_button.png', { frameWidth: 118.5, frameHeight: 114 });

        this.load.spritesheet("music_button", 'assets/spritesheet/buttons/music_button.png', { frameWidth: 59.5, frameHeight: 57 });

        this.load.spritesheet("rewards_button", 'assets/spritesheet/buttons/rewards_button.png', { frameWidth: 118.5, frameHeight: 114 });

        this.load.spritesheet("info_button", 'assets/spritesheet/buttons/info_button.png', { frameWidth: 118.5, frameHeight: 114 });

        this.load.spritesheet("sound_button", 'assets/spritesheet/buttons/sound_button.png', { frameWidth: 59.5, frameHeight: 57 });

    }

    create() {

        /* menu background */

        this.background = this.add.image(0, 0, "menuBackground").setOrigin(0);
        this.background.displayWidth = 800;
        this.background.displayHeight = 600;

        this.add.image(390, 250, 'title');

        /* BUTTONS */

        play_button = this.add.sprite(400, 450, "play_button").setInteractive();
        info_button = this.add.sprite(600, 450, "info_button").setInteractive();
        rewards_button = this.add.sprite(200, 450, "rewards_button").setInteractive();
        music_button = this.add.sprite(50, 50, "music_button").setInteractive();
        sound_button = this.add.sprite(50, 120, "sound_button").setInteractive();

        music_button.setDataEnabled();
        music_button.setData('frame', 0);

        sound_button.setDataEnabled();
        sound_button.setData('frame', 0);


        /* EVENTS */

        this.interactiveButton(play_button);

        play_button.on('pointerup', () => {

            this.scene.launch(SCENES.NAME.levelSelection);
            this.scene.pause(SCENES.NAME.mainMenu);
        });

        this.interactiveButton(info_button);

        info_button.on('pointerup', () => {

            this.scene.launch(SCENES.NAME.information)
            this.scene.pause(SCENES.NAME.mainMenu);
        });

        this.interactiveButton(rewards_button);
        //rewards_button.on('pointerup', () => { this.scene.start(SCENES.NAME.firstLevel, "FROM MENU"); });

        this.setUpButton(music_button);
        this.setUpButton(sound_button)


    }

    upload() {

    }

    interactiveButton(button) {

        button.on('pointerover', function () { button.setFrame(1); });
        button.on('pointerout', function () { button.setFrame(0); });
        button.on('pointerdown', function () { button.setFrame(2); });

    }

    /* ACTIVE OU DESACTIVE UN BOUTON*/
    setUpButton(button) {

        button.on('pointerover', function () { button.setFrame(1); });
        button.on('pointerout', function () {

            if (button.getData('frame') == 0) {

                button.setFrame(0);

            } else {

                button.setFrame(3);
            }
        });

        button.on('pointerdown', function () { button.setFrame(2); });
        button.on('pointerup', function () {

            if (button.getData('frame') == 0) {

                button.setData('frame', 3);
                button.setFrame(3);

            } else {

                button.setData('frame', 0);
                button.setFrame(0);
            }


        });

    }


}






