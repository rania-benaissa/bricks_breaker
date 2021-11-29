class Information extends Phaser.Scene {

    constructor() {
        super({ key: SCENES.NAME.information });
    }

    preload() {

        this.load.image("infoBackground", "assets/images/information_scene.png");

        this.load.spritesheet("close_button", 'assets/spritesheet/buttons/close_button.png', { frameWidth: 118.75, frameHeight: 114 });

    }

    create() {

        /* scene background */

        this.background = this.physics.add.image(0, 0, "infoBackground");
        this.background.displayWidth = 600;
        this.background.displayHeight = 400;


        /* BUTTONS */


        var close_button = this.physics.add.sprite(270, -115, "close_button").setInteractive();

        close_button.setScale(0.4);




        close_button.setDataEnabled();
        close_button.setData('frame', 0);

        /* EVENTS */

        this.interactiveButton(close_button);
        close_button.on('pointerup', () => { this.scene.resume(SCENES.NAME.mainMenu); this.scene.stop(SCENES.NAME.information); });

        var container = this.add.container(400, 310, [this.background, close_button]);

        container.setSize(600, 400);
        container.setInteractive();

        this.input.setDraggable(container);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        /* this.background.setCollideWorldBounds(true);
         close_button.setCollideWorldBounds(true);*/

    }

    upload() {

    }

    interactiveButton(button) {

        button.on('pointerover', function () { button.setFrame(1); });
        button.on('pointerout', function () { button.setFrame(0); });
        button.on('pointerdown', function () { button.setFrame(2); });

    }


}






