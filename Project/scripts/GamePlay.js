
class GamePlay extends Phaser.Scene {

    constructor() {

        super({ key: SCENES.NAME.firstLevel });
    }

    preload() {

        /* LOADING IMAGES */

        this.load.image("background", "assets/images/bg.png")

        this.load.image('paddle', 'assets/images/paddle.png');

        /* LOADING SPRITES */

        this.load.spritesheet('ball', 'assets/spritesheet/balls/ball.png', {

            frameWidth: 84.8,
            frameHeight: 65
        });

        this.loadBricks('orange_bricks', 'assets/spritesheet/bricks/orange_brick.png');
        this.loadBricks('blue_bricks', 'assets/spritesheet/bricks/blue_brick.png');
        this.loadBricks('green_bricks', 'assets/spritesheet/bricks/green_brick.png');
        this.loadBricks('purple_bricks', 'assets/spritesheet/bricks/purple_brick.png');
        this.loadBricks('yellow_bricks', 'assets/spritesheet/bricks/yellow_brick.png');
        this.loadBricks('pink_bricks', 'assets/spritesheet/bricks/pink_brick.png');
        this.loadBricks('red_bricks', 'assets/spritesheet/bricks/red_brick.png');

    }

    create() {

        /* IMAGES */

        this.background = this.add.image(0, 0, "background").setOrigin(0);
        this.background.displayWidth = 800;
        this.background.displayHeight = 600;


        /* DEFINE OBJECTS*/

        player = this.physics.add.sprite(
            400,
            550,
            'paddle'


        );

        player.setScale(0.4);


        ball = this.physics.add.sprite(
            400, // x position
            525, // y position
            'ball' // key of image for the sprite

        );

        ball.setScale(0.4);


        // DEFINE BRICKS POSITION  DEPENDING ON THE MAP 
        bricks = this.physics.add.group();
        bricks.enableBody = true;
        this.createBricksGroup();

        /* ANIMATIONS */

        this.anims.create({

            key: 'ball_anims',
            frames: this.anims.generateFrameNumbers('ball'),
            frameRate: 4,
            repeat: -1


        });


        // TO MOVE THE PADDLE
        cursors = this.input.keyboard.createCursorKeys();


        // to Handle collision 
        player.setCollideWorldBounds(true);
        ball.setCollideWorldBounds(true);

        //to enable bounce of the ball when IT S ON TOP OF DA WOLRD 8D
        ball.setBounce(1, 1);

        // to disable down collision  of the ball
        this.physics.world.checkCollision.down = false;


        // add a check collision 
        this.physics.add.collider(ball, bricks, this.hitBrick, null, this);
        this.physics.add.collider(ball, player, this.hitPlayer, null, this);

        // Make the player immovable 
        player.setImmovable(true);


        /* INITIALIZE TEXTS */

        openingText = this.initText('Press SPACE to start');

        gameOverText = this.initText('Game Over');
        // Make it invisible until the player loses
        gameOverText.setVisible(false);

        playerWonText = this.initText('You Won !');
        // Make it invisible until the player wins
        playerWonText.setVisible(false);


    }

    update() {


        // Check if the ball left the scene i.e. game over

        if (this.isGameOver(this.physics.world)) {

            //I'll display a screen to replay 

            gameOverText.setVisible(true);
            ball.disableBody(true, true);

        } else if (this.isWon()) {

            // if he won he can play back or move to the next lvl or go back to menu

            playerWonText.setVisible(true);
            ball.disableBody(true, true);

        } else {

            // CURRENTLY PLAYING

            player.body.setVelocityX(0);

            // We move the paddle left - right 

            if (cursors.left.isDown) {

                player.body.setVelocityX(-300);

            } else if (cursors.right.isDown) {

                player.body.setVelocityX(300);

            }

            this.isGameStarted();

        }

    }

    isGameOver(world) {

        return ball.body.y > world.bounds.height;
    }

    isWon() {

        return bricks.countActive() == 0;
    }

    isGameStarted() {

        if (!gameStarts) {

            ball.setX(player.x);

            if (cursors.space.isDown) {

                gameStarts = true;
                ball.setVelocityY(-200);
                openingText.setVisible(false);
                ball.play("ball_anims");
            }
        }
    }

    initText(val) {

        var text = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            val,
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '50px',
                fill: '#fff'
            }
        );

        text.setOrigin(0.5);

        return text;
    }

    loadBricks(name, path) {

        /*return this.load.spritesheet(name, path, {

            frameWidth: 394,
            frameHeight: 138
        });*/
        return this.load.spritesheet(name, path, {

            frameWidth: 132,
            frameHeight: 40
        });

    }

    createBricksGroup() {

        var brick, frame, create;

        for (let y = 0; y < 7; y++) {


            for (let x = 0; x < 6; x++) {

                frame = Phaser.Math.Between(0, 1);
                create = Phaser.Math.Between(0, 1);

                if (create) {

                    brick = bricks.create(100 + (x * 120), 70 + (y * 52), Phaser.Utils.Array.GetRandom(bricks_name) + "_bricks", frame, true, true);

                    brick.setDataEnabled();
                    brick.setData('frame', frame);
                    brick.body.immovable = true;
                    brick.setScale(0.8, 0.8);
                }


            }
        }

    }

    hitBrick(ball, brick) {

        // stop displaying the brick if it s a broken one else display broken one 


        if (brick.getData('frame') == 0) {

            brick.setFrame(1);
            brick.setData('frame', 1);

        } else {

            brick.disableBody(true, true);

        }

        if (ball.body.velocity.x === 0) {

            let randNum = Math.random();

            if (randNum >= 0.5) {

                ball.body.setVelocityX(150);
            } else {
                ball.body.setVelocityX(-150);
            }
        }
    }

    hitPlayer(ball, player) {

        if (gameStarts) {
            // Increase the velocity of the ball after it bounces
            ball.setVelocityY(ball.body.velocity.y - 10);

            let newXVelocity = Math.abs(ball.body.velocity.x) + 10;

            // If the ball is to the left of the player, ensure the X-velocity is negative
            if (ball.x < player.x) {

                ball.setVelocityX(-newXVelocity);
            } else {
                ball.setVelocityX(newXVelocity);
            }
        }
    }
}



