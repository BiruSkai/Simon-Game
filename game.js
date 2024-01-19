let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let levelNumber = 0;
let started = false;

// Starting the game
$(document).keydown(function(e){
        if(!started){
                randomChosenColor();
                started = true;
        }
})

$(".btn").click(function(){
        let userChosenColor = $(this).attr("id");
        console.log(userChosenColor, levelNumber)
        userClickedPattern.push(userChosenColor);
        audio(userChosenColor);
        animatePress(userChosenColor);

        console.log(userClickedPattern.length)
        checkAnswer(userClickedPattern.length - 1);
})  

//Helper functions
function nextSequence(){
        let randomNumber = Math.floor(Math.random() * 4);
        return randomNumber;
}

function randomChosenColor(){
        userClickedPattern = [];
        levelNumber ++ ;
        $("#level-title").text(`Level ${levelNumber}`);

        let currentSequence = nextSequence();
        let currentColor = buttonColors[currentSequence];

        // Setting the audio according to currentColor
        audio(currentColor);
        
        // Inserting currentColor to gamePattern & flashing the correct box
        gamePattern.push(currentColor);
        $(`.${currentColor}`).fadeOut(100).fadeIn(100); 
        animatePress(currentColor);
}

function audio(color) {
        let audio = new Audio(`sounds/${color}.mp3`);
        audio.play();
}

function animatePress(color){
        $(`#${color}`).addClass("pressed");

        setTimeout(() => {
                $(`#${color}`).removeClass("pressed")
        }, 100)
}

function gameOver(){
        $("body").addClass("game-over");

        setTimeout(() => {
                $("body").removeClass("game-over")
        }, 200)
        
        startOver();
        $("#level-title").text("Game Over, Press Any Key to Restart");
}

function checkAnswer(currentLevel){

        // console.log(gamePattern[currentLevel] + " , " + userClickedPattern[currentLevel])
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
                console.log("Success");
                if (gamePattern.length === userClickedPattern.length){
                        setTimeout(() => {
                                randomChosenColor();
                        }, 1000)
                }
        } else {
                console.log("wrong");
                gameOver();
                
        }
}

function startOver() {
        gamePattern = [];
        userClickedPattern = [];
        levelNumber = 0;
        started = false;
}