
/* GAME PLAY VARS*/


var player, paddle, ball, cursors, gameStarts = false,
    playerWonText, gameOverText, openingText;

var bricks, broken_breaks;

/*const bricks_name = ['blue', 'brown', 'gray', 'green', 'green2', 'orange'
    , 'purple', 'red', 'sky'];*/

const bricks_name = ['pink', 'red', 'yellow', 'green', 'blue', 'purple', 'orange'];



/* MENU VARS*/

var info_button, music_button, play_button, rewards_button, sound_button;



/* SELECT LEVEL VARS */

const levels_number = 3;

var levels;


/* GENERAL VARS*/

const SCENES = {

    NAME: {

        mainMenu: "mainMenu",
        firstLevel: "firstLevel",
        information: "information",
        levelSelection: "levelSelection"

    }
}

